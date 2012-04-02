#!/usr/bin/env python
# encoding: utf-8
"""
admin.py

Created by Darcy Liu on 2012-03-01.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.contrib import admin
from models import *

admin.site.register(Tag)
admin.site.register(Thread)
admin.site.register(Favorite)