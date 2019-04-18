# -*- coding: utf-8 -*-
# 1、新建目录下一定要有__init__.py文件，否则不能被其它文件引用、不能沿路径读写文件。from ... 。
# 2、urls.py中,设置第一级路由名mytest。 在.../mysite/mysite/urls.py中  url(r'^mytest/', include('account.mytest.urls')),
# 3、admin.py中,设置数据库显示。在.../mysite/account/admin.py中 @admin.register(Testusername)
# 4、templates中,增加模板文件目录/mytest
from __future__ import unicode_literals
import datetime
import os
import json
from django.shortcuts import render
from django.http.response import HttpResponseRedirect,HttpResponse,StreamingHttpResponse
from .models import Upresources,Commentresources
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from myAPI.pageAPI import Page ,_get_model_by_page
from myAPI.convertAPI import sizeConvert
from myAPI.myFile import MyFile,WriteFile,searchTxt,GetTxtfile,toDict
from myAPI.fileAPI import GetfileLineTxt
from myAPI.download import downLoadFile
from django.contrib.auth.models import User

# http://localhost:8000/resource/test/
def test(request):
    print('===='+os.getcwd()) #当前目录/Users/wuchunlong/local/wcl6005/Project-Account-Online/mysite
    return HttpResponse('ok') 
#Admin用户，才能上传资源写入数据库 http://localhost:8000/resource/uploadfile/
# 前台验证：先判断资源upfile、图像upImg二个文件文件大小是否超过阀值，再判断第二个文件扩展名是否合法。
# 后台验证：判断title、uploadfile两个字段是否有相同的记录。
#注意：图像数据库中保存的文件名与保存文件的文件名，路径有区别。
@login_required
def uploadfile(request):
    PATH = os.getcwd()
    UP_PATH = '/static_common/upload/'   
    filepath = PATH + UP_PATH +'upfile/'#设置保存资源文件路径
    imgpath =  PATH + UP_PATH +'upimg/'#设置保存图像文件路径        
    page_size = '10' #设置每页显示数
    groups = request.user.groups.values_list('name',flat=True)
    if not (request.user.is_superuser or 'Operator' in groups):
        return HttpResponseRedirect('/login/')        
    if request.method == 'POST':
        title = request.POST['title']
        istitle = Upresources.objects.filter(title = title)
        if istitle:  #判断title是否有相同的记录
            messages.info(request, 'Title is already in use.')
            return HttpResponseRedirect('/resource/uploadfile/')        
        Myfile =request.FILES.get("upfile", None)    # 获取上传的文件，如果没有文件，则默认为None  
        if not Myfile:
            messages.info(request, 'no Myfile for upload!')
            return HttpResponseRedirect('/resource/uploadfile/')
        uploadfile = filepath + Myfile.name
        isuploadfile = Upresources.objects.filter(uploadfile = uploadfile)         
        if isuploadfile:  #判断uploadfile是否有相同的记录
            messages.info(request, 'uploadfile is already in use.')
            return HttpResponseRedirect('/resource/uploadfile/')        

        destination = open(os.path.join(filepath,Myfile.name),'wb+')  # 打开特定的文件进行二进制的写操作  
        for chunk in Myfile.chunks():  # 分块写入文件  
            destination.write(chunk)  
        destination.close() 

        MyImg =request.FILES.get("upImg", None)    # 获取上传的文件，如果没有文件，则默认为None  
        if not MyImg:
            messages.info(request, 'no MyImg for upload!')
            return HttpResponseRedirect('/resource/uploadfile/')  
              
        destination = open(os.path.join(imgpath,MyImg.name),'wb+')  # 打开特定的文件进行二进制的写操作  
        for chunk in MyImg.chunks():  # 分块写入文件  
            destination.write(chunk)  
        destination.close() 
        
        # 写入数据库
        upresources=Upresources(
                uploadfile = uploadfile, # filepath + Myfile.name,#数据库保存包含路径的文件名     
                uploadimg = '/static/upload/upimg/' + MyImg.name,#数据库保存包含路径的文件名     
                username = request.user, #登录用户,
                title = title,
                editor = request.POST['editor'],
                source= request.POST['source'],
                type= request.POST['type'],
                cid1= request.POST['cid1'],
                environment= request.POST['environment'],
                label= request.POST['tag'],
                downnum= '0',
                browsernum= '0',
                size= sizeConvert(int(request.POST['upfilesize'])), #调用转换函数,获得B KB MB GB TB,
                date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
                #= datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")[0:-3]
            )
        upresources.save()        
        upresourceLD = [toDict(u) for u in Upresources.objects.all()]
        upresources,page = _get_model_by_page(request,upresourceLD,page_size) #每页显示page_size       
        return  render(request, 'resource/download.html', context=locals()) 
    return  render(request, 'resource/uploadfile.html', context=locals()) 

#分词搜索数据库Upresources的title标题字段，以列表字典形式获得记录 2017.6.3
def searchUpresourcesTitle(q):
    myList = []
    qlists = list(jieba.cut(q, cut_all = True)) #q中文分词
    for qs in qlists:
        dataDB = Upresources.objects.filter(title=qs)
        if dataDB: myList += [toDict(u) for u in dataDB] #获得列表字典形式数据库记录
    return listdictSet(myList) #列表字典去掉重复元素（记录）    


#显示资源 http://localhost:8000/resource/downloadresourc/
def downloadresourc(request):
    page_size = '10' #设置每页显示数
    q = request.GET.get('q','')   
    upresources,page = _get_model_by_page(request,Upresources,page_size)\
    if q == '' else  _get_model_by_page(request,searchUpresourcesTitle(q), page_size)
    login = '/resource/downloadresourc/'
    placeholder = u"搜索Upresource_标题title"
    return  render(request, 'resource/download.html', context=locals()) 

#显示资源、详情数据库   http://localhost:8000/resource/showdetails/
def showdetails(request):
    page_size = '10' #设置每页显示数
    title = request.GET.get('title','') #由标题获得记录
    if title != '':
        browsernum=Upresources.objects.get(title = str(title)).browsernum      
        browsernum = int(browsernum) + 1
        Upresources.objects.filter(title = title).update(browsernum = browsernum)       
        upresources = [toDict(u) for u in Upresources.objects.filter(title = title)]       
        myListDict = [toDict(u) for u in Commentresources.objects.all()]
        #print myListDict
        comments,page = _get_model_by_page(request,myListDict,page_size) #每页显示page_size
    return  render(request, 'resource/detail.html', context=locals()) 


#评论资源写入数据库   http://localhost:8000/resource/Commentresource/ 
def Commentresource(request):
    if request.method == 'POST':
        title = request.POST['title'] 
        commentresources = Commentresources(
            username = request.user, #登录用户
            title = title,
            editor = request.POST['editor'], 
            date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
        commentresources.save() 
        return HttpResponseRedirect('/resource/showdetails/?title=' + title)
    return  render(request, 'resource/detail.html', context=locals()) 

#下载资源 http://localhost:8000/resource/downFile/
def downFile(request):
    uploadfile = request.GET.get('uploadfile','')
    print(uploadfile)   
    if uploadfile != '':
        downLoad = downLoadFile(uploadfile)
        downnum=Upresources.objects.get(uploadfile = uploadfile).downnum #必须确保uploadfile字段 不重名！     
        downnum = int(downnum) + 1
        Upresources.objects.filter(uploadfile = uploadfile).update(downnum = downnum)      
        return downLoad        
    return HttpResponseRedirect('/resource/downloadresourc/')
