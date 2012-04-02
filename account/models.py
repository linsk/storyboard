#!/usr/bin/env python
# encoding: utf-8
"""
models.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

import os
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

def get_avatars_name(instance,filename):
    filename = 'upload/avatars/' + str(instance.user.id) + os.path.splitext(filename)[1]
    filepath = os.path.join(os.path.abspath('.'),settings.MEDIA_ROOT,filename)
    if os.path.isfile(filepath):
        os.remove(filepath)
    return filename
    
class Account(models.Model):
    user = models.ForeignKey(User,unique=True,verbose_name='user')
    signature = models.TextField(blank=True, verbose_name='signature')
    description = models.TextField(blank=True, verbose_name='description')
    credits = models.IntegerField(default=0,verbose_name='credits')
    bonus = models.IntegerField(default=0,verbose_name='bonus')
    website = models.CharField(max_length=64,blank=True,verbose_name='website')
    mobile = models.CharField(max_length=16,blank=True,verbose_name='mobile')
    location = models.CharField(max_length=64,blank=True,verbose_name='location')
    im = models.CharField(max_length=64,blank=True,verbose_name='im')
    # Sex_Choices = (
    #     ('0', 'F'),
    #     ('1', 'M'),
    #     ('2', 'Unknown'),
    # )
    # sex = models.CharField(verbose_name='sex',max_length=1,default=2,choices=Sex_Choices)
    twitter = models.CharField(max_length=32,blank=True,verbose_name='twitter')
    github = models.CharField(max_length=32,blank=True,verbose_name='github')
    sex = models.NullBooleanField(verbose_name='sex')
    #avatar_img = models.ImageField(upload_to=get_avatars_name, max_length=256, blank=True,verbose_name='avatar')
    avatar = models.CharField(max_length=256, blank=True,verbose_name='avatar')
    pro = models.BooleanField(default=False,verbose_name='pro')
    L10n_Choices = (
        ('0', 'en'),
    )
    l10n = models.CharField(max_length=2,blank=True,default=0,choices=L10n_Choices,verbose_name='l10n')
    use_custom_style = models.BooleanField(default=False,verbose_name='use css')
    custom_style = models.TextField(blank=True, verbose_name='css')
    #status = models.BooleanField(default=False,verbose_name='status')
    avatar_mime = models.CharField(max_length=32,blank=True,verbose_name='avatar_mime')
    release = models.IntegerField(default=0,verbose_name='release')
    created = models.DateTimeField(auto_now_add=True,verbose_name='created')
    updated = models.DateTimeField(auto_now=True,verbose_name='updated')
    def __unicode__(self):
        r = '%s %s' %(self.user.id,self.user.username)
        return unicode(r)

User.profile = property(lambda u: Account.objects.get_or_create(user=u)[0])