# -*- coding: utf-8 -*-
# pageAPI.py  分页类
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
PAGE_NUM = 10 #每页显示数
def toInt(c):
    try:
        i = int(c)
    except Exception as _e:
        i = 1
    return i
# 使用该函数步骤：2018.03.21
# 一、拷入文件：static/home/css/btn.css     templates/home/djangopage.html
# 二、在视图文件中
# 1、引用： from myAPI.pageAPI import djangoPage,PAGE_NUM,toInt
# 2、方法：def show(request):  -->   def show(request, page):
# 3、在返回html前台以前加入下列两条语句，其中blogs数据库记录或列表。
#      blog_list, pageList, paginator, page = djangoPage(blogs,page,PAGE_NUM)  #调用分页函数
#      offset = PAGE_NUM * (page - 1)
# 4、在html前台文件中加入分布：<div style="padding-left:520px;"">{% include 'home/djangopage.html' %}  </div> <!--分页--> 
# 三、更改路由：r'^show/'      -->        r'^show/(?P<page>\d*)?$'
#适用django分页  1、contact_list数据库记录或列表；2、page当前页；3、设置每页显示数 num
# 综合应用实例：http://localhost:8000/accountTest/billing/
def djangoPage(contact_list,page,num):
    paginator = Paginator(contact_list, num) 
    page = toInt(page) 
    try:
        model_list = paginator.page(page)
    except PageNotAnInteger:
        model_list = paginator.page(1)
    except EmptyPage:
        model_list = paginator.page(paginator.num_pages)
         
    pageList = list(paginator.page_range)
    if page < (paginator.num_pages)-3:
        pageList[page+2:-1] = ['...']
    if page > 1+3:
        pageList[1:page-3] = ['...']        
    return model_list,pageList,paginator,page

# 综合应用实例：http://localhost:8000/test/Definition_page/
class Page(object):
    '''
    用object好处：输入参数的个数可变，可以是1-4个
    Page object for display pages.  2016.9.18
    >>> p1 = Page(100,23,5,4)
    >>> p1.page_count
    20
    >>> p1 = Page(100,23,3,3)
    >>> p1.page_count
    34
    >>> p1 = Page(99,23,3,3)
    >>> p1.page_count
    33
    >>> p1 = Page(100, 19)
    >>> p1.page_bit
    1
    >>> p1 = Page(100, 20)
    >>> p1.page_bit
    2
    >>> p1 = Page(100, 21)
    >>> p1.page_bit
    3
    >>> p1 = Page(100, 22, 4, 3)
    >>> p1.page_bit
    1
    >>> p1 = Page(100, 21, 4, 3)
    >>> p1.page_bit
    3
    >>> p1 = Page(100, 20, 4, 3)
    >>> p1.page_ctrl
    4
    >>> p1 = Page(100, 21, 4, 3)
    >>> p1.page_ctrl
    4
    >>> p1 = Page(100, 22, 4, 3)
    >>> p1.page_ctrl
    4
    >>> p1 = Page(100, 23, 4, 3)
    >>> p1.page_ctrl
    5
    >>> p1 = Page(100, 24, 4, 3)
    >>> p1.page_ctrl
    5
    >>> p1 = Page(100, 25, 4, 3)
    >>> p1.page_ctrl
    5
    
    >>> p1 = Page(100, 23, 4, 3)
    >>> p1.page_bit
    1
    >>> p1 = Page(100, 24, 4, 3)
    >>> p1.page_bit
    2
    >>> p1 = Page(100, 25, 4, 3)
    >>> p1.page_bit
    3
    
    >>> p1 = Page(100, 25, 4, 3)
    >>> p1.toDict()
    {'has_next': False, 'page_index': 25, 'page_count': 25, 'has_previous': True, 'item_count': 100}
    >>> p1 = Page(100, 25, 4, 3)
    >>> p1
    item_count: 100, page_count: 25, page_index: 25, page_size: 4, offset: 96, limit: 4
    '''
    # 项目总数item_count   page_index页索引   page_size每页显示数  pagenav分页按钮数
    def __init__(self, item_count, page_index=1, page_size=4, pagenav=3):

        self.item_count = item_count
        self.page_size = page_size
        self.page_index = page_index  #页索引
        self.page_count = item_count / page_size + (1 if item_count % page_size > 0 else 0)
        if (item_count == 0) or (self.page_count < 1)  or (page_index < 1) or (page_index > self.page_count):
            self.page_index = page_index
            self.page_size = page_size
            self.page_count = item_count / page_size + (1 if item_count % page_size > 0 else 0)
        
        self.offset = self.page_size * (page_index - 1) #偏移，即页开始位置
        self.limit = self.page_size #每页显示数

        if self.page_count <= 3:#总页数 <= 3
            self.page_bit = self.page_index
            self.page_ctrl = self.page_count
        else:#总页数>3   例如：page_count=19
 
            #总页数  page_count>3，处理最后3页前面页的。例如：pageMAX=19  [1--16]
            if self.page_index<(self.page_count-2): #   pageMAX>3    1=< pageInt <17
                self.page_ctrl = 4
                #获得位数page_bit
                self.page_bit=pagenav if (self.page_index % pagenav)==0 else self.page_index%pagenav
 
            #总页数  pageMAX>3， 处理最后3页。 例如：pageMAX=19  [17--19]
            else:      # 17%3=2            正常计算：pageInt=17  pagebit='2'
                self.page_ctrl = 5
                if self.page_index == (self.page_count-2):self.page_bit = 1 
                if self.page_index == (self.page_count-1): self.page_bit = 2
                if self.page_index == self.page_count: self.page_bit = 3


        self.has_next = self.page_index < self.page_count # True False
        self.has_previous = self.page_index > 1 # True False

    def __str__(self):
        return 'item_count: %s, page_count: %s, page_index: %s, page_size: %s, offset: %s, limit: %s' % (self.item_count, self.page_count, self.page_index, self.page_size, self.offset, self.limit)

    __repr__ = __str__

    def toDict(self):
        return {
            'page_index': self.page_index,
            'page_count': self.page_count,
            'item_count': self.item_count,
            'has_next': self.has_next,
            'has_previous': self.has_previous
    
        }
        
# model支持数据库对象、列表字典对象
def _get_model_by_page(request,model, listRow):#add
    try:
        if not isinstance(model,list):
            model = model.objects.all()
        page=Page(len(model),_get_page_index(request),_get_listRows(request,listRow), 3)#3个按钮
        model=model[page.offset : page.offset + page.limit]
        return model,page
    except:
        return [],1

