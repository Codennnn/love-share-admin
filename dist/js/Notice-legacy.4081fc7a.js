(window.webpackJsonp=window.webpackJsonp||[]).push([["Notice"],{"08c0":function(t,e,i){"use strict";var s=i("c5ce");i.n(s).a},"0cb4":function(t,e,i){},"3dbf":function(t,e,i){t.exports=i.p+"img/no_data.af589a76.svg"},7522:function(t,e,i){"use strict";var s=i("0cb4");i.n(s).a},"85fa":function(t,e,i){"use strict";i.r(e);var s=i("2909"),n=(i("96cf"),i("1da1")),a=(i("6762"),i("2fdb"),i("db65")),c=i("4895"),r=[{title:"系统通知"},{title:"我的消息"}],o=[{name:"全部消息",command:{label:"全部消息",type:0},icon:""},{name:"系统",command:{label:"系统消息",type:1},icon:"el-icon-chat-square"},{name:"成功",command:{label:"成功消息",type:2},icon:"el-icon-check"},{name:"提示",command:{label:"提示消息",type:3},icon:"el-icon-news"},{name:"重要",command:{label:"重要消息",type:4},icon:"el-icon-warning-outline"},{name:"未读",command:{label:"未读消息",type:5},icon:"el-icon-bell"}],l={1:{icon:"chat_bubble_outline",color:"primary"},2:{icon:"done_outline",color:"success"},3:{icon:"help_outline",color:"warning"},4:{icon:"error_outline",color:"danger"}},u={name:"Notice",components:{FlipList:a.a},data:function(){return{list:r,menuItem:o,noticeType:l,currentActive:"系统通知",label:"全部消息",rawData:[],dataList:[],select:[],deleteId:null,selectAll:!1,showAction:!1,stop:!1,page:1,pageSize:10}},watch:{select:function(){this.isAllSelect?this.selectAll=!0:this.selectAll=!1},selectAll:function(t){t?this.onSelectAll():this.isAllSelect&&this.onCancelSelectAll()}},computed:{isAllSelect:function(){var t=this;return this.dataList.every(function(e){return t.select.includes(e._id)})},showCheckBox:function(){return this.showAction},isUnread:function(){var t=this;return function(e){return t.$store.getters["notice/isUnread"](e)}}},methods:{getNoticeList:function(t){var e=this;this.$loading(Object(n.a)(regeneratorRuntime.mark(function i(){var n,a,r,o;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return e.stop=!0,i.next=3,Object(c.c)({page:t,page_size:e.pageSize});case 3:n=i.sent,a=n.code,r=n.data,2e3===a&&((o=e.rawData).push.apply(o,Object(s.a)(r.notice_list)),e.dataList=Object(s.a)(e.rawData),e.page+=1,e.stop=!1,r.notice_list.length<e.pageSize&&(e.stop=!0));case 7:case"end":return i.stop()}},i)})),{container:"#message-with-loading",scale:1,type:"point"},null,function(){e.stop=!0})},loadMore:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.stop||this.getNoticeList(this.page);case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),setTime:function(t){var e=this.$dayjs(t);return this.$dayjs().year()===e.year()?e.format("M月DD日"):e.format("YYYY年MM月DD日")},refreshNoticeList:function(){this.label="全部消息",this.page=1,this.rawData=[],this.getNoticeList(this.page)},setAllNoticesRead:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.select.length>0)){t.next=6;break}return t.next=3,Object(c.e)({notice_id_list:this.select});case 3:e=t.sent,2e3===e.code&&(this.$store.dispatch("notice/getUnreadNotices"),this.$vs.notify({title:"已设为已读",text:"该消息已被设置为已读消息"}));case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),deleteNotice:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(c.b)({notice_id:this.deleteId});case 2:e=t.sent,2e3===e.code&&(this.$store.dispatch("notice/getUnreadNotices"),this.refreshNoticeList());case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),deleteManyNotices:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.select.length>0)){t.next=11;break}return t.next=3,Object(c.a)({notice_id_list:this.select});case 3:if(e=t.sent,2e3!==e.code){t.next=11;break}return this.$store.dispatch("notice/getUnreadNotices"),this.handleCommand({label:"全部消息"}),t.next=10,this.refreshNoticeList();case 10:this.selectAll=!1;case 11:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),onSelectAll:function(){this.select=this.dataList.map(function(t){return t._id})},onCancelSelectAll:function(){this.select=[]},handleCommand:function(t){var e=t.label,i=t.type;this.label=e,this.dataList=0===i?this.rawData:5===i?this.rawData.filter(function(t){return!t.is_read}):this.rawData.filter(function(t){return t.type===i})}}},d=(i("08c0"),i("2877")),p=Object(d.a)(u,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex pt-8"},[s("div",{staticClass:"w-1/4 pr-5"},[s("div",{staticClass:"p-2 bg-gray radius"},[s("div",{staticClass:"p-1"},[s("div",{staticClass:"py-3 text-primary text-lg font-bold cursor-default",staticStyle:{"box-shadow":"0 7px 7px -5px rgba(0, 0, 0, 0.08)"}},[t._v("消息中心")]),s("ul",{staticClass:"pt-4"},t._l(t.list,function(e,i){return s("li",{key:i,staticClass:"li-item px-3 py-1 text-gray cursor-pointer",class:{"text-primary":t.currentActive===e.title}},[t._v("\n            "+t._s(e.title)+"\n          ")])}),0)])])]),s("div",{staticClass:"w-3/4"},[s("div",{staticClass:"p-4 bg-main radius vs-con-loading__container",attrs:{id:"message-with-loading"}},[s("div",{staticClass:"mb-4 flex items-center justify-end"},[s("el-dropdown",{staticClass:"mr-auto",on:{command:t.handleCommand}},[s("span",{staticClass:"el-dropdown-link text-semi"},[t._v("\n            "+t._s(t.label)),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.menuItem,function(e,i){return s("el-dropdown-item",{key:i,attrs:{command:e.command,icon:e.icon}},[t._v("\n              "+t._s(e.name)+"\n            ")])}),1)],1),s("div",{staticClass:"relative flex items-center"},[s("div",{staticClass:"action-line absolute flex items-center text-xl text-semi bg-gray",class:{show:t.showAction}},[s("vs-checkbox",{attrs:{title:"全选"},model:{value:t.selectAll,callback:function(e){t.selectAll=e},expression:"selectAll"}}),s("i",{staticClass:"el-icon-finished mx-2 cursor-pointer",attrs:{title:"设为已读"},on:{click:function(e){return t.setAllNoticesRead()}}}),s("i",{staticClass:"el-icon-delete mx-2 cursor-pointer",attrs:{title:"删除"},on:{click:function(e){return t.deleteManyNotices()}}}),s("i",{staticClass:"el-icon-close cursor-pointer",attrs:{title:"关闭"},on:{click:function(e){t.showAction=!1}}})],1),s("vs-icon",{directives:[{name:"show",rawName:"v-show",value:!t.showAction,expression:"!showAction"}],staticClass:"mx-1 text-gray cursor-pointer",attrs:{title:"管理",size:"25px",icon:"settings_ethernet"},nativeOn:{click:function(e){t.showAction=!0}}})],1),s("vs-icon",{staticClass:"text-gray cursor-pointer",attrs:{title:"刷新",size:"25px",icon:"refresh"},nativeOn:{click:function(e){t.selectAll=!1,t.showAction=!1,t.refreshNoticeList()}}})],1),s("FlipList",{directives:[{name:"show",rawName:"v-show",value:t.dataList.length>0,expression:"dataList.length > 0"},{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticStyle:{height:"650px",overflow:"auto"},attrs:{"infinite-scroll-disabled":t.stop}},t._l(t.dataList,function(e,i){return s("li",{key:i,staticClass:"mb-3 p-2 flex items-center radius",staticStyle:{transition:"all 0.5s"},attrs:{"data-id":e._id}},[s("div",[s("div",{staticClass:"mb-2 flex items-center"},[s("vs-icon",{attrs:{size:"small",icon:t.noticeType[e.type].icon,color:t.noticeType[e.type].color}}),s("span",{staticClass:"ml-2",class:[""+t.noticeType[e.type].color,{"font-bold":t.isUnread(e._id)}]},[t._v("\n                "+t._s(e.title)+"\n              ")])],1),s("div",{staticClass:"px-8 text-semi",domProps:{innerHTML:t._s(e.content)}})]),s("div",{staticClass:"ml-auto"},[s("div",{staticClass:"ml-4 text-gray text-xs"},[t._v("\n              "+t._s(t.setTime(e.created_at))+"\n            ")]),s("vs-checkbox",{directives:[{name:"show",rawName:"v-show",value:t.showCheckBox,expression:"showCheckBox"}],attrs:{"vs-value":e._id},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}})],1)])}),0),t.dataList.length<=0?s("div",{staticClass:"mt-5 py-10 flex-col-center radius bg-gray"},[s("img",{staticClass:"w-48 mb-5",attrs:{src:i("3dbf")}}),s("p",{staticClass:"text-semi"},[t._v("暂无通知")])]):t._e()],1)])])},[],!1,null,"364331da",null);e.default=p.exports},c5ce:function(t,e,i){},db65:function(t,e,i){"use strict";var s={name:"FlipList",props:{tag:{type:String,default:"ul"}}},n=(i("7522"),i("2877")),a=Object(n.a)(s,function(){var t=this.$createElement;return(this._self._c||t)("transition-group",{attrs:{name:"flip-list",tag:this.tag}},[this._t("default")],2)},[],!1,null,null,null);e.a=a.exports}}]);