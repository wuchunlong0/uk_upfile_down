from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import RedirectView
from django.views.generic import TemplateView, ListView, View
class IndexView(TemplateView):
    template_name = 'home/index.html'

class myupfile_js_unittest(TemplateView):
    template_name = 'myupfile_js_unittest.html'
    
urlpatterns = [        
    url(r'^myupfile_js_unittest/', myupfile_js_unittest.as_view()), #js 单元测试
    
    url(r'^login/$', auth_views.LoginView.as_view(), name='login'),
    url(r'^logout/$', auth_views.LogoutView.as_view(), name='logout'),
    url(r'^admin/', admin.site.urls),

    url(r'^home/', include('home.urls')), 
    url(r'^apis/', include('home.apis.urls')),   
    url(r'^$', IndexView.as_view()),
    
    
    url(r'^resource/', include('resource.urls')), 

]
