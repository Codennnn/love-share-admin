(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-17178a28"],{3433:function(e,t,n){},"38a6":function(e,t,n){"use strict";n.r(t);n("96cf");var i=n("1da1"),r=(n("ac6a"),n("456d"),n("9d63")),a=n.n(r),s=n("518e"),c=[{placeholder:"邀请码",value:"",type:"text",isWarnng:!1,warningText:""},{placeholder:"登入密码",value:"",type:"password",isWarnng:!1,warningText:""},{placeholder:"再次确认密码",value:"",type:"password",isWarnng:!1,warningText:""}],u={name:"SignUp",components:{VuePerfectScrollbar:a.a},props:{isSidebarActive:{type:Boolean,required:!0}},data:function(){return{inputs:c}},computed:{active:{get:function(){return this.isSidebarActive},set:function(){}},btnDisabled:function(){return this.inputs[0].value.length>0&&this.inputs[1].value.length>0&&this.inputs[2].value.length>0&&"czc12580520"===this.inputs[0].value&&this.inputs[1].value===this.inputs[2].value}},methods:{getPermissions:function(){var e=this,t=[{read:!0},{write:!0},{create:!0},{delete:!0}],n=Object.keys({user:"用户",goods:"商品",order:"订单",comment:"留言",guide:"指引",admin:"管理员"}).map(function(n){return{module:n,purview:e.$cloneDeepWith(t)}}),i=["read","write","create","delete"];return n.map(function(e){return{module:e.module,purview:e.purview.filter(function(e,t){return e[i[t]]}).map(function(e){return Object.keys(e)[0]})}})},onSignUp:function(){var e=Object(i.a)(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.btnDisabled){e.next=2;break}return e.abrupt("return");case 2:return t={account:"czc12580520",password:"123456",nickname:"令狐少侠",real_name:"陈梓聪",avatar_url:"https://cdn.hrspider.top/default_avatar_male.jpg",email:"czc12580520@gmail.com",gender:0,permissions:this.getPermissions()},e.next=5,Object(s.c)(t);case 5:n=e.sent,2e3===n.code&&(this.$vs.notify({time:3500,title:"管理员创建成功",text:"现在可以登录系统了",color:"success"}),this.$emit("closeSidebar"));case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}},l=(n("ce35"),n("2877")),o=Object(l.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vs-sidebar",{staticClass:"sidebarx overflow-hidden",attrs:{"hidden-background":"","position-right":""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[n("div",{staticClass:"mt-6 px-6 flex items-center justify-between text-gray-600"},[n("span",{staticClass:"text-lg font-bold"},[e._v("编辑资料")]),n("feather",{staticClass:"cursor-pointer",attrs:{type:"x"},on:{click:function(t){return e.$emit("closeSidebar")}}})],1),n("vs-divider",{staticClass:"mb-0"}),n("VuePerfectScrollbar",{staticClass:"pt-4 pb-6",attrs:{settings:{maxScrollbarLength:180,wheelSpeed:.6}}},[n("div",{staticClass:"p-6"},[e._l(e.inputs,function(t,i){return n("vs-input",{key:i,staticClass:"w-full pb-3",attrs:{"val-icon-warning":"warning",type:t.type,"label-placeholder":t.placeholder,warning:t.isWarnng,"warning-text":t.warningText},on:{focus:function(){e.inputs[i].isWarnng=!1},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSignUp()}},model:{value:t.value,callback:function(n){e.$set(t,"value","string"==typeof n?n.trim():n)},expression:"it.value"}})}),n("vs-button",{staticClass:"w-full mt-3",attrs:{disabled:!e.btnDisabled},on:{click:function(t){return e.onSignUp()}}},[e._v("成为管理员")])],2)])],1)],1)},[],!1,null,"058f40d0",null);t.default=o.exports},ce35:function(e,t,n){"use strict";var i=n("3433");n.n(i).a}}]);