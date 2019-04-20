# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from . import resource

urlpatterns = [
    url(r'^test/', resource.test, name="test"),
    url(r'^uploadfile/', resource.uploadfile, name="uploadfile"), #   
    url(r'^showupresource/', resource.showupresource, name="showupresource"),
    
    url(r'^upcomment/', resource.upcomment, name="upcomment"),
    url(r'^showcomment/', resource.showcomment, name="showcomment"), 
    
    url(r'^search/', resource.search, name="search"),
    url(r'^downFile/', resource.downFile, name="downFile"),
           
]