## 记账

### 收入
| 日期       | 金额   | 名目         |
| :-------- | :----- | :---------- |
| 20170908  | 1000   | 订金         | 
| 20170921  | 2000   | 第2笔费用     | 

### 支出
| 日期       | 金额   | 名目         |
| :-------- | :----- | :---------- |
| 20170908  | 408.7  | 域名注册5年   | 



2019.04.20 重构<br>
一键部署正常！<br>

一、运行平台<br>
python3x  django1.11.5 uk vue <br>

二、功能：<br>
1、文件上传、显示、搜索、下载 <br>
2、详细功能，参见：功能截图.doc <br>
3、外连：http://47.100.52.110/static/upload/upimg/%E5%90%B4%E4%BD%B3%E7%AB%A5%E5%B9%B4%E7%94%9F%E6%B4%BB.jpg

http://47.100.52.110/static/upload/upfile/wujaiH264.mp4

三、启动工程<br>
1、不初始化数据库：./start.sh <br>
2、初始化数据库：./start.sh -i <br>

四、登录<br>
admin/1234qazx<br>
test/1234qazx<br>

五、关于文件上传
1、上传文件大小的限制：
(1) 在js前端，设置上传文件大小<1000m; 
(2) 在远程主机nginx.conf文件中，设置上传文件大小<1000m;
$ sudo vim /etc/nginx/nginx.conf，
dhf在http{}中，添加client_max_body_size 1000m; 如下所示：
http{
 client_max_body_size 1000m;  #添加
}
2、上传696MB.MP4,测试通过。

六、更新记录<br>
文件上传、显示、搜索、下载正常！上传的效果图不改名<br>
git ci -a -m '1000'  <br>

文件上传、显示、搜索、下载正常！上传的效果图改名<br>
git ci -a -m '1000 add title_imgname' <br>

文件上传、显示、搜索、下载正常！上传的效果图改名 前端增加删除上传资源功能(超级用户)<br>
git ci -a -m '1000 add title_imgname delete'<br>

文件上传、显示、搜索、下载正常！上传的效果图改名 前端增加删除上传资源功能(超级用户) 增加权限  <br>
git ci -a -m '2000 添加权限'<br>

新建文件夹时，里面放一个空文件__init__.py。原因：空文件夹不能被复制！！！
git ci -a -m '2000 upimg add __init__.py'

git ci -a -m '5000 外链 视频播放'
git ci -a -m '5000 上传文件-UK动态图标'

## 创建一个表格
一个简单的表格是这么创建的：
项目   | Value
--------|--
电脑  | $1600
手机  | $12
导管  | $1
