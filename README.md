2019.04.20 重构<br>
一键部署正常！<br>

一、运行平台<br>
python3x  django1.11.5 uk vue <br>

二、功能：<br>
1、文件上传、显示、搜索、下载 <br>
2、详细功能，有截图，参见：主要功能.doc <br>


三、启动工程<br>
1、不初始化数据库：./start.sh <br>
2、初始化数据库：./start.sh -i <br>

四、登录<br>
admin/1234qazx<br>
test/1234qazx<br>

五、更新记录<br>
文件上传、显示、搜索、下载正常！上传的效果图不改名<br>
git ci -a -m '1000'  <br>

文件上传、显示、搜索、下载正常！上传的效果图改名<br>
git ci -a -m '1000 add title_imgname' <br>

文件上传、显示、搜索、下载正常！上传的效果图改名 前端增加删除上传资源功能(超级用户)<br>
git ci -a -m '1000 add title_imgname delete'
