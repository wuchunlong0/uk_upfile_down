# -*- coding: utf-8 -*-
'''
使用举例：
from myAPI.strAPI import strAPI
if strAPI('in input').isStr('input'): True

Created on 2017-05-29
'''
from myAPI.fileAPI import GetTxtfile
  
class strAPI:
    def __init__(self, str):
        self.str = str
    
    def isStr(self,MyStr):
        return MyStr in self.str #(strAPI('hello world!').isStr('hello w'),True) 
    
    def isList(self,MyList):
        return self.str in MyList #(strAPI('hellow').isList(['hello','world']),False)    
    
    def getStr1Str2(self,s):#strAPI('helloworld!').getStr1Str2('o'),('hello', 'world!')
        pos = self.str.find(s)+1 #搜索第一个s字符串的位置
        if pos>0:
            return self.str[:pos],self.str[pos:]
        return '',''

import unittest            
class TeststrAPI(unittest.TestCase):
    def test_isStr1(self):
        s=strAPI('hello world!')
        self.assertEquals(s.isStr('hello w'),True)          
    def test_isStr2(self):
        self.assertEquals(strAPI('helloworld!').isStr(''),True) 
    def test_isStr3(self):
        self.assertEquals(strAPI('helloworld!').isStr(' '),False) 
                 

    def test_isList1(self):
        self.assertEquals(strAPI('hello').isList(['hello','world']),True)          
    def test_isList2(self):
        self.assertEquals(strAPI('hellow').isList(['hello','world']),False)          
    def test_isList3(self):
        self.assertEquals(strAPI('hell').isList(['hello','world']),False)          

    def test_getStr1Str2(self):
        self.assertEquals(strAPI('helloworld!').getStr1Str2('o'),('hello', 'world!'))          



# 文本文件名 txtfile；设置显示方式 setdispmode。
# python代码：setdispmode='python'。js代码：setdispmode='javascript'。
# html代码：setdispmode = 'markup'。css代码：setdispmode = 'css'。
# 黑色代码区用 code####start codeend标识，必须成对使用。‘>试’中间无空格。  
# 前台依赖：
# <!--在文件prism.css中 add设置教程代码区域字体大小 font-size:18px;   wuchunlong 2017.12.13-->
#     <link rel="stylesheet" href="/static/assets/plugins/prism/prism.css">
#     <link id="theme-style" rel="stylesheet" href="/static/assets/css/styles.css">
#     <script type="text/javascript" src="/static/assets/plugins/prism/prism.js"></script>
def txt_replace_html(txtfile,setdispmode):
    txt = GetTxtfile(txtfile)
    strlist = txt.split("code####")
    '''
    txt = 'abc\n code####start\n mycode1 codeend def code####start\n mycode2 codeend'
    strlist = ['abc\n','start\n mycode1 codeend def ','start\n mycode2 codeend']
    '''
    txt1, txt2, = '',''
    for s in strlist:
        if 'start' not in s: #处理 列表的第一个元素
            txt1 +=  s.replace('\n', '<br>')
        else: #处理 code####start  codeend区域；
            slist = s.split("codeend")
            slist[0] = slist[0].replace('start\n', '')
            #s = '<pre><code  class="language-javascript">' +slist[0] + '</code></pre>'
            s = '<pre><code  class="language-' + setdispmode + '">' +slist[0] + '</code></pre>'
            slist[1] = slist[1].replace('&ltcode&gt', '<pre><code>')
            slist[1] = slist[1].replace('&lt/code&gt', '</code></pre>') 
            s += slist[1].replace('\n', '<br>')
            txt2 += s
    return  txt1 + txt2


if __name__ == '__main__':
    unittest.main()