#!/usr/bin/env python
# encoding: utf-8
"""
urls.py

Created by Darcy Liu on 2012-04-02.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.conf.urls.defaults import *
urlpatterns = patterns('storage.views',
            (r'^$','photos'),
            (r'^upload$','upload'),
            (r'^(?P<key>\d+)$','view'),
            (r'^raw/(?P<key>\d+).*$','raw'),
            (r'^thumb/(?P<key>\d+).*$','thumbnail'),
            # (r'^(?P<key>\d+)/edit$','edit'),
            # (r'^(?P<key>\d+)/delete$','delete'),
        )

