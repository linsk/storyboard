#!/usr/bin/env python
# encoding: utf-8
"""
views.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib import auth

from django.http import HttpResponse
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm

from models import *
from forms import *

@login_required
def index(request):
    query = Note.objects.all().order_by('-updated').filter(author=request.user)
    return render_to_response('note/notes.html',{'notes':query},context_instance=RequestContext(request))

@login_required
def add(request):
    if request.method == 'POST':
        form = NoteForm(author=request.user,data=request.POST)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.author = request.user
            obj.title = obj.text.split('\n')[0][0:60].strip()
            obj.save()
            return HttpResponseRedirect('/note')
    else:
        form = NoteForm(author=request.user)
    return render_to_response('note/add.html',{'form':form},context_instance=RequestContext(request))

@login_required
def view(request,key):
    note = Note.objects.get(key=key)
    if note.author!=request.user:
        return HttpResponseRedirect('/note')
    return render_to_response('note/view.html',{'note':note},context_instance=RequestContext(request))

@login_required
def edit(request,key):
    note = Note.objects.get(key=key)
    if note.author!=request.user:
        return HttpResponseRedirect('/note')
    if request.method == "POST":
        form = NoteForm(author=request.user,data=request.POST or None, instance=note)
        if form.is_valid():
            obj = form.save(commit=False)
            #obj.author = request.user
            obj.title = obj.text.split('\n')[0][0:60].strip()
            obj.save()
            return HttpResponseRedirect('/note/'+str(note.key))
    else:
        form = NoteForm(author=request.user,instance=note)
    return render_to_response('note/add.html',{'form':form},context_instance=RequestContext(request))

@login_required
def delete(request,key):
    if request.method == 'POST':
        note = Note.objects.get(key=key)
        if note.author == request.user:
            note.delete()
    return HttpResponseRedirect('/note')
