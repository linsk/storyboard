#!/usr/bin/env python
# encoding: utf-8
"""
urls.py

Created by Darcy Liu on 2012-03-01.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.conf.urls.defaults import *
urlpatterns = patterns('board.views',
            (r'^$','index'),
            (r'^add/(?P<tag>\w+)$','add'),
            (r'^tag$','tags'),
            (r'^tag/(?P<tag>\w+)$','index'),
            (r'^(?P<key>\d+)$','view'),
            (r'^(?P<key>\d+)/favorite$','favorite'),
            (r'^favorites$','favorites'),
            (r'^update$','update'),
            #(r'^(?P<tag>\w+)$','tag'),
            # (r'^(?P<key>\d+)/edit$','edit'),
            # (r'^(?P<key>\d+)/delete$','delete'),
        )