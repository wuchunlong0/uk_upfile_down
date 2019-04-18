# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from . import resource

urlpatterns = [
    url(r'^test/', resource.test, name="test"),
    url(r'^uploadfile/', resource.uploadfile, name="uploadfile"), #   
    url(r'^downloadresourc/', resource.downloadresourc, name="downloadresourc"),
    url(r'^showdetails/', resource.showdetails, name="showdetails"), 
    url(r'^Commentresource/', resource.Commentresource, name="Commentresource"),
    url(r'^downFile/', resource.downFile, name="downFile"),       
]