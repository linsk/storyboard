#!/usr/bin/env python
# encoding: utf-8
"""
models.py

Created by Darcy Liu on 2012-03-09.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.db import models
from django.contrib.auth.models import User

class Entry(models.Model):
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
    #tag = models.ForeignKey(Tag,verbose_name='tag')
    Status_Choices = (
            ('0', 'Publish'),
            ('1', 'Review'),
            ('2', 'Draft'),
            ('3', 'Trash'),
        )
    status = models.CharField(verbose_name='status',max_length=1,default=1,choices=Status_Choices)
    comment_status = models.BooleanField(default=True,verbose_name='comment status')
    ping_ststus = models.BooleanField(default=True,verbose_name='ping status')
    pv = models.IntegerField(default=0,verbose_name='pv')
    comment_count = models.IntegerField(default=0,verbose_name='comment count')
    ref = models.ForeignKey('self',blank=True, null=True)
    published = models.DateTimeField(verbose_name='published')
    created = models.DateTimeField(auto_now_add=True,verbose_name='created')
    updated = models.DateTimeField(auto_now=True,verbose_name='updated')
    def __unicode__(self):
        result = self.title
        return unicode(result)

class Tag(models.Model):
    name = models.CharField(max_length=256,verbose_name='name')
    slug = models.CharField(max_length=256,verbose_name='slug')
    count = models.IntegerField(default=0,verbose_name='count')
    created = models.DateTimeField(auto_now_add=True,verbose_name='created')
    updated = models.DateTimeField(auto_now=True,verbose_name='updated')
    def __unicode__(self):
        result = self.name
        return unicode(result)

class Relationship(models.Model):
    entry = models.ForeignKey(Entry,verbose_name='entry')
    tag = models.ForeignKey(Tag,verbose_name='tag')
    order = models.IntegerField(default=0,verbose_name='order')
    created = models.DateTimeField(auto_now_add=True,verbose_name='created')
    updated = models.DateTimeField(auto_now=True,verbose_name='updated')
    def __unicode__(self):
        result = self.entry.title + ' : ' + self.tag.name
        return unicode(result)