#!/usr/bin/env python
# encoding: utf-8
"""
filter.py

Created by Darcy Liu on 2012-03-03.
Copyright (c) 2012 Close To U. All rights reserved.
"""

from django import template
import urllib, hashlib

import re
from django.utils.safestring import SafeData, mark_safe
from django.utils.encoding import force_unicode

register = template.Library()
# Configuration for urlize() function.
LEADING_PUNCTUATION  = ['(', '<', '&lt;']
TRAILING_PUNCTUATION = ['.', ',', ')', '>', '\n', '&gt;']

unencoded_ampersands_re = re.compile(r'&(?!(\w+|#\d+);)')
word_split_re = re.compile(r'(\s+)')
punctuation_re = re.compile('^(?P<lead>(?:%s)*)(?P<middle>.*?)(?P<trail>(?:%s)*)$' % \
    ('|'.join([re.escape(x) for x in LEADING_PUNCTUATION]),
    '|'.join([re.escape(x) for x in TRAILING_PUNCTUATION])))
def escape(html):
	"""
	Returns the given HTML with ampersands, quotes and angle brackets encoded.
	"""
	return mark_safe(force_unicode(html).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#39;'))
# escape = allow_lazy(escape, unicode)
        
class GravatarUrlNode(template.Node):
    def __init__(self, email):
        self.email = template.Variable(email)

    def render(self, context):
        try:
            email = self.email.resolve(context)
        except template.VariableDoesNotExist:
            return ''

        default = "http://example.com/static/images/defaultavatar.jpg"
        size = 48

        gravatar_url = "http://www.gravatar.com/avatar/" + hashlib.md5(email.lower()).hexdigest() + "?"
        #gravatar_url += urllib.urlencode({'d':default, 's':str(size)})
        gravatar_url += urllib.urlencode({'s':str(size)})

        return gravatar_url

@register.tag
def gravatar_url(parser, token):
    try:
        tag_name, email = token.split_contents()

    except ValueError:
        raise template.TemplateSyntaxError, "%r tag requires a single argument" % token.contents.split()[0]

    return GravatarUrlNode(email)

@register.filter(name='gravatar')
def gravatar(email,size = 48):
    gravatar_url = "http://www.gravatar.com/avatar/" + hashlib.md5(email.lower()).hexdigest() + "?"
    gravatar_url += urllib.urlencode({'s':str(size)})
    return gravatar_url
    
@register.filter(name='limit')    
def limit(value, arg):
    """
    Returns a slice of the list.

    Uses the same syntax as Python's list slicing; see
    http://diveintopython.org/native_data_types/lists.html#odbchelper.list.slice
    for an introduction.
    """
    try:
        bits = []
        for x in arg.split(u':'):
            if len(x) == 0:
                bits.append(None)
            else:
                bits.append(int(x))
        return value[slice(*bits)]

    except (ValueError, TypeError):
        return value # Fail silently.
limit.is_safe = True

@register.filter(name='imgize')
def imgize(text):
	# trim_url = lambda x, limit=trim_url_limit: limit is not None and (len(x) > limit and ('%s...' % x[:max(0, limit - 3)])) or x
	# safe_input = isinstance(text, SafeData)
	words = word_split_re.split(force_unicode(text))
	for i, word in enumerate(words):
		imgs = re.findall('(http://.*\.jpg|http://.*\.png|http://.*\.jpeg|http://.*\.gif)\s?', word)
		if (len(imgs) > 0):
			for img in imgs:
				img_id = re.findall('(http://.*\.jpg|http://.*\.png|http://.*\.jpeg|http://.*\.gif)', img)
				word = word.replace('' + img_id[0], '<a href="' + img_id[0] + '" target="_blank" class="imgize-url"><img src="' + img_id[0] + '" class="imgize" border="0" /></a>')
				words[i] = mark_safe(word)
		else:
			words[i] = escape(word)
	return mark_safe(u''.join(words))
imgize.is_safe = True