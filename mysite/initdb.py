# -*- coding: UTF-8 -*-
import os
import sys
import django
import random
import datetime


if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
    django.setup()
    from django.contrib.auth.models import User, Group, Permission

    
    user = User.objects.create_superuser('admin', 'admin@test.com','1234qazx')
    user.save()
       
    user = User.objects.create_user('test', 'test@test.com','1234qazx')
    user.is_staff = True
    user.is_superuser = False
    user.save()      
        
    operatorGroup = Group.objects.create(name='Operator')
    operatorGroup.permissions = [
        Permission.objects.get(name='Can add upresources'), 
        Permission.objects.get(name='Can add commentresources'),
    ]
    operatorGroup.save()
 
    OPEERATOR_NUM = 2
    for i in range(OPEERATOR_NUM):
        user = User.objects.create_user('op%s' % i, 'op%s@test.com' % i,
                                        '1234qazx')
        user.is_staff = True
        user.is_superuser = False
        user.groups.add(operatorGroup) #加入组operatorGroup
        user.save()      
    
 