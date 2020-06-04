(window.webpackJsonp=window.webpackJsonp||[]).push([["Billboard"],{3048:function(t,e,l){},"386b":function(t,e,l){var a=l("5ca1"),i=l("79e5"),s=l("be13"),r=/"/g,o=function(t,e,l,a){var i=String(s(t)),o="<"+e;return""!==l&&(o+=" "+l+'="'+String(a).replace(r,"&quot;")+'"'),o+">"+i+"</"+e+">"};t.exports=function(t,e){var l={};l[t]=e(o),a(a.P+a.F*i(function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}),"String",l)}},"58f6":function(t,e,l){"use strict";var a=l("b840");l.n(a).a},b54a:function(t,e,l){"use strict";l("386b")("link",function(t){return function(e){return t(this,"a","href",e)}})},b840:function(t,e,l){},c306:function(t,e,l){"use strict";l.r(e);l("b54a");var a=l("1da1"),i=l("cc33"),s=l("284b");const r=[{label:"普通类型",value:1},{label:"站内导航",value:2},{label:"站外链接",value:3}];var o={name:"Billboard",data:()=>({types:r,billboardList:[],headers:{Authorization:`Bearer ${Object(i.a)()}`},showPopup:!1,currDelete:null,currEdit:{}}),created(){this.getBillboardList()},methods:{getBillboardList(){var t=this;return Object(a.a)(function*(){const e=yield Object(s.a)({url:"/billboard/list",method:"get"}),l=e.code,a=e.data.billboard_list;2e3===l&&(t.billboardList=a)})()},deleteBillboard(t,e){var l=this;let i=t._id,r=t.url;this.$loading(Object(a.a)(function*(){var t;2e3===(yield(t={_id:i,url:r},Object(s.a)({url:"/billboard/delete",method:"delete",data:t}))).code&&l.getBillboardList()}),{container:`#billboard-item-${e}`,scale:1},()=>{this.currDelete=null})},updateBillboard(){var t=this;return Object(a.a)(function*(){const e=t.currEdit,l=e._id,a=e.type,i=e.link;if(1===a||(2===a||3===a)&&i)try{2e3===(yield(r={_id:l,type:a,link:i},Object(s.a)({url:"/billboard/update",method:"put",data:r}))).code&&t.getBillboardList()}finally{t.showPopup=!1}var r})()},successUpload(){this.getBillboardList()}}},c=(l("58f6"),l("fdbd"),l("2877")),n=Object(c.a)(o,function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"pt-10 flex"},[l("div",{staticClass:"w-1/2"},[l("el-carousel",{staticClass:"mb-6 radius",attrs:{arrow:"always",autoplay:!1}},t._l(t.billboardList,function(t,e){return l("el-carousel-item",{key:e},[l("el-image",{staticClass:"h-full",attrs:{fit:"cover",src:t.url}})],1)}),1),l("ul",t._l(t.billboardList,function(e,a){return l("li",{key:a,staticClass:"billboard-item relative mb-4 p-3 flex radius bg-gray overflow-hidden\n           vs-con-loading__container",attrs:{id:"billboard-item-"+a}},[l("el-image",{staticClass:"h-full w-48 mr-3 rounded-lg",attrs:{src:e.url+"?imageView2/2/w/200","preview-src-list":[e.url]}}),l("div",{staticClass:"text-sm text-semi"},[l("div",{staticClass:"w-64 truncate",attrs:{title:e.url}},[t._v("URL："+t._s(e.url))]),l("div",[t._v("Link："+t._s(e.link||"未指定"))]),l("div",[t._v("类型："+t._s(t.types[e.type-1].label))]),l("div",{staticClass:"text-semi"},[t._v("上传时间："+t._s(t.$dayjs(e.created_at).format("YYYY-MM-DD")))])]),l("div",{staticClass:"close-icon text-primary",attrs:{title:"删除"},on:{click:function(e){t.currDelete=a}}},[l("feather",{attrs:{size:"20","stroke-width":"2.4",type:"x"}})],1),l("div",{staticClass:"edit-icon text-primary",attrs:{title:"管理"},on:{click:function(l){t.showPopup=!0,t.currEdit=t.$cloneDeepWith(e)}}},[l("feather",{attrs:{size:"20","stroke-width":"2.4",type:"terminal"}})],1),t.currDelete===a?l("div",{staticClass:"delete-bg absolute top-0 left-0 w-full h-full flex-row-center text-primary text-sm"},[l("div",{staticClass:"absolute z-40 top-0 left-0 w-full h-full bg-main",staticStyle:{opacity:"0.85"}}),l("div",{staticClass:"relative z-50 flex-col-center"},[l("p",{staticClass:"mb-2 text-base font-bold"},[t._v("\n              删除后将不可恢复，请谨慎操作！\n            ")]),l("div",[l("vs-button",{attrs:{color:"danger",size:"small"},on:{click:function(l){return t.deleteBillboard(e,a)}}},[t._v("确认删除")]),l("span",{staticClass:"ml-2 font-bold cursor-pointer",on:{click:function(e){t.currDelete=null}}},[t._v("手滑点错了")])],1)])]):t._e()],1)}),0)],1),l("div",{staticClass:"w-1/2 pl-8"},[l("vs-upload",{ref:"fileUpload",attrs:{multiple:"",action:"/api/billboard/upload",text:"图片上传（JPG、PNG）",fileName:"billboard",accept:"image/jpeg,image/jpg,image/png",limit:6,headers:t.headers},on:{"on-success":t.successUpload}})],1),l("vs-popup",{staticClass:"edit-popup",attrs:{title:"管理广告牌",active:t.showPopup},on:{"update:active":function(e){t.showPopup=e}}},[l("div",{staticClass:"w-full py-2 px-10 flex-col-center"},[l("span",{staticClass:"ml-1 text-sm self-start text-primary"},[t._v("类型")]),l("el-select",{staticClass:"w-full mb-3 no-dark",attrs:{placeholder:"请选择"},model:{value:t.currEdit.type,callback:function(e){t.$set(t.currEdit,"type",e)},expression:"currEdit.type"}},t._l(t.types,function(t){return l("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),l("vs-input",{staticClass:"w-full mb-4 no-dark",attrs:{label:"Link",placeholder:"请输入路由或外链链接"},model:{value:t.currEdit.link,callback:function(e){t.$set(t.currEdit,"link",e)},expression:"currEdit.link"}}),l("vs-button",{staticClass:"w-full radius",on:{click:function(e){return t.updateBillboard()}}},[t._v("完成修改")])],1)])],1)},[],!1,null,"7f22f175",null);e.default=n.exports},fdbd:function(t,e,l){"use strict";var a=l("3048");l.n(a).a}}]);