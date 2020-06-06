(window.webpackJsonp=window.webpackJsonp||[]).push([["OrderList"],{"21eb":function(e,t,r){"use strict";var n=r("e2ca");r.n(n).a},4127:function(e,t,r){"use strict";var n=r("d233"),o=r("b313"),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},s=Array.isArray,c=Array.prototype.push,l=function(e,t){c.apply(e,s(t)?t:[t])},u=Date.prototype.toISOString,d=o.default,f={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:d,formatter:o.formatters[d],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},p=function e(t,r,o,i,a,c,u,d,p,h,m,y,v){var g,b=t;if("function"==typeof u?b=u(r,b):b instanceof Date?b=h(b):"comma"===o&&s(b)&&(b=b.join(",")),null===b){if(i)return c&&!y?c(r,f.encoder,v,"key"):r;b=""}if("string"==typeof(g=b)||"number"==typeof g||"boolean"==typeof g||"symbol"==typeof g||"bigint"==typeof g||n.isBuffer(b))return c?[m(y?r:c(r,f.encoder,v,"key"))+"="+m(c(b,f.encoder,v,"value"))]:[m(r)+"="+m(String(b))];var O,w=[];if(void 0===b)return w;if(s(u))O=u;else{var j=Object.keys(b);O=d?j.sort(d):j}for(var _=0;_<O.length;++_){var x=O[_];a&&null===b[x]||(s(b)?l(w,e(b[x],"function"==typeof o?o(r,x):r,o,i,a,c,u,d,p,h,m,y,v)):l(w,e(b[x],r+(p?"."+x:"["+x+"]"),o,i,a,c,u,d,p,h,m,y,v)))}return w};e.exports=function(e,t){var r,n=e,c=function(e){if(!e)return f;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||f.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o.default;if(void 0!==e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],a=f.filter;return("function"==typeof e.filter||s(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:f.addQueryPrefix,allowDots:void 0===e.allowDots?f.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:f.charsetSentinel,delimiter:void 0===e.delimiter?f.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:f.encode,encoder:"function"==typeof e.encoder?e.encoder:f.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:f.encodeValuesOnly,filter:a,formatter:n,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:f.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:f.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:f.strictNullHandling}}(t);"function"==typeof c.filter?n=(0,c.filter)("",n):s(c.filter)&&(r=c.filter);var u,d=[];if("object"!=typeof n||null===n)return"";u=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var h=a[u];r||(r=Object.keys(n)),c.sort&&r.sort(c.sort);for(var m=0;m<r.length;++m){var y=r[m];c.skipNulls&&null===n[y]||l(d,p(n[y],y,h,c.strictNullHandling,c.skipNulls,c.encode?c.encoder:null,c.filter,c.sort,c.allowDots,c.serializeDate,c.formatter,c.encodeValuesOnly,c.charset))}var v=d.join(c.delimiter),g=!0===c.addQueryPrefix?"?":"";return c.charsetSentinel&&("iso-8859-1"===c.charset?g+="utf8=%26%2310003%3B&":g+="utf8=%E2%9C%93&"),v.length>0?g+v:""}},4328:function(e,t,r){"use strict";var n=r("4127"),o=r("9e6a"),i=r("b313");e.exports={formats:i,parse:o,stringify:n}},5408:function(e,t,r){"use strict";r.r(t);r("ac6a"),r("5df3"),r("96cf");var n=r("1da1"),o=r("795d"),i=r("ca00"),a=r("7059"),s=[{statistic:3200,label:"交易额",color:"primary",icon:"dollar-sign"},{statistic:800,label:"成交量",color:"warning",icon:"check-circle"},{statistic:1900,label:"订单数",color:"success",icon:"bar-chart-2"}],c={huabei:"余额支付",weixin:"微信支付",zhifubao:"支付宝支付",yinlian:"银行卡支付"},l={1:{text:"进行中",color:"primary"},2:{text:"已完成",color:"success"},3:{text:"派送中",color:"warning"},4:{text:"已取消",color:"danger"}},u={shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-6048e5),e.$emit("pick",[r,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-2592e6),e.$emit("pick",[r,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-7776e6),e.$emit("pick",[r,t])}}]},d={name:"OrderList",components:{AreaChart:o.a},data:function(){return{status:l,payments:c,pickerOptions:u,charts:[],date:[],orderList:[],pagination:{},searchText:""}},computed:{totalGoodsNum:function(){return this.orderList.reduce(function(e,t){return e+t.sub_order.reduce(function(e,t){return e+t.goods_list.filter(function(e){return e.goods}).length},0)},0)}},activated:function(){this.initCharts(),this.getOrderList()},methods:{initCharts:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(){var t,r,n=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=["#6165f7","#FF9F43","#5DC76F"],e.next=3,Promise.all([Object(a.e)(),Object(a.f)(),Object(a.d)()]);case 3:r=e.sent,this.charts=s.map(function(e,o){var a=n.$cloneDeepWith(i.a);return a.colors=[t[o]],Object.assign(e,{options:a},{series:[r[o].data]})});case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),getOrderList:function(){var e=this;this.$loading(Object(n.a)(regeneratorRuntime.mark(function t(){var r,n,o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(a.b)({page:1,page_size:100});case 2:r=t.sent,n=r.code,o=r.data,2e3===n&&(e.orderList=o.order_list,e.pagination=o.pagination);case 6:case"end":return t.stop()}},t)})),{type:"point",container:"#table-loading",scale:1})},onDateChange:function(e){var t=this;e?this.$loading(Object(n.a)(regeneratorRuntime.mark(function r(){var n,o,i,s;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.map(function(e){return t.$dayjs(e).format("YYYY-MM-DD")}),r.next=3,Object(a.c)({date_range:n,page:1,page_size:100});case 3:o=r.sent,i=o.code,s=o.data,2e3===i&&(t.orderList=s.order_list,t.pagination=s.pagination);case 7:case"end":return r.stop()}},r)})),{type:"point",container:"#table-loading",scale:1}):this.getOrderList()},viewOrderDetail:function(e,t){this.$router.push({path:"/order-detail",query:{orderId:e,subId:t}})},deleteOrder:function(e){this.orderList.forEach(function(t,r,n){t._id===e&&n.splice(r,1)})},onCopy:function(e){var t=this;this.$copyText(e).then(function(){t.$message("已复制订单号：".concat(e,"  🎉"))})}}},f=(r("21eb"),r("2877")),p=Object(f.a)(d,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.charts.length>0?r("div",{staticClass:"grid pt-3 pb-6"},e._l(e.charts,function(e,t){return r("div",{key:t,staticClass:"bg-semi radius light-shadow overflow-hidden"},[r("area-chart",{attrs:{statistic:e.statistic,label:e.label,color:e.color,options:e.options,series:e.series}},[r("feather",{class:e.color,attrs:{slot:"icon",type:e.icon},slot:"icon"})],1)],1)}),0):e._e(),r("div",{staticClass:"bg-white rounded-lg"}),r("div",{staticClass:"radius vs-con-loading__container",attrs:{id:"table-loading"}},[r("vs-table",{attrs:{pagination:"",noDataText:"暂无数据","max-items":10,data:e.orderList},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.data;return[e._l(n,function(t){return[e._l(t.sub_order,function(n){return[e._l(n.goods_list,function(o){return[o.goods?r("vs-tr",{key:o._id,nativeOn:{dblclick:function(r){return e.viewOrderDetail(t._id,n._id)}}},[r("vs-td",[e._v(e._s(o.goods.name))]),r("vs-td",[r("span",{staticClass:"cursor-pointer",on:{click:function(t){return e.$router.push({path:"/user-detail",query:{userId:o.goods.buyer._id}})}}},[e._v(e._s(o.goods.buyer.nickname))])]),r("vs-td",[r("span",{staticClass:"primary cursor-pointer",on:{click:function(t){return e.$router.push({path:"/user-detail",query:{userId:o.goods.seller._id}})}}},[e._v("@"+e._s(o.goods.seller.nickname))])]),r("vs-td",{staticClass:"font-bold"},[e._v("\n                  ￥"+e._s(e.$numFixed(o.goods.price))+"\n                ")]),r("vs-td",{attrs:{title:e.$dayjs(o.goods.created_at).format("YYYY/MM/DD HH:mm:ss")}},[e._v("\n                  "+e._s(e.$timeDiff(o.goods.created_at))+"\n                ")]),r("vs-td",{staticClass:"font-bold"},[e._v(e._s(e.payments[t.payment]))]),r("vs-td",[r("vs-chip",{class:e.status[n.status].color,style:{background:"rgba(var(--vs-"+e.status[n.status].color+"), 0.12)"}},[e._v("\n                    "+e._s(e.status[n.status].text)+"\n                  ")])],1),r("vs-td",[r("el-dropdown",[r("i",{staticClass:"el-icon-more px-2 text-lg text-gray"}),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{nativeOn:{click:function(t){return e.onCopy(n._id)}}},[e._v("\n                        复制单号\n                      ")]),r("el-dropdown-item",{nativeOn:{click:function(r){return e.viewOrderDetail(t._id,n._id)}}},[e._v("\n                        查看详情\n                      ")]),r("el-dropdown-item",{staticClass:"danger",attrs:{divider:""},nativeOn:{click:function(r){return e.deleteOrder(t._id)}}},[e._v("\n                        删除订单\n                      ")])],1)],1)],1)],1):e._e()]})]})]})]}}])},[r("template",{slot:"header"},[r("div",{staticClass:"w-full flex flex-wrap items-center p-4"},[r("div",{staticClass:"text-xl text-primary font-semibold"},[e._v("订单列表")]),r("div",{staticClass:"ml-auto mr-4 text-sm text-semi"},[e._v("\n            共查询到 "+e._s(e.pagination.total)+" 个订单, "+e._s(e.totalGoodsNum)+" 个商品\n          ")]),r("el-date-picker",{attrs:{"unlink-panels":"",type:"daterange",align:"right","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},on:{change:e.onDateChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1)]),r("template",{slot:"thead"},[r("vs-th",[e._v("商品名称")]),r("vs-th",[e._v("买家")]),r("vs-th",[e._v("卖家")]),r("vs-th",[e._v("总价")]),r("vs-th",[e._v("创建时间")]),r("vs-th",[e._v("支付方式")]),r("vs-th",[e._v("状态")]),r("vs-th")],1)],2)],1)])},[],!1,null,"346b761b",null);t.default=p.exports},7059:function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"c",function(){return s}),r.d(t,"a",function(){return c}),r.d(t,"e",function(){return l}),r.d(t,"f",function(){return u}),r.d(t,"d",function(){return d});var n=r("4328"),o=r.n(n),i=r("284b");function a(e){return Object(i.a)({url:"/order/list",method:"get",params:e})}function s(e){return Object(i.a)({url:"/order/list_by_date_range",method:"get",params:e,paramsSerializer:function(e){return o.a.stringify(e,{indices:!1})}})}function c(e){return Object(i.a)({url:"/order/detail",method:"get",params:e})}function l(){return Object(i.a)({url:"/order/transaction",method:"get"})}function u(){return Object(i.a)({url:"/order/volume",method:"get"})}function d(){return Object(i.a)({url:"/order/num",method:"get"})}},"9e6a":function(e,t,r){"use strict";var n=r("d233"),o=Object.prototype.hasOwnProperty,i=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},s=function(e){return e.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},c=function(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/g,a=r.depth>0&&/(\[[^[\]]*])/.exec(n),s=a?n.slice(0,a.index):n,c=[];if(s){if(!r.plainObjects&&o.call(Object.prototype,s)&&!r.allowPrototypes)return;c.push(s)}for(var l=0;r.depth>0&&null!==(a=i.exec(n))&&l<r.depth;){if(l+=1,!r.plainObjects&&o.call(Object.prototype,a[1].slice(1,-1))&&!r.allowPrototypes)return;c.push(a[1])}return a&&c.push("["+n.slice(a.index)+"]"),function(e,t,r){for(var n=t,o=e.length-1;o>=0;--o){var i,a=e[o];if("[]"===a&&r.parseArrays)i=[].concat(n);else{i=r.plainObjects?Object.create(null):{};var s="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,c=parseInt(s,10);r.parseArrays||""!==s?!isNaN(c)&&a!==s&&String(c)===s&&c>=0&&r.parseArrays&&c<=r.arrayLimit?(i=[])[c]=n:i[s]=n:i={0:n}}n=i}return n}(c,t,r)}};e.exports=function(e,t){var r=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t=void 0===e.charset?a.charset:e.charset;return{allowDots:void 0===e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"==typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"==typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"==typeof e.comma?e.comma:a.comma,decoder:"function"==typeof e.decoder?e.decoder:a.decoder,delimiter:"string"==typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"==typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"==typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"==typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}}(t);if(""===e||null==e)return r.plainObjects?Object.create(null):{};for(var l="string"==typeof e?function(e,t){var r,c={},l=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,u=t.parameterLimit===1/0?void 0:t.parameterLimit,d=l.split(t.delimiter,u),f=-1,p=t.charset;if(t.charsetSentinel)for(r=0;r<d.length;++r)0===d[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===d[r]?p="utf-8":"utf8=%26%2310003%3B"===d[r]&&(p="iso-8859-1"),f=r,r=d.length);for(r=0;r<d.length;++r)if(r!==f){var h,m,y=d[r],v=y.indexOf("]="),g=-1===v?y.indexOf("="):v+1;-1===g?(h=t.decoder(y,a.decoder,p,"key"),m=t.strictNullHandling?null:""):(h=t.decoder(y.slice(0,g),a.decoder,p,"key"),m=t.decoder(y.slice(g+1),a.decoder,p,"value")),m&&t.interpretNumericEntities&&"iso-8859-1"===p&&(m=s(m)),m&&"string"==typeof m&&t.comma&&m.indexOf(",")>-1&&(m=m.split(",")),y.indexOf("[]=")>-1&&(m=i(m)?[m]:m),o.call(c,h)?c[h]=n.combine(c[h],m):c[h]=m}return c}(e,r):e,u=r.plainObjects?Object.create(null):{},d=Object.keys(l),f=0;f<d.length;++f){var p=d[f],h=c(p,l[p],r);u=n.merge(u,h,r)}return n.compact(u)}},b313:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,i=r("d233"),a={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=i.assign({default:a.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}}},a)},d233:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r};e.exports={arrayToObject:a,assign:function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var i=t[n],a=i.obj[i.prop],s=Object.keys(a),c=0;c<s.length;++c){var l=s[c],u=a[l];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:a,prop:l}),r.push(u))}return function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(o(r)){for(var n=[],i=0;i<r.length;++i)void 0!==r[i]&&n.push(r[i]);t.obj[t.prop]=n}}}(t),e},decode:function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(e){return n}},encode:function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"==typeof e?n=Symbol.prototype.toString.call(e):"string"!=typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var o="",a=0;a<n.length;++a){var s=n.charCodeAt(a);45===s||46===s||95===s||126===s||s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122?o+=n.charAt(a):s<128?o+=i[s]:s<2048?o+=i[192|s>>6]+i[128|63&s]:s<55296||s>=57344?o+=i[224|s>>12]+i[128|s>>6&63]+i[128|63&s]:(a+=1,s=65536+((1023&s)<<10|1023&n.charCodeAt(a)),o+=i[240|s>>18]+i[128|s>>12&63]+i[128|s>>6&63]+i[128|63&s])}return o},isBuffer:function(e){return!(!e||"object"!=typeof e||!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e)))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,r,i){if(!r)return t;if("object"!=typeof r){if(o(t))t.push(r);else{if(!t||"object"!=typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!=typeof t)return[t].concat(r);var s=t;return o(t)&&!o(r)&&(s=a(t,i)),o(t)&&o(r)?(r.forEach(function(r,o){if(n.call(t,o)){var a=t[o];a&&"object"==typeof a&&r&&"object"==typeof r?t[o]=e(a,r,i):t.push(r)}else t[o]=r}),t):Object.keys(r).reduce(function(t,o){var a=r[o];return n.call(t,o)?t[o]=e(t[o],a,i):t[o]=a,t},s)}}},e2ca:function(e,t,r){}}]);