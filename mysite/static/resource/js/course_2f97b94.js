function simScroll(inits){var _o=this,_i=inits;return"object"!=typeof _i||null==_i._objFor||null==_i._objSimS?void alert("simScroll初始化失败?"):(_o.init=function(){_o._objSimS=_i._objSimS,_o._objFor=_i._objFor,_o._objSync=_i._objSync,_o._syncCount="object"!=typeof _o._objSync?-1:_o._objSync.length,_o._objSimS.style.visibility="hidden";for(var _objEle=_o._objSimS.getElementsByTagName("div"),i=0;i<_objEle.length;i++){var _objTag=_objEle[i].getAttribute("tag");_objTag=_objTag.toLowerCase(),"simup"==_objTag&&(_o._objUp=_objEle[i]),"simdown"==_objTag&&(_o._objDown=_objEle[i]),"simarea"==_objTag&&(_o._objArea=_objEle[i]),"simdrag"==_objTag&&(_o._objDrag=_objEle[i])}with(_o._sclTH=null==_o._objUp?0:_o._objUp.offsetHeight,_o._sclFH=null==_o._objDown?0:_o._objDown.offsetHeight,_o._sclSP=2,_o._sclPH=_o._objFor.offsetHeight/_o._objFor.scrollHeight,_o._sclPH=_o._sclPH>1?1:_o._sclPH,_o._sclBH=_o._objFor.offsetHeight-_o._sclTH-_o._sclFH,_o._sclDH=parseInt((_o._sclBH-2*_o._sclSP)*_o._sclPH),_o._sclDH=_o._sclDH<20?20:_o._sclDH,_o._moveSH=_o._objFor.scrollHeight-_o._objFor.offsetHeight,_o._simToQD=300,_o._simQS=50,_o._simSLH=20,_o._simSH=0,_o._simDoT=null,_o._simDoI=null,_o._simDoC=null,_o._minX=0,_o._minY=_o._sclTH+_o._sclSP,_o._maxY=_o._sclBH-_o._sclDH-_o._sclSP+_o._sclTH,_o._maxX=0,_o._objArea)style.height=_o._sclBH+"px";with(_o._objDrag)style.position="absolute",style.top=_o._minY+"px",style.width=_o._objSimS.offsetWidth+"px",style.height=_o._sclDH+"px";null!=_o._objUp&&(_o._objUp.onmouseover=function(){this.className="simScrollUp_Over"},_o._objUp.onmouseout=function(){this.className="simScrollUp",_o.simStopScroll()},_o._objUp.onmousedown=function(){_o.simSetScroll(-1)},_o._objUp.onmouseup=function(){_o.simStopScroll()}),null!=_o._objDown&&(_o._objDown.onmouseover=function(){this.className="simScrollDown_Over"},_o._objDown.onmouseout=function(){this.className="simScrollDown",_o.simStopScroll()},_o._objDown.onmousedown=function(){_o.simSetScroll(1)},_o._objDown.onmouseup=function(){_o.simStopScroll()}),_o._objDrag.onmouseover=function(){this.className="simScrollDrag_Over",DragEle(_o._objDrag,_o._objDrag,{minX:_o._minX,minY:_o._minY,maxX:_o._maxX,maxY:_o._maxY},{down:_o.simStartDrag,move:_o.simDragScroll,up:_o.simEndDrag})},_o._objDrag.onmouseout=function(){_o._isDrag||(this.className="simScrollDrag")},_o._objArea.onmousedown=function(o){_o.simPageScroll(o)},_o._objArea.onmouseup=_o._objArea.onmouseout=function(){_o.simStopScroll()},_o._objFor.onscroll=function(){_o.simPositioning()},-1!=_o._syncCount&&myAddEventListener(_o._objFor,"scroll",_o.simSyncScroll),window.addEventListener&&(_o._objFor.addEventListener("DOMMouseScroll",_o.simWheel,!1),_o._objSimS.addEventListener("DOMMouseScroll",_o.simWheel,!1)),myAddEventListener(_o._objFor,"mousewheel",_o.simWheel),myAddEventListener(_o._objSimS,"mousewheel",_o.simWheel),_o.simSetScroll(0),_o._objSimS.style.visibility="visible"},_o.simPageScroll=function(o){var e=o||event,n=e.target||e.srcElement;if(n!=_o._objDrag){var t=getXY(o)[1];t-=getCoords(_o._objSimS).y;var i=parseInt(_o._objDrag.style.top);_o.simSetScroll(i>t?-3:3)}},_o.simDragScroll=function(o){_o._movePY=(o.y-_o._sclTH-_o._sclSP)/(_o._maxY-_o._sclTH-_o._sclSP),_o._moveY=_o._moveSH*_o._movePY,_o._moveY=parseInt(_o._moveY),_o._objFor.scrollTop=_o._moveY},_o.simDoScroll=function(){_o._objFor.scrollTop+=_o._simSH},_o.simPositioning=function(){_o._isDrag||(_o._movePY=_o._objFor.scrollTop/_o._moveSH,_o._moveY=(_o._maxY-_o._sclTH-_o._sclSP)*_o._movePY,_o._moveY=parseInt(_o._moveY),_o._moveY+=_o._sclTH+_o._sclSP,_o._objDrag.style.top=_o._moveY+"px")},_o.simSyncScroll=function(){for(var o=_o._objFor.scrollTop,e=0;e<_o._syncCount;e++)_o._objSync[e].scrollTop=o},_o.simStartDrag=function(){_o._isDrag=!0},_o.simEndDrag=function(){_o._isDrag=!1,_o._objDrag.className="simScrollDrag"},_o.simCheck=function(){},_o.simDefer=function(){clearInterval(_o._simDoI),_o._simDoI=setInterval(function(){_o.simDoScroll()},_o._simQS)},_o.simStopScroll=function(){clearTimeout(_o._simDoT),clearInterval(_o._simDoI),clearInterval(_o._simDoC)},_o.simSetScroll=function(o){var e=!1;switch(o){case-3:_o._simSH=-(_o._objFor.offsetHeight-_o._simSLH),e=!0;break;case-2:_o._simSH=3*-_o._simSLH;break;case-1:_o._simSH=3*-_o._simSLH,e=!0;break;case 0:return _o._simSH=0,void _o.simPositioning();case 1:_o._simSH=3*_o._simSLH,e=!0;break;case 2:_o._simSH=3*_o._simSLH;break;case 3:_o._simSH=_o._objFor.offsetHeight-_o._simSLH,e=!0}_o.simDoScroll(),e&&(clearTimeout(_o._simDoT),_o._simDoT=setTimeout(_o.simDefer,_o._simToQD),3==Math.abs(o)&&(_o._simDoC=setInterval(_o.simCheck,_o._simQS)))},void(_o.simWheel=function(o){var e=0;o=window.event||o,o.wheelDelta?e=o.wheelDelta/120:o.detail&&(e=-o.detail/3),_o.simSetScroll(e>0?-2:2),EndEvent(o)}))}function stopEventBubble(o){var e=o||window.event;e&&e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function returnQaTopics(o){var e="";return"object"==typeof o&&(e+="<li>",e+='<div class="left-text"> ',e+='<p><a href="/question/'+o.id+'.html" target="_blank" style="color:#333;">'+o.title+"</a></p>",e+="<div><span> ",e+=o.user.uname,e+="</em>",e+="</span> <span>最后回答：<em>",e+=o.last_replyed_at,e+="</em></span></div>",e+="</div>",e+='<div class="tl-number">',e+=o.stat,e+="</div>",e+="</li>"),e}function decodeHtml(o){var e="";return 0==o.length?"":(e=o.replace(/&amp;/g,"&"),e=e.replace(/&lt;/g,"<"),e=e.replace(/&gt;/g,">"),e=e.replace(/&nbsp;/g," "),e=e.replace(/&#39;/g,"'"),e=e.replace(/&quot;/g,'"'),e=e.replace(/<br>/g,"\n"))}var $t=function(o){return"object"==typeof o?o:document.getElementById(o)},brower=function(){var o=navigator.userAgent.toLowerCase(),e=new Object;return e.isFirefox=-1!=o.indexOf("gecko"),e.isOpera=-1!=o.indexOf("opera"),e.isIE=!e.isOpera&&-1!=o.indexOf("msie"),e.isIE7=e.isIE&&-1!=o.indexOf("7.0"),e},getXY=function(o){var e;if(brower().isIE){var n;"undefined"!=typeof window.pageYOffset?n={x:window.pageXOffset,y:window.pageYOffset}:"undefined"!=typeof document.compatMode&&"BackCompat"!=document.compatMode?n={x:document.documentElement.scrollLeft,y:document.documentElement.scrollTop}:"undefined"!=typeof document.body&&(n={x:document.body.scrollLeft,y:document.body.scrollTop}),e=new Array(window.event.clientX+n.x-document.body.clientLeft,window.event.clientY+n.y-document.body.clientTop)}else e=new Array(o.pageX,o.pageY);return e},getCoords=function(o){for(var e=o.offsetLeft,n=o.offsetTop,t=o.offsetParent;null!=t;)e+=t.offsetLeft,n+=t.offsetTop,t=t.offsetParent;return{x:e,y:n}},getPageSize=function(){var o,e;window.innerHeight&&window.scrollMaxY?(o=document.body.scrollWidth,e=window.innerHeight+window.scrollMaxY):document.body.scrollHeight>document.body.offsetHeight?(o=document.body.scrollWidth,e=document.body.scrollHeight):(o=document.body.offsetWidth,e=document.body.offsetHeight);var n,t;self.innerHeight?(n=self.innerWidth,t=self.innerHeight):document.documentElement&&document.documentElement.clientHeight?(n=document.documentElement.clientWidth,t=document.documentElement.clientHeight):document.body&&(n=document.body.clientWidth,t=document.body.clientHeight);var i,s;return i=document.body.clientWidth,s=document.body.clientHeight,pageHeight=t>e?t:e,pageWidth=n>o?n:o,arrayPageSize=new Array(pageWidth,pageHeight,n,t,i,s)},EndEvent=function(o){o=o||window.event,o.stopPropagation&&(o.preventDefault(),o.stopPropagation())||(o.cancelBubble=!0,o.returnValue=!1)},DragEle=function(obj,dObj,area,handler){obj=$t(obj),dObj=$t(dObj),obj.onmousedown=function(e){var _tX,_tY,_sX,_sY,_mX,_mY,minX,minY,maxX,maxY;with(minX=void 0==area.minX?0:area.minX,minY=void 0==area.minY?0:area.minY,maxX=void 0==area.maxX?_pageSize[0]:area.maxX,maxY=void 0==area.maxY?_pageSize[1]:area.maxY,dObj)style.position="absolute",_tX=offsetLeft,_tY=offsetTop,_sX=getXY(e)[0],_sY=getXY(e)[1];dObj.setCapture?dObj.setCapture():window.captureEvents&&window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP),myAddEventListener(document,"selectstart",EndEvent),EndEvent(e),void 0!=handler.down&&handler.down({x:_sX,y:_sY}),document.onmousemove=function(e){with(_mX=_tX+getXY(e)[0]-_sX,_mY=_tY+getXY(e)[1]-_sY,_mX=minX>_mX?minX:_mX,_mY=minY>_mY?minY:_mY,_mX=_mX>maxX?maxX:_mX,_mY=_mY>maxY?maxY:_mY,dObj)style.left=_mX+"px",style.top=_mY+"px";void 0!=handler.move&&handler.move({x:_mX,y:_mY})},document.onmouseup=function(){dObj.releaseCapture?dObj.releaseCapture():window.captureEvents&&window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP),document.onmousemove=null,document.onmouseup=null,myRemoveEventListener(document,"selectstart",EndEvent),void 0!=handler.up&&handler.up({x:_mX,y:_mY})}}},eventListeners=[],findEventListener=function(o,e,n){var t;for(t in eventListeners)if(eventListeners[t].node==o&&eventListeners[t].event==e&&eventListeners[t].handler==n)return t;return null},myAddEventListener=function(o,e,n){null==findEventListener(o,e,n)&&(o.addEventListener?o.addEventListener(e,n,!1):o.attachEvent("on"+e,n),eventListeners.push({node:o,event:e,handler:n}))},removeEventListenerIndex=function(o){var e=eventListeners[o];delete eventListeners[o],e.node.removeEventListener?e.node.removeEventListener(e.event,e.handler,!1):e.node.detachEvent("on"+e.event,e.handler)},myRemoveEventListener=function(o,e,n){var t=findEventListener(o,e,n);null!=t&&removeEventListenerIndex(t)},cleanupEventListeners=function(){var o;for(o=eventListeners.length;o>0;o--)void 0!=eventListeners[o]&&removeEventListenerIndex(o)};JKXY.Jcroll={init:function(){this.bindEle(),this.xianluFun(),this.Share(),$(".time-hot li").tooltip("tag",{type:"click",selected:"nav_on",contentClass:".lesson-box"})},Lock:0,bindEle:function(){$(".player-nav>ul>li:eq(0)").on("click",this.contentShow),$(".player-nav>ul>li,.deng-icon,.lianbo").on("mouseover",this.waringHover),$("body").on("mouseover",this.waringHide),$(".deng-icon").on("click",this.dengFunc),$(".mulu>i,.mulu>p,#shouqi").on("click",function(){$(".mulu-box").is(":visible")&&(JKXY.Jcroll.Lock=0,JKXY.Jcroll.contentHide())}),$(".player-video").bind("mouseover",this.nextLesson),$(document).bind("mouseover",function(){$(".cprev,.cnext").stop(!0,!0),$(".cprev").fadeOut(),$(".cnext").fadeOut()}),$(".closew").bind("click",function(){$(".slow-time-tip").fadeOut()})},contentHide:function(){var o=$("#videolist");TweenMax.to(o,1,{left:"40px",display:"none",ease:Quart.easeInOut}),JKXY.stopEventBubble()},contentShow:function(){JKXY.Jcroll.Lock=1;var o=$(this),e=o.children("div");TweenMax.to(e,1,{left:"-400px",display:"block",ease:Quart.easeInOut,onComplete:function(){var o=new simScroll({_objFor:$t("simTestContent2"),_objSimS:$t("simScrollTest2")});o.init()}})},waringHover:function(){var o=$(this);o.addClass("bc-gray");var e=o.children("div"),n=o.index();if(0==n)return!1;var t="-120px";o.hasClass("xianlu")&&(t="-290px"),TweenMax.to(e,.4,{left:t,display:"block",ease:Linear.easeNone}),JKXY.stopEventBubble()},waringHide:function(){var o=$(".player-nav>ul>li:gt(0)").find("div");1===JKXY.Jcroll.Lock?$(".player-nav>ul>li:gt(0),.deng-icon").removeClass("bc-gray"):$(".player-nav>ul>li,.deng-icon,.lianbo").removeClass("bc-gray"),TweenMax.to(o,.4,{left:"40px",display:"none",ease:Quart.easeInOut}),TweenMax.to($(".deng-box"),.4,{left:"40px",display:"none",ease:Quart.easeInOut}),TweenMax.to($(".lianbobox"),.4,{left:"40px",display:"none",ease:Quart.easeInOut})},xianluFun:function(){$(".xianlu-box>span").bind("click",function(){$(".xianlu-box>span").removeClass("bc-blue"),$(this).addClass("bc-blue")})},dengFunc:function(){var o=$(this).children("p").text();if("关灯"===o){$(this).children("p").html("开灯"),$(this).children("div").html("开灯模式"),$("#palyer-box").addClass("guandeng-mos"),$("#palyer-box h1").css("color","#35b558");var e=$("body").height()+"px";$("body").append("<div id='blacklayer1' style='opacity:0;height:"+e+"'></div>"),TweenMax.to($("#blacklayer1"),.5,{opacity:1,ease:Linear.easeNone})}else $(this).children("p").html("关灯"),$(this).children("div").html("关灯模式"),$("#palyer-box h1").css("color","#333"),$("body,html").animate({scrollTop:"115px"},500),TweenMax.to($("#blacklayer1"),.5,{opacity:0,ease:Linear.easeNone,onComplete:function(){$("#blacklayer1").remove()}}),$("#palyer-box").removeClass("guandeng-mos")},Share:function(){$(".sina-icon").on("click",ShareTo.weibo),$(".qq-icon").on("click",ShareTo.qqWeibo),$(".tencen-icon").on("click",ShareTo.qzone)},nextLesson:function(){$(".cprev,.cnext").stop(!0,!0),$(".cprev").fadeIn(),$(".cnext").fadeIn(),$(".learnav-content").hide(),JKXY.stopEventBubble()}};var stop_event_conf={0:"input",1:"textarea",2:".edit-box"};for(var i in stop_event_conf)$(stop_event_conf[i]).bind("keydown",function(o){13!=o.keyCode&&stopEventBubble(o)});var QustionPop={init:function(){this.binEle()},wiki_editor:null,binEle:function(){$(".input-inforbtn ").bind("click",this.popTow),$("#warning-question").bind("click",function(){JKXY.msgBox(1,"只有VIP会员才能提问")}),$("#q_pop").bind("click",this.popOne),$("#q_pop1").bind("click",this.popOne),$(".popclose").bind("click",function(){$("#pop-one").hide(),$("#pop-tow").hide(),$("#blacklayer").remove(),$("#play_video").length>0&&videojs("play_video").play()})},popHeight:function(o){var e=$(o).innerHeight();return e},popWidth:function(o){var e=$(o).innerWidth();return e},warningFunc:function(){JKXY.msgBox(1,"亲您目前无权限提问，成为vip,拥有更多特权！")},popOne:function(){function o(o){var e='<li><div class="left-text"><p><a href="/question/'+o.id+'.html" target="_blank" style="color:#333;">'+o.title+"</a></p>";return e+=" <div><span>"+o.user.uname+"</span> <span>最后回答：<em>"+o.last_replyed_at+"</em></span></div>",e+=o.replies_count>0?'</div><div class="tl-number"><em class="red-color">'+o.replies_count+"</em><span>讨论中</span></div></li>":'</div><div class="tl-number"><em class="gray-color">'+o.replies_count+"</em><span>暂无回复</span></div></li>"}videojs("play_video").pause(),$("#pop-one").tooltip("pop",{width:QustionPop.popWidth("#pop-one"),height:QustionPop.popHeight("#pop-one"),popId:"#pop-one",opacity:.8});var e=$(".player-video").attr("course_id"),n=$(".player-video").attr("seq"),t={seq:n,course_id:e};$.ajax({url:"/course/question/add/list",type:"get",data:t,dataType:"json",success:function(e){if(200==e.code){$("#returnQaTopics").empty();var n="";for(var t in e.data.lesson_questions)n=o(e.data.lesson_questions[t]),$("#returnQaTopics").append(n)}else $("#returnQaTopics").html("没有匹配的问题，请直接填写问题详细描述")}})},popTow:function(){if($("#pop-one").hide(),$("#blacklayer").remove(),""!=$(".one-input").val()){var o=$(".one-input").val();$(".tow-input").val(o)}$("#pop-tow").tooltip("pop",{width:QustionPop.popWidth("#pop-tow"),height:QustionPop.popHeight("#pop-tow"),popId:"#pop-tow",opacity:.8})}};$(function(){JKXY.Jcroll.init(),QustionPop.init()});