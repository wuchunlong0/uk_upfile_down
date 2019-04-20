/**
 *前台典型应用：upVideofather.html
 * wcl6005@163.com
 * 2016.6.13
 */

//上传二个文件,一个是压缩文件，另一个是图像文件。先判断二个文件文件大小是否超过阀值，再判断第二个文件扩展名是否合法。由前台<form onsubmit="return istwofile(setfilesize1,setfilesize2)">调用。
function istwofile(setfilesize1,setfilesize2){//文件大小设置由前台传来
    try{
        //var setfilesize= 1048576;  //设定文件大小阀值1MB (1024*1024=1048576 )   200M=200*1048576=209715200
        var setftype='BMPbmp PCXpcx GIFgif PNGpng JPGjpg JPEGjpeg DIFdif'; //设定常用图像文件扩展名
        if(judgementfsize('upfile',setfilesize1,'upfiledisp')){ //判断文件大小是否超过阀值
            if(judgementfsize('upImg',setfilesize2,'upImgdisp')){
                if(judgementftype('upImg','upImgdisp',setftype)){//判断第二个文件扩展名是否合法
                    var fileobj = document.getElementById('upfile').files;
                    document.getElementById("upfilesize").value=fileobj[0].size;//获得文件大小，供使用 <input name="upfilesize" id="upfilesize" type="text" style="display:none">
                    return true;
                }
            }
        }
    }
    catch(e){
        alert(e);
    }
    return false;
}
//上传二个文件。先判断二个文件文件大小是否超过阀值，再判断二个文件扩展名是否合法。由前台<form onsubmit="return judgementfile()">调用。
function judgementfile(){
    try{
        var setfilesize= 1048576;  //设定文件大小阀值1MB (1024*1024=1048576 )
        var setftype='BMPbmp PCXpcx GIFgif PNGpng JPGjpg JPEGjpeg DIFdif'; //设定常用图像文件扩展名
        if(judgementfsize('imglessons',setfilesize,'upfiledisp')){ //判断文件大小是否超过阀值
            if(judgementfsize('imgteacher',setfilesize,'upImgdisp')){
                if(judgementftype('imglessons','upfiledisp',setftype)){  //判断扩展名是否合法
                    if(judgementftype('imgteacher','upImgdisp',setftype)){
                        return true;
                    }
                }
            }
        }
    }
    catch(e){
        alert(e);
    }
    return false;
}

//上传一个文件MP4。先判断文件大小是否超过阀值，再判断扩展名是否合法。由前台<form onsubmit="return judgementfile()">调用。
function judgementonefile(){
    try{
        var setfilesize= 1048576*300;  //设定文件大小阀值300MB (1MB=1024*1024=1048576 )
        var setftype='MP4 mp4'; //设定常用图像文件扩展名
        if(judgementfsize('filename',setfilesize,'upfiledisp')){ //判断文件大小是否超过阀值
            if(judgementftype('filename','upfiledisp',setftype)){  //判断扩展名是否合法
                return true;
            }
         }
    }
    catch(e){
        alert(e);
    }
    return false;
}
//判断扩展名是否合法。文件filenameID--梆定--前台<input id='imglessons'> ,显示dispID--梆定--前台<span id='upfiledisp'>，设定文件类型setftype='jpg'
function judgementftype(filenameID,dispID,setftype){
    try{
        var getEXT=fIDtoEXT(filenameID);//由文件ID获得文件扩展名
        var fID = document.getElementById(filenameID).files;
        var filename= fID[0].name;//获得文件名
        if( setftype.indexOf(getEXT)>0){  //判断扩展名是否合法
            return true;
        }
        else{
            document.getElementById(dispID).innerHTML =filename+ ":文件格式错误。 "+"设定文件格式："+setftype;
            return false;
        }
    }
    catch(e){
        alert(e);
        return false;
    }
}

//判断文件大小  filenameID='imglessons'文件input的ID,setsize=1048576设定文件大小,dispID='upfiledisp'显示信息ID
function judgementfsize(filenameID,setsize,dispID){
    try{
        var fileobj = document.getElementById(filenameID).files;
        var filesize=fileobj[0].size;
        if(filesize<setsize){

            return true;
        }
        else{
            fsize=SizeConvert(filesize)  //整数转换为B KB MB字符串函数
            size=SizeConvert(setsize)
            document.getElementById(dispID).innerHTML =fileobj[0].name+ ": 文件大小:"+fsize+"。超过设定阀值 "+size;
            return false;
        }
    }
    catch(e){
        alert(e.name + ": " + e.message);
        return false;
    }
}



//判断字符串是否为数字字符串 (0-9数字字符串) 返回： 是 return true;  否 return false;
function strIsNum(str){
    try{
        var r =  /^[0-9]*$/ ; // 整数 0-9
        if((str==null)||(str==''))
            return false;
        else
            return r.test(str);
    }
    catch(e){
        alert(e);
        return false;
    }
}

//js整数转换为B KB MB字符串函数  正常返回字符串：1MB;    异常返回''
function SizeConvert(sizeInt){
    try{
        if(sizeInt<=1000) {
            getsize=parseInt(sizeInt).toString()+'B';
        }
        else if((sizeInt>1000)&&(sizeInt<1000000)){
            getsize=parseInt(sizeInt/1024).toString()+'KB';
        }
        else{
            getsize=parseInt(sizeInt/1048576).toString()+'MB';
        }
        return getsize;
    }
    catch(e){
        alert(e);
        return '';
    }
}

//由文件ID获得文件扩展名  正常返回字符串 扩展名， 异常返回''
function fIDtoEXT(filenameID){
    try{
        var fID = document.getElementById(filenameID).files;
        var filename= fID[0].name;
        return  getFileNameEXT(filename);
    }
    catch(e){
        alert(e);
        return '';
    }
}

//获得文件扩展名(前面没有点)  php
function getFileNameEXT(filename){//alert(getFileNameEXT(filename));  var filename="www/data/index.php";获得文件扩展名  php
    var index1=filename.lastIndexOf(".");
    var index2=filename.length;
    var FileNameEXT=filename.substring(index1+1,index2);//扩展名(+1前面没有点)
    return  FileNameEXT;
}

//获得视频时间
function GetVideoTime(){
    var video = document.getElementById("video");//获得视频对象
    var value=video.duration.toString();
    while(value=='NaN'){//确保 成功获得视频对象！
        video = document.getElementById("video");//获得视频对象
        alert('自动获得视频文件播放时间。作者：吴春龙。 确定！');
        value=video.duration.toString();
    }
    var gVideoTime=formatSeconds(value);//将秒数换成时分秒格式
    document.getElementById("VideoTime").value=gVideoTime;//视频时长赋值给input
    document.getElementById("getVideoTime").submit();//提交
    //alert('ok');
}

/**
* 将秒数换成时分秒格式
*/
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = ""+parseInt(theTime)+"";//秒
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+":"+result;//分
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+":"+result;//小时
    }
    return result;
}
/*运行html源文件函数*/
function runHtmlSourCecode(){
    document.getElementById("targetcode").innerHTML = document.getElementById('sourcecode').value ;
    //alert ('ok');
}



