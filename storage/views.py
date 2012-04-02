#!/usr/bin/env python
# encoding: utf-8
"""
views.py

Created by Darcy Liu on 2012-04-02.
Copyright (c) 2012 Close To U. All rights reserved.
"""
import datetime
import logging
import hashlib

from django.shortcuts import render_to_response
from django.shortcuts import get_object_or_404
from django.template import RequestContext
from django.contrib import auth

from django.http import HttpResponse
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm

from google.appengine.api import files
from config import GOOGLE_STORAGE,BUCKET,FOLDER

from models import *
from forms import *

from google.appengine.api import images

def photos(request):
    query = Storage.objects.all().order_by('-updated')
    return render_to_response('storage/photos.html',{'photos':query},context_instance=RequestContext(request))
        
def upload(request):
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            if request.FILES.has_key('images'):
                name = request.FILES['images'].name
                content_type = request.FILES['images'].content_type or 'text/plain'

                now = datetime.datetime.now()

                file_ext_pos = name.rfind('.')
                file_name_len = len(name)

                if not (content_type == 'image/jpeg' or content_type == 'image/png' or content_type == 'image/gif'):
                    return
                if file_ext_pos<=0 and file_ext_pos>=file_name_len:
                    return
                file_ext = name[file_ext_pos-file_name_len:]        		
                file_name = 'uploads/ohbug/photo/%s%s' % (now.strftime('%Y-%m/%d-%H%M%S-%f'),file_ext)
                file_path = '/%s/%s/%s' % (GOOGLE_STORAGE,BUCKET,file_name)
                logging.info(file_path)
                file_data = request.FILES['images'].read()
                write_path = files.gs.create(file_path, acl='bucket-owner-full-control',mime_type=content_type)
                with files.open(write_path, 'a') as fp:
                    fp.write(file_data)
                files.finalize(write_path)
                s = Storage()
                s.storage  = GOOGLE_STORAGE
                s.bucket  = BUCKET
                s.path = file_name
                s.mime = content_type
                s.size = len(file_data)
                s.md5 = hashlib.md5(file_data).hexdigest()
                s.name = name
                s.author = request.user
                s.save()
                return HttpResponseRedirect('/photo/%s'%s.key)
    else:
        form = UploadForm()
    return render_to_response('storage/upload.html',{'form':form},context_instance=RequestContext(request))
    
def view(request,key=None):
    s = get_object_or_404(Storage,pk=key)
    # name = s.name
    # file_ext_pos = name.rfind('.')
    # file_name_len = len(name)
    # file_ext = name[file_ext_pos-file_name_len:]
    HTTP_HOST = request.META['HTTP_HOST'] 
    image = {
        'origin': s,
        'url': 'http://%s/photo/raw/%s.%s' % (HTTP_HOST,s.key,s.name)
    }
    return render_to_response('storage/photo.html',{'image':image},context_instance=RequestContext(request))
    
def read_gs(read_path):
    image_data = None
    try:
        with files.open(read_path, 'r') as fp:
            buf = fp.read(1000000)
            image_data = buf
            while buf:
                buf = fp.read(1000000)
                image_data +=buf
    except Exception,e:
        pass
    return image_data
            
def raw(request,key=None):
    s = get_object_or_404(Storage,pk=key)
    read_path =  '/%s/%s/%s'% (s.storage, s.bucket, s.path)
    #logging.info(read_path)
    image_data = read_gs(read_path)
    return HttpResponse(image_data, s.mime)
    
def thumbnail(request,key=None):
    s = get_object_or_404(Storage,pk=key)
    read_path =  '/%s/%s/%s'% (s.storage, s.bucket, s.path)
    image_data = read_gs(read_path)
    MIN_SIZE = 100
    image = images.Image(image_data)
    width = image.width
    height = image.height
    if width>height:
        rate = width*1.0/height
    else:
        rate = height*1.0/width
    size = int(MIN_SIZE*rate+1)
    new_image = images.resize(image_data, width=size, height=size, output_encoding=images.PNG)      
    image = images.Image(new_image)
    right_x = round(MIN_SIZE*1.0/image.width,5)
    if right_x>1:
        right_x = 1.0
    else:
        left_x = (1- right_x)/2
        right_x = right_x + left_x
    bottom_y = round(MIN_SIZE*1.0/image.height,5)
    if bottom_y >1:
        bottom_y = 1.0
    else:
        top_y = (1-bottom_y)/2
        bottom_y = bottom_y + top_y
    new_image = images.crop(new_image, left_x, top_y, right_x, bottom_y, output_encoding=images.PNG)
    return HttpResponse(new_image, s.mime)