// wenda_url = "http//:www.jikexueyuan.net";

$(function(){
    //编辑器插件
    var sm_toolbar = ['italic','bold', 'underline', 'strikethrough', '|', 'blockquote', 'code', 'link', 'image'];
    ques.editor = new Simditor({
        textarea: $('#editor'),
        toolbar: sm_toolbar,
        defaultImage : wenda_url+'/home/static/js/plugin/editor/images/image.png',
        pasteImage: true,
        toolbarHidden: false,
        toolbarFloat: false,
        placeholder: '在此编辑答案，最多600个字符！',
        upload: {
            url: wenda_url + "/image/upload",
            params: null,
            fileKey: 'upload_file',
            connectionCount: 1,
            leaveConfirm: '正在上传文件，如果离开上传会自动取消'
        }
    });
    //end编辑器插件
})