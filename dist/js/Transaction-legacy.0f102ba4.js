(window.webpackJsonp=window.webpackJsonp||[]).push([["Transaction"],{"1c4c":function(t,a,e){"use strict";var s=e("9b43"),n=e("5ca1"),r=e("4bf8"),c=e("1fa8"),i=e("33a4"),o=e("9def"),l=e("f1ae"),d=e("27ee");n(n.S+n.F*!e("5cc5")(function(t){Array.from(t)}),"Array",{from:function(t){var a,e,n,u,v=r(t),f="function"==typeof this?this:Array,_=arguments.length,m=_>1?arguments[1]:void 0,p=void 0!==m,h=0,y=d(v);if(p&&(m=s(m,_>2?arguments[2]:void 0,2)),null==y||f==Array&&i(y))for(e=new f(a=o(v.length));a>h;h++)l(e,h,p?m(v[h],h):v[h]);else for(u=y.call(v),e=new f;!(n=u.next()).done;h++)l(e,h,p?c(u,m,[n.value,h],!0):n.value);return e.length=h,e}})},7488:function(t,a,e){"use strict";e.r(a);e("5df3"),e("1c4c"),e("ac6a");var s={1:"余额支付",2:"微信支付",3:"支付宝支付",4:"银行卡支付"},n={1:{color:"success",text:"支付成功"},2:{color:"warning",text:"待支付"},3:{color:"danger",text:"取消支付"}},r={name:"Transaction",data:function(){return{payments:s,status:n,recordList:[]}},created:function(){var t=[],a=[{_id:"1257896452453",payment:1,amount:58,status:1,created_at:1657896452453,seller:{nickname:"刘德华"}},{_id:"1975466452453",payment:2,amount:69,status:1,created_at:1657896452783,seller:{nickname:"张学友"}},{_id:"1975465647353",payment:3,amount:99,status:2,created_at:1657897862783,seller:{nickname:"郭富城"}},{_id:"1145685647353",payment:3,amount:104,status:3,created_at:0xf1289ed5e7f,seller:{nickname:"黎明"}}];Array.from({length:10}).forEach(function(){t.push.apply(t,a)}),this.recordList=t},methods:{}},c=e("2877"),i=Object(c.a)(r,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"radius vs-con-loading__container",attrs:{id:"table-loading"}},[e("vs-table",{attrs:{pagination:"",noDataText:"暂无数据","max-items":15,data:t.recordList},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.data;return t._l(s,function(a,s){return e("vs-tr",{key:s},[e("vs-td",[t._v(t._s(a._id))]),e("vs-td",[t._v(t._s(a.seller.nickname))]),e("vs-td",{staticClass:"font-bold"},[t._v("\n            ￥"+t._s(t.$numFixed(a.amount))+"\n          ")]),e("vs-td",[t._v(t._s(t.payments[a.payment]))]),e("vs-td",[e("div",{class:t.status[a.status].color},[t._v(t._s(t.status[a.status].text))])]),e("vs-td",[t._v("\n            "+t._s(t.$dayjs(a.created_at).format("YYYY-MM-DD HH:mm:ss"))+"\n          ")])],1)})}}])},[e("template",{slot:"header"},[e("div",{staticClass:"w-full flex flex-wrap items-center p-4"},[e("div",{staticClass:"text-xl text-primary font-semibold"},[t._v("交易记录")])])]),e("template",{slot:"thead"},[e("vs-th",[t._v("单号")]),e("vs-th",[t._v("账号")]),e("vs-th",[t._v("金额")]),e("vs-th",[t._v("支付方式")]),e("vs-th",[t._v("状态")]),e("vs-th",[t._v("创建时间")])],1)],2)],1)])},[],!1,null,null,null);a.default=i.exports},f1ae:function(t,a,e){"use strict";var s=e("86cc"),n=e("4630");t.exports=function(t,a,e){a in t?s.f(t,a,n(0,e)):t[a]=e}}}]);