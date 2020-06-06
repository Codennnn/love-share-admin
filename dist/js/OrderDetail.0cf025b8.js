(window.webpackJsonp=window.webpackJsonp||[]).push([["OrderDetail"],{4127:function(t,e,r){"use strict";var i=r("d233"),s=r("b313"),a=Object.prototype.hasOwnProperty,n={brackets:function(t){return t+"[]"},comma:"comma",indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},o=Array.isArray,l=Array.prototype.push,c=function(t,e){l.apply(t,o(e)?e:[e])},d=Date.prototype.toISOString,u=s.default,f={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:i.encode,encodeValuesOnly:!1,format:u,formatter:s.formatters[u],indices:!1,serializeDate:function(t){return d.call(t)},skipNulls:!1,strictNullHandling:!1},p=function t(e,r,s,a,n,l,d,u,p,v,m,y,b){var h,g=e;if("function"==typeof d?g=d(r,g):g instanceof Date?g=v(g):"comma"===s&&o(g)&&(g=g.join(",")),null===g){if(a)return l&&!y?l(r,f.encoder,b,"key"):r;g=""}if("string"==typeof(h=g)||"number"==typeof h||"boolean"==typeof h||"symbol"==typeof h||"bigint"==typeof h||i.isBuffer(g))return l?[m(y?r:l(r,f.encoder,b,"key"))+"="+m(l(g,f.encoder,b,"value"))]:[m(r)+"="+m(String(g))];var _,O=[];if(void 0===g)return O;if(o(d))_=d;else{var C=Object.keys(g);_=u?C.sort(u):C}for(var j=0;j<_.length;++j){var x=_[j];n&&null===g[x]||(o(g)?c(O,t(g[x],"function"==typeof s?s(r,x):r,s,a,n,l,d,u,p,v,m,y,b)):c(O,t(g[x],r+(p?"."+x:"["+x+"]"),s,a,n,l,d,u,p,v,m,y,b)))}return O};t.exports=function(t,e){var r,i=t,l=function(t){if(!t)return f;if(null!==t.encoder&&void 0!==t.encoder&&"function"!=typeof t.encoder)throw new TypeError("Encoder has to be a function.");var e=t.charset||f.charset;if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=s.default;if(void 0!==t.format){if(!a.call(s.formatters,t.format))throw new TypeError("Unknown format option provided.");r=t.format}var i=s.formatters[r],n=f.filter;return("function"==typeof t.filter||o(t.filter))&&(n=t.filter),{addQueryPrefix:"boolean"==typeof t.addQueryPrefix?t.addQueryPrefix:f.addQueryPrefix,allowDots:void 0===t.allowDots?f.allowDots:!!t.allowDots,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:f.charsetSentinel,delimiter:void 0===t.delimiter?f.delimiter:t.delimiter,encode:"boolean"==typeof t.encode?t.encode:f.encode,encoder:"function"==typeof t.encoder?t.encoder:f.encoder,encodeValuesOnly:"boolean"==typeof t.encodeValuesOnly?t.encodeValuesOnly:f.encodeValuesOnly,filter:n,formatter:i,serializeDate:"function"==typeof t.serializeDate?t.serializeDate:f.serializeDate,skipNulls:"boolean"==typeof t.skipNulls?t.skipNulls:f.skipNulls,sort:"function"==typeof t.sort?t.sort:null,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:f.strictNullHandling}}(e);"function"==typeof l.filter?i=(0,l.filter)("",i):o(l.filter)&&(r=l.filter);var d,u=[];if("object"!=typeof i||null===i)return"";d=e&&e.arrayFormat in n?e.arrayFormat:e&&"indices"in e?e.indices?"indices":"repeat":"indices";var v=n[d];r||(r=Object.keys(i)),l.sort&&r.sort(l.sort);for(var m=0;m<r.length;++m){var y=r[m];l.skipNulls&&null===i[y]||c(u,p(i[y],y,v,l.strictNullHandling,l.skipNulls,l.encode?l.encoder:null,l.filter,l.sort,l.allowDots,l.serializeDate,l.formatter,l.encodeValuesOnly,l.charset))}var b=u.join(l.delimiter),h=!0===l.addQueryPrefix?"?":"";return l.charsetSentinel&&("iso-8859-1"===l.charset?h+="utf8=%26%2310003%3B&":h+="utf8=%E2%9C%93&"),b.length>0?h+b:""}},4328:function(t,e,r){"use strict";var i=r("4127"),s=r("9e6a"),a=r("b313");t.exports={formats:a,parse:s,stringify:i}},"4e5d":function(t,e,r){},"5a4f":function(t,e,r){"use strict";r.r(e);r("a481");var i=r("1da1"),s=r("9d63"),a=r.n(s),n={name:"OrderStep",props:{stepsData:{type:Object,required:!0}}},o=r("2877"),l=Object(o.a)(n,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-steps",{attrs:{"align-center":"",active:t.stepsData.active}},t._l(t.stepsData.steps,function(e,i){return r("el-step",{key:i,attrs:{title:e.title}},[r("div",{attrs:{slot:"description"},slot:"description"},[t._v(t._s(e.description))])])}),1)},[],!1,null,null,null).exports,c={name:"OrderGoodsList",props:{goodsList:{type:Array,required:!0}}},d=Object(o.a)(c,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vs-table",{staticClass:"bg-white",attrs:{noDataText:"暂无数据",data:t.goodsList},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.data;return t._l(i,function(e,i){return r("vs-tr",{key:i},[r("vs-td",[r("el-image",{staticClass:"w-20 h-20 rounded-lg base-shadow",attrs:{fit:"contain",src:e.goods.img_list[0]+"?imageView2/2/w/100"}})],1),r("vs-td",[t._v(t._s(e.goods.name))]),r("vs-td",[t._v("1")]),r("vs-td",[t._v("￥"+t._s(e.goods.price))]),r("vs-td",{staticClass:"w-40 break-words break-all"},[t._v(t._s(e.note||"无"))])],1)})}}])},[r("template",{slot:"thead"},[r("vs-th",[t._v("#")]),r("vs-th",[t._v("商品名称")]),r("vs-th",[t._v("数量")]),r("vs-th",[t._v("价格")]),r("vs-th",[t._v("备注信息")])],1)],2)},[],!1,null,null,null).exports,u=r("7059");const f={undefined:"未定义",1:"包邮",2:"自费",3:"自提"},p={undefined:{text:"Undefined",color:"danger",icon:"alert-circle"},1:{text:"进行中",color:"primary",icon:"loader"},2:{text:"已完成",color:"success",icon:"check-circle"},3:{text:"派送中",color:"warning",icon:"truck"},4:{text:"已取消",color:"danger",icon:"alert-circle"}},v={huabei:"余额支付",weixin:"微信支付",zhifubao:"支付宝支付",yinlian:"银行卡支付"},m=[{timestamp:"2018-04-12 14:46",content:"您提交了订单，请等待系统确认"},{timestamp:"2018-04-15 20:50",content:"温馨提示：该订单为赠品/换购商品订单，为方便您收货，会随主品订单一起发货，请您耐心等待"},{timestamp:"2018-04-16 08:50",content:"您的订单正在配送途中（快递员：李易，电话：18680649330），请您耐心等待。"},{timestamp:"2018-04-16 08:50",content:"您的订单已由物业代收。如有疑问您可以联系配送员【李易，18680649330】确认。感谢您在京东购物，欢迎再次光临。"}];var y={name:"OrderDetail",components:{VuePerfectScrollbar:a.a,OrderStep:l,OrderGoodsList:d},data:()=>({delivery:f,status:p,payment:v,logistics:m,detail:{},address:{},subOrder:{},goodsList:[],stepsData:{}}),mounted(){const t=this.$route.query,e=t.orderId,r=t.subId;this.getOrderDetail(e,r)},methods:{getOrderDetail(t,e){var r=this;this.$loading(Object(i.a)(function*(){const i=yield Object(u.a)({order_id:t,sub_id:e}),s=i.code,a=i.data.order_detail;2e3===s&&(a?(r.detail=a,r.address=a.address,r.subOrder=a.sub_order,r.goodsList=a.sub_order.goods_list,r.initStepsData()):r.$router.replace("/not-found"))}),{container:"#div-with-loading",scale:1})},initStepsData(){const t=this.subOrder,e=t.createdAt,r=t.status,i=this.$dayjs(e).format("YYYY-MM-DD HH:mm");let s=[];2===r&&(s=[{title:"订单已完成",description:i}]),4===r&&(s=[{title:"订单已取消",description:i}]);const a=[{title:"创建订单",description:i},{title:"支付成功",description:i},{title:"等待收货",description:""},...s];this.stepsData={active:{1:2,2:4,3:3,4:4}[r],steps:a}}}},b=(r("eca1"),Object(o.a)(y,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"vs-con-loading__container",attrs:{id:"div-with-loading"}},[r("div",[r("div",{staticClass:"card flex items-center bg-gray"},[r("div",{staticClass:"text-sm"},[r("p",{staticClass:"mr-3 text-primary"},[t._v("\n          订单号：\n          "),r("span",{staticClass:"text-gray"},[t._v(t._s(t.subOrder._id))])]),r("div",{staticClass:"p-6 flex-col-center text-2xl font-bold",class:t.status[t.subOrder.status].color},[r("feather",{staticClass:"ml-1 mb-1",attrs:{size:"30",type:t.status[t.subOrder.status].icon}}),t._v("\n          "+t._s(t.status[t.subOrder.status].text)+"\n        ")],1)]),r("div",{staticClass:"flex-1"},[r("OrderStep",{attrs:{"steps-data":t.stepsData}})],1)]),r("div",{staticClass:"card bg-semi"},[r("div",{staticClass:"card-header mb-2 text-primary"},[t._v("购物清单")]),r("div",{staticClass:"flex"},[r("OrderGoodsList",{staticClass:"w-2/3",attrs:{"goods-list":t.goodsList}}),r("VuePerfectScrollbar",{staticClass:"w-1/3 px-2",staticStyle:{height:"300px"},attrs:{settings:{maxScrollbarLength:160,wheelSpeed:.6}}},[r("el-timeline",{attrs:{reverse:!0}},t._l(t.logistics,function(e,i){return r("el-timeline-item",{key:i,attrs:{type:3===i?"primary":"",timestamp:e.timestamp}},[t._v("\n              "+t._s(e.content)+"\n            ")])}),1)],1)],1)]),r("div",{staticClass:"card bg-main"},[t._m(0),r("vs-divider"),r("div",[r("div",{staticClass:"order-info"},[r("div",{staticClass:"order-info__col"},[r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("收货人")]),r("div",{staticClass:"value"},[t._v(t._s(t.address.receiver))])]),r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("联系电话")]),r("div",{staticClass:"value"},[t._v(t._s(t.address.phone))])]),r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("收货地址")]),r("div",{staticClass:"value"},[t._v(t._s(t.address.address))])])]),r("div",{staticClass:"order-info__col"},[r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("配送方式")]),t.subOrder.goods_list?r("div",{staticClass:"value"},[t._v(t._s(t.delivery[t.subOrder.goods_list[0].goods.delivery]))]):t._e()]),r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("运费")]),r("div",{staticClass:"value"},[t._v("￥"+t._s(t.$numFixed(t.subOrder.delivery_charge)))])])]),r("div",{staticClass:"order-info__col"},[r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("支付方式")]),r("div",{staticClass:"value"},[t._v(t._s(t.payment[t.detail.payment]))])]),r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("支付时间")]),r("div",{staticClass:"value"},[t._v("\n                "+t._s(t.$dayjs(t.subOrder.created_at).format("YYYY-MM-DD HH:mm:ss"))+"\n              ")])]),r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("商品总额")]),r("div",{staticClass:"value"},[t._v("\n                ￥"+t._s(t.$numFixed(t.subOrder.total_price))+"\n              ")])]),r("div",{staticClass:"info__item"},[r("div",{staticClass:"label"},[t._v("应付金额")]),r("div",{staticClass:"value"},[t._v("\n                ￥"+t._s(t.$numFixed(t.subOrder.actual_price))+"\n              ")])])])])])],1)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("p",{staticClass:"text-primary"},[this._v("交易信息")])])}],!1,null,"21471f8a",null));e.default=b.exports},7059:function(t,e,r){"use strict";r.d(e,"b",function(){return n}),r.d(e,"c",function(){return o}),r.d(e,"a",function(){return l}),r.d(e,"e",function(){return c}),r.d(e,"f",function(){return d}),r.d(e,"d",function(){return u});var i=r("4328"),s=r.n(i),a=r("284b");function n(t){return Object(a.a)({url:"/order/list",method:"get",params:t})}function o(t){return Object(a.a)({url:"/order/list_by_date_range",method:"get",params:t,paramsSerializer:t=>s.a.stringify(t,{indices:!1})})}function l(t){return Object(a.a)({url:"/order/detail",method:"get",params:t})}function c(){return Object(a.a)({url:"/order/transaction",method:"get"})}function d(){return Object(a.a)({url:"/order/volume",method:"get"})}function u(){return Object(a.a)({url:"/order/num",method:"get"})}},"9e6a":function(t,e,r){"use strict";var i=r("d233"),s=Object.prototype.hasOwnProperty,a=Array.isArray,n={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:i.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},o=function(t){return t.replace(/&#(\d+);/g,function(t,e){return String.fromCharCode(parseInt(e,10))})},l=function(t,e,r){if(t){var i=r.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,a=/(\[[^[\]]*])/g,n=r.depth>0&&/(\[[^[\]]*])/.exec(i),o=n?i.slice(0,n.index):i,l=[];if(o){if(!r.plainObjects&&s.call(Object.prototype,o)&&!r.allowPrototypes)return;l.push(o)}for(var c=0;r.depth>0&&null!==(n=a.exec(i))&&c<r.depth;){if(c+=1,!r.plainObjects&&s.call(Object.prototype,n[1].slice(1,-1))&&!r.allowPrototypes)return;l.push(n[1])}return n&&l.push("["+i.slice(n.index)+"]"),function(t,e,r){for(var i=e,s=t.length-1;s>=0;--s){var a,n=t[s];if("[]"===n&&r.parseArrays)a=[].concat(i);else{a=r.plainObjects?Object.create(null):{};var o="["===n.charAt(0)&&"]"===n.charAt(n.length-1)?n.slice(1,-1):n,l=parseInt(o,10);r.parseArrays||""!==o?!isNaN(l)&&n!==o&&String(l)===o&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(a=[])[l]=i:a[o]=i:a={0:i}}i=a}return i}(l,e,r)}};t.exports=function(t,e){var r=function(t){if(!t)return n;if(null!==t.decoder&&void 0!==t.decoder&&"function"!=typeof t.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var e=void 0===t.charset?n.charset:t.charset;return{allowDots:void 0===t.allowDots?n.allowDots:!!t.allowDots,allowPrototypes:"boolean"==typeof t.allowPrototypes?t.allowPrototypes:n.allowPrototypes,arrayLimit:"number"==typeof t.arrayLimit?t.arrayLimit:n.arrayLimit,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:n.charsetSentinel,comma:"boolean"==typeof t.comma?t.comma:n.comma,decoder:"function"==typeof t.decoder?t.decoder:n.decoder,delimiter:"string"==typeof t.delimiter||i.isRegExp(t.delimiter)?t.delimiter:n.delimiter,depth:"number"==typeof t.depth||!1===t.depth?+t.depth:n.depth,ignoreQueryPrefix:!0===t.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof t.interpretNumericEntities?t.interpretNumericEntities:n.interpretNumericEntities,parameterLimit:"number"==typeof t.parameterLimit?t.parameterLimit:n.parameterLimit,parseArrays:!1!==t.parseArrays,plainObjects:"boolean"==typeof t.plainObjects?t.plainObjects:n.plainObjects,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:n.strictNullHandling}}(e);if(""===t||null==t)return r.plainObjects?Object.create(null):{};for(var c="string"==typeof t?function(t,e){var r,l={},c=e.ignoreQueryPrefix?t.replace(/^\?/,""):t,d=e.parameterLimit===1/0?void 0:e.parameterLimit,u=c.split(e.delimiter,d),f=-1,p=e.charset;if(e.charsetSentinel)for(r=0;r<u.length;++r)0===u[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===u[r]?p="utf-8":"utf8=%26%2310003%3B"===u[r]&&(p="iso-8859-1"),f=r,r=u.length);for(r=0;r<u.length;++r)if(r!==f){var v,m,y=u[r],b=y.indexOf("]="),h=-1===b?y.indexOf("="):b+1;-1===h?(v=e.decoder(y,n.decoder,p,"key"),m=e.strictNullHandling?null:""):(v=e.decoder(y.slice(0,h),n.decoder,p,"key"),m=e.decoder(y.slice(h+1),n.decoder,p,"value")),m&&e.interpretNumericEntities&&"iso-8859-1"===p&&(m=o(m)),m&&"string"==typeof m&&e.comma&&m.indexOf(",")>-1&&(m=m.split(",")),y.indexOf("[]=")>-1&&(m=a(m)?[m]:m),s.call(l,v)?l[v]=i.combine(l[v],m):l[v]=m}return l}(t,r):t,d=r.plainObjects?Object.create(null):{},u=Object.keys(c),f=0;f<u.length;++f){var p=u[f],v=l(p,c[p],r);d=i.merge(d,v,r)}return i.compact(d)}},b313:function(t,e,r){"use strict";var i=String.prototype.replace,s=/%20/g,a=r("d233"),n={RFC1738:"RFC1738",RFC3986:"RFC3986"};t.exports=a.assign({default:n.RFC3986,formatters:{RFC1738:function(t){return i.call(t,s,"+")},RFC3986:function(t){return String(t)}}},n)},d233:function(t,e,r){"use strict";var i=Object.prototype.hasOwnProperty,s=Array.isArray,a=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),n=function(t,e){for(var r=e&&e.plainObjects?Object.create(null):{},i=0;i<t.length;++i)void 0!==t[i]&&(r[i]=t[i]);return r};t.exports={arrayToObject:n,assign:function(t,e){return Object.keys(e).reduce(function(t,r){return t[r]=e[r],t},t)},combine:function(t,e){return[].concat(t,e)},compact:function(t){for(var e=[{obj:{o:t},prop:"o"}],r=[],i=0;i<e.length;++i)for(var a=e[i],n=a.obj[a.prop],o=Object.keys(n),l=0;l<o.length;++l){var c=o[l],d=n[c];"object"==typeof d&&null!==d&&-1===r.indexOf(d)&&(e.push({obj:n,prop:c}),r.push(d))}return function(t){for(;t.length>1;){var e=t.pop(),r=e.obj[e.prop];if(s(r)){for(var i=[],a=0;a<r.length;++a)void 0!==r[a]&&i.push(r[a]);e.obj[e.prop]=i}}}(e),t},decode:function(t,e,r){var i=t.replace(/\+/g," ");if("iso-8859-1"===r)return i.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(i)}catch(t){return i}},encode:function(t,e,r){if(0===t.length)return t;var i=t;if("symbol"==typeof t?i=Symbol.prototype.toString.call(t):"string"!=typeof t&&(i=String(t)),"iso-8859-1"===r)return escape(i).replace(/%u[0-9a-f]{4}/gi,function(t){return"%26%23"+parseInt(t.slice(2),16)+"%3B"});for(var s="",n=0;n<i.length;++n){var o=i.charCodeAt(n);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?s+=i.charAt(n):o<128?s+=a[o]:o<2048?s+=a[192|o>>6]+a[128|63&o]:o<55296||o>=57344?s+=a[224|o>>12]+a[128|o>>6&63]+a[128|63&o]:(n+=1,o=65536+((1023&o)<<10|1023&i.charCodeAt(n)),s+=a[240|o>>18]+a[128|o>>12&63]+a[128|o>>6&63]+a[128|63&o])}return s},isBuffer:function(t){return!(!t||"object"!=typeof t||!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t)))},isRegExp:function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},merge:function t(e,r,a){if(!r)return e;if("object"!=typeof r){if(s(e))e.push(r);else{if(!e||"object"!=typeof e)return[e,r];(a&&(a.plainObjects||a.allowPrototypes)||!i.call(Object.prototype,r))&&(e[r]=!0)}return e}if(!e||"object"!=typeof e)return[e].concat(r);var o=e;return s(e)&&!s(r)&&(o=n(e,a)),s(e)&&s(r)?(r.forEach(function(r,s){if(i.call(e,s)){var n=e[s];n&&"object"==typeof n&&r&&"object"==typeof r?e[s]=t(n,r,a):e.push(r)}else e[s]=r}),e):Object.keys(r).reduce(function(e,s){var n=r[s];return i.call(e,s)?e[s]=t(e[s],n,a):e[s]=n,e},o)}}},eca1:function(t,e,r){"use strict";var i=r("4e5d");r.n(i).a}}]);