(window.webpackJsonp=window.webpackJsonp||[]).push([["Log"],{"28a9":function(t,e,s){"use strict";s.r(e);var a=s("1da1"),o=s("284b");var i={name:"Log",data:()=>({logList:[]}),created(){this.getLogList()},methods:{getLogList(){var t=this;return Object(a.a)(function*(){const e=yield Object(o.a)({url:"/log/list",method:"get",params:i}),s=e.code,a=e.data.log_list;var i;2e3===s&&(t.logList=a)})()},deleteLog(){var t=this;return Object(a.a)(function*(){const e=t.logList.map(t=>t._id);var s;2e3===(yield(s={log_id_list:e},Object(o.a)({url:"/log/delete",method:"delete",data:s}))).code&&t.getLogList()})()}}},n=(s("d413"),s("2877")),r=Object(n.a)(i,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pt-6"},[s("vs-button",{attrs:{color:"danger"},on:{click:function(e){return t.deleteLog()}}},[t._v("清空日志")]),s("vs-table",{staticClass:"px-2 pb-4 radius overflow-hidden",attrs:{pagination:"","max-items":"15",noDataText:"暂无数据",data:t.logList},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data;return t._l(a,function(e){return s("vs-tr",{key:e._id},[s("vs-td",[s("div",{staticClass:"text-overflow-clip",attrs:{title:JSON.stringify(e.err)}},[t._v("\n            "+t._s(e.err)+"\n          ")])]),s("vs-td",[t._v(t._s(e.detail.component_name))]),s("vs-td",[t._v(t._s(e.detail.route))]),s("vs-td",[t._v(t._s(e.info))]),s("vs-td",[t._v(t._s(t.$timeDiff(e.created_at)))])],1)})}}])},[s("template",{slot:"thead"},[s("vs-th",[t._v("错误信息")]),s("vs-th",[t._v("所在组件")]),s("vs-th",[t._v("路由")]),s("vs-th",[t._v("摘要")]),s("vs-th",[t._v("发生于")])],1)],2)],1)},[],!1,null,"30772e24",null);e.default=r.exports},c6d4:function(t,e,s){},d413:function(t,e,s){"use strict";var a=s("c6d4");s.n(a).a}}]);