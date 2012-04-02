#!/usr/bin/env python
# encoding: utf-8
"""
views.py

Created by Darcy Liu on 2012-03-01.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib import auth

from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404

from models import *
from forms import *

from google.appengine.api import memcache
import logging

def update(request):
    memcache.flush_all()
    return HttpResponseRedirect('/')
    
def index(request,tag=None):
    # logging.info('index')
    if tag:
        tag = Tag.objects.get(slug=tag)
        query = memcache.get('threadswithtag-'+tag.slug)
        if query is None:
            query = Thread.objects.all().order_by('-updated').filter(tag=tag).filter(ref=None)
            memcache.add('threadswithtag-'+tag.slug, query, 30)
        tags = None
    else:
        query = memcache.get('threads')
        if query is None:
            query = Thread.objects.all().order_by('-updated').filter(ref=None)
            memcache.add('threads', query, 30)
       
        tags = memcache.get('tags')
        if tags is not None:
            pass
        else:
            tags = Tag.objects.all().order_by('-updated')
            memcache.add('tags', tags, 3600)
            
    paginator = Paginator(query, 10) # Show 10 contacts per page
    
    page = request.GET.get('page',1)
    try:
        threads = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        threads = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        threads = paginator.page(paginator.num_pages)
    
    if len(threads.paginator.page_range)>10:
        page_range = []
        page_range.append(1)
        head = False
        foot = False
        if (threads.number - 4) >2 and (threads.number + 4) < threads.paginator.num_pages:
          start_page = threads.number - 4
        elif (threads.number + 4) >= threads.paginator.num_pages:
          start_page = threads.paginator.num_pages- 8
        else:
          start_page = 2
        end_page = start_page + 7
        if start_page>2:
            head = True
            page_range.append(False)

        for i in range(0,8):
            page_range.append(start_page + i)
          
        if start_page < threads.paginator.num_pages- 8:
            foot = True
            page_range.append(False)
        page_range.append(threads.paginator.num_pages)
        threads.paginator.page_range_list = page_range
    else:
        threads.paginator.page_range_list = threads.paginator.page_range
    
    updated_tags = memcache.get('updated_tags')
    if updated_tags is not None:
        pass
    else:
        if tags:
            updated_tags = tags[0:10]
        else:
            updated_tags = Tag.objects.all().order_by('-updated')[:10]
        memcache.add('updated_tags', updated_tags, 3600) 

    values = {'threads':threads,'tags':tags,'updated_tags':updated_tags,'tag':tag}
    # logging.info('render_to_response')
    # logging.info(request.mobile)
    return render_to_response('board/threads.html',values,context_instance=RequestContext(request))

def view(request,key):
    #thread = Thread.objects.get(key=key)
    thread = get_object_or_404(Thread,pk=key)
    if thread.ref:
        return HttpResponseRedirect('/r/'+str(thread.ref.key))
    comments = Thread.objects.all().order_by('updated').filter(ref=thread)
    if request.method == 'POST':
        form = CommentForm(data=request.POST)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.author = request.user
            obj.tag = thread.tag
            obj.ref = thread
            obj.title = 'Re:' + thread.title
            obj.save()
            thread.release += 1
            thread.save()
            return HttpResponseRedirect('/r/'+str(thread.key))
    else:
        form = CommentForm()
    updated_tags = memcache.get('updated_tags')
    try:
        f = Favorite.objects.get(author=request.user,thread=thread)
    except Exception:
        f = None
    values = {'thread':thread,'comments':comments,'favorite':f,'form':form,'updated_tags':updated_tags}
    return render_to_response('board/view.html',values,context_instance=RequestContext(request))

@login_required
def favorite(request,key):
    action = request.GET.get('action','do')
    thread = get_object_or_404(Thread,pk=key)
    #f = Favorite.objects.get_or_create(author=request.user,thread=thread)
    if action == 'do':
        f = Favorite.objects.get_or_create(author=request.user,thread=thread)
    else:
        Favorite.objects.filter(author=request.user,thread=thread).delete()
    return HttpResponseRedirect('/r/'+str(key))

@login_required    
def favorites(request):
    f = Favorite.objects.filter(author=request.user).order_by('updated')
    return render_to_response('board/favorites.html',{'favorites':f},context_instance=RequestContext(request))
     
def tags(request):
    tags = Tag.objects.all().order_by('-updated')
    return render_to_response('board/threads.html',{'tags':tags},context_instance=RequestContext(request))

@login_required    
def add(request,tag=None):
    if tag:
        tag = Tag.objects.get(slug=tag)
        query = Thread.objects.all().order_by('-updated').filter(tag=tag)
    else:
        query = None
        
    if request.method == 'POST' and tag:
        form = ThreadForm(data=request.POST)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.author = request.user
            obj.tag = tag
            # obj.title = obj.text.split('\n')[0][0:60].strip()
            obj.save()
            memcache.delete('threadswithtag')
            memcache.delete('threads')
            return HttpResponseRedirect('/r')
    else:
        form = ThreadForm()
    return render_to_response('board/add.html',{'tag':tag,'form':form,'threads':query},context_instance=RequestContext(request))

@login_required
def delete(request):
    query = Thread.objects.all().order_by('-updated')
    return render_to_response('index.html',{'threads':query},context_instance=RequestContext(request))