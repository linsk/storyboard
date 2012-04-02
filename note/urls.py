#!/usr/bin/env python
# encoding: utf-8
"""
urls.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.conf.urls.defaults import *
urlpatterns = patterns('note.views',
            (r'^$','index'),
            (r'^add$','add'),
            (r'^(?P<key>\d+)$','view'),
            (r'^(?P<key>\d+)/edit$','edit'),
            (r'^(?P<key>\d+)/delete$','delete'),
        )