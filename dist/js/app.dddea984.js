(function(e){function t(t){for(var r,n,l=t[0],o=t[1],u=t[2],c=0,m=[];c<l.length;c++)n=l[c],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&m.push(s[n][0]),s[n]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);d&&d(t);while(m.length)m.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],r=!0,l=1;l<a.length;l++){var o=a[l];0!==s[o]&&(r=!1)}r&&(i.splice(t--,1),e=n(n.s=a[0]))}return e}var r={},s={app:0},i=[];function n(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=r,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var d=o;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"12a1":function(e,t,a){"use strict";var r=a("d648"),s=a.n(r);s.a},"28fe":function(e,t,a){"use strict";var r=a("4d4a"),s=a.n(r);s.a},"4d4a":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},i=[],n={name:"app"},l=n,o=(a("c6fc"),a("2877")),u=Object(o["a"])(l,s,i,!1,null,"d52c96f4",null),d=u.exports,c=a("8c4f"),m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login_container"},[a("div",{staticClass:"login_box"},[e._m(0),a("el-form",{ref:"form",staticClass:"login_form",attrs:{"label-width":"0px",model:e.form,rules:e.loginRules}},[a("el-form-item",{attrs:{label:"",prop:"username"}},[a("el-input",{attrs:{"prefix-icon":"el-icon-user"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),a("el-form-item",{attrs:{label:"",prop:"password"}},[a("el-input",{attrs:{"prefix-icon":"el-icon-lock","show-password":""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),a("el-form-item",{staticClass:"btns",attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:e.login}},[e._v("登录")]),a("el-button",{attrs:{type:"info"},on:{click:e.reset}},[e._v("重置")])],1)],1)],1)])},p=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"avatar_box"},[r("img",{attrs:{src:a("cf05")}})])}],h=(a("96cf"),a("1da1")),f={data:function(){return{form:{username:"admin",password:""},loginRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"长度在 6 到 15 个字符",trigger:"blur"}]},successRes:{data:{id:500,rid:0,username:"admin",mobile:"12345678",email:"adsfad@qq.com",token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1ODI0Mzk1NzcsImV4cCI6MTU4MjUyNTk3N30.bCkeltLDN0jbwOUB6cfbcOABqzCnttob4D1XvldOZHA"},meta:{msg:"登录成功",status:200}},errorRes:{data:null,meta:{msg:"密码错误",status:400}}}},methods:{reset:function(){this.$refs.form.resetFields()},login:function(){var e=this;this.$refs.form.validate(function(){var t=Object(h["a"])(regeneratorRuntime.mark((function t(a){var r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$axios.post("login",e.form);case 4:if(r=t.sent,s=r.data,200===s.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error("登录失败"));case 8:e.$message({message:"登录成功",type:"success"}),sessionStorage.setItem("token",s.data.token),e.$router.push("/home");case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}},g=f,b=(a("28fe"),Object(o["a"])(g,m,p,!1,null,"2eb4eb5c",null)),v=b.exports,w=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-container",{staticClass:"home-container"},[r("el-header",[r("div",[r("img",{attrs:{src:a("cf05"),alt:""}}),r("span",[e._v("电商后台管理系统")])]),r("el-button",{attrs:{type:"info"},on:{click:e.logOut}},[e._v("退出")])],1),r("el-container",[r("el-aside",{attrs:{width:e.collapse?"64px":"200px"}},[r("div",{staticClass:"toggle-button",on:{click:e.toggleMenu}},[e._v("|||")]),r("el-menu",{attrs:{"background-color":"#333744","text-color":"#fff","active-text-color":"#409eff","unique-opened":!0,collapse:e.collapse,"collapse-transition":!1,"default-active":this.$route.path.split("/")[2],router:""}},e._l(e.menuList,(function(t){return r("el-submenu",{key:t.id,attrs:{index:t.id.toString()}},[r("template",{slot:"title"},[r("i",{class:e.iconList[t.id]}),r("span",[e._v(e._s(t.authName))])]),e._l(t.children,(function(t){return r("el-menu-item",{key:t.id,attrs:{index:t.path}},[r("template",{slot:"title"},[r("i",{staticClass:"el-icon-menu"}),r("span",[e._v(e._s(t.authName))])])],2)}))],2)})),1)],1),r("el-main",[r("router-view")],1)],1)],1)},_=[],x={data:function(){return{menuList:[],res:{data:[{id:125,authName:"用户管理",path:"users",children:[{id:110,authName:"用户列表",path:"users",children:[],order:null}],order:1},{id:103,authName:"权限管理",path:"rights",children:[{id:111,authName:"角色列表",path:"roles",children:[],order:null},{id:112,authName:"权限列表",path:"rights",children:[],order:null}],order:2},{id:101,authName:"商品管理",path:"goods",children:[{id:104,authName:"商品列表",path:"goods",children:[],order:1},{id:115,authName:"分类参数",path:"params",children:[],order:2},{id:121,authName:"商品分类",path:"categories",children:[],order:3}],order:3},{id:102,authName:"订单管理",path:"orders",children:[{id:107,authName:"订单列表",path:"orders",children:[],order:null}],order:4},{id:145,authName:"数据统计",path:"reports",children:[{id:146,authName:"数据报表",path:"reports",children:[],order:null}],order:5}],meta:{msg:"获取菜单列表成功",status:200}},iconList:{125:"el-icon-user-solid",103:"el-icon-coin",101:"el-icon-s-goods",102:"el-icon-s-claim",145:"el-icon-s-data"},collapse:!1}},created:function(){this.getMenuList()},methods:{logOut:function(){sessionStorage.clear(),this.$router.push("/login")},getMenuList:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.res,200===a.meta.status){t.next=3;break}return t.abrupt("return",e.$message.error(a.meta.msg));case 3:e.menuList=a.data;case 4:case"end":return t.stop()}}),t)})))()},toggleMenu:function(){this.collapse=!this.collapse}}},N=x,k=(a("57eb"),Object(o["a"])(N,w,_,!1,null,"23665104",null)),y=k.exports,U=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._v(" welcome ")])},$=[],F={},O=Object(o["a"])(F,U,$,!1,null,null,null),j=O.exports,q=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("用户管理")]),a("el-breadcrumb-item",[e._v("用户列表")])],1),a("el-card",{staticClass:"box-card"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getUserList},model:{value:e.params.query,callback:function(t){e.$set(e.params,"query",t)},expression:"params.query"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.searchGetUserList},slot:"append"})],1)],1),a("el-col",{attrs:{span:4778750}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加用户")])],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userList,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",label:"#"}}),a("el-table-column",{attrs:{prop:"username",label:"姓名"}}),a("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),a("el-table-column",{attrs:{prop:"mobile",label:"电话"}}),a("el-table-column",{attrs:{prop:"role_name",label:"角色"}}),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{content:t.row.mg_state?"特二神":"电电狗",placement:"top"}},[a("el-switch",{on:{change:function(a){return e.userStateChange(t)}},model:{value:t.row.mg_state,callback:function(a){e.$set(t.row,"mg_state",a)},expression:"scope.row.mg_state"}})],1),e._v(" "+e._s(t.row.mg_state)+" ")]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"operateColumnButton",attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return e.showEditDialog(t.row)}}}),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.delUser(t.row.id)}}}),a("el-tooltip",{attrs:{content:"分配角色",placement:"top",enterable:!1}},[a("el-button",{attrs:{type:"warning",icon:"el-icon-setting",size:"mini"}})],1)]}}])})],1),a("el-pagination",{attrs:{"current-page":e.params.pagenum,"page-sizes":[1,2,5,10],"page-size":e.params.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"添加用户",visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t},close:e.resetDialogForm}},[a("el-form",{ref:"addUserForm",attrs:{model:e.addUserForm,rules:e.userRules,"label-width":"70px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{model:{value:e.addUserForm.username,callback:function(t){e.$set(e.addUserForm,"username",t)},expression:"addUserForm.username"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{model:{value:e.addUserForm.password,callback:function(t){e.$set(e.addUserForm,"password",t)},expression:"addUserForm.password"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.addUserForm.email,callback:function(t){e.$set(e.addUserForm,"email",t)},expression:"addUserForm.email"}})],1),a("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[a("el-input",{model:{value:e.addUserForm.mobile,callback:function(t){e.$set(e.addUserForm,"mobile",t)},expression:"addUserForm.mobile"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addUserSubmit}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改用户",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t}}},[a("el-form",{ref:"editUserForm",attrs:{model:e.editUserForm,rules:e.userRules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{attrs:{disabled:""},model:{value:e.editUserForm.username,callback:function(t){e.$set(e.editUserForm,"username",t)},expression:"editUserForm.username"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.editUserForm.email,callback:function(t){e.$set(e.editUserForm,"email",t)},expression:"editUserForm.email"}})],1),a("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[a("el-input",{model:{value:e.editUserForm.mobile,callback:function(t){e.$set(e.editUserForm,"mobile",t)},expression:"editUserForm.mobile"}})],1)],1),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.editUserFormSubmit}},[e._v("确 定")])],1)],1)],1)},C=[],L=(a("99af"),a("45fc"),{data:function(){return{params:{query:"",pagenum:1,pagesize:2},userList:[{id:500,role_name:"超级管理员",username:"admin",create_time:1486720211,mobile:"12345678",email:"adsfad@qq.com",mg_state:!0},{id:502,role_name:"测试角色2",username:"linken",create_time:1486720211,mobile:"1213213123",email:"asdf@qq.com",mg_state:!1},{id:508,role_name:"主管",username:"asdf1",create_time:1511853015,mobile:"123123",email:"adfsa@qq.com",mg_state:!0},{id:509,role_name:"test",username:"asdf123",create_time:1511853353,mobile:"1111",email:"asdf@qq.com",mg_state:!1}],res:{data:{total:4,pagenum:1,users:[{id:500,role_name:"超级管理员",username:"admin",create_time:1486720211,mobile:"12345678",email:"adsfad@qq.com",mg_state:!0},{id:502,role_name:"测试角色2",username:"linken",create_time:1486720211,mobile:"1213213123",email:"asdf@qq.com",mg_state:!1},{id:508,role_name:"主管",username:"asdf1",create_time:1511853015,mobile:"123123",email:"adfsa@qq.com",mg_state:!0},{id:509,role_name:"test",username:"asdf123",create_time:1511853353,mobile:"1111",email:"asdf@qq.com",mg_state:!1}]},meta:{msg:"获取管理员列表成功",status:200}},total:4,value:"100",dialogVisible:!1,addUserForm:{username:"",password:"",email:"",mobile:""},userRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"用户名在 3 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"密码在 6 到 15 个字符",trigger:"blur"}],email:[{type:"email",message:"请输入正确的邮箱",trigger:"blur"}],mobile:[{pattern:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,message:"手机号错误",trigger:"blur"}]},editDialogVisible:!1,editUserForm:{}}},created:function(){this.getUserList()},methods:{getUserList:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("users",{params:e.params});case 2:a=t.sent,r=a.data,console.log(r),e.userList=r.data.users,e.total=r.data.total,console.log(r.data);case 8:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.params.pagesize=e,this.getUserList()},handleCurrentChange:function(e){this.params.pagenum=e,this.getUserList()},userStateChange:function(e){var t=this;return Object(h["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$axios.put("users/".concat(e.row.id,"/state/").concat(e.row.mg_state));case 2:if(r=a.sent,s=r.data,200===s.meta.status){a.next=7;break}return e.row.mg_state=!e.row.mg_state,a.abrupt("return",t.$message.error("更新状态失败"));case 7:t.$message({type:"success",message:"更新状态成功"});case 8:case"end":return a.stop()}}),a)})))()},searchGetUserList:function(){this.params.pagenum=1,this.getUserList()},resetDialogForm:function(){this.$refs.addUserForm.resetFields()},addUserSubmit:function(){var e=this;this.$refs.addUserForm.validate(function(){var t=Object(h["a"])(regeneratorRuntime.mark((function t(a){var r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return",e.$message.error("添加失败"));case 2:return t.next=4,e.$axios.post("users",e.addUserForm);case 4:if(r=t.sent,s=r.data,201===s.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error(s.meta.msg));case 8:e.$message({message:"添加成功",type:"success",showClose:!0}),e.dialogVisible=!1,e.getUserList();case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},showEditDialog:function(e){this.editDialogVisible=!0,this.editUserForm=e},editUserFormSubmit:function(){var e=this;this.$refs.editUserForm.validate(function(){var t=Object(h["a"])(regeneratorRuntime.mark((function t(a){var r,s,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return",e.$message.error("修改错误"));case 2:return r={id:e.editUserForm.id,email:e.editUserForm.email,mobile:e.editUserForm.mobile},t.next=5,e.$axios.put("users/".concat(e.editUserForm.id),r);case 5:if(s=t.sent,i=s.data,200===i.meta.status){t.next=9;break}return t.abrupt("return",e.$message.error("提交失败"));case 9:e.editDialogVisible=!1,e.$message.success("修改成功"),e.userList.some((function(e,t){if(e.id===i.data.id)return e=i.data,!0}));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},delUser:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(h["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$axios.delete("users/"+e);case 2:if(r=a.sent,s=r.data,200===s.meta.status){a.next=6;break}return a.abrupt("return",t.$message.error("删除失败"));case 6:t.$message.success("删除成功"),t.getUserList();case 8:case"end":return a.stop()}}),a)})))).catch((function(){t.$message({type:"info",message:"已取消删除"})}))}}}),R=L,S=(a("12a1"),Object(o["a"])(R,q,C,!1,null,"d9ca1138",null)),z=S.exports,V=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("权限管理")]),a("el-breadcrumb-item",[e._v("权限列表")])],1),a("el-card",{attrs:{"body-style":{padding:"0px"}}},[a("el-table",{attrs:{data:e.rightsList,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",label:"#"}}),a("el-table-column",{attrs:{prop:"authName",label:"权限名称"}}),a("el-table-column",{attrs:{prop:"path",label:"路径"}}),a("el-table-column",{attrs:{label:"权限等级"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"===t.row.level?a("el-tag",[e._v("一级")]):"1"===t.row.level?a("el-tag",{attrs:{type:"success"}},[e._v("二级")]):"2"===t.row.level?a("el-tag",{attrs:{type:"warning"}},[e._v("三级")]):e._e()]}}])})],1)],1)],1)},D=[],I={data:function(){return{rightsList:[{id:101,authName:"商品管理",level:"0",pid:0,path:"goods"},{id:102,authName:"订单管理",level:"0",pid:0,path:"orders"},{id:103,authName:"权限管理",level:"0",pid:0,path:"rights"},{id:104,authName:"商品列表",level:"1",pid:101,path:"goods"},{id:105,authName:"添加商品",level:"2",pid:104,path:"goods"},{id:107,authName:"订单列表",level:"1",pid:102,path:"orders"},{id:109,authName:"添加订单",level:"2",pid:107,path:"orders"},{id:110,authName:"用户列表",level:"1",pid:125,path:"users"},{id:111,authName:"角色列表",level:"1",pid:103,path:"roles"},{id:112,authName:"权限列表",level:"1",pid:103,path:"rights"},{id:115,authName:"分类参数",level:"1",pid:101,path:"params"},{id:116,authName:"商品修改",level:"2",pid:104,path:"goods"},{id:117,authName:"商品删除",level:"2",pid:104,path:"goods"},{id:121,authName:"商品分类",level:"1",pid:101,path:"categories"},{id:122,authName:"添加分类",level:"2",pid:121,path:"categories"},{id:123,authName:"删除分类",level:"2",pid:121,path:"categories"},{id:125,authName:"用户管理",level:"0",pid:0,path:"users"},{id:129,authName:"添加角色",level:"2",pid:111,path:"roles"},{id:130,authName:"删除角色",level:"2",pid:111,path:"roles"},{id:131,authName:"添加用户",level:"2",pid:110,path:"users"},{id:132,authName:"删除用户",level:"2",pid:110,path:"users"},{id:133,authName:"更新用户",level:"2",pid:110,path:"users"},{id:134,authName:"角色授权",level:"2",pid:111,path:"roles"},{id:135,authName:"取消角色授权",level:"2",pid:111,path:"roles"},{id:136,authName:"获取用户详情",level:"2",pid:110,path:"users"},{id:137,authName:"分配用户角色",level:"2",pid:110,path:"users"},{id:138,authName:"获取角色列表",level:"2",pid:111,path:"roles"},{id:139,authName:"获取角色详情",level:"2",pid:111,path:"roles"},{id:140,authName:"更新角色信息",level:"2",pid:111,path:"roles"},{id:141,authName:"更新角色权限",level:"2",pid:111,path:"roles"},{id:142,authName:"获取参数列表",level:"2",pid:115,path:"categories"},{id:143,authName:"创建商品参数",level:"2",pid:115,path:"categories"},{id:144,authName:"删除商品参数",level:"2",pid:115,path:"categories"},{id:145,authName:"数据统计",level:"0",pid:0,path:"reports"},{id:146,authName:"数据报表",level:"1",pid:145,path:"reports"},{id:147,authName:"查看权限",level:"2",pid:112,path:"rights"},{id:148,authName:"查看数据",level:"2",pid:146,path:"reports"},{id:149,authName:"获取分类详情",level:"2",pid:121,path:"categories"},{id:150,authName:"更新商品图片",level:"2",pid:104,path:"goods"},{id:151,authName:"更新商品属性",level:"2",pid:104,path:"goods"},{id:152,authName:"更新商品状态",level:"2",pid:104,path:"goods"},{id:153,authName:"获取商品详情",level:"2",pid:104,path:"goods"},{id:154,authName:"订单更新",level:"2",pid:107,path:"orders"},{id:155,authName:"获取订单详情",level:"2",pid:107,path:"orders"},{id:156,authName:"分类参数添加",level:"2",pid:101,path:"categories"},{id:157,authName:"分类参数删除",level:"2",pid:101,path:"categories"},{id:158,authName:"分类参数详情",level:"2",pid:101,path:"categories"},{id:159,authName:"设置管理状态",level:"2",pid:110,path:"users"}]}},created:function(){this.getRightsList()},methods:{getRightsList:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("rights/list");case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("请求失败"));case 6:e.rightsList=r.data;case 7:case"end":return t.stop()}}),t)})))()}}},M=I,E=Object(o["a"])(M,V,D,!1,null,"4fff0245",null),J=E.exports;r["default"].use(c["a"]);var P=[{path:"/",redirect:"/login"},{path:"/login",component:v},{path:"/home",component:y,redirect:"/home/welcome",children:[{path:"welcome",component:j},{path:"users",component:z},{path:"rights",component:J}]}],T=new c["a"]({routes:P});T.beforeEach((function(e,t,a){if("/login"===e.path)return a();var r=sessionStorage.getItem("token");if(!r)return a("/login");a()}));var B=T,A=(a("b0c0"),a("cbb5"),a("450d"),a("8bbc")),G=a.n(A),X=(a("9e1f"),a("6ed5")),Q=a.n(X),H=(a("a7cc"),a("df33")),W=a.n(H),Y=(a("672e"),a("101e")),Z=a.n(Y),K=(a("e960"),a("b35b")),ee=a.n(K),te=(a("0c67"),a("299c")),ae=a.n(te),re=(a("5466"),a("ecdf")),se=a.n(re),ie=(a("38a0"),a("ad41")),ne=a.n(ie),le=(a("f4f9"),a("c2cc")),oe=a.n(le),ue=(a("7a0f"),a("0f6c")),de=a.n(ue),ce=(a("b8e0"),a("a4c4")),me=a.n(ce),pe=(a("0fb7"),a("f529")),he=a.n(pe),fe=(a("b84d"),a("c216")),ge=a.n(fe),be=(a("8f24"),a("76b9")),ve=a.n(be),we=(a("8bd8"),a("4cb2")),_e=a.n(we),xe=(a("ce18"),a("f58e")),Ne=a.n(xe),ke=(a("4ca3"),a("443e")),ye=a.n(ke),Ue=(a("de31"),a("c69e")),$e=a.n(Ue),Fe=(a("a769"),a("5cc3")),Oe=a.n(Fe),je=(a("a673"),a("7b31")),qe=a.n(je),Ce=(a("adec"),a("3d2d")),Le=a.n(Ce),Re=(a("10cb"),a("f3ad")),Se=a.n(Re),ze=(a("eca7"),a("3787")),Ve=a.n(ze),De=(a("425f"),a("4105")),Ie=a.n(De),Me=(a("1951"),a("eedf")),Ee=a.n(Me);r["default"].use(Ee.a),r["default"].use(Ie.a),r["default"].use(Ve.a),r["default"].use(Se.a),r["default"].use(Le.a),r["default"].use(qe.a),r["default"].use(Oe.a),r["default"].use($e.a),r["default"].use(ye.a),r["default"].use(Ne.a),r["default"].use(_e.a),r["default"].use(ve.a),r["default"].use(ge.a),r["default"].component(he.a.name,he.a),r["default"].prototype.$message=he.a,r["default"].use(me.a),r["default"].use(de.a),r["default"].use(oe.a),r["default"].use(ne.a),r["default"].use(se.a),r["default"].use(ae.a),r["default"].use(ee.a),r["default"].use(Z.a),r["default"].use(W.a),r["default"].prototype.$confirm=Q.a.confirm,r["default"].use(G.a);a("aede");var Je=a("bc3a"),Pe=a.n(Je);Pe.a.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/",Pe.a.interceptors.request.use((function(e){return e.headers.Authorization=sessionStorage.getItem("token"),e})),r["default"].prototype.$axios=Pe.a,r["default"].config.productionTip=!1,new r["default"]({router:B,render:function(e){return e(d)}}).$mount("#app")},"57eb":function(e,t,a){"use strict";var r=a("eb18"),s=a.n(r);s.a},aede:function(e,t,a){},b655:function(e,t,a){},c6fc:function(e,t,a){"use strict";var r=a("b655"),s=a.n(r);s.a},cf05:function(e,t,a){e.exports=a.p+"img/logo.82b9c7a5.png"},d648:function(e,t,a){},eb18:function(e,t,a){}});
//# sourceMappingURL=app.dddea984.js.map