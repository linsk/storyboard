#!/usr/bin/env python
# encoding: utf-8
"""
urls.py

Created by Darcy Liu on 2012-03-09.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.conf.urls.defaults import *
from blog.views import * 

urlpatterns = patterns('blog.views',
            (r'^$',EntryListView.as_view()),
            (r'^entry/(?P<pk>\d+)$', EntryDetailView.as_view()),
            (r'^mine$',MineEntryListView.as_view()),
            (r'^add$', 'add'),
            (r'^entry/(?P<key>\d+)/edit$','edit'),
            # (r'^(?P<key>\d+)$','view'),
            # (r'^(?P<key>\d+)/delete$','delete'),
        )