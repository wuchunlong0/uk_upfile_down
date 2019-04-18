#/usr/bin/python 
# -*- coding: utf-8 -*-
#from django.forms.models import model_to_dict
# model.objects.values()能够以列表字典形式，获得数据库字段值。但是，当字段有外键时，只能获得:字段_id，不能获得字段值。
# 该函数，以列表字典形式，获得数据库字段值(外键字段值)。参数：models_values数据库列表字典形式，listdict=[{'字段名': 外键数据库名},...]，

# 测试在：http://localhost:9000/blogapi/apiblogs/
def get_model_values(models_values,listdict):    
    try:
        for d in listdict:            
            for T in models_values:
                adddict = {}       
                for k,v in T.items():                                       
                    if k == list(d)[0] + '_id':
                        adddict.update({list(d)[0] : str(list(d.values())[0].objects.get(id=v)) }) if v else adddict.update({list(d)[0] :v})    
                        adddict.update(T)
                        yield adddict                                                                                   
    except Exception as ex:
        print("get_model_listdict() err!"  + str(ex))
        yield  {}


#外键 由列表中某个元素获得下标。数据库名model，值value
def get_model_id(model,field,value):
    models = list(model.objects.values_list(field,flat=True)) #列表
    try:       
        id = models.index(value) 
    except Exception as ex:
        id = -1       
    return  id #返回列表中某个元素的下标




