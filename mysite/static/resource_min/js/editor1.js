
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
        placeholder: '在此提交问题，最多200个字符！问题描述越详细，被解答的速度越快。登录才能提交问题。！'

    });
    //end编辑器插件
})