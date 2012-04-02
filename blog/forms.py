#!/usr/bin/env python
# encoding: utf-8
"""
forms.py

Created by Darcy Liu on 2012-03-09.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.forms import ModelForm
from django import forms
from django.utils.translation import ugettext_lazy as _
from django.forms.extras.widgets import SelectDateWidget
from models import *
import datetime

class EntryForm(ModelForm):
    #years_to_display = range(datetime.datetime.now().year-100,datetime.datetime.now().year+1)
    text = forms.CharField(widget=forms.Textarea(attrs={'class':'input-xxlarge','rows':10,'cols':''}))
    tags = forms.CharField(required=False,widget=forms.TextInput(attrs={'class':'input-xxlarge'}),help_text='split by ,')
    Format_Choices = (
            ('2', 'markdown'),
        )
    format = forms.ChoiceField(choices=Format_Choices)
    #published = forms.DateField(initial=datetime.date.today)
    #published = forms.DateField(widget=SelectDateWidget(years=years_to_display))
    #published = forms.DateTimeField(required=False,widget=forms.DateInput(attrs={'class': 'vDateField'}),help_text="Format: YYYY-MM-DD")
    # date = forms.DateField(widget=forms.TextInput(attrs={'class':'vDateField'}))
    # time = forms.TimeField(widget=forms.TextInput(attrs={'class':'vTimeField'}))
    # published = forms.SplitDateTimeField(required=False,)
    class Meta:
        model = Entry
        fields = ['title','text','format','status']