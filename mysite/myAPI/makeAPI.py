# -*- coding: UTF-8 -*-
from django.http.response import HttpResponseRedirect, HttpResponse
import time,os
#装饰器,测试函数运行时间 测试：http://localhost:8888/test/dispimg/index  
#print('===='+os.getcwd()) #当前目录
def gettime(func):
    def wrapper(*args, **keyargs):
        starttime = time.clock()
        func(*args, **keyargs)
        endtime = time.clock()
        print('used time:', endtime - starttime)        
        if os.getcwd()!='/Users/wuchunlong/local/github/abbytraining/myAPI':
            return HttpResponse(endtime - starttime)
    return wrapper

# 装饰器 对象转换成列表 
class tolist(object):
    def __init__(self, func):
        self.func = func 
    def __call__(self,*ages,**agekeys):
        try:                        
            return list(self.func(*ages,**agekeys))
        except Exception as ex:
            print('Error execute: {}'.format(ex))
            return []


# 用函数实现装饰器,捕获文件异常    
def gettry(actual_do):
    def add_robust(*args, **keyargs):
        filename = args[0]
        try:
            with open(filename) as f:
                return actual_do(*args, **keyargs)
        except Exception as ex:
            print('Error execute: {}'.format(ex))
            return ''
        
    return add_robust

# 用类实现装饰器,捕获文件异常
class gtry(object):
    def __init__(self, func):
        self.func = func 
    def __call__(self, *args, **keyargs):
        name = args[0]
        try:            
            with open(name) as f:
                return self.func(*args, **keyargs)
        except Exception as ex:
            print('Error execute: {}'.format(ex))
            return False
    

#单元测试
import unittest
class TestFunc(unittest.TestCase):
    def test_gettime(self):
        @gettime   
        def foo():
            print('in foo()')
        self.assertEqual(foo()<1.0e-3,True)
    
    def test_tolist_mystr(self):
        @tolist
        def mystr():
            return 'hello'
        self.assertEqual(mystr(),['h', 'e', 'l', 'l', 'o'])
               
    def test_tolist_fib(self):
        @tolist
        def fib(n):
            prev, curr,x = 0, 1, 0
            while x < n:
                yield curr 
                prev,curr = curr,prev + curr
                x += 1    
        self.assertEqual(fib(10), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55])

    def test_gettry_rFile(self):
        @gettry
        def rFile(filename):
            f = open(filename, "r")
            print(len(f.readlines()))
            f.close()            
        #self.assertEqual(rFile('filename1.txt'),'')

    def test_gettry_readFile(self):
        @gettry
        def readFile(filename):
            f = open(filename, "r")
            l = len(f.readlines())
            f.close()
            return l           
        self.assertEqual(readFile('testMyFile/xfile.xls'),24)
    
    def test_gettry_readFileas(self):
        @gettry
        def readFileas(file_name, chunk_size=512):         
            with open(file_name) as f:
                while True:
                    c = f.read(chunk_size)
                    if c:
                        yield c
                    else:
                        break
        self.assertEqual(len(list(readFileas('testMyFile/xfile.xls'))),16)

    def test_gettry_readFileas_err(self):
        @gettry
        def readFileas_err(file_name, chunk_size=512):         
            with open(file_name) as f:
                while True:
                    c = f.read(chunk_size)
                    if c:
                        yield c
                    else:
                        break
        #self.assertEqual(len(list(readFileas_err('filename2.txt'))),0)

    def test_gtry_readFileas(self):
        @gtry
        def readFileas(file_name, chunk_size=512):         
            with open(file_name) as f:
                while True:
                    c = f.read(chunk_size)
                    if c:
                        yield c
                    else:
                        break
        self.assertEqual(len(list(readFileas('testMyFile/xfile.xls'))),16)

    def test_gtry_readFileas_err(self):
        @gtry
        def readFileas_err(file_name, chunk_size=512):         
            with open(file_name) as f:
                while True:
                    c = f.read(chunk_size)
                    if c:
                        yield c
                    else:
                        break
        #self.assertEqual(len(list(readFileas_err('filename3.txt'))),0)






if __name__ == '__main__':
    unittest.main()
    