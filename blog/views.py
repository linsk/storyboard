#!/usr/bin/env python
# encoding: utf-8
"""
views.py

Created by Darcy Liu on 2012-03-09.
Copyright (c) 2012 Close To U. All rights reserved.
"""

import logging
from django.views.generic import TemplateView
from django.views.generic import ListView
from django.views.generic import DetailView

from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response
from django.shortcuts import get_object_or_404

from models import *
from forms import *

import markdown
import datetime

class AboutView(TemplateView):
    template_name = "about.html"

class MineEntryListView(ListView):
    context_object_name = "entries"
    template_name = "blog/blogs.html"

    def get_queryset(self):
        return Entry.objects.all().filter(author=self.request.user).order_by('-updated')
                
class EntryListView(ListView):
    context_object_name = "entries"
    template_name = "blog/blogs.html"

    def get_queryset(self):
        return Entry.objects.all().filter(status='0').order_by('-updated')
    # template_name = "blog/blogs.html"
    # context_object_name = "blogs"
    # #model = Entry
    # #queryset = Entry.objects.filter(author=self.request.user)
    # def get_context_data(self, **kwargs):
    #     # Call the base implementation first to get a context
    #     context = super(BlogsView, self).get_context_data(**kwargs)
    #     logging.info(context)
    #     # Add in the publisher
    #     #context['blogs'] = Entry.objects.filter(author=self.request.user)
    #     return context
class EntryDetailView(DetailView):
    context_object_name = "entry"
    template_name = "blog/entry.html"
    queryset = Entry.objects.all()
    def get_object(self):
        # Call the superclass
        object = super(EntryDetailView, self).get_object()
        # # Record the last accessed date
        # object.last_accessed = datetime.datetime.now()
        # object.save()
        # Return the object
        return object
    def get_context_data(self, **kwargs):
        context = super(EntryDetailView, self).get_context_data(**kwargs)
        context['relationship'] = Relationship.objects.filter(entry=self.get_object())
        return context
        
@login_required    
def add(request):
    if request.method == 'POST':
        form = EntryForm(data=request.POST)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.author = request.user
            obj.published = datetime.datetime.now()
            obj.text_html = markdown.markdown(obj.text, ['extra','codehilite','toc','nl2br'])
            obj.save()
            tagstr = form.cleaned_data['tags']
            tags = tagstr.split(',')
            for tag in tags:
                tag = tag.strip()
                if tag:
                    slug = tag.replace(' ','-').lower()
                    tagobject = Tag.objects.get_or_create(name=tag,slug=slug)
                    r = Relationship.objects.get_or_create(entry=obj,tag=tagobject[0])
                    tagobject[0].count += 1
                    tagobject[0].save()

                
            # memcache.delete('threadswithtag')
            # memcache.delete('threads')
            return HttpResponseRedirect('/blog')
    else:
        form = EntryForm()
    return render_to_response('blog/add.html',{'form':form},context_instance=RequestContext(request))
    
@login_required    
def edit(request,key):
    entry = get_object_or_404(Entry,pk=key)
    relationship = Relationship.objects.filter(entry=entry)
    if entry.author!=request.user:
        return HttpResponseRedirect('/blog')
    if request.method == 'POST' and entry:
        form = EntryForm(data=request.POST or None, instance=entry)
        if form.is_valid():
            obj = form.save(commit=False)
            #obj.author = request.user
            obj.published = obj.created
            obj.text_html = markdown.markdown(obj.text, ['extra','codehilite','toc','nl2br'])
            obj.save()
            
            tagstr = form.cleaned_data['tags']
            tags = tagstr.split(',')
            
            del_tag_dict = {}
            for r in relationship:
                slug = 'slug' + r.tag.slug			
                del_tag_dict[slug] = r.tag.name
    		
            add_tag_dict = {}
            for tag in tags:
                tag = tag.strip()
                if ''!=tag:
                    slug = tag.replace(' ','-').lower()
                    slug = 'slug' + slug
                    if del_tag_dict.has_key(slug):
                        del_tag_dict.pop(slug)
                    else:
                        add_tag_dict[slug] = tag
            add_tag_arr = add_tag_dict.values()
            del_tag_arr = del_tag_dict.values()
            
            for tag in add_tag_arr:
                slug = tag.replace(' ','-').lower()
                tagobject = Tag.objects.get_or_create(name=tag,slug=slug)
                r = Relationship.objects.get_or_create(entry=obj,tag=tagobject[0])
                tagobject[0].count += 1
                tagobject[0].save()
                
            for tag in del_tag_arr:
                slug = tag.replace(' ','-').lower()
                tagobject = Tag.objects.get(name=tag,slug=slug)
                r = Relationship.objects.get(entry=obj,tag=tagobject)
                r.delete()
            
            # tagstr = form.cleaned_data['tags']
            # tags = tagstr.split(',')
            # for tag in tags:
            #     tag = tag.strip()
            #     if tag:
            #         slug = tag.replace(' ','-').lower()
            #         tagobject = Tag.objects.get_or_create(name=tag,slug=slug)
            #         r = Relationship.objects.get_or_create(entry=obj,tag=tagobject[0])
            #         tagobject[0].count += 1
            #         tagobject[0].save()
            # memcache.delete('threadswithtag')
            # memcache.delete('threads')
            return HttpResponseRedirect('/blog/entry/'+str(obj.key))
    else:
        relation = ''
        for r in relationship:
            relation += r.tag.name
            relation += ','
        form = EntryForm(instance=entry,initial ={'tags':relation[:-1]})
    return render_to_response('blog/add.html',{'form':form},context_instance=RequestContext(request))