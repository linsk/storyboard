#!/usr/bin/env python
# encoding: utf-8
"""
views.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

import logging
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib import auth

from django.http import HttpResponse
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import PasswordChangeForm

from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from models import *
from forms import *

from google.appengine.api import files
from config import GOOGLE_STORAGE,BUCKET,FOLDER

try:
	files.gs
except AttributeError:
	import gs
	files.gs = gs

def index(request):
    return HttpResponseRedirect('/')
    
def signup(request):
    if request.method == 'POST':
        form = RegisterForm(data=request.POST)
        if form.is_valid(): # All validation rules pass
            user = form.save()        
            user = auth.authenticate(username=form.cleaned_data['username'],password=form.cleaned_data['password1'])
            if user:
                auth.login(request, user)
            else:
                HttpResponseRedirect('/auth/signin')
            return HttpResponseRedirect('/')
    else:
        form = RegisterForm()
    return render_to_response('account/login.html',{'form':form},context_instance=RequestContext(request))
    
def signin(request):
    #error_message = ''     
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        redirect_to = request.REQUEST.get('next', '/')
        if form.is_valid(): # All validation rules pass
            auth.login(request, form.get_user())
            return HttpResponseRedirect(redirect_to)
        #error_message = _("Please enter a correct username and password. Note that both fields are case-sensitive.")
    else:
        form = AuthenticationForm(request)
    return render_to_response('account/login.html',{'form':form},context_instance=RequestContext(request))

def signout(request):
    auth.logout(request)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))

@login_required    
def password_change(request):
    success = None   
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user,data=request.POST)
        if form.is_valid(): # All validation rules pass
            form.save()
            success = True   
            #return HttpResponseRedirect('/auth/password_change_done')
    else:
        form = PasswordChangeForm(request.user)
    return render_to_response('account/password_change.html',{'form':form,'success':success},context_instance=RequestContext(request))

@login_required    
def password_change_done(request):
    return render_to_response('account/password_change_done.html',{},context_instance=RequestContext(request))
        
@login_required
def settings(request):
    if request.method == 'POST':
        form = AccountForm(request.POST, request.FILES,instance=request.user.profile)
        if form.is_valid():
            obj = form.save(commit=False)
            # obj.author = request.user
            # obj.tag = thread.tag
            # obj.ref = thread
            # obj.title = 'Re:' + thread.title
            # import logging
            # logging.info(request.FILES['img'])
            # logging.info(type(request.FILES['img']))
            if request.FILES.has_key('img'):
                file_name = "uploads/ohbug/avatar/normal/%s.png" % request.user.username
                file_path = '/%s/%s/%s' % (GOOGLE_STORAGE,BUCKET,file_name)
                #logging.info(file_path)
                #logging.info(dir(request.FILES['img']))
                #logging.info(request.FILES['img'].name)
            
                content_type = request.FILES['img'].content_type or 'text/plain'
                file_data = request.FILES['img'].read()
                write_path = files.gs.create(file_path, acl='bucket-owner-full-control',mime_type=content_type)
                with files.open(write_path, 'a') as fp:
                    fp.write(file_data)
                files.finalize(write_path)
                obj.avatar_mime = content_type
                obj.avatar = file_name
                obj.release +=1
			
            obj.save()
            return HttpResponseRedirect('/settings')
    else:
        form = AccountForm(instance=request.user.profile)
    return render_to_response('account/settings.html',{'form':form},context_instance=RequestContext(request))

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
    
def avatar(request,username=None):
    image_data = None
    if username:
        file_name = "uploads/ohbug/avatar/normal/%s.png" % username
    else:
        file_name = "uploads/ohbug/avatar/normal/%s.png" % request.user.username
    read_path = '/%s/%s/%s' % (GOOGLE_STORAGE,BUCKET,file_name)
    
    image_data = read_gs(read_path)
    
    if not image_data:
        file_name = "uploads/ohbug/avatar/normal/default.png"
        read_path = '/%s/%s/%s' % (GOOGLE_STORAGE,BUCKET,file_name)
    	image_data = read_gs(read_path)
    	
    return HttpResponse(image_data, mimetype="image/png")
    
@login_required
def custom_style(request):
    return render_to_response('about.html',{},context_instance=RequestContext(request))

@login_required    
def logs(request):
    return render_to_response('about.html',{},context_instance=RequestContext(request))

def member(request,username=''):
    #u = User.objects.get(username__exact=username)
    u = get_object_or_404(User,username__exact=username)
    return render_to_response('account/member.html',{'member':u},context_instance=RequestContext(request))
