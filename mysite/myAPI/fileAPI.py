# -*- coding: utf-8 -*-
import os
import xlrd
#from myAPI.makeAPI import gtry  #装饰器 捕获打开文件异常
# xls表转换成列表 [[第一行元素],[第二行元素],...] 工程还未用
def XlsxToList(filename_xls):
    try:
        table = xlrd.open_workbook(filename_xls)#创建一个book class，打开excel文件
        sh = table.sheet_by_index(0) #获取一个sheet对象
        for line in range(0,sh.nrows):#0-含第一行。nrows = table.nrows #行数 ncols = table.ncols #列数 print sh.row_values(rownum)
            row = sh.row_values(line)
            yield [r for r in row]
    except Exception as ex:
        print('Error execute: {}'.format(ex))
        yield []


# 获取文件路径、文件名、短文件名、后缀名  工程还未用
def get_path_name_sname_ext(filename):
    filepath,tempfilename = os.path.split(filename); #获取文件路径、文件名
    shortname,extension = os.path.splitext(tempfilename);# 获取短文件名、后缀名
    return filepath,tempfilename,shortname,extension

#提取文本文件中的特殊(特殊字符keep)行。闭包应用。工程还未用
def make_filter(keep): 
    def the_filter(filename): 
        lines = readtxt_to_list(filename) 
        filter_doc = [i for i in lines if keep in i] 
        return filter_doc 
    return the_filter


# 功能：适用于创建小文本文件，应用于单元测试
#@gtry
def writetxt(filename,txt): 
    with open(filename,'w+') as f:
        f.write(txt)
        return True

           
# 当前目录下，创建测试文件       
def create_txt(dir):
    dir +='/testMyFile/'
    if not writetxt(dir + "test.txt","hello world!\n \n \n   \n open file!\n hello wu chun long! \n"):
        print('Create Txt Err! : "{}"'.format(dir))
        return ''
    
# 功能：读文本文件（抛弃空行），返回列表
#@gtry
def readtxt_to_list(filename):
    try:
        with open(filename,'r') as f:
            lines = f.readlines()
            return [l  for l in lines if l.strip()] #抛弃空行 
        return ['']
    except Exception as ex:
        return ['']
        
# 功能：读文本文件（抛弃空行），返回字符串
def readtxt_to_str(filename):
    return ''.join(readtxt_to_list(filename))

GetTxtfile =readtxt_to_str
# 功能：由文件名获得文本文件的行数、文本
def GetfileLineTxt(filename):
    return len(readtxt_to_list(filename)),readtxt_to_str(filename)

# 迭代 读大文件 应用：accountTest/views.py   保存为Excel函数def makexlsx(request) 调用此函数
def file_iterator(file_name, chunk_size=512):
    try:
        with open(file_name, 'rb') as f:   #python3   'rb'读二进制文件
            while True:
                c = f.read(chunk_size)
                if c: yield c                   
                else: break #return  okokok   
    except Exception as ex:
        yield ''       

import sys
import unittest
print(sys.version)    # 获得python版本            
class TestfileAPI(unittest.TestCase):    
    dir = os.getcwd()
    if 'myAPI' in dir:
        create_txt(dir)
        
    def test_XlsxToList(self):
        self.assertEquals(list(XlsxToList("testMyFile/xfile.xls")),[[1.0, u'name', u'password'], [2.0, u'admin', u'admin@1234'], [3.0, u'wcl6005', u'wcl6005@1234'], [4.0, u'wj', u'wj@1234']])
        
    def test_get_path_name_sname_ext1(self):
        self.assertEquals(get_path_name_sname_ext('text.txt'),('','text.txt','text','.txt'))

    def test_get_path_name_sname_ext2(self):
        self.assertEquals(get_path_name_sname_ext('data/text.txt'),('data','text.txt','text','.txt'))
        
    def test_make_filter(self):
        filter = make_filter("hello") #提取文件中 "hello"行
        filter_result = filter("testMyFile/test.txt")
        self.assertEquals(filter_result,['hello world!\n', ' hello wu chun long! \n'])
    
    def test_readtxt_to_list(self):
        self.assertEquals(list(readtxt_to_list("testMyFile/test.txt")),['hello world!\n', ' open file!\n', ' hello wu chun long! \n'])
    def test_readtxt_to_list_err(self):
        self.assertEquals(readtxt_to_list("testMyFile/test_err.txt"),[''])


    def test_readtxt_to_str(self):
        self.assertEquals(readtxt_to_str("testMyFile/test.txt"), 'hello world!\n open file!\n hello wu chun long! \n')
        
    def test_GetfileLineTxt(self):
        self.assertEquals(GetfileLineTxt("testMyFile/test.txt"), (3, 'hello world!\n open file!\n hello wu chun long! \n'))
    
    def test_file_iterator(self):
        self.assertEquals(list(file_iterator('testMyFile/json1.json')),['{"index": "html", "mystr": "hello"}'])

    def test_file_iterator_err(self):
        self.assertEquals(list(file_iterator('testMyFile/json10.json')),[''])

if __name__ == '__main__':
    unittest.main() 