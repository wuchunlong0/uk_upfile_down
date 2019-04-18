'''
# -*- coding: utf-8 -*-
from django.test import TestCase
from blog.models import Animal
 
# 工程目录(./start.sh目录)下运行：$ python mysite/manage.py test mysite 
class AnimalTestCase(TestCase):
    def setUp(self):
        Animal.objects.create(name="lion", sound="roar")
        Animal.objects.create(name="cat", sound="meow")
 
    def test_animals_can_speak(self):
        lion = Animal.objects.get(name="lion")
        cat = Animal.objects.get(name="cat")
        self.assertEqual(lion.speak(), 'The lion says "roar"')
        self.assertEqual(cat.speak(), 'The cat says "meow"')
'''
