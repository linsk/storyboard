#!/usr/bin/env python
# encoding: utf-8
"""
context_processors.py

Created by Darcy on 2012-03-10.
Copyright (c) 2012 Darcy Liu. All rights reserved.
"""
import config

def site(request):
    site = config.options
    return {'site': site}

