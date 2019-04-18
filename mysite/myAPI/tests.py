# -*- coding: utf-8 -*-
from django.test import TestCase
from django.contrib.auth.models import User
from blog.models import Blogs
from .modelAPI import get_model_values,get_model_id   
import random
import datetime
# 工程目录(./start.sh目录)下运行：$ python mysite/manage.py test mysite 
class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(username='admin',password='1234qazx')
        User.objects.create(username='test')
        users = User.objects.filter(username = 'test')
        Blogs.objects.create(author=list(users)[0],subject='subject',summary='summary',content='content',created_at ='2018')
    def test_get_model_id(self):
        self.assertEqual(get_model_id(User,'username','test'),1)
        blog_list = list(Blogs.objects.values())        
        blog_list_get = list(get_model_values(blog_list,[{'author':User}]))       
        blog_dict = blog_list[0]
        blog_dict.update({'author':'test'})
        self.assertEqual(blog_dict,blog_list_get[0])