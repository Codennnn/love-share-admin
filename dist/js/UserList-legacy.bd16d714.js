(window.webpackJsonp=window.webpackJsonp||[]).push([["UserList"],{"0a49":function(t,e,s){var r=s("9b43"),a=s("626a"),i=s("4bf8"),n=s("9def"),c=s("cd1c");t.exports=function(t,e){var s=1==t,o=2==t,l=3==t,u=4==t,d=6==t,f=5==t||d,v=e||c;return function(e,c,p){for(var h,m,_=i(e),C=a(_),x=r(c,p,3),b=n(C.length),w=0,y=s?v(e,b):o?v(e,0):void 0;b>w;w++)if((f||w in C)&&(m=x(h=C[w],w,_),t))if(s)y[w]=m;else if(m)switch(t){case 3:return!0;case 5:return h;case 6:return w;case 2:y.push(h)}else if(u)return!1;return d?-1:l||u?u:y}}},1169:function(t,e,s){var r=s("2d95");t.exports=Array.isArray||function(t){return"Array"==r(t)}},"1faf":function(t,e,s){"use strict";s.r(e);s("20d6"),s("96cf");var r=s("1da1"),a=s("ca00"),i=s("1321"),n={chart:{type:"donut",offsetX:-50,offsetY:-12},dataLabels:{enabled:!1},legend:{show:!1},labels:["汉纸","妹纸","未设置"],plotOptions:{pie:{donut:{labels:{show:!0,name:{show:!1},value:{offsetY:4,fontSize:"16px",formatter:function(t){return"".concat(t,"人")}},total:{show:!0,showAlways:!0,label:"销售额",formatter:function(t){return"".concat(t.globals.seriesTotals.reduce(function(t,e){return t+e},0),"人")}}}}}},colors:["#6165f7","#EA5455","#bbb"]},c={name:"UserStatistics",components:{VueApexCharts:s.n(i).a},data:function(){return{chartOptions:n,series:[144,80,41]}}},o=(s("e870"),s("2877")),l=Object(o.a)(c,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex"},[s("div",{staticClass:"card card-primary"},[s("div",{staticClass:"flex justify-between"},[s("div",[s("div",{staticClass:"title text-primary"},[t._v("用户总数")]),s("div",{staticClass:"num"},[t._v(t._s(5242))])]),s("div",{staticClass:"icon"},[s("feather",{attrs:{type:"users"}})],1)]),s("div",{staticClass:"flex items-center text-sm"},[s("span",{staticClass:"text-gray"},[t._v("近一周涨幅")]),s("div",{staticClass:"ml-1 flex items-center primary"},[s("feather",{attrs:{size:"18",type:"arrow-up"}}),s("span",{staticClass:"font-bold"},[t._v("4.20%")])],1)])]),s("div",{staticClass:"card ml-4 card-success"},[s("div",{staticClass:"flex justify-between"},[s("div",[s("div",{staticClass:"title text-primary"},[t._v("今日新增")]),s("div",{staticClass:"num"},[t._v(t._s(298))])]),s("div",{staticClass:"icon"},[s("feather",{attrs:{type:"user-plus"}})],1)]),s("div",{staticClass:"flex items-center text-sm"},[s("span",{staticClass:"text-gray"},[t._v("相对于昨天")]),s("div",{staticClass:"ml-1 flex items-center success"},[s("feather",{attrs:{size:"18",type:"arrow-up"}}),s("span",{staticClass:"font-bold"},[t._v("2.50%")])],1)])]),s("div",{staticClass:"card ml-4 card-danger"},[s("div",{staticClass:"flex justify-between"},[s("div",[s("div",{staticClass:"title text-primary"},[t._v("黑名单")]),s("div",{staticClass:"num"},[t._v(t._s(125))])]),s("div",{staticClass:"icon"},[s("feather",{attrs:{type:"user-minus"}})],1)]),s("div",{staticClass:"flex items-center text-sm"},[s("span",{staticClass:"text-gray"},[t._v("最近一月")]),s("div",{staticClass:"ml-1 flex items-center danger"},[s("feather",{attrs:{size:"18",type:"arrow-up"}}),s("span",{staticClass:"font-bold"},[t._v("2.50%")])],1)])]),s("div",{staticClass:"card relative ml-4 p-4 flex justify-end bg-gray"},[s("vue-apex-charts",{staticClass:" absolute left-0",attrs:{height:"165",type:"donut",options:t.chartOptions,series:t.series}}),t._m(0)],1)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"mr-2"},[e("li",{staticClass:"flex items-center text-gray"},[e("div",{staticClass:"w-3 h-3 mr-2 rounded-full bg-primary"}),e("span",[this._v("汉纸")])]),e("li",{staticClass:"flex items-center text-gray"},[e("div",{staticClass:"w-3 h-3 mr-2 rounded-full bg-danger"}),e("span",[this._v("妹纸")])]),e("li",{staticClass:"flex items-center text-gray"},[e("div",{staticClass:"w-3 h-3 mr-2 rounded-full",staticStyle:{background:"#bbb"}}),e("span",[this._v("未知")])])])}],!1,null,"b876d592",null).exports,u=s("6b5b"),d={name:"UserList",components:{UserStatistics:l},data:function(){return{setCreditColor:a.g,userList:[],showPopup:!1}},activated:function(){this.getUserList()},methods:{getUserList:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,s,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(u.d)();case 2:e=t.sent,s=e.code,r=e.data,2e3===s&&(this.userList=r.user_list);case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),contactUser:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(e,s){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.$bind()){t.next=3;break}return this.$vs.notify({time:4e3,title:"请绑定用户",text:"您的管理员账号尚未绑定用户，请前往个人中心进行绑定",color:"warning"}),t.abrupt("return");case 3:if(this.$store.getters["chat/isInChat"](e)){t.next=9;break}return t.next=6,this.$store.dispatch("chat/addContact",e);case 6:if(2e3===t.sent){t.next=9;break}return t.abrupt("return");case 9:this.$store.commit("chat/SET_ACTIVE_CHAT_USER",{_id:e,nickname:s}),this.$store.commit("chat/SET_CHAT_OPEN");case 11:case"end":return t.stop()}},t,this)}));return function(e,s){return t.apply(this,arguments)}}(),blockUser:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(e){var s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(u.f)({user_id:e,is_blocked:!0,info:"该用户存在违规行为"});case 2:s=t.sent,2e3===s.code&&(this.$message.error("用户已禁用，可在用户黑名单中查看"),this.userList.splice(this.userList.findIndex(function(t){return t._id===e}),1));case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),deleteUser:function(){}}},f=Object(o.a)(d,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pt-6"},[s("UserStatistics",{staticClass:"mb-8"}),s("div",{staticClass:"p-4 radius bg-semi overflow-hidden"},[s("vs-table",{attrs:{search:"",pagination:"",noDataText:"暂无数据","max-items":4,data:t.userList},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.data;return t._l(r,function(e,r){return s("vs-tr",{key:r},[s("vs-td",[s("vs-avatar",{attrs:{size:"40px",src:e.avatar_url+"?imageView2/2/w/40"},on:{click:function(s){return t.$router.push({path:"/user-detail",query:{userId:e._id}})}}})],1),s("vs-td",{staticClass:"font-bold"},[t._v(t._s(e.nickname))]),s("vs-td",[s("vs-progress",{attrs:{height:8,title:e.credit_value+"分",percent:e.credit_value/1e3*100,color:t.setCreditColor(e.credit_value)}})],1),s("vs-td",[s("p",{staticClass:"ml-4 font-bold"},[t._v(t._s(e.share_value))])]),s("vs-td",[s("p",[t._v(t._s(t.$dayjs(e.created_at).format("YYYY/MM/DD")))])]),s("vs-td",[s("el-dropdown",[s("i",{staticClass:"el-icon-more text-semi"}),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{nativeOn:{click:function(s){return t.contactUser(e._id,e.nickname)}}},[s("div",{staticClass:"flex-row-center"},[s("feather",{staticClass:"mr-2",attrs:{size:"17","stroke-width":"1.4",type:"message-square"}}),t._v("\n                    联系\n                  ")],1)]),s("el-dropdown-item",{nativeOn:{click:function(s){return t.$router.push({path:"/user-detail",query:{userId:e._id}})}}},[s("div",{staticClass:"flex-row-center"},[s("feather",{staticClass:"mr-2",attrs:{size:"17","stroke-width":"1.4",type:"disc"}}),t._v("\n                    查看\n                  ")],1)]),s("el-dropdown-item",{nativeOn:{click:function(s){return t.blockUser(e._id)}}},[s("div",{staticClass:"flex-row-center"},[s("feather",{staticClass:"mr-2",attrs:{size:"17","stroke-width":"1.4",type:"user-x"}}),t._v("\n                    禁用\n                  ")],1)]),s("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(e){return t.deleteUser()}}},[s("div",{staticClass:"flex-row-center danger"},[s("feather",{staticClass:"mr-2",attrs:{size:"17","stroke-width":"1.4",type:"trash-2"}}),t._v("\n                    删除\n                  ")],1)])],1)],1)],1)],1)})}}])},[s("template",{slot:"thead"},[s("vs-th",[t._v("头像")]),s("vs-th",[t._v("昵称")]),s("vs-th",[t._v("信用度")]),s("vs-th",[t._v("乐享值")]),s("vs-th",[t._v("注册时间")])],1)],2)],1)],1)},[],!1,null,null,null);e.default=f.exports},"20d6":function(t,e,s){"use strict";var r=s("5ca1"),a=s("0a49")(6),i="findIndex",n=!0;i in[]&&Array(1)[i](function(){n=!1}),r(r.P+r.F*n,"Array",{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),s("9c6c")(i)},"45d0":function(t,e,s){},cd1c:function(t,e,s){var r=s("e853");t.exports=function(t,e){return new(r(t))(e)}},e853:function(t,e,s){var r=s("d3f4"),a=s("1169"),i=s("2b4c")("species");t.exports=function(t){var e;return a(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!a(e.prototype)||(e=void 0),r(e)&&null===(e=e[i])&&(e=void 0)),void 0===e?Array:e}},e870:function(t,e,s){"use strict";var r=s("45d0");s.n(r).a}}]);