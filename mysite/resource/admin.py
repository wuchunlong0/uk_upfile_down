# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from . models import Upresources, Commentresources
 
@admin.register(Upresources)
class UpresourcesAdmin(admin.ModelAdmin):    
    list_display = ('id','username','title','uploadfile','date')
 
 
@admin.register(Commentresources)
class CommentresourcesAdmin(admin.ModelAdmin):    
    list_display = ('id','username','title','date')