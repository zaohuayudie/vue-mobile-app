webpackJsonp([10],{12:function(t,e,n){"use strict";var i=n(206),s=n.n(i),a=n(210),o=n.n(a),r=n(308),u=n.n(r);o.a.defaults.timeout=1e4,o.a.defaults.headers.common.Authorization="",o.a.interceptors.request.use(function(t){return"post"===t.method&&(t.data=u.a.stringify(t.data)),t},function(t){return s.a.reject(t)}),o.a.interceptors.response.use(function(t){return t.data},function(t){return s.a.reject(t)}),e.a=o.a},191:function(t,e,n){"use strict";var i=n(229),s=n(232),a=n(231),o=n(228),r=n(233),u=n(230);e.a={install:function(t){n.i(i.a)(t),n.i(s.a)(t),n.i(a.a)(t),n.i(o.a)(t),n.i(r.a)(t),n.i(u.a)(t)}}},198:function(t,e,n){n(303);var i=n(19)(n(249),n(324),null,null);t.exports=i.exports},207:function(t,e,n){n(304);var i=n(19)(n(250),n(325),null,null);t.exports=i.exports},208:function(t,e,n){n(301);var i=n(19)(n(251),n(322),null,null);t.exports=i.exports},21:function(t,e,n){"use strict";function i(t,e){return t.filter(e)[0]}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(null===t||"object"!==(void 0===t?"undefined":v()(t)))return t;var n=i(e,function(e){return e.original===t});if(n)return n.copy;var a=Array.isArray(t)?[]:{};return e.push({original:t,copy:a}),m()(t).forEach(function(n){a[n]=s(t[n],e)}),a}function a(t,e){m()(t).forEach(function(n){return e(t[n],n)})}function o(t){return null!==t&&"object"===(void 0===t?"undefined":v()(t))}function r(t){return t&&"function"==typeof t.then}function u(t,e){if(!t)throw new Error("[vuex] "+e)}function c(t,e,n){if(void 0===e){var i=null;if(document.cookie&&""!==document.cookie)for(var s=document.cookie.split(";"),a=0;a<s.length;a++){var o=_.a.trim(s[a]);if(o.substring(0,t.length+1)===t+"="){i=decodeURIComponent(o.substring(t.length+1));break}}return i}n=n||{},null===e&&(e="",n=_.a.assign({},n),n.expires=-1);var r="";if(n.expires&&("number"==typeof n.expires||n.expires.toUTCString)){var u=void 0;"number"==typeof n.expires?(u=new Date,u.setTime(u.getTime()+24*n.expires*60*60*1e3)):u=n.expires,r="; expires="+u.toUTCString()}var c=n.path?"; path="+n.path:"",l=n.domain?"; domain="+n.domain:"",d=n.secure?"; secure":"";document.cookie=[t,"=",encodeURIComponent(e),r,c,l,d].join("")}function l(t){var e=c("userinfo"),n={};if(e&&(n="object"===(void 0===e?"undefined":v()(e))?e:JSON.parse(e)),t){n=_.a.assign({},n,"object"===(void 0===t?"undefined":v()(t))?t:{});var i={domain:".xiangsong.cn",path:"/"};c("userinfo",null),c("userinfo",f()(n),i)}return n}Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"util",function(){return b}),e.deepCopy=s,e.forEachValue=a,e.isObject=o,e.isPromise=r,e.assert=u,e.cookie=c,e.cookieForUserInfo=l;var d=n(200),f=n.n(d),p=n(203),m=n.n(p),h=n(20),v=n.n(h),j=n(311),g=n.n(j),y=n(68),_=n.n(y);n.d(e,"storage",function(){return g.a});var b={};b.title=function(t){t=t?t+" - 香送最烘培":"香送最烘培",window.document.title="体验卡申请"}},228:function(t,e,n){"use strict";var i=n(30),s=n(45);e.a=function(t){s.a.beforeHooks.unshift(function(t,e,n){return t.meta.requireOauth?i.a.state.userInfo&&i.a.state.userInfo.mailNickname?n():void i.a.dispatch("getUserProfile").then(function(t){if(t=t.data,t.success&&t.data&&t.data.isLogin)return i.a.commit("SET_USER_PROFILE",t.data),n();var e=window.location,s="http://cms.fengjr.inc/user/login";/local|test/.test(e.hostname)&&(s="http://cms-test.fengjr.inc/user/login"),window.location.href=s+"?rd="+window.location.href}):n()})}},229:function(t,e,n){"use strict";var i=n(23),s=n.n(i),a=n(12);e.a=function(t){s()(t,{http:{get:function(){return a.a}}}),s()(t.prototype,{$http:{get:function(){return a.a}}})}},230:function(t,e,n){"use strict";e.a=function(t){t.directive("clickhide",{bind:function(t,e,n){function i(n){if(t.contains(n.target))return!1;e.expression&&e.value(n)}t.__vueClickOutside__=i,document.addEventListener("click",i)},unbind:function(t,e){document.removeEventListener("click",t.__vueClickOutside__),delete t.__vueClickOutside__}})}},231:function(t,e,n){"use strict";var i=n(23),s=n.n(i),a=n(68),o=n.n(a);e.a=function(t){s()(t,{_:{get:function(){return o.a}}}),s()(t.prototype,{$_:{get:function(){return o.a}}})}},232:function(t,e,n){"use strict";var i=n(23),s=n.n(i),a=n(0),o=n.n(a);o.a.locale("zh-cn"),e.a=function(t){s()(t,{moment:{get:function(){return o.a}}}),s()(t.prototype,{$moment:{get:function(){return o.a}}})}},233:function(t,e,n){"use strict";function i(t){var e=o.a.state.userInfo;if(t&&"string"==typeof t)return!(!e.permission||!e.permission[t]);var n=t.groupName,i=t.action;if(n){var s=e.permission&&e.permission[n];if(s)return s.indexOf(i)>-1}return!1}var s=n(23),a=n.n(s),o=n(30);e.a=function(t){a()(t,{permissionAction:{get:function(){return i}}}),a()(t.prototype,{$permissionAction:{get:function(){return i}}})}},234:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(190),s=(n.n(i),n(196)),a=n.n(s),o=n(22),r=n(197),u=(n.n(r),n(45)),c=n(30),l=n(21),d=n(191),f=n(198),p=n.n(f),m=n(193),h=n(194),v=n(192),j=n(195);o.default.use(d.a),o.default.use(m.a),o.default.use(h.a),o.default.use(v.a),o.default.use(j.a);o.default.wechat;a.a.attach(document.body);o.default.config.debug=!1,o.default.config.silent=!0,o.default.config.devtools=!1,o.default.config.productionTip=!1,n.i(r.sync)(c.a,u.a,{moduleName:"route"}),u.a.beforeEach(function(t,e,n){l.util.title(t.meta.title),n()}),u.a.afterEach(function(t,e,n){window.scrollTo(0,0)}),new o.default({store:c.a,router:u.a,render:function(t){return t(p.a)}}).$mount("#app")},235:function(t,e,n){"use strict";var i=[{path:"/card",component:function(t){return n.e(1).then(function(){var e=[n(330)];t.apply(null,e)}.bind(this)).catch(n.oe)},children:[{name:"apply",path:"apply",meta:{title:"卡券申请"},component:function(t){n.e(0).then(function(){var e=[n(332)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{name:"search",path:"search",component:function(t){n.e(3).then(function(){var e=[n(331)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{name:"order",path:"order",meta:{title:"我的订单"},component:function(t){n.e(4).then(function(){var e=[n(335)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{name:"applysuccess",path:"applysuccess",meta:{title:"支付成功"},component:function(t){n.e(5).then(function(){var e=[n(333)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{name:"cardInvitation",path:"invitation",meta:{title:"邀请好友"},component:function(t){n.e(6).then(function(){var e=[n(334)];t.apply(null,e)}.bind(this)).catch(n.oe)}}]},{name:"signin",path:"/signin",meta:{title:"登录"},component:function(t){n.e(2).then(function(){var e=[n(337)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{name:"signup",path:"/signup",component:function(t){n.e(8).then(function(){var e=[n(338)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{name:"NotFound",path:"*",meta:{title:"Not Found"},component:function(t){n.e(7).then(function(){var e=[n(336)];t.apply(null,e)}.bind(this)).catch(n.oe)}}];e.a=i},236:function(t,e,n){"use strict";var i=n(12);e.a={getApplyCardPageInfo:function(t){return t.pid=t.pid||"3177",i.a.get("/api/v1/apply",{params:t})},doApplyCard:function(t){return i.a.post("/api/v1/applycard",t)},getMyOrder:function(){return i.a.get("/api/v1/myorder")},getApplySuccess:function(){return i.a.get("/api/v1/card")}}},237:function(t,e,n){"use strict";var i=n(12);e.a={getProjectList:function(t){return i.a.get("/pcms/api/v2/project/list")},deleteProject:function(t){return i.a.post("/pcms/api/v2/project/delete/"+t)},createProject:function(t){return i.a.post("/pcms/api/v2/project/create",t)},updateProject:function(t){var e=t.projectId;return delete t.projectId,i.a.post("/pcms/api/v2/project/update/"+e,t)}}},238:function(t,e,n){"use strict";var i=n(12);e.a={getConfig:function(t){return i.a.get("/api/v1/share_config",{params:t})},getShare:function(){return i.a.get("/api/v1/share")}}},239:function(t,e,n){"use strict";var i=n(12);e.a={getCaptcha:function(t){return i.a.post("/api/v1/send",t)},doSignin:function(t){return i.a.post("/api/v1/passprot",t)}}},240:function(t,e,n){"use strict";var i=n(12);e.a={getUserList:function(t){return i.a.get("/pcms/api/v2/user/list",{params:t})},getUserInfo:function(t){return i.a.get("/pcms/api/v2/user/profile",{params:t})},getUserById:function(t){return i.a.get("/pcms/api/v2/user/getById",{params:t})},assignRole:function(t){return i.a.post("/pcms/api/v2/user/assignRole",t)},queryUser:function(t){return i.a.get("/pcms/api/v2/user/queryUser",{params:t})}}},241:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"setCurrentRoute",function(){return s}),n.d(e,"getUserProfile",function(){return a});var i=n(46),s=function(t,e){(0,t.commit)("SET_CURRENT_ROUTER",e)},a=function(t){t.commit;return i.a.user.getUserInfo()}},242:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s}),n.d(e,"c",function(){return a});var i="APLLYCARD_GET_PAGEINFO",s="APPLYCARD_GET_SUCCESS",a="APPLYCARD_GET_MYORDER"},243:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"collapse",function(){return u}),n.d(e,"getCookie",function(){return c});var i=n(202),s=n.n(i),a=n(20),o=n.n(a),r=n(21),u=function(t){return t.collapse},c=function(t){var e=r.cookie("userinfo"),n={};return e&&(n="object"===(void 0===e?"undefined":o()(e))?e:JSON.parse(e)),t.cookies=s()({},t.cookies,n),t.cookies}},244:function(t,e,n){"use strict";var i,s=n(256),a=n.n(s),o=n(46),r=n(242),u={pageInfo:{},applySuccess:[],current:{},myorder:[],currentIndex:0},c={},l=(i={},a()(i,r.a,function(t,e){t.pageInfo=e||{}}),a()(i,r.b,function(t,e){t.applySuccess=e||[]}),a()(i,r.c,function(t,e){t.myorder=e||[]}),i),d={getApplyCardPageInfo:function(t,e){var n=t.commit;e=e||{},o.a.applyCard.getApplyCardPageInfo(e).then(function(t){n(r.a,t.data)}).catch(function(t){console.log(t)})},getApplySuccess:function(t,e){var n=t.commit;o.a.applyCard.getApplySuccess().then(function(t){n(r.b,t.data)}).catch(function(t){console.log(t)})},getMyOrder:function(t,e){var n=t.commit;o.a.applyCard.getMyOrder().then(function(t){n(r.c,t.data)}).catch(function(t){console.log(t)})}};e.a={state:u,getters:c,actions:d,mutations:l}},245:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(246),s=n(244);n.d(e,"signin",function(){return i.a}),n.d(e,"applyCard",function(){return s.a})},246:function(t,e,n){"use strict";var i=n(21),s={mobile:i.cookie("mobile")||"",uid:i.cookie("uid")||""},a={},o={},r={};e.a={state:s,getters:a,actions:r,mutations:o}},247:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"UPDATE_LOADING",function(){return i}),n.d(e,"UPDATE_DIRECTION",function(){return s});var i=function(t,e){t.isLoading=e},s=function(t,e){t.direction=e}},248:function(t,e,n){"use strict";var i={tabbarSelectedIndex:0,isLoading:!1,showBack:!1,direction:"forward",mobile:"",uid:"",applyForm:{remark:"",mobile:"",city:"北京",streetAddress:"",deliveryAddress:"请选择您的写字楼，小区或学校等",deliveryDate:"",lng:0,lat:0}};e.a=i},249:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},mounted:function(){},beforeDestroy:function(){},methods:{}}},250:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(327),s=n.n(i);e.default={name:"alert",components:{XDialog:s.a},created:function(){void 0!==this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,hideOnBlur:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},maskZIndex:[Number,String]},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},251:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(t){this.$emit("update:show",t)}}}},252:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(253);e.default={mixins:[i.a],name:"x-dialog",model:{prop:"show",event:"change"},props:{show:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},maskZIndex:[String,Number],dialogTransition:{type:String,default:"vux-dialog"},dialogClass:{type:String,default:"weui-dialog"},hideOnBlur:Boolean,dialogStyle:Object,scroll:{type:Boolean,default:!0,validator:function(t){return!0}}},computed:{maskStyle:function(){if(void 0!==this.maskZIndex)return{zIndex:this.maskZIndex}}},watch:{show:function(t){this.$emit("update:show",t),this.$emit(t?"on-show":"on-hide"),t?this.addModalClassName():this.removeModalClassName()}},methods:{hide:function(){this.hideOnBlur&&(this.$emit("update:show",!1),this.$emit("change",!1))}}}},30:function(t,e,n){"use strict";var i=n(22),s=n(201),a=n(248),o=n(241),r=n(243),u=n(247),c=n(245);i.default.use(s.c);var l=new s.c.Store({state:a.a,getters:r,mutations:u,actions:o,modules:c,strict:!1,plugins:[]});e.a=l},300:function(t,e){},301:function(t,e){},302:function(t,e){},303:function(t,e){},304:function(t,e){},306:function(t,e,n){function i(t){return n(s(t))}function s(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var a={"./af":69,"./af.js":69,"./ar":76,"./ar-dz":70,"./ar-dz.js":70,"./ar-kw":71,"./ar-kw.js":71,"./ar-ly":72,"./ar-ly.js":72,"./ar-ma":73,"./ar-ma.js":73,"./ar-sa":74,"./ar-sa.js":74,"./ar-tn":75,"./ar-tn.js":75,"./ar.js":76,"./az":77,"./az.js":77,"./be":78,"./be.js":78,"./bg":79,"./bg.js":79,"./bm":80,"./bm.js":80,"./bn":81,"./bn.js":81,"./bo":82,"./bo.js":82,"./br":83,"./br.js":83,"./bs":84,"./bs.js":84,"./ca":85,"./ca.js":85,"./cs":86,"./cs.js":86,"./cv":87,"./cv.js":87,"./cy":88,"./cy.js":88,"./da":89,"./da.js":89,"./de":92,"./de-at":90,"./de-at.js":90,"./de-ch":91,"./de-ch.js":91,"./de.js":92,"./dv":93,"./dv.js":93,"./el":94,"./el.js":94,"./en-au":95,"./en-au.js":95,"./en-ca":96,"./en-ca.js":96,"./en-gb":97,"./en-gb.js":97,"./en-ie":98,"./en-ie.js":98,"./en-nz":99,"./en-nz.js":99,"./eo":100,"./eo.js":100,"./es":103,"./es-do":101,"./es-do.js":101,"./es-us":102,"./es-us.js":102,"./es.js":103,"./et":104,"./et.js":104,"./eu":105,"./eu.js":105,"./fa":106,"./fa.js":106,"./fi":107,"./fi.js":107,"./fo":108,"./fo.js":108,"./fr":111,"./fr-ca":109,"./fr-ca.js":109,"./fr-ch":110,"./fr-ch.js":110,"./fr.js":111,"./fy":112,"./fy.js":112,"./gd":113,"./gd.js":113,"./gl":114,"./gl.js":114,"./gom-latn":115,"./gom-latn.js":115,"./gu":116,"./gu.js":116,"./he":117,"./he.js":117,"./hi":118,"./hi.js":118,"./hr":119,"./hr.js":119,"./hu":120,"./hu.js":120,"./hy-am":121,"./hy-am.js":121,"./id":122,"./id.js":122,"./is":123,"./is.js":123,"./it":124,"./it.js":124,"./ja":125,"./ja.js":125,"./jv":126,"./jv.js":126,"./ka":127,"./ka.js":127,"./kk":128,"./kk.js":128,"./km":129,"./km.js":129,"./kn":130,"./kn.js":130,"./ko":131,"./ko.js":131,"./ky":132,"./ky.js":132,"./lb":133,"./lb.js":133,"./lo":134,"./lo.js":134,"./lt":135,"./lt.js":135,"./lv":136,"./lv.js":136,"./me":137,"./me.js":137,"./mi":138,"./mi.js":138,"./mk":139,"./mk.js":139,"./ml":140,"./ml.js":140,"./mr":141,"./mr.js":141,"./ms":143,"./ms-my":142,"./ms-my.js":142,"./ms.js":143,"./my":144,"./my.js":144,"./nb":145,"./nb.js":145,"./ne":146,"./ne.js":146,"./nl":148,"./nl-be":147,"./nl-be.js":147,"./nl.js":148,"./nn":149,"./nn.js":149,"./pa-in":150,"./pa-in.js":150,"./pl":151,"./pl.js":151,"./pt":153,"./pt-br":152,"./pt-br.js":152,"./pt.js":153,"./ro":154,"./ro.js":154,"./ru":155,"./ru.js":155,"./sd":156,"./sd.js":156,"./se":157,"./se.js":157,"./si":158,"./si.js":158,"./sk":159,"./sk.js":159,"./sl":160,"./sl.js":160,"./sq":161,"./sq.js":161,"./sr":163,"./sr-cyrl":162,"./sr-cyrl.js":162,"./sr.js":163,"./ss":164,"./ss.js":164,"./sv":165,"./sv.js":165,"./sw":166,"./sw.js":166,"./ta":167,"./ta.js":167,"./te":168,"./te.js":168,"./tet":169,"./tet.js":169,"./th":170,"./th.js":170,"./tl-ph":171,"./tl-ph.js":171,"./tlh":172,"./tlh.js":172,"./tr":173,"./tr.js":173,"./tzl":174,"./tzl.js":174,"./tzm":176,"./tzm-latn":175,"./tzm-latn.js":175,"./tzm.js":176,"./uk":177,"./uk.js":177,"./ur":178,"./ur.js":178,"./uz":180,"./uz-latn":179,"./uz-latn.js":179,"./uz.js":180,"./vi":181,"./vi.js":181,"./x-pseudo":182,"./x-pseudo.js":182,"./yo":183,"./yo.js":183,"./zh-cn":184,"./zh-cn.js":184,"./zh-hk":185,"./zh-hk.js":185,"./zh-tw":186,"./zh-tw.js":186};i.keys=function(){return Object.keys(a)},i.resolve=s,t.exports=i,i.id=306},322:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},323:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog"},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-mask",style:t.maskStyle,on:{click:t.hide}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],class:t.dialogClass,style:t.dialogStyle},[t._t("default")],2)])],1)},staticRenderFns:[]}},324:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade"}},[n("keep-alive",[n("router-view")],1)],1)},staticRenderFns:[]}},325:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition,"hide-on-blur":t.hideOnBlur,"mask-z-index":t.maskZIndex},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},327:function(t,e,n){n(302);var i=n(19)(n(252),n(323),null,null);t.exports=i.exports},45:function(t,e,n){"use strict";var i=n(22),s=n(326),a=n(235);i.default.use(s.a),e.a=new s.a({mode:"history",base:n.i({NODE_ENV:"production"}).PUBLIC_URL||"/",routes:a.a})},46:function(t,e,n){"use strict";var i=n(237),s=n(236),a=n(240),o=n(239),r=n(238);e.a={project:i.a,user:a.a,applyCard:s.a,signin:o.a,share:r.a}}},[234]);