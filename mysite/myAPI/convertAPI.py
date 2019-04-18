# -*- coding: utf-8 -*-
import types

# 真正的四舍五入函数
def myround(f,n):
    return round(f+1.0e-15,n) #精度16

# 需求
# 输入                                        输出
# b<0                                        'err'
# b>=0                                       'b B'
# b>=1024                  1024              '...KB'
# b>=1024*1024             1048576           '...MB'
# b>=1024*1024*1024        1073741824        '...GB'
# b>=1024*1024*1024*1024   1099511627776     '...TB'
#1KB = 1024B
 
# round( x [, n]) http://www.runoob.com/python/func-number-round.html
# b转换为B KB MB函数   round( x [, n]  )方法返回浮点数x的四舍五入值  2017.2.11
#应用测试在： tests.py
#字节转换为B、KB、MB、GB、TB。使用if...elif 语句 解决多分支问题。
# 老方法
# def sizeConvert(b):
#     if (type(b) is types.StringType): #是否string类型 
#         b = int(b) if b.isdigit() else -1 #所有字符都是数字    
#     if b < 0:
#         return 'err'
#     elif (b >= 0 and b < 1024):
#         return '%d%s' %(b,'B')
#     elif b >= 1024 and b < 1048576:
#         return '%.2f%s' %(round(b/1024.0,2),'KB') #保留2位小数,四舍五入
#     elif b >= 1048576 and b < 1073741824:
#         return '%.2f%s' %(round(b/1048576.0,2),'MB')
#     elif b >= 1073741824 and b < 1099511627776:
#         return '%.2f%s' %(round(b/1073741824.0,2),'GB')
#     else:
#         return '%.2f%s' %(round(b/1099511627776.0,2),'TB')

# 重构 2019.02.19
# def sizeConvert(b):
#     if (type(b) is types.StringType): #是否string类型 
#         b = int(b) if b.isdigit() else -1 #所有字符都是数字    
#     if b >= 1099511627776: return '%.2f%s' %(round(b/1099511627776.0,2),'TB') #保留2位小数,四舍五入
#     elif b >= 1073741824: return '%.2f%s' %(round(b/1073741824.0,2),'GB')
#     elif b >= 1048576: return '%.2f%s' %(round(b/1048576.0,2),'MB')
#     elif b >= 1024: return '%.2f%s' %(round(b/1024.0,2),'KB')
#     elif b >= 0: return '%d%s' %(b,'B')  
#     else: return '%s' %('err') 
        

def sizeConvert(b):
    if isinstance(b,str): #判断b是字符串  重构 2019.02.19
        b = int(b) if b.isdigit() else -1 #所有字符都是数字    
    if b >= 1099511627776: return '%.2f%s' %(round(b/1099511627776.0,2),'TB') #保留2位小数,四舍五入
    elif b >= 1073741824: return '%.2f%s' %(round(b/1073741824.0,2),'GB')
    elif b >= 1048576: return '%.2f%s' %(round(b/1048576.0,2),'MB')
    elif b >= 1024: return '%.2f%s' %(round(b/1024.0,2),'KB')
    elif b >= 0: return '%d%s' %(b,'B')  
    else: return '%s' %('err') 



# 字节转换为B、KB、MB、GB、TB。使用 and or 一行语句 解决多分支问题。
def size_Convert(b):
    if isinstance(b,str): #判断b是字符串  重构 2019.02.19
        b = int(b) if b.isdigit() else -1 #所有字符都是数字    
    return b >= 1099511627776 and '%.2f%s' %(myround(b/1099511627776.0,2),'TB')\
        or b >= 1073741824 and '%.2f%s' %(myround(b/1073741824.0,2),'GB')\
        or b >= 1048576 and '%.2f%s' %(myround(b/1048576.0,2),'MB')\
        or b >= 1024 and '%.2f%s' %(myround(b/1024.0,2),'KB')\
        or b >= 0 and '%d%s' %(b,'B') or '%s' %('err') 
      
import unittest            
class TestconvertAPI(unittest.TestCase):
    def test_sizeConvert_0(self):
        size = 0
        self.assertEquals(sizeConvert(size),'0B')
    def test_sizeConvert_1(self):
        size = '999'
        self.assertEquals(sizeConvert(size),'999B')  
    def test_sizeConvert_2(self):
        size = 999
        self.assertEquals(sizeConvert(size),'999B')  
    def test_sizeConvert_3(self):
        size = '1a'
        self.assertEquals(sizeConvert(size),'err')  
    def test_sizeConvert_4(self):
        size = -9
        self.assertEquals(sizeConvert(size),'err')  
    def test_sizeConvert_5(self):
        size = 1995
        self.assertEquals(sizeConvert(size),'1.95KB')  
    def test_sizeConvert_6(self):
        size = 1006000
        self.assertEquals(sizeConvert(size),'982.42KB')  
    def test_sizeConvert_7(self):
        size = 1006000000
        self.assertEquals(sizeConvert(size),'959.40MB')  
    def test_sizeConvert_8(self):
        size = 1006000000000
        self.assertEquals(sizeConvert(size),'936.91GB')  
 
    def test_sizeConvert_9(self):
        size = 5800000000000
        self.assertEquals(sizeConvert(size),'5.28TB')  

    def test_size_Convert_0(self):
        size = 0
        self.assertEquals(size_Convert(size),'0B')
    def test_size_Convert_1(self):
        size = '999'
        self.assertEquals(size_Convert(size),'999B')  
    def test_size_Convert_2(self):
        size = 999
        self.assertEquals(size_Convert(size),'999B')  
    def test_size_Convert_3(self):
        size = '1a'
        self.assertEquals(size_Convert(size),'err')  
    def test_size_Convert_4(self):
        size = -9
        self.assertEquals(size_Convert(size),'err')  
    def test_size_Convert_5(self):
        size = 1995
        self.assertEquals(size_Convert(size),'1.95KB')  
    def test_size_Convert_6(self):
        size = 1006000
        self.assertEquals(size_Convert(size),'982.42KB')  
    def test_size_Convert_7(self):
        size = 1006000000
        self.assertEquals(size_Convert(size),'959.40MB')  
    def test_size_Convert_8(self):
        size = 1006000000000
        self.assertEquals(size_Convert(size),'936.91GB')  
    def test_size_Convert_9(self):
        size = 5800000000000
        self.assertEquals(size_Convert(size),'5.28TB')  

    def test_round(self):
        self.assertEquals(round(2.355,2),2.35)  
    def test_myround(self):
        self.assertEquals(myround(2.355,2),2.36)  


if __name__ == '__main__':
    unittest.main()