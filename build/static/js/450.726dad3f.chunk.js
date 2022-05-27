"use strict";(self.webpackChunkdashboard=self.webpackChunkdashboard||[]).push([[450],{7541:function(n,t,e){var r=e(5671),c=e(3144),a=e(4569),i=e.n(a),u=e(7497),o=e(5e3),s=e(7369),f=e(3220),p=function(){function n(){(0,r.Z)(this,n),this.axiosInstance=void 0,this.axiosInstance=i().create({timeout:1e4,baseURL:"",headers:{"Content-Type":"application/json;charset=utf-8","X-Requested-Width":"XMLHttpRequest"}}),this.interceptRequest(),this.interceptResponse()}return(0,c.Z)(n,[{key:"setIsloading",value:function(n){f.h.dispatch((0,o.ab)(n))}},{key:"setError",value:function(n){f.h.dispatch((0,o.sT)(n))}},{key:"interceptRequest",value:function(){this.axiosInstance.interceptors.request.use((function(n){return n.headers.token=u.Z.getCachedDate("token")||"",n.url.includes("/upload")&&(n.headers["Content-Type"]="multipart/form-data"),n}))}},{key:"interceptResponse",value:function(){this.axiosInstance.interceptors.response.use((function(n){if(null!==n&&void 0!==n&&n.data){var t=n.data.code;return"200"===(void 0===t?"200":t)||"ok"===n.statusText.toLocalLowerCase()?Promise.resolve(n):Promise.reject(n)}return Promise.reject("no data")}))}},{key:"get",value:function(n){var t=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(r,c){t.setIsloading(!0),t.axiosInstance.get(n,{params:e}).then((function(n){r(n.data)})).catch((function(n){t.setError(n),(0,s.Z)({type:"warning",message:"Unable to acquire data, please check internet connection",messageTarget:""}),c(n)})).finally(t.setIsloading(!1))}))}},{key:"post",value:function(n){var t=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=arguments.length>3?arguments[3]:void 0;return new Promise((function(a,i){t.setIsloading(!0),"object"===typeof e&&"FormData"===e.constructor.name&&(r["Content-Type"]="multipart/form-data"),t.axiosInstance.post(n,e,r).then((function(n){a(n.data),(0,s.Z)({type:"success",messageTarget:"".concat(c," is successfully created")})})).catch((function(n){t.setError(n),(0,s.Z)({type:"warning",messageTarget:"".concat(c," creation failed, please try again later!")}),i(n)})).finally(t.setIsloading(!1))}))}},{key:"patch",value:function(n,t,e){var r=this;return new Promise((function(c,a){r.setIsloading(!0),r.axiosInstance.patch(n,t).then((function(n){c(n.data),(0,s.Z)({type:"success",messageTarget:"".concat(e," successfully updated")})})).catch((function(n){r.setError(n),(0,s.Z)({type:"warning",messageTarget:"".concat(e," update failed, please try again later")}),a(n)})).finally(r.setIsloading(!1))}))}},{key:"put",value:function(n,t,e){var r=this;return new Promise((function(c,a){r.setIsloading(!0),r.axiosInstance.put(n,t).then((function(n){c(n.data),(0,s.Z)({type:"success",messageTarget:"".concat(e," is succefully updated")})})).catch((function(n){(0,s.Z)({type:"warning",messageTarget:"".concat(e," update failed, please try again later")}),a(n)})).finally(r.setIsloading(!1))}))}}]),n}();t.Z=new p},3245:function(n,t,e){e.d(t,{B$:function(){return b},BJ:function(){return S},Cj:function(){return T},GQ:function(){return m},IU:function(){return g},Kt:function(){return x},Pc:function(){return y},Ui:function(){return F},XW:function(){return Z},YB:function(){return k},b6:function(){return C},c$:function(){return U},c9:function(){return v},dt:function(){return P},gZ:function(){return h},si:function(){return E},uj:function(){return I},vm:function(){return w}});var r=e(1413),c=e(5861),a=e(7757),i=e.n(a),u=e(7541),o=e(1966),s=e(531),f=e(4245),p=e(3220),d=e(7369),l=(p.h.dispatch,(0,o.Z)("dep")),h=function(){var n=(0,c.Z)(i().mark((function n(t){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.Z.post("".concat(l.dbUri,"/orders"),t,{},"order");case 2:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),g=function(n,t,e,r){e(!0);var a=function(){var r=(0,c.Z)(i().mark((function r(){return i().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,u.Z.get("".concat(l.dbUri,"/orders?").concat(f.stringify((0,s.yE)(n)))).then((function(n){t(n)})).finally((function(){e(!1)}));case 2:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();a()},v=function(){var n=(0,c.Z)(i().mark((function n(t){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.Z.get("".concat(l.dbUri,"/orders?").concat(f.stringify((0,s.yE)(t))));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),y=function(){var n=(0,c.Z)(i().mark((function n(t,e){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:u.Z.put("".concat(l.dbUri,"/orders/").concat(t),e,"Payment");case 1:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}(),m=function(){var n=(0,c.Z)(i().mark((function n(t,e){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:u.Z.put("".concat(l.dbUri,"/orders/").concat(t),e,"Fabrication Status");case 1:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}(),Z=function(){var n=(0,c.Z)(i().mark((function n(t,e){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:u.Z.put("".concat(l.dbUri,"/orders/").concat(t),e,"Logistic Status");case 1:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}(),w=function(){var n=(0,c.Z)(i().mark((function n(t,e){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:u.Z.put("".concat(l.dbUri,"/orders/").concat(t),e,"LogisticInfo");case 1:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}(),k=function(){var n=(0,c.Z)(i().mark((function n(t,e){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.Z.get("".concat(l.dbUri,"/products?").concat(f.stringify((0,s.yE)(t)))).then((function(n){e(n)}));case 2:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}(),b=function(n,t,e,a,o,p){e((0,r.Z)((0,r.Z)({},t),{},{userInfo:!0}));var d=function(){var d=(0,c.Z)(i().mark((function c(){return i().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,u.Z.get("".concat(l.dbUri,"/clients?").concat(f.stringify((0,s.yE)(n)))).then((function(n){if(n.length>0){o((0,r.Z)((0,r.Z)({},p),{},{userCreateOrEditSwitch:!0}));var t=n[0],e=t.name,c=t.id,i=t.email,u=t.mobile,s=t.vip,f=t.address,d=t.postcode;a.setFieldsValue({client:{name:e,email:i,mobile:u,vip:s,address:f,postcode:d,id:c}})}else a.setFieldsValue({client:{name:null,email:null,mobile:null,vip:null,address:null,postcode:null,id:null}})})).finally((function(){e((0,r.Z)((0,r.Z)({},t),{},{userInfo:!1}))}));case 2:case"end":return c.stop()}}),c)})));return function(){return d.apply(this,arguments)}}();d()},x=function(){var n=(0,c.Z)(i().mark((function n(t,e){var c;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("update"!==e){n.next=4;break}return c=(0,r.Z)((0,r.Z)({},t),{},{updatedAt:(0,s.uO)()}),n.next=4,u.Z.put("".concat(l.dbUri,"/clients/").concat(c.id,"}"),t,"User Info".concat(t.name));case 4:if("create"!==e){n.next=10;break}return c=(0,r.Z)((0,r.Z)({},t),{},{createdAt:(0,s.uO)()}),n.next=8,u.Z.post("".concat(l.dbUri,"/clients"),t,{},"user: ".concat(t.name));case 8:n.next=11;break;case 10:return n.abrupt("return",(0,d.Z)({type:"error",message:"User Component Error"}));case 11:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}(),I=function(){var n=(0,c.Z)(i().mark((function n(t,e,c,a,o){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e((0,r.Z)((0,r.Z)({},c),{},{productSearch:!0})),n.next=3,u.Z.get("".concat(l.dbUri,"/products?sku=").concat(t)).then((function(n){var t=a.getFieldValue("products");if(!(n.length>0))return null;var e=n[0],r=e.name,c={id:e.id,name:r,size:e.size,price:e.price,pcPrice:e.powdercoatingPrice,installPrice:e.installationPrice,currentInStock:e.currentInStock},i=t.map((function(n,t){return t===o?(n.name=c.name,n.id=c.id,n.size=c.size,n.price=c.price,n.pcPrice=c.pcPrice,n.installPrice=c.installPrice,n.currentInStock=c.currentInStock,n):n}));a.setFieldsValue({products:i})})).finally((function(){setTimeout((function(){e((0,r.Z)((0,r.Z)({},c),{},{productSearch:!1}))}),1e3)}));case 3:case"end":return n.stop()}}),n)})));return function(t,e,r,c,a){return n.apply(this,arguments)}}(),P=function(){var n=(0,c.Z)(i().mark((function n(t){var e;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=(0,r.Z)((0,r.Z)({},t),{},{currentInStock:t.currentInStock-1}),n.next=3,u.Z.put("".concat(l.dbUri,"/products/").concat(t.id),e,"".concat(t.name));case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),U=function(){var n=(0,c.Z)(i().mark((function n(t,e){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.Z.patch("".concat(l.dbUri,"/orders/").concat(t),{checked:!e},"OrderNumber: ".concat(t));case 2:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}(),F=function(){var n=(0,c.Z)(i().mark((function n(t){var e;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e="".concat(l.dbUri,"/products?currentInStock_gte=1&currentInStock_lte=5"),n.next=3,u.Z.get(e).then((function(n){t(n)}));case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),C=function(){var n=(0,c.Z)(i().mark((function n(){var t,e=arguments;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.length>0&&void 0!==e[0]?e[0]:{},n.next=3,u.Z.get("".concat(l.dbUri,"/products?").concat(f.stringify((0,s.yE)(t))));case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),T=function(){var n=(0,c.Z)(i().mark((function n(t,e){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.Z.put("".concat(l.dbUri,"/products/").concat(t),e,"Product");case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}(),E=function(n){return u.Z.post("".concat(l.dbUri,"/products"),n,{},"Product")},S=function(){var n=(0,c.Z)(i().mark((function n(){var t,e=arguments;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.length>0&&void 0!==e[0]?e[0]:{},n.next=3,u.Z.get("".concat(l.dbUri,"/products?").concat(f.stringify((0,s.yE)(t))));case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}()},1966:function(n,t){var e={dbUri:"http://localhost:3001"},r={dbUri:"http://137.147.94.100:2096"};t.Z=function(n){if("dev"===n)return e;if("dep"===n)return r;throw new Error("Wrong Env selection")}},7369:function(n,t,e){e(6072);var r=e(3695);t.Z=function(n){var t;return t=n.message?n.message:n.messageTarget,r.ZP[n.type](t)}},531:function(n,t,e){e.d(t,{s9:function(){return m},ey:function(){return k},BU:function(){return v},nF:function(){return w},uo:function(){return y},Xz:function(){return g},yE:function(){return d},U9:function(){return h},uO:function(){return Z}});var r,c,a,i,u=e(7762),o=e(1413),s=e(7892),f=e.n(s);!function(n){n.pending="pending",n.machineProcessing="machineProcessing",n.machineProcessFinished="machineProcessFinished",n.powderCoating="powderCoating",n.powderCoatingFinished="powderCoatingFinished",n.waitingForInstallation="waitingForInstallation",n.installing="installing",n.ready="ready"}(r||(r={})),function(n){n.waitingForCarrier="waitingForCarrier",n.pickupAlready="pickupAlready",n.delivering="delivering",n.delivered="delivered",n.cannotDeliver="cannotDeliver",n.returningToVender="returningToVender",n.returnedItemArrived="returnedItemArrived",n.itemDamagedInTransport="itemDamagedInTransport"}(c||(c={})),function(n){n.AustralianPost="Australian Post",n.BigPost="Big Post",n.FastWay="FastWay"}(a||(a={})),function(n){n.pending="pending",n.partiallyPayed="partiallyPayed",n.fullyPayed="fullyPayed"}(i||(i={}));var p=e(3245),d=function(n){var t=(0,o.Z)({},n);return Object.keys(t).forEach((function(n){var e=t[n];l(e)&&delete t[n]})),t},l=function(n){return void 0===n||null===n||""===n},h=function(n){return n>=10?"processing":n>=5?"success":n>=3?"warning":n<3?"error":"default"},g=function(n){switch(n){case"pending":return"error";case"partiallyPayed":case"machineProcessing":case"machineProcessFinished":case"powderCoating":case"powderCoatingFinished":case"installing":return"default";case"fullyPayed":case"ready":return"success"}},v=function(n){switch(n){case"pending":return"error";case"machineProcessing":case"machineProcessFinished":case"powderCoating":case"powderCoatingFinished":case"waitingForInstallation":case"installing":return"processing";case"ready":return"success"}},y=function(n){switch(n){case"waitingForCarrier":case"itemDamagedInTransport":return"error";case"pickupAlready":case"delivering":return"processing";case"delivered":case"returnedItemArrived":return"success";case"cannotDeliver":case"returningToVender":return"warning"}},m=function(n,t){var e,r=0,c=(0,u.Z)(t);try{for(c.s();!(e=c.n()).done;){e.value.type===n?r++:r=r}}catch(a){c.e(a)}finally{c.f()}return r},Z=function(){return f()().format("YYYY-MM-DD")},w=function(n){var t,e=[],r=(0,u.Z)(n);try{for(r.s();!(t=r.n()).done;){var c=t.value;c.currentInStock>=1?e=[]:e.push({sku:c.sku})}}catch(a){r.e(a)}finally{r.f()}return e},k=function(n){(0,p.dt)(n)}}}]);
//# sourceMappingURL=450.726dad3f.chunk.js.map