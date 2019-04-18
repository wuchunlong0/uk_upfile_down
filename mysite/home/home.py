# -*- coding: utf-8 -*-
from django.contrib.auth import login as auth_login 
from django.contrib.auth import authenticate, login 
from django.shortcuts import render
from django.http.response import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from myAPI.checkcode import gcheckcode

def index(request):
    return  render(request, 'home/index.html' , context=locals()) 
    
#登录  http://localhost:9000/home/login/
def login(request):   
    href = '/' 
    return  render(request, 'home/login.html' , context=locals()) 

#注册  http://localhost:9000/home/register/
def register(request):
    g_checkcode = gcheckcode(request)#验证码送前台验证
    href = '/' #注册成功，重新定向
    path = 'home/register.html' #html路径
    return  render(request, path , context=locals()) 

