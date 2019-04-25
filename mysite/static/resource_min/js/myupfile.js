/*字符串格式化*/
String.prototype.format = function(args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if(args[key]!=undefined){
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg= new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
}

/*上传二个文件,一个是压缩文件，另一个是图像文件。先判断二个文件文件大小是否超过阀值，
再判断第二个文件扩展名是否合法。
由前台<form onsubmit="return isupfileupImg(setfilesize1,setfilesize2)">调用。
setfilesize1 = 209715200; 200MB   setfilesize2 = 1048576; 1MB  
*/
function isupfileupImg(setfilesize1,setfilesize2){
    try{       
        var setftype = '.bmp .pcx .gif .png .jpg .jpeg .dif'; 
        if(issize('upfile',setfilesize1,'upfiledisp')){ 
            if(issize('upImg',setfilesize2,'upImgdisp')){
                if(istype('upImg',setftype,'upImgdisp')){
                    document.getElementById("upfilesize").value = getidFilesize('upfile');//获得文件大小，供使用 <input name="upfilesize" id="upfilesize" type="text" style="display:none">
                    document.getElementById('uk-icon-disp').innerHTML = '<i class="uk-icon-spinner uk-icon-spin uk-icon-large"></i>';
                    //alert('ok');
                    return true;
                }
            }
        }
    }
    catch(e){
        alert(e);
    }
    var ctr = 0;
    return false;
}

/*前台调用，判断扩展名是否合法
文件filenameID--梆定--前台<input id='imglessons'> 
设定文件类型setftype='jpg'
显示dispID--梆定--前台<span id='upfiledisp'>，
*/
function istype(filenameID,setftype,dispID){
  var filename = getidFilename(filenameID); 
  var ext = getidEXT(filenameID); 
  if(setftype.indexOf(ext) > 0){  
    return true;
  }else{
    document.getElementById(dispID).innerHTML = "文件:{0},格式错误,正确扩展名:{1}.".format(filename,setftype);
    return false;
  }  
}

/*前台调用，判断文件大小*/
function issize(filenameID,setsize,dispID){   
  var filesize = getidFilesize(filenameID);
  if(filesize < setsize){
    return true;
  }else{
    fsize = SizeConvert(filesize);  //整数转换为B KB MB字符串函数
    setsize = SizeConvert(setsize);
    document.getElementById(dispID).innerHTML = "文件:{0},大小:{1},超过设定阀值{2}.".format(getidFilename(filenameID),fsize,setsize);
    return false;
  }
}

//由前台文件ID，获得文件扩展名 
function getidEXT(filenameID){
    return  getfileEXT(getidFilename(filenameID))
}

//由前台文件ID，获得文件名 
function getidFilename(filenameID){
  var file = document.getElementById(filenameID).files;
  return file[0].name;
}

//由前台文件ID，获得文件大小
function getidFilesize(filenameID){
  var file = document.getElementById(filenameID).files;
  return file[0].size;
}

//整数转换为B KB MB GB字符串函数  异常返回 0B  2019.04.21
function SizeConvert(limit){
    var size = "";
    if((typeof limit !== 'number')||(limit<0)){
        limit = 0;
    }
    if(limit < 1024){                                  //小于1KB，则转化成B
        size = limit.toFixed(2) + "B"
    }else if(limit <1024 * 1024){                      //小于1MB，则转化成KB
        size = (limit/1024).toFixed(2) + "KB"
    }else if(limit < 1024 * 1024 * 1024){              //小于1GB，则转化成MB
        size = (limit/(1024 * 1024)).toFixed(2) + "MB"
    }else{                                             //其他转化成GB
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }
 
    var sizeStr = size + "";                        //转成字符串
    var index = sizeStr.indexOf(".");               //获取小数点处的索引
    var dou = sizeStr.substr(index + 1 ,2)          //获取小数点后两位的值
    if(dou == "00"){                                //判断后两位是否为00，如果是则删除00                
       return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size;

}
test("SizeConvert", function() {
  equal(SizeConvert(), '0B' );
  equal(SizeConvert('12'), '0B' );
  equal(SizeConvert('12A'), '0B' );
  equal(SizeConvert(-1), '0B' );
  equal(SizeConvert(0), '0B' );
  equal(SizeConvert(999), '999B' );
  equal(SizeConvert(1300), '1.27KB' );
  equal(SizeConvert(2300000), '2.19MB' );
  equal(SizeConvert(2300000000), '2.14GB' );
  equal(SizeConvert(2300000000000), '2142.04GB' );
});

//获得文件扩展名      
function getfileEXT(filename){
  var index = filename.lastIndexOf(".");
  if(index == -1){
    return '';
  }else{
    return  filename.substring(index+1).toLowerCase();//+1  扩展名前面没有点 如：txt
  }
}
test("getfileEXT", function() {   
	equal(getfileEXT('www/data/index'), '');
	equal(getfileEXT('www/data/index.'), '');
	equal(getfileEXT('www/data/index.html'), 'html');
	equal(getfileEXT('www/data/index.HTML'), 'html');
});

//获得文件名
function getFileName(filename) {
  var index = filename.lastIndexOf("/");
  if(index == -1){
    return '';
  }else{
    return  filename.substring(index+1);
  }
}
test("getFileName", function() {   
  equal(getFileName('www/data/index'), 'index');
  equal(getFileName('www/data/index.'), 'index.');
  equal(getFileName('www/data/index.html'), 'index.html');
  equal(getFileName('www/data/index.HTML'), 'index.HTML');
});