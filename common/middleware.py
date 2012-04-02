#!/usr/bin/env python
# encoding: utf-8
"""
middleware.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django.conf import settings
import re
import logging
class MobileDetectMiddleware(object):
    def process_request(self, request):
        #logging.info('MobileDetectMiddleware')
        #settings.TEMPLATE_DIRS =TEMPLATE_DIRS = ('templates/mobile',)
        user_agent = request.META['HTTP_USER_AGENT']
        result = {}
        result['ua'] = user_agent
        if (re.search('iPod|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile', user_agent)):
            result['mobile'] = True
            settings.TEMPLATE_DIRS =TEMPLATE_DIRS = ('templates/mobile',)
        else:
            result['mobile'] = False
        request.mobile = True
        pass