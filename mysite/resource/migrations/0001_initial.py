# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2019-04-23 14:07
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Commentresources',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=120, null=True)),
                ('editor', models.CharField(blank=True, max_length=200, null=True)),
                ('date', models.DateTimeField(blank=True, default=datetime.datetime.now, null=True)),
                ('username', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Upresources',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=120, null=True)),
                ('uploadfile', models.FileField(blank=True, null=True, upload_to='./static/upload/upfile/')),
                ('uploadimg', models.FileField(blank=True, null=True, upload_to='./static/upload/upimg/')),
                ('editor', models.CharField(blank=True, max_length=20000, null=True)),
                ('source', models.CharField(blank=True, max_length=8, null=True)),
                ('type', models.CharField(blank=True, max_length=8, null=True)),
                ('cid1', models.CharField(blank=True, max_length=20, null=True)),
                ('environment', models.CharField(blank=True, max_length=20, null=True)),
                ('label', models.CharField(blank=True, max_length=20, null=True)),
                ('downnum', models.CharField(blank=True, max_length=8, null=True)),
                ('browsernum', models.CharField(blank=True, max_length=8, null=True)),
                ('size', models.CharField(blank=True, max_length=10, null=True)),
                ('date', models.DateTimeField(blank=True, default=datetime.datetime.now, null=True)),
                ('username', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
