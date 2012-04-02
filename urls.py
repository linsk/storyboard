#!/usr/bin/env python
# encoding: utf-8
"""
urls.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.conf.urls.defaults import *
import settings
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()
from blog.views import AboutView

urlpatterns = patterns('',
    # Example:
    #(r'^storyboard/', include('storyboard.foo.urls')),
    (r'^$', 'home.views.index'),
    (r'^auth/', include('account.urls')),
    (r'^settings$', 'account.views.settings'),
    (r'^member/(\w+)', 'account.views.member'),
    (r'^settings/', include('account.urls')),
    #(r'^about$', 'home.views.about'),
    (r'^about$', AboutView.as_view()),
    #(r'^board/', include('board.urls')),
    (r'^r/', include('board.urls')),
    (r'^note/', include('note.urls')),
    (r'^blog/', include('blog.urls')),
    # (r'^message/', include('message.urls')),
    #(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root':settings.MEDIA_ROOT}),
    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    #(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
)