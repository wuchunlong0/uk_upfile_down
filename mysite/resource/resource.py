# -*- coding: utf-8 -*-
# 1、新建目录下一定要有__init__.py文件，否则不能被其它文件引用、不能沿路径读写文件。from ... 。
# 2、urls.py中,设置第一级路由名mytest。 在.../mysite/mysite/urls.py中  url(r'^mytest/', include('account.mytest.urls')),
# 3、admin.py中,设置数据库显示。在.../mysite/account/admin.py中 @admin.register(Testusername)
# 4、templates中,增加模板文件目录/mytest
from __future__ import unicode_literals
import datetime
import os,shutil
import json
from django.shortcuts import render
from django.http.response import HttpResponseRedirect,HttpResponse,StreamingHttpResponse
from .models import Upresources,Commentresources
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from myAPI.pageAPI import Page ,_get_model_by_page
from myAPI.convertAPI import sizeConvert
from myAPI.myFile import MyFile,WriteFile,searchTxt,GetTxtfile 
from myAPI.fileAPI import GetfileLineTxt
from myAPI.download import downLoadFile
from django.contrib.auth.models import User
PAGE_NUM = '3' #设置每页显示数

# http://localhost:8000/resource/test/
def test(request):
    print('===='+os.getcwd()) #当前目录/Users/wuchunlong/local/wcl6005/Project-Account-Online/mysite
    return HttpResponse('ok') 

#保存上传文件
def save_upfile(filepath,mode):
    destination = open(os.path.join(filepath,mode.name),'wb+')  # 打开特定的文件进行二进制的写操作  
    for chunk in mode.chunks():  # 分块写入文件  
        destination.write(chunk)  
    destination.close() 

def save_upimg(filepath,mode,filename):
    destination = open(os.path.join(filepath,filename),'wb+')  # 打开特定的文件进行二进制的写操作  
    for chunk in mode.chunks():  # 分块写入文件  
        destination.write(chunk)  
    destination.close() 


#Admin用户，才能上传资源写入数据库 http://localhost:8000/resource/uploadfile/
# 前台验证：先判断资源upfile、图像upImg二个文件文件大小是否超过阀值，再判断第二个文件扩展名是否合法。
# 后台验证：判断title、uploadfile两个字段是否有相同的记录。
#注意：图像数据库中保存的文件名与保存文件的文件名，路径有区别。
@login_required
def uploadfile(request):
    os_dir = os.getcwd()   
    filepath = '%s/static_common/upload/upfile/' %(os_dir)#设置保存资源文件路径
    imgpath =  '%s/static_common/upload/upimg/' %(os_dir)#设置保存图像文件路径        

    groups = request.user.groups.values_list('name',flat=True)
    if not (request.user.is_superuser or 'Operator' in groups):
        return HttpResponseRedirect('/login/') 
           
    q = request.GET.get('q','') 
    if q != '': 
        return  HttpResponseRedirect('/resource/search/')
   
    if request.method == 'POST':       
        Myfile = request.FILES.get("upfile", None)    # 获取上传的文件，如果没有文件，则默认为None  
        if not Myfile:
            messages.info(request, '警告：没有获得上传文件!')
            return HttpResponseRedirect('/resource/uploadfile/')        
        MyImg = request.FILES.get("upImg", None)     
        if not MyImg:
            messages.info(request, '警告：没有获得上传图像!')
            return HttpResponseRedirect('/resource/uploadfile/')  
                
        title = request.POST['title']
        istitle = Upresources.objects.filter(title = title)
        if istitle:  #判断title是否有相同的记录
            messages.info(request, '警告：资源标题 - {} 重复! 请更换资源标题。'.format(title))
            return HttpResponseRedirect('/resource/uploadfile/')        
                
        uploadfile = filepath + Myfile.name
        isuploadfile = Upresources.objects.filter(uploadfile = uploadfile)         
        if isuploadfile:  #判断uploadfile是否有相同的记录
            messages.info(request, '警告：上传文件 - {} 文件已经上传!'.format(Myfile.name))
            return HttpResponseRedirect('/resource/uploadfile/')        
        
        title_imgname = '%s.jpg' %(title)
        # 保存上传文件
        save_upfile(filepath,Myfile) 
        save_upimg(imgpath,MyImg,title_imgname) 
        shutil.copy('%s%s' %(imgpath,title_imgname),'%s/static/upload/upimg' %(os_dir))             
        # 写入数据库
        u = Upresources(
            uploadfile = uploadfile, # filepath + Myfile.name,#数据库保存包含路径的文件名     
            uploadimg = '/static/upload/upimg/%s' %(title_imgname),#数据库保存包含路径的文件名     
            username = request.user, #登录用户,
            title = title,
            editor = request.POST['editor'],
            source = request.POST['source'],
            type = request.POST['type'],
            cid1 = request.POST['cid1'],
            environment = request.POST['environment'],
            label = request.POST['tag'],
            downnum = '0',
            browsernum = '0',
            size = sizeConvert(int(request.POST['upfilesize'])) #调用转换函数,获得B KB MB GB TB,                
        )
        u.save() 
                      
        upresources,page,num = _get_model_by_page(request,Upresources.objects.all(),PAGE_NUM) #每页显示page_size       
        return  render(request, 'resource/showupresource.html', context=locals()) 
    return  render(request, 'resource/uploadfile.html', context=locals()) 

#   http://localhost:8000/resource/search/
def search(request):
    model = Upresources
    title = request.GET.get('q','')
    type = request.GET.get('type','')
    date = request.GET.get('date','')
    browsernum = request.GET.get('browsernum','')
    downnum = request.GET.get('downnum','')
    
    fieldname = '全部资源'
    upresource_list = model.objects.all()
    if title:
        fieldname = '类型: %s'%title
        upresource_list = model.objects.filter(title__icontains = title)
    if type:
        fieldname = '类型: %s'%type                    
        upresource_list = model.objects.filter(type__icontains = type)
    if date:
        fieldname = '更新时间排序'
        upresource_list = model.objects.order_by('-date')
    if browsernum:
        fieldname = '查看次数排序'
        list=model.objects.extra(select={'num':'browsernum+0'})
        upresource_list=list.extra(order_by=["-num"]) 
    if downnum:
        fieldname = '按下载次数排序'
        list=model.objects.extra(select={'num':'downnum+0'})
        upresource_list=list.extra(order_by=["-num"]) 
    
    upresources,page,num = _get_model_by_page(request,upresource_list,PAGE_NUM)
    return  render(request, 'resource/showupresource.html', context=locals()) 

#显示上传资源 http://localhost:8000/resource/showupresource/
def showupresource(request): 
    fieldname = '全部资源'
    upresources,page,num = _get_model_by_page(request,Upresources.objects.all(),PAGE_NUM)
    return  render(request, 'resource/showupresource.html', context=locals()) 


#显示资源评论   http://localhost:8000/resource/showcomment/
def showcomment(request):
    title = request.GET.get('title','') #由标题获得记录
    if title != '':
        browsernum = Upresources.objects.get(title = str(title)).browsernum      
        browsernum = int(browsernum) + 1
        Upresources.objects.filter(title = title).update(browsernum = browsernum)        
        upresources =  Upresources.objects.filter(title = title)
        comment_list =  Commentresources.objects.filter(title = title)     
        comments,page,num = _get_model_by_page(request,comment_list,PAGE_NUM) #每页显示page_size
    return  render(request, 'resource/showcomment.html', context=locals()) 

#评论资源写入数据库   http://localhost:8000/resource/upcomment/ 
def upcomment(request):
    if request.method == 'POST':
        title = request.POST['title'] 
        commentresources = Commentresources(
            username = request.user, 
            title = title,
            editor = request.POST['editor']
        ) 
        commentresources.save() 
        return HttpResponseRedirect('/resource/showcomment/?title=%s' % (title))
    return  render(request, 'resource/showupresource.html', context=locals()) 

#下载资源 http://localhost:8000/resource/downFile/
def downFile(request):
    uploadfile = request.GET.get('uploadfile','')  
    if uploadfile != '':
        downLoad = downLoadFile(uploadfile)
        downnum = Upresources.objects.get(uploadfile = uploadfile).downnum #必须确保uploadfile字段 不重名！     
        downnum = int(downnum) + 1
        Upresources.objects.filter(uploadfile = uploadfile).update(downnum = downnum)      
        return downLoad        
    return HttpResponseRedirect('/resource/showupresource/')
