#!/usr/bin/env python
# encoding: utf-8
"""
forms.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.forms import ModelForm
from django import forms
from django.utils.translation import ugettext_lazy as _

from models import *
class NoteForm(ModelForm):
    text = forms.CharField(widget=forms.Textarea(attrs={'class':'input-xxlarge','rows':10,'cols':''}))
    class Meta:
        model = Note
        fields = ['text']
        #exclude = ('question_title')
    def __init__(self, author, *args, **kwargs):
        self.author = author
        super(NoteForm, self).__init__(*args, **kwargs)
    def clean_text(self):
        text = self.cleaned_data['text']
        if len(text) == 0:
            raise forms.ValidationError("Text is empty.")
        return text