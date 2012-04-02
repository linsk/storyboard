#!/usr/bin/env python
# encoding: utf-8
"""
loaders.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.template.loaders import app_directories
import logging

class Loader(app_directories.Loader):
    is_usable = True
    def load_template(self, template_name, template_dirs=None):
        # logging.info('load_template')
        # logging.info(template_name)
        # logging.info(template_dirs)
        source, origin = self.load_template_source(template_name, template_dirs)
        template = Template(source)
        return template, origin
_loader = Loader()
def load_template_source(template_name, template_dirs=None):
    # For backwards compatibility
    return _loader.load_template_source(template_name, template_dirs)
load_template_source.is_usable = True