// wenda_url = "http//:www.jikexueyuan.net";

$(function(){
    //编辑器插件
    var sm_toolbar = ['italic','bold', 'underline', 'strikethrough', '|', 'blockquote', 'code', 'link'];
    ques.editor = new Simditor({
        textarea: $('#editor'),
        toolbar: sm_toolbar,
        defaultImage : '',//wenda_url+'/home/static/js/plugin/editor/images/image.png',
        pasteImage: false,
        toolbarHidden: false,
        toolbarFloat: false,
        placeholder: '在这里编辑正文，最多200个字符！重要提示：编辑正文是必须的，正文编辑完成后，才能提交！！'

    });
    //end编辑器插件
})