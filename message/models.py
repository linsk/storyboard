#!/usr/bin/env python
# encoding: utf-8
"""
models.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.db import models
from django.contrib.auth.models import User

# class Message(models.Model):
#     key = models.AutoField(primary_key=True)
#     title = models.CharField(max_length=256,verbose_name='title')
#     text = models.TextField(blank=True, verbose_name='text')
#     sender = models.ForeignKey(User,verbose_name='sender')
#     receiver = models.ForeignKey(User,verbose_name='receiver')
#     created = models.DateTimeField(auto_now_add=True,verbose_name='created')
#     updated = models.DateTimeField(auto_now=True,verbose_name='updated')
#     def __unicode__(self):
#         result = self.title
#         return unicode(result)
