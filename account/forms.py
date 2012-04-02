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

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from models import *
class AccountForm(ModelForm):
    signature = forms.CharField(required=False,widget=forms.TextInput(attrs={'class':'input-xxlarge'}))
    #GENDER_CHOICES = ((u'1', 'Unknown'), (u'2', 'Yes'), (u'3', 'No'))
    #sex = forms.ChoiceField(widget=forms.Select(choices=GENDER_CHOICES))
    description = forms.CharField(required=False,widget=forms.Textarea(attrs={'class':'input-xxlarge','rows':10,'cols':''}))
    #custom_style = forms.CharField(required=False,widget=forms.Textarea(attrs={'class':'input-xxlarge','rows':10,'cols':''}))
    website = forms.CharField(required=False,widget=forms.TextInput(attrs={'class':'input-xxlarge'}))
    img = forms.CharField(required=False,widget=forms.FileInput(attrs={'class':'input-xxlarge'}))
    #img  = forms.FileField()
    class Meta:
        model = Account
        #fields = ['signature','description']
        exclude = ('user','pro','sex','credits','bonus','avatar','avatar_mime','use_custom_style','custom_style','release')

#see more https://code.djangoproject.com/browser/django/trunk/django/contrib/auth/forms.py#L10
class RegisterForm(UserCreationForm):
    """
    A form that creates a user, with no privileges, from the given username and
    password.
    """
    error_messages = {
        'duplicate_username': _("A user with that username already exists."),
        'duplicate_email': _("A user with that email already exists."),
        'password_mismatch': _("The two password fields didn't match."),
    }
    email = forms.EmailField(label = "Email")
    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2",)
        
    def clean_username(self):
        # Since User.username is unique, this check is redundant,
        # but it sets a nicer error message than the ORM. See #13147.
        username = self.cleaned_data["username"]
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(self.error_messages['duplicate_username'])
        
    def clean_email(self):
        # Since User.username is unique, this check is redundant,
        # but it sets a nicer error message than the ORM. See #13147.
        email = self.cleaned_data["email"]
        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError(self.error_messages['duplicate_email'])
    # def save(self, commit=True):
    #     user = super(UserCreationForm, self).save(commit=False)
    #     user.set_password(self.cleaned_data["password1"])
    #     user.email = self.cleaned_data["email"]
    #     if commit:
    #         user.save()
    #     return user