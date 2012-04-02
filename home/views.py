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

def index(request):
    return HttpResponseRedirect('/r')
    #return render_to_response('index.html',{},context_instance=RequestContext(request))
        
def about(request):
    return render_to_response('about.html',{},context_instance=RequestContext(request))