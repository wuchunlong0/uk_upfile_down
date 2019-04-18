# -*- coding: utf-8 -*-
'''
应用测试在：http://localhost:8888/mytest/downLoadFiles/
2019.01.30
'''
from django.http.response import HttpResponseRedirect, HttpResponse,\
    StreamingHttpResponse
import os,datetime

#下载函数。 filename--待下载的源文件  downfilename--下载的文件名 
def downLoadFile(filename): 
    downfilename ='%s%s' %(datetime.datetime.now().strftime('%H_%M_%S'),\
                               os.path.splitext(filename)[1] ) 
    def file_iterator(file_name, chunk_size=512):
        with open(file_name, 'rb') as f:   #python3   'rb'读二进制文件
            while True:
                c = f.read(chunk_size)
                if c:
                    yield c
                else:
                    break
    response = StreamingHttpResponse(file_iterator(filename))
    response['Content-Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename="{0}"'.format(downfilename)
    return response