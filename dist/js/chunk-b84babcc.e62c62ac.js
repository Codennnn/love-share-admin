(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-b84babcc"],{"0a78":function(t,e,a){"use strict";a.r(e);var o=a("1da1"),i=(a("28a5"),a("7e79")),s=a("518e"),n={name:"ReplaceAvatar",components:{VueCropper:i.VueCropper},props:{adminId:String,popupActive:{type:Boolean,required:!0}},data:()=>({avatarBase64:"",avatarUrl:"",btnDisable:!1,showAlert:!1,alertText:""}),computed:{showPopup:{get(){return this.popupActive},set(t){t||this.$emit("closePopup")}}},watch:{popupActive(t){t&&(this.showPopup=!0)}},methods:{onShowAlert(t){this.showAlert=!0,this.alertText=t},getImage(t){let e=t.target.files;if(e){if(!(e[0].size/1024/1024<2))return void this.onShowAlert("图片大小不能超过 2MB！");const t=new FileReader;t.readAsDataURL(e[0]),t.onload=t=>{let e=t.target.result;this.avatarBase64=e}}},onReplace(){var t=this;this.$refs.cropper.getCropBlob(e=>{const a=`${Date.now()}.${e.type.split("/")[1]}`,i=new FormData;i.append("avatar",e,a),i.append("id",this.adminId),this.$loading(Object(o.a)(function*(){t.btnDisable=!0;const e=yield Object(s.o)(i),a=e.code,o=e.data.avatar_url;if(2e3===a){2e3===(yield Object(s.i)({admin_id:t.adminId,avatar_url:o})).code&&(t.avatarUrl=o,t.adminId===t.$store.getters["admin/adminId"]&&(t.$emit("updateInfo"),t.$store.commit("admin/SET_AVATAR",o)),t.$vs.notify({time:3e3,title:"图片上传成功",text:"头像已更换",color:"success"}),t.showPopup=!1)}else 3e3!==a&&4003!==a&&5e3!==a||(t.showAlert=!0)}),{background:"primary",color:"#fff",container:"#replaceBtn",scale:.45},()=>{this.btnDisable=!1},()=>{this.onShowAlert("图片上传失败，请重试！")})})}}},r=(a("1fdc"),a("2877")),c=Object(r.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("vs-popup",{staticClass:"avatar-popup",attrs:{title:"更换头像",active:t.showPopup},on:{"update:active":function(e){t.showPopup=e}}},[a("div",[a("div",{staticClass:"flex flex-col justify-center items-center"},[a("vueCropper",{ref:"cropper",staticStyle:{width:"300px",height:"300px"},attrs:{outputType:"jpeg",info:!1,outputSize:.8,canMove:!1,canMoveBox:!0,canScale:!0,autoCrop:!0,centerBox:!0,fixed:!0,infoTrue:!0,img:t.avatarBase64}}),a("div",{staticClass:"w-full"},[a("vs-alert",{attrs:{closable:"","close-icon":"close",color:"danger",active:t.showAlert},on:{"update:active":function(e){t.showAlert=e}}},[t._v("\n          "+t._s(t.alertText)+"\n        ")])],1),a("div",{staticClass:"text-center"},[a("vs-button",{staticClass:"my-1",attrs:{type:"flat"},on:{click:function(e){return t.$refs.fileInput.click()}}},[t._v("选择图片")]),a("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{type:"file",accept:"image/jpeg,image/jpg,image/png"},on:{change:t.getImage}})],1),a("vs-button",{staticClass:"w-full vs-con-loading__container",attrs:{id:"replaceBtn",disabled:t.btnDisable},on:{click:function(e){return t.onReplace()}}},[t._v("确认更换")])],1)])])},[],!1,null,"ea5b7b60",null);e.default=c.exports},"19b1":function(t,e,a){},"1fdc":function(t,e,a){"use strict";var o=a("19b1");a.n(o).a}}]);