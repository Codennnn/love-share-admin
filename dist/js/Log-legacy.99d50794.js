(window.webpackJsonp=window.webpackJsonp||[]).push([["Log"],{"28a9":function(t,e,n){"use strict";n.r(e);n("96cf");var r=n("3b8d"),a=n("284b");var s={name:"Log",data:function(){return{logList:[]}},created:function(){this.getLogList()},methods:{getLogList:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s=void 0,Object(a.a)({url:"/log/list",method:"get",params:s});case 2:e=t.sent,n=e.code,r=e.data.log_list,2e3===n&&(this.logList=r);case 6:case"end":return t.stop()}var s},t,this)}));return function(){return t.apply(this,arguments)}}(),deleteLog:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.logList.map(function(t){return t._id}),t.next=3,r={log_id_list:e},Object(a.a)({url:"/log/delete",method:"delete",data:r});case 3:n=t.sent,2e3===n.code&&this.getLogList();case 6:case"end":return t.stop()}var r},t,this)}));return function(){return t.apply(this,arguments)}}()}},i=(n("d413"),n("2877")),o=Object(i.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pt-6"},[n("vs-button",{attrs:{color:"danger"},on:{click:function(e){return t.deleteLog()}}},[t._v("清空日志")]),n("vs-table",{staticClass:"px-2 pb-4 radius overflow-hidden",attrs:{pagination:"","max-items":"15",noDataText:"暂无数据",data:t.logList},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.data;return t._l(r,function(e){return n("vs-tr",{key:e._id},[n("vs-td",[n("div",{staticClass:"text-overflow-clip",attrs:{title:JSON.stringify(e.err)}},[t._v("\n            "+t._s(e.err)+"\n          ")])]),n("vs-td",[t._v(t._s(e.detail.component_name))]),n("vs-td",[t._v(t._s(e.detail.route))]),n("vs-td",[t._v(t._s(e.info))]),n("vs-td",[t._v(t._s(t.$timeDiff(e.created_at)))])],1)})}}])},[n("template",{slot:"thead"},[n("vs-th",[t._v("错误信息")]),n("vs-th",[t._v("所在组件")]),n("vs-th",[t._v("路由")]),n("vs-th",[t._v("摘要")]),n("vs-th",[t._v("发生于")])],1)],2)],1)},[],!1,null,"30772e24",null);e.default=o.exports},"34bd":function(t,e,n){},d413:function(t,e,n){"use strict";var r=n("34bd");n.n(r).a}}]);