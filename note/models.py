#!/usr/bin/env python
# encoding: utf-8
"""
models.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    key = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256,verbose_name='title')
    text = models.TextField(blank=True, verbose_name='text')
    text_html = models.TextField(blank=True, verbose_name='html')
    Format_Choices = (
            ('0', 'txt'),
            ('1', 'html'),
            ('2', 'markdown'),
            ('3', 'textile'),
        )
    format = models.CharField(verbose_name='format',max_length=1,default=0,choices=Format_Choices)
    release = models.IntegerField(default=0,verbose_name='release')
    author = models.ForeignKey(User,verbose_name='author')
    created = models.DateTimeField(auto_now_add=True,verbose_name='created')
    updated = models.DateTimeField(auto_now=True,verbose_name='updated')
    def __unicode__(self):
        result = self.title
        return unicode(result)
