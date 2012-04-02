#!/usr/bin/env python
# encoding: utf-8
"""
forms.py

Created by Darcy Liu on 2012-04-02.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.forms import ModelForm
from django import forms
from django.utils.translation import ugettext_lazy as _

from models import *

class UploadForm(forms.Form):
    images = forms.CharField(required=False,widget=forms.FileInput(attrs={'class':'input-xxlarge'}))

