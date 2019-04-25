# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login 
from django.contrib.auth import login as auth_login #当函数名是login，必须用auth_login

#  http://localhost:8000/apis/registerapi/ 
def registerapi(request):
    if request.method != 'POST':
        mylist = list(User.objects.values())
        return  JsonResponse(mylist,safe=False)      
    name = request.POST['name']
    isname = User.objects.filter(username = name)
    if isname:  #判断name是否有相同的记录
        msgdict = {'msg': name + ' Username is already in name.'}
        return JsonResponse(msgdict)      
    password = request.POST['password']
    email = request.POST['email']
    user = User.objects.create_user(name, email, password)
    user.is_staff = True
    user.is_superuser = False
    user.save()      
    auth_login(request, user) 
    return  JsonResponse({})

# http://localhost:8000/apis/loginapi/  
def loginapi(request):   
    if request.method != 'POST':
        mylist = list(User.objects.values())
        return  JsonResponse(mylist,safe=False)      
    name = request.POST['name']
    password = request.POST['password']
    user = authenticate(username=name, password=password) 
    if user:
        auth_login(request, user)#django登录
        return  JsonResponse({})      
    msgdict = {'msg':'user authenticate err!'}
    return JsonResponse(msgdict) 