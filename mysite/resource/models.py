# -*- coding: utf-8 -*-
from __future__ import unicode_literals
#本框架 数据库名称不能用User，否则出错！
from django.contrib.auth.models import User
from django.db import models
import datetime

import sys
import json
#上传资源
class Upresources(models.Model):
    username = models.ForeignKey(User, on_delete=models.PROTECT,blank=True, null=True)  #使用时更名为usernamedb
    title= models.CharField(max_length = 120,blank=True, null=True)

    #通过django后台admin add db_download添加记录时用到。上传的资源文件  必须是./这个形式'  ./static/upload/upfile/'
    #上传的资源文件
    uploadfile = models.FileField(upload_to = './static/upload/upfile/',blank=True, null=True)#创建该目录,存放上传的文件
    #上传的效果图
    uploadimg = models.FileField(upload_to =  './static/upload/upimg/',blank=True, null=True)#创建该目录,存放上传的文件

    editor = models.CharField(max_length = 20000,blank=True, null=True)
    source= models.CharField(max_length = 8,blank=True, null=True)
    type= models.CharField(max_length = 8,blank=True, null=True)
    cid1= models.CharField(max_length = 20,blank=True, null=True)
    environment= models.CharField(max_length = 20,blank=True, null=True)
    label= models.CharField(max_length = 20,blank=True, null=True)
    downnum= models.CharField(max_length = 8,blank=True, null=True)
    browsernum= models.CharField(max_length = 8,blank=True, null=True)
    size= models.CharField(max_length = 10,blank=True, null=True)
    #格式 2019年4月19日 13:11
    date = models.DateTimeField(default=datetime.datetime.now, null=True, blank=True) #年月日 时分秒

    def __str__(self):
        return self.title

#评论资源
class Commentresources(models.Model):
    username = models.ForeignKey(User, on_delete=models.PROTECT,blank=True, null=True)
    title = models.CharField(max_length = 120,blank=True, null=True)
    editor = models.CharField(max_length = 200,blank=True, null=True) 
    date = models.DateTimeField(default=datetime.datetime.now, null=True, blank=True) #年月日 时分秒
    def __str__(self):
        return self.title
    