#!/usr/bin/env python
# encoding: utf-8
"""
forms.py

Created by Darcy Liu on 2012-03-01.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.forms import ModelForm
from django import forms
from django.utils.translation import ugettext_lazy as _

from models import *
class ThreadForm(ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'class':'input-xxlarge'}))
    text = forms.CharField(widget=forms.Textarea(attrs={'class':'input-xxlarge','rows':10,'cols':''}))
    class Meta:
        model = Thread
        fields = ['title','text']
        
class CommentForm(ModelForm):
    text = forms.CharField(widget=forms.Textarea(attrs={'class':'input-xxlarge','rows':10,'cols':''}))
    class Meta:
        model = Thread
        fields = ['text']