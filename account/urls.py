#!/usr/bin/env python
# encoding: utf-8
"""
urls.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.conf.urls.defaults import *
from django.contrib.auth import views as auth_views
urlpatterns = patterns('account.views',
            (r'^$','index'),
            (r'^signup$','signup'),
            (r'^signin$','signin'),
            (r'^signout$','signout'),
            (r'^logs$','logs'),
            (r'^avatar/(?P<username>\w+).png$','avatar'),
            (r'^custom_style$','custom_style'),
            (r'^password_change$', 'password_change'),
            (r'^password_change_done$', 'password_change_done'),
            (r'^password/change/$',auth_views.password_change),
            (r'^password/change/done/$',auth_views.password_change_done),
            (r'^password/$','index'),
        )