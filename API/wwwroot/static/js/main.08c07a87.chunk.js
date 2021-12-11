(this["webpackJsonpclient-app"]=this["webpackJsonpclient-app"]||[]).push([[0],{248:function(e,t,n){},249:function(e,t,n){},381:function(e,t,n){"use strict";n.r(t),n.d(t,"history",(function(){return Qe}));var c=n(0),r=n.n(c),s=n(35),a=n.n(s),i=(n(246),n(247),n(248),n(249),n(32)),o=n(15),l=n(410),u=n(228),j=n(14),d=n.n(j),b=n(31),h=n(13),O=n(116),f=n(12),p=n(64),x=n.n(p),m=n(137);x.a.defaults.baseURL="/api";var g=function(e){return e.data};x.a.interceptors.request.use((function(e){var t=I.commonStore.token;return t&&(e.headers.Authorization="Bearer ".concat(t)),e}),(function(e){var t=e.response,n=t.data;switch(t.status){case 400:if(n.errors){var c=[];for(var r in n.errors)n.errors[r]&&c.push(n.errors[r]);throw c.flat()}m.b.error(n)}}));var v=function(e){return x.a.get(e).then(g)},k=function(e,t){return x.a.post(e,t).then(g)},w=function(e,t){return x.a.put(e,t).then(g)},y=function(e){return x.a.delete(e).then(g)},C={Tickets:{list:function(e){return x.a.get("/tickets",{params:e}).then(g)},details:function(e){return v("/tickets/".concat(e))},update:function(e){return w("/tickets/".concat(e.id),e)},create:function(e){return k("/tickets",e)},delete:function(e){return y("/tickets/".concat(e))},updateWatchers:function(e){return x.a.put("/tickets/".concat(e,"/watch")).then(g)}},Account:{current:function(){return v("/account")},currentRole:function(){return v("/account/role")},getTransactions:function(e){return v("/transaction/".concat(e))},createWebsite:function(e){return k("/account/website",e)},login:function(e){return k("/account/login",e)},register:function(e){return k("/account/register",e)},allClients:function(){return v("/account/allusers")},deleteUser:function(e){return y("/account/".concat(e))}},Contact:{send:function(e){return k("/contact",e)}}},S=n(17),N=function(){function e(){var t=this;Object(h.a)(this,e),this.tickets=[],this.ticketRegistry=new Map,this.predicate=(new Map).set("all",!0),this.setTickets=function(e){e.forEach((function(e){console.log("loading ticket:",e.id),e.date=e.date.split("T")[0],t.ticketRegistry.set(e.id,e)}))},this.setPredicate=function(e,n){var c=function(){t.predicate.forEach((function(e,n){"startDate"!==n&&t.predicate.delete(n)}))};switch(e){case"all":c(),t.predicate.set("all",!0);break;case"isWatching":c(),t.predicate.set("isWatching",!0);break;case"isAssignedTo":c(),t.predicate.set("isAssignedTo",!0);break;case"isOwner":c(),t.predicate.set("isOwner",!0);break;case"startDate":c(),t.predicate.set("startDate",n)}},this.loadTickets=Object(b.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=t,e.next=4,C.Tickets.list(t.axiosParams);case 4:e.t1=e.sent,e.t0.setTickets.call(e.t0,e.t1),e.next=11;break;case 8:e.prev=8,e.t2=e.catch(0),console.log(e.t2);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),this.createTicket=function(){var e=Object(b.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.Tickets.create(n);case 3:console.log("Ticket Created: ",n),t.loadTickets(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),this.deleteTicket=function(){var e=Object(b.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.Tickets.delete(n);case 3:Object(f.h)((function(){t.ticketRegistry.delete(n)})),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),this.editTicket=function(){var e=Object(b.a)(d.a.mark((function e(t,n,c){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,Object(f.h)((function(){t[n]=c})),e.next=4,C.Tickets.update(t);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,n,c){return e.apply(this,arguments)}}(),this.updateWatchers=function(){var e=Object(b.a)(d.a.mark((function e(n,c){var r,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.Tickets.updateWatchers(n);case 3:r=t.ticketRegistry.get(n),console.log(n),s=r.users.findIndex((function(e){return e.username===c})),Object(f.h)((function(){if(s>=0)r.users[s].isWatching=!r.users[s].isWatching,t.ticketRegistry.set(n,r);else{var e={username:c,isWatching:!0,displayName:null,isAssignedTo:!1,isOwner:!1};r.users.push(e),t.ticketRegistry.set(n,r)}})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,n){return e.apply(this,arguments)}}(),Object(f.d)(this),Object(f.g)((function(){return t.predicate.keys()}),(function(){t.ticketRegistry.clear(),t.loadTickets()}))}return Object(S.a)(e,[{key:"axiosParams",get:function(){var e=new URLSearchParams;return this.predicate.forEach((function(t,n){"startDate"===n?e.append(n,t.toISOString()):e.append(n,t)})),e}}]),e}(),T=function(){function e(){var t=this;Object(h.a)(this,e),this.user=null,this.clientManager=new Map,this.transactionHistory=[],this.login=function(){var e=Object(b.a)(d.a.mark((function e(n){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.Account.login(n);case 3:c=e.sent,I.commonStore.setToken(c.token),Object(f.h)((function(){t.user=c})),Qe.push("/profile"),I.modalStore.closeModal(),e.next=13;break;case 10:throw e.prev=10,e.t0=e.catch(0),e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),this.logout=function(){I.commonStore.setToken(null),window.localStorage.removeItem("jwt"),t.user=null,Qe.push("")},this.getUser=Object(b.a)(d.a.mark((function e(){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.Account.current();case 3:return n=e.sent,e.next=6,C.Account.currentRole();case 6:n.role=e.sent,Object(f.h)((function(){return t.user=n})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])}))),this.getClients=Object(b.a)(d.a.mark((function e(){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.Account.allClients();case 3:n=e.sent,t.setClients(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),this.setClients=function(){var e=Object(b.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.forEach((function(e){t.clientManager.set(e.id,e)}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.setTransactions=Object(b.a)(d.a.mark((function e(){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t.user){e.next=6;break}return e.next=4,C.Account.getTransactions(t.user.username);case 4:n=e.sent,Object(f.h)((function(){return t.transactionHistory=n}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),this.createWebsite=function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("Creating website: ",t),e.next=4,C.Account.createWebsite(t);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),this.deleteUser=function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.Account.deleteUser(t);case 3:console.log("user deleted!"),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),Object(f.d)(this)}return Object(S.a)(e,[{key:"isLoggedIn",get:function(){return!!this.user}}]),e}(),I={ticketStore:new N,userStore:new T,commonStore:new function e(){var t=this;Object(h.a)(this,e),this.error=null,this.token=window.localStorage.getItem("jwt"),this.appLoaded=!1,this.setServerError=function(e){t.error=e},this.setToken=function(e){t.token=e},this.setAppLoaded=function(){t.appLoaded=!0},Object(f.d)(this),Object(f.g)((function(){return t.token}),(function(e){e?window.localStorage.setItem("jwt",e):window.localStorage.removeItem("jwt")}))},modalStore:new function e(){var t=this;Object(h.a)(this,e),this.modal={open:!1,body:null},this.openModal=function(e){t.modal.open=!0,t.modal.body=e},this.closeModal=function(){t.modal.open=!1,t.modal.body=null},Object(f.d)(this)},contactStore:new function e(){Object(h.a)(this,e),this.sendContactEmail=function(e){C.Contact.send(e),console.log("email sent!")},Object(f.d)(this)},commentStore:new function e(){var t=this;Object(h.a)(this,e),this.ticketComments=new Map,this.hubConnection=null,this.createHubConnection=function(e){t.hubConnection=(new O.a).withUrl("/chat?ticketId="+e,{accessTokenFactory:function(){var e;return null===(e=I.userStore.user)||void 0===e?void 0:e.token}}).withAutomaticReconnect().configureLogging(O.b.Information).build(),t.hubConnection.start().catch((function(e){return console.log("Error establishing connection: ",e)})),t.hubConnection.on("LoadComments",(function(e){Object(f.h)((function(){e.comments.forEach((function(e){e.createAt=new Date(e.createAt+"Z")})),t.ticketComments.set(e.ticketId,e.comments)}))})),t.hubConnection.on("ReceiveComment",(function(e){Object(f.h)((function(){var n=e.comment;n.createAt=new Date(n.createAt);var c=t.ticketComments.get(e.ticketId);c.push(n),console.log("Comment Store:",n),t.ticketComments.set(e.ticketId,c)}))}))},this.stopHubConnection=function(){var e;null===(e=t.hubConnection)||void 0===e||e.stop().catch((function(e){return console.log("Error stopping connection: ",e)}))},this.clearComments=function(){t.ticketComments.clear(),t.stopHubConnection()},this.addComment=function(){var e=Object(b.a)(d.a.mark((function e(n){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,null===(c=t.hubConnection)||void 0===c?void 0:c.invoke("SendComment",n);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}(),Object(f.d)(this)},progressStore:new function e(){var t=this;Object(h.a)(this,e),this.progressRegistry=new Map,this.hubConnection=null,this.createHubConnection=function(e){t.hubConnection=(new O.a).withUrl("/progress?websiteId="+e,{accessTokenFactory:function(){var e;return null===(e=I.userStore.user)||void 0===e?void 0:e.token}}).withAutomaticReconnect().configureLogging(O.b.Information).build(),t.hubConnection.start().catch((function(e){return console.log("Error establishing connection: ",e)})),t.hubConnection.on("LoadNotes",(function(e){Object(f.h)((function(){e.notes.forEach((function(e){e.createAt=new Date(e.createAt+"Z")})),t.progressRegistry.set(e.websiteId,e.notes)}))})),t.hubConnection.on("ReceiveNote",(function(e){Object(f.h)((function(){console.log(e);var n=e.note;n.createAt=new Date(n.createAt);var c=t.progressRegistry.get(e.websiteId);c.push(n),console.log("Progress Store:",n),t.progressRegistry.set(e.websiteId,c)}))}))},this.addNote=function(){var e=Object(b.a)(d.a.mark((function e(n){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,null===(c=t.hubConnection)||void 0===c?void 0:c.invoke("SendProgressNote",n);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}(),Object(f.d)(this)}},A=Object(c.createContext)(I);function E(){return Object(c.useContext)(A)}var R=n(21),M=n(395),F=n(406),P=n(399),W=n(392),D=n(405),L=n(30),H=n(18),U=n(398),B=n(91),z=n(394),V=n(1),q=Object(o.a)((function(e){var t=e.ticketId,n=E().commentStore;Object(c.useEffect)((function(){return t&&n.createHubConnection(t),function(){n.clearComments()}}),[n,t]);return Object(V.jsx)(F.a,{clearing:!0,children:Object(V.jsxs)(U.a.Group,{children:[Object(V.jsx)(H.d,{onSubmit:function(e,t){var c=t.resetForm;return n.addComment(e).then((function(){return c()}))},initialValues:{ticketId:t,body:""},validationSchema:B.b({body:B.c().required()}),children:function(e){var t=e.isValid,n=e.handleSubmit;return Object(V.jsx)(H.c,{className:"ui form",children:Object(V.jsx)(H.b,{name:"body",children:function(e){return Object(V.jsx)("div",{style:{position:"relative"},children:Object(V.jsx)("textarea",Object(L.a)(Object(L.a)({placeholder:"Add comment (Enter to submit; SHIFT+Enter for new line)",rows:2},e.field),{},{onKeyPress:function(e){"Enter"===e.key&&e.shiftKey||"Enter"!==e.key||e.shiftKey||(e.preventDefault(),t&&n())}}))})}})})}}),function(){var e=n.ticketComments.get(t),c=[];if(!e)return c;var r,s=Object(i.a)(e);try{for(s.s();!(r=s.n()).done;){var a=r.value;c.push(Object(V.jsx)(U.a,{children:Object(V.jsxs)(U.a.Content,{children:[Object(V.jsx)(U.a.Author,{as:"a",children:a.username}),Object(V.jsx)(U.a.Metadata,{children:Object(V.jsxs)("div",{children:[Object(z.a)(a.createAt)," ago"]})}),Object(V.jsx)(U.a.Text,{style:{whiteSpace:"pre-wrap"},children:a.body}),Object(V.jsx)(U.a.Actions,{children:Object(V.jsx)(U.a.Action,{children:"Reply"})})]})},a.id))}}catch(o){s.e(o)}finally{s.f()}return c}()]})})})),K=n(161),G=n(117),Q=Object(o.a)((function(e){var t=e.ticketId,n=E(),c=n.ticketStore,r=n.userStore,s=c.updateWatchers,a=c.ticketRegistry,i=r.user;return Object(V.jsxs)(V.Fragment,{children:[a.get(t).users.map((function(e){return e.isWatching?Object(V.jsx)(K.a,{as:"a",color:"blue",children:e.username},t+e.username):null})),Object(V.jsx)(D.a,{compact:!0,onClick:function(){console.log("Updating Watchers"),s(t,i.username)},children:Object(V.jsx)(G.a,{fitted:!0,name:"eye"})})]})})),J=Object(o.a)((function(e){var t=e.ticket,n=E().ticketStore,r=n.deleteTicket,s=n.editTicket,a=[{key:"low",text:"Low",value:"low",label:{color:"green",empty:!0,circular:!0}},{key:"medium",text:"Medium",value:"medium",label:{color:"yellow",empty:!0,circular:!0}},{key:"high",text:"High",value:"high",label:{color:"red",empty:!0,circular:!0}}],i=[{key:"open",text:"Open",value:"open",label:{color:"green",empty:!0,circular:!0}},{key:"blocked",text:"Blocked",value:"blocked",label:{color:"yellow",empty:!0,circular:!0}},{key:"closed",text:"Closed",value:"closed",label:{color:"blue",empty:!0,circular:!0}}],o=Object(c.useState)(!1),l=Object(R.a)(o,2),u=l[0],j=l[1],d=function(e,n){console.log("Updating Ticket",t),s(t,e,n)};var b=function(){j((function(e){return!e}))};return Object(V.jsx)(F.a.Group,{children:Object(V.jsx)(F.a,{className:"ticket-segment",children:Object(V.jsxs)(P.a,{children:[Object(V.jsxs)(P.a.Content,{className:"ticket-item",children:[Object(V.jsxs)(P.a.Header,{className:"ticket-header",children:[Object(V.jsxs)("span",{className:"ticket-username",children:[Object(V.jsx)("strong",{children:"Owner:"})," ",t.users[0].username]}),Object(V.jsxs)("span",{className:"ticket-status",children:[Object(V.jsx)("strong",{children:"Status:"}),Object(V.jsx)(M.a,{defaultValue:t.status,options:i,onChange:function(e,t){d("status",t.value)}},t.id+"status")]}),Object(V.jsxs)("span",{className:"ticket-priority",children:[Object(V.jsx)("strong",{children:"Priority:"}),Object(V.jsx)(M.a,{defaultValue:t.priority,options:a,onChange:function(e,t){d("priority",t.value)}},t.id+"priority")]}),Object(V.jsxs)("span",{className:"ticket-subject",children:[Object(V.jsx)("strong",{children:"Subject:"})," ",t.subject,Object(V.jsx)("br",{}),Object(V.jsx)("strong",{children:"Date Created:"}),t.date]}),Object(V.jsx)("span",{children:Object(V.jsx)(Q,{ticketId:t.id},t.id+"watch")})]}),Object(V.jsx)(P.a.Meta,{className:"ticket-site",children:Object(V.jsxs)("span",{children:[Object(V.jsx)("strong",{children:"Site: "}),t.site]})}),Object(V.jsxs)(P.a.Description,{className:"ticket-description",children:[Object(V.jsx)(W.a,{horizontal:!0,children:"Description"}),Object(V.jsx)("div",{className:"ticket-text",children:Object(V.jsx)("p",{children:t.description})})]}),u?Object(V.jsx)(D.a,{color:"blue",onClick:function(){return b()},children:"Hide Comments"}):Object(V.jsx)(D.a,{positive:!0,onClick:function(){return b()},children:"Show Comments"}),Object(V.jsx)(D.a,{negative:!0,onClick:function(e){var n;n=t.id,r(n)},children:"Delete"}),Object(V.jsx)(D.a,{color:"blue",floated:"right",children:"Archive"})]}),u?Object(V.jsx)(q,{ticketId:t.id}):null]},t.id)})})})),Z=n(396),_=n(408),X=Object(o.a)((function(){var e=E().ticketStore,t=e.predicate,n=e.setPredicate;return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsxs)(Z.a,{vertical:!0,size:"large",style:{width:"100%",marginTop:25},children:[Object(V.jsx)(_.a,{icon:"filter",attached:!0,color:"teal",content:"Filters"}),Object(V.jsx)(Z.a.Item,{content:"All Tickets",active:t.has("all"),onClick:function(){return n("all","true")}}),Object(V.jsx)(Z.a.Item,{content:"I'm watching",active:t.has("isWatching"),onClick:function(){return n("isWatching","true")}}),Object(V.jsx)(Z.a.Item,{content:"I'm Assigned To",active:t.has("isAssignedTo"),onClick:function(){return n("isAssignedTo","true")}}),Object(V.jsx)(Z.a.Item,{content:"I Created",active:t.has("isOwner"),onClick:function(){return n("isOwner","true")}})]}),Object(V.jsx)(_.a,{})]})})),Y=Object(o.a)((function(){var e=E().ticketStore,t=e.ticketRegistry;return Object(c.useEffect)((function(){e.loadTickets()}),[e]),Object(V.jsxs)(c.Fragment,{children:[Object(V.jsx)("title",{children:"MWS | Dashboard"}),Object(V.jsx)("div",{className:"ticket-dashboard",children:Object(V.jsxs)(l.a,{children:[Object(V.jsx)(u.a,{width:"10",children:function(){var e,n=[],c=Object(i.a)(t.values());try{for(c.s();!(e=c.n()).done;){var r=e.value;n.push(Object(V.jsx)(J,{ticket:r},r.id))}}catch(s){c.e(s)}finally{c.f()}return n}()}),Object(V.jsx)(u.a,{width:"6",children:Object(V.jsx)(X,{})})]})})]})})),$=n(53),ee=n(229),te=n(397);function ne(e){var t=Object(H.e)(e.name),n=Object(R.a)(t,2),c=n[0],r=n[1];return Object(V.jsxs)(te.a.Field,{error:r.touched&&!!r.error,children:[Object(V.jsx)("label",{children:e.label}),Object(V.jsx)("input",Object(L.a)(Object(L.a)({},c),e)),r.touched&&r.error?Object(V.jsx)(K.a,{basic:!0,color:"red",children:r.error}):null]})}var ce=Object(o.a)((function(){var e=E().userStore;return Object(V.jsx)(H.d,{initialValues:{email:"",password:"",error:null},onSubmit:function(t,n){var c=n.setErrors;return e.login(t).catch((function(e){return c({error:"Invalid email or password"})}))},children:function(e){var t=e.handleSubmit,n=(e.isSubmitting,e.errors);return Object(V.jsxs)(H.c,{className:"ui form login-form",onSubmit:t,autoComplete:"off",children:[Object(V.jsx)(ee.a,{className:"login-img",src:"/assets/mws-logo-512.png",size:"tiny"}),Object(V.jsx)(ne,{name:"email",placeholder:"Email"}),Object(V.jsx)(ne,{name:"password",placeholder:"Password",type:"password"}),Object(V.jsx)(H.a,{name:"error",render:function(){return Object(V.jsx)(K.a,{style:{marginBottom:"10px"},basic:!0,color:"red",content:n.error})}}),Object(V.jsx)(D.a,{positive:!0,content:"Login",type:"submit",fluid:!0})]})}})})),re=Object(o.a)((function(){var e=E(),t=e.userStore,n=e.modalStore;return Object(V.jsx)("div",{className:"navbar-wrapper",children:Object(V.jsxs)(Z.a,{borderless:!0,fixed:"top",children:[Object(V.jsx)(Z.a.Item,{as:$.b,to:"/",exact:!0,children:Object(V.jsx)(ee.a,{src:"/assets/mws-logo-512.png",size:"tiny"})}),Object(V.jsx)(Z.a.Item,{as:$.b,to:"/contact",children:"Contact"}),Object(V.jsx)(Z.a.Item,{children:"Portfolio"}),function(){if(t.isLoggedIn)return Object(V.jsx)(Z.a.Item,{as:$.b,to:"/profile",children:"Profile"})}(),function(){if(t.isLoggedIn&&t.user.role.includes("SuperAdmin"))return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(Z.a.Item,{as:$.b,to:"/tickets",children:"Ticket Dashboard"}),Object(V.jsx)(Z.a.Item,{as:$.b,to:"/clientManager",children:"Client Manager"})]})}(),t.isLoggedIn?Object(V.jsxs)(Z.a.Item,{position:"right",children:["Welcome ",t.user.username,"!",Object(V.jsx)(D.a,{className:"login-btn",onClick:function(){return t.logout()},as:$.a,to:"",negative:!0,children:"Logout"})]}):Object(V.jsx)(Z.a.Item,{position:"right",children:Object(V.jsx)(D.a,{className:"login-btn",onClick:function(){return n.openModal(Object(V.jsx)(ce,{}))},positive:!0,children:"Client Login"})})]})})})),se=n(23),ae=n(42),ie=["#0088FE","#00C49F","#FFBB28"];function oe(e){return Object(V.jsx)("div",{className:"port-slide",style:{backgroundColor:"".concat(e),backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"50% 50%"}})}var le="addslide-last",ue="delslide-start",je="addslide-start",de="delslide-last";function be(e,t){switch(t.type){case le:return t.ind=(t.ind+4)%ie.length,e.push(oe(ie[t.ind])),e;case ue:return e.splice(0,1),e;case je:return t.ind=((t.ind-2)%(n=ie.length)+n)%n,e=[oe(ie[t.ind])].concat(Object(ae.a)(e));case de:return e.splice(e.length-1,1),e}var n}function he(){var e=Object(c.useState)(0),t=Object(R.a)(e,2),n=t[0],r=t[1],s=Object(c.useReducer)(be,function(){for(var e=[],t=0;t<ie.length;t++)e.push(oe(ie[t]));return[oe(ie[ie.length-1])].concat(Object(ae.a)(e),[oe(ie[0])])}()),a=Object(R.a)(s,2),i=a[0],o=a[1],l=Object(c.useState)(0),u=Object(R.a)(l,2),j=u[0],d=u[1],b=Object(c.useState)(!0),h=Object(R.a)(b,2),O=h[0],f=h[1],p=Object(c.useRef)(null);function x(){p.current&&clearTimeout(p.current)}function m(){f(!0)}return Object(c.useEffect)((function(){return x(),p.current=setTimeout((function(){return[m(),d((function(e){return 0===e?-1:0}))]}),5e3),function(){x()}}),[j]),Object(V.jsxs)("div",{className:"portfolio segment-div-white",style:{backgroundColor:"white"},children:[Object(V.jsx)(_.a,{as:"h1",style:{color:"black"},children:"Portfolio(Coming Soon...)"}),Object(V.jsxs)("div",{className:"port-slideshow",children:[Object(V.jsx)("div",{className:"port-slideshowSlider",style:{transform:"translateX(".concat(20*j-20,"%)"),transition:O?"ease 2000ms":"none"},onTransitionEnd:function(){return-1===j?(o({type:le,ind:n}),o({type:ue}),r((function(e){return e+1>ie.length-1?0:e+1}))):(o({type:je,ind:n}),o({type:de}),r((function(e){return e-1<0?ie.length-1:e-1}))),d((function(e){return 0})),void f(!1)},children:i}),Object(V.jsx)(D.a,{className:"left-btn",onClick:function(){d((function(e){return-1===e?0:1})),m()},positive:!0,children:"Left"}),Object(V.jsx)(D.a,{className:"right-btn",onClick:function(){d((function(e){return 1===e?0:-1})),m()},positive:!0,children:"Right"})]})]})}a.a.render(Object(V.jsx)(he,{}),document.getElementById("root"));var Oe=he;function fe(e){var t=Object(H.e)(e.name),n=Object(R.a)(t,1)[0];return Object(V.jsxs)(te.a.Field,{children:[Object(V.jsx)("label",{children:e.label}),Object(V.jsx)("textarea",Object(L.a)(Object(L.a)({},n),e))]})}function pe(){var e=E().contactStore;return Object(V.jsx)(V.Fragment,{children:Object(V.jsxs)(F.a,{children:[Object(V.jsx)(_.a,{as:"h1",content:"Contact Me!",className:"black-header"}),Object(V.jsx)(H.d,{initialValues:{email:"",description:"",error:null},onSubmit:function(t){return e.sendContactEmail({fromEmail:t.email,body:t.description})},children:Object(V.jsxs)(H.c,{className:"ui form contact-form",children:[Object(V.jsx)(ne,{name:"first-name",placeholder:"First Name"}),Object(V.jsx)(ne,{name:"last-name",placeholder:"Last Name"}),Object(V.jsx)(ne,{name:"domain",placeholder:"Your Website Domain"}),Object(V.jsx)(ne,{name:"email",placeholder:"Email"}),Object(V.jsx)(fe,{name:"description",placeholder:"Description..."}),Object(V.jsx)(D.a,{positive:!0,content:"Send",type:"submit"})]})})]})})}var xe=[n.p+"static/media/website.befe7c7c.jpg",n.p+"static/media/client.e89c0666.jpg"];function me(){var e=r.a.useState(0),t=Object(R.a)(e,2),n=t[0],c=t[1],s=r.a.useRef(null);function a(){s.current&&clearTimeout(s.current)}return r.a.useEffect((function(){return a(),s.current=setTimeout((function(){return c((function(e){return e===xe.length-1?0:e+1}))}),5e3),function(){a()}}),[n]),Object(V.jsxs)("div",{className:"slideshow",children:[Object(V.jsx)("div",{className:"slideshowSlider",style:{transform:"translate3d(".concat(100*-n,"%, 0, 0)")},children:xe.map((function(e,t){return Object(V.jsx)("div",{className:"slide",style:{backgroundImage:"url(".concat(e,")"),backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"50% 50%"}},t)}))}),Object(V.jsx)("div",{className:"quoteform-div",children:Object(V.jsx)(pe,{})}),Object(V.jsx)("div",{className:"slideshowDots",children:xe.map((function(e,t){return Object(V.jsx)("div",{className:"slideshowDot".concat(n===t?" active":""),onClick:function(){c(t)}},t)}))})]})}a.a.render(Object(V.jsx)(me,{}),document.getElementById("root"));var ge=me;function ve(){return Object(V.jsxs)(c.Fragment,{children:[Object(V.jsx)("title",{children:"MWS | Home"}),Object(V.jsx)(ge,{}),Object(V.jsxs)("div",{className:"segment-div",children:[Object(V.jsx)(_.a,{as:"h1",children:"Meet Luke!"}),Object(V.jsx)(l.a,{children:Object(V.jsx)(l.a.Column,{children:Object(V.jsxs)("div",{className:"about",children:[Object(V.jsx)(ee.a,{src:"../assets/luke-web-pic.jpg",size:"large",rounded:!0}),Object(V.jsxs)(F.a,{className:"about-section",raised:!0,style:{height:"100%"},children:[Object(V.jsx)(_.a,{as:"h1",style:{color:"black"},children:"My Goal"}),Object(V.jsxs)("p",{className:"my-goal-text",children:["Create fast and robust Single Page Applications ",Object(V.jsx)("br",{}),"supported by secure RESTful APIs ",Object(V.jsx)("br",{}),"that also meet high standards in areas of ",Object(V.jsx)("br",{}),"performance, design and ease of use. "]})]}),Object(V.jsxs)(F.a,{className:"about-section",raised:!0,style:{height:"100%"},children:[Object(V.jsx)(_.a,{as:"h1",style:{color:"black"},children:"My Tools"}),Object(V.jsxs)("div",{className:"my-tools",children:[Object(V.jsx)(ee.a,{rounded:!0,as:"a",href:"https://reactjs.org/",size:"small",src:"../logo512.png"}),Object(V.jsx)(ee.a,{rounded:!0,as:"a",href:"https://dotnet.microsoft.com/learn/dotnet/what-is-dotnet",size:"small",src:"../assets/NET_Core_Logo.png"}),Object(V.jsx)(ee.a,{rounded:!0,as:"a",href:"https://www.postgresql.org/",size:"small",src:"../assets/postgresql.png"})]})]})]})})})]}),Object(V.jsx)(Oe,{})]})}function ke(){return Object(V.jsxs)("footer",{children:[Object(V.jsx)(ee.a,{src:"/assets/mws-logo-512.png",size:"mini"}),Object(V.jsx)("p",{children:"Copyright 2021 MWS, All Rights Reserved"})]})}var we=n(400);function ye(e){var t=e.transaction;return Object(V.jsxs)(we.a.Row,{children:[Object(V.jsx)(we.a.Cell,{children:t.amount}),Object(V.jsx)(we.a.Cell,{children:t.service}),Object(V.jsx)(we.a.Cell,{children:t.description}),Object(V.jsx)(we.a.Cell,{children:t.transactiontype}),Object(V.jsx)(we.a.Cell,{children:t.createTime}),Object(V.jsx)(we.a.Cell,{children:t.dueTime})]},t.id)}var Ce=Object(o.a)((function(){var e=E().userStore,t=e.transactionHistory,n=e.user,r=Object(c.useState)(0),s=Object(R.a)(r,2),a=s[0],i=s[1];Object(c.useEffect)((function(){null==n&&e.getUser(),e.setTransactions()}),[n,a,e]);return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(_.a,{as:"h1",style:{color:"black"},children:"$"+a}),Object(V.jsxs)(we.a,{children:[Object(V.jsx)(we.a.Header,{children:Object(V.jsxs)(we.a.Row,{children:[Object(V.jsx)(we.a.HeaderCell,{children:"Amount"}),Object(V.jsx)(we.a.HeaderCell,{children:"Service"}),Object(V.jsx)(we.a.HeaderCell,{children:"Description"}),Object(V.jsx)(we.a.HeaderCell,{children:"Type"}),Object(V.jsx)(we.a.HeaderCell,{children:"Sent Date"}),Object(V.jsx)(we.a.HeaderCell,{children:"Due By"})]})}),Object(V.jsx)(we.a.Body,{children:function(){var e=[],n=0;return 0===t.length?(e.push(Object(V.jsx)(we.a.Row,{},"no-transactions")),e):(t.forEach((function(t){n+=t.amount,e.push(Object(V.jsx)(ye,{transaction:t}))})),0===a&&i((function(e){return e+n})),e)}()})]})]})})),Se=Object(o.a)((function(){var e=E(),t=e.ticketStore,n=e.userStore,c=t.ticketRegistry,r=n.user;return Object(V.jsxs)(F.a,{children:[Object(V.jsx)(_.a,{as:"h1",className:"black-header",children:"Progress Feed"}),function(){var e=[];if(null==r)return e;var t,n=Object(i.a)(c.values());try{for(n.s();!(t=n.n()).done;){var s=t.value;console.log(s.users),void 0!==s.users.find((function(e){return e.username===r.username}))&&(console.log("Ticket:",s),e.push(Object(V.jsx)(J,{ticket:s},s.id)))}}catch(a){n.e(a)}finally{n.f()}return e}()]})})),Ne=n(403),Te=n(404);function Ie(e){var t=e.url,n=E().ticketStore.createTicket;var c=new Date;return Object(V.jsx)(H.d,{initialValues:{id:"",date:c.toISOString(),username:"",site:t,subject:"",description:"",priority:"low",status:"open"},onSubmit:function(e){return function(e){var t=Object(L.a)(Object(L.a)({},e),{},{id:Object(Te.a)()});n(t)}(e)},children:function(e){var t=e.handleSubmit;return Object(V.jsxs)(H.c,{className:"ui form",onSubmit:t,autoComplete:"off",children:[Object(V.jsx)(_.a,{as:"h1",style:{color:"black"},children:"Create Ticket"}),Object(V.jsx)(ne,{placeholder:"Subject",name:"subject"}),Object(V.jsx)(ne,{placeholder:"Description",name:"description"}),Object(V.jsxs)(H.b,{as:"select",name:"priority",children:[Object(V.jsx)("option",{value:"low",children:"Low"}),Object(V.jsx)("option",{value:"med",children:"Medium"}),Object(V.jsx)("option",{value:"high",children:"High"})]}),Object(V.jsxs)(H.b,{as:"select",name:"status",children:[Object(V.jsx)("option",{value:"open",children:"Open"}),Object(V.jsx)("option",{value:"closed",children:"Closed"}),Object(V.jsx)("option",{value:"blocked",children:"Blocked"})]}),Object(V.jsx)(D.a,{positive:!0,type:"submit",children:"Submit"})]})}})}var Ae=Object(o.a)((function(e){var t=e.websiteId,n=E().progressStore;return Object(V.jsx)(V.Fragment,{children:function(){var e=n.progressRegistry.get(t),c=[];if(!e)return c;var r,s=Object(i.a)(e);try{for(s.s();!(r=s.n()).done;){var a=r.value;c.push(Object(V.jsx)(U.a,{children:Object(V.jsxs)(U.a.Content,{children:[Object(V.jsx)(U.a.Author,{as:"a",children:a.author}),Object(V.jsxs)(U.a.Metadata,{children:[Object(V.jsxs)("div",{children:[Object(z.a)(a.createAt)," ago"]}),Object(V.jsxs)("div",{children:["+",a.progressAmount,"%"]})]}),Object(V.jsx)(U.a.Text,{style:{whiteSpace:"pre-wrap"},children:a.body})]})},a.id))}}catch(o){s.e(o)}finally{s.f()}return c}()})})),Ee=Object(o.a)((function(e){var t=e.websiteId,n=E().progressStore;return Object(c.useEffect)((function(){n.createHubConnection(t)}),[n,t]),Object(V.jsx)(V.Fragment,{children:Object(V.jsx)(H.d,{onSubmit:function(e,t){var c=t.resetForm;return n.addNote(e).then((function(){return c()}))},initialValues:{websiteId:t,body:"",progressAmount:0},validationSchema:B.b({progressAmount:B.a().required(),body:B.c().required()}),children:function(e){var t=e.isValid,n=e.handleSubmit;return Object(V.jsxs)(H.c,{className:"ui form",children:[Object(V.jsx)(_.a,{as:"h3",content:"Progress Amount",className:"black-header"}),Object(V.jsx)(H.b,{type:"number",name:"progressAmount"}),Object(V.jsx)(_.a,{as:"h3",content:"Note",className:"black-header"}),Object(V.jsx)(H.b,{name:"body",children:function(e){return Object(V.jsx)("div",{style:{position:"relative"},children:Object(V.jsx)("textarea",Object(L.a)(Object(L.a)({placeholder:"Add Progress Note (Enter to submit; SHIFT+Enter for new line)",rows:2},e.field),{},{onKeyPress:function(e){"Enter"===e.key&&e.shiftKey||"Enter"!==e.key||e.shiftKey||(e.preventDefault(),t&&n())}}))})}})]})}})})}));function Re(e){var t=e.website,n=E().modalStore,r=Object(c.useState)(!1),s=Object(R.a)(r,2),a=s[0],i=s[1];return Object(V.jsxs)(F.a,{children:[Object(V.jsx)(_.a,{as:"h3",style:{color:"black"},children:t.url}),Object(V.jsx)(Ne.a,{percent:t.progress,progress:!0,color:"green"}),a?Object(V.jsx)(D.a,{color:"blue",onClick:function(){return i((function(e){return!e}))},children:"Hide Progress"}):Object(V.jsx)(D.a,{positive:!0,onClick:function(){return i((function(e){return!e}))},children:"View Progress"}),Object(V.jsx)(D.a,{color:"blue",onClick:function(){return n.openModal(Object(V.jsx)(Ie,{url:t.url}))},floated:"right",children:"Create Ticket"}),a?Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(Ee,{websiteId:t.id}),Object(V.jsx)(U.a.Group,{children:Object(V.jsx)(Ae,{websiteId:t.id})})," "]}):null]})}var Me=Object(o.a)((function(){var e=E(),t=e.userStore,n=e.ticketStore,r=t.user,s=n.ticketRegistry;return Object(c.useEffect)((function(){null==r&&t.getUser(),n.loadTickets()}),[r,t,n,s]),Object(V.jsxs)(F.a,{className:"content-container",children:[Object(V.jsx)("title",{children:"MWS | My Profile"}),Object(V.jsx)(_.a,{className:"profile-header",as:"h1",style:{color:"black"},children:"My Profile"}),Object(V.jsxs)(l.a,{children:[Object(V.jsx)(l.a.Column,{width:"8",children:Object(V.jsxs)(F.a,{raised:!0,children:[Object(V.jsx)(_.a,{as:"h1",style:{color:"black"},children:"Current Balance"}),Object(V.jsx)(Ce,{}),Object(V.jsx)(D.a,{positive:!0,children:"Pay Balance"}),Object(V.jsx)(D.a,{floated:"right",color:"blue",children:"View History"})]})}),Object(V.jsx)(l.a.Column,{width:"8",children:Object(V.jsxs)(F.a,{raised:!0,children:[Object(V.jsx)(_.a,{as:"h1",style:{color:"black"},children:"My Websites"}),Object(V.jsx)(F.a.Group,{children:function(){var e=[];return null===r||null===r.websites||0===r.websites.length?(e.push(Object(V.jsx)(F.a,{placeholder:!0,children:Object(V.jsx)(_.a,{className:"black-header",children:"No Websites Found"})})),e):(r.websites.forEach((function(t){return e.push(Object(V.jsx)(Re,{website:t},t.id))})),e)}()})]})})]}),Object(V.jsx)(Se,{})]})})),Fe=n(401),Pe=Object(o.a)((function(){var e=E().modalStore;return Object(V.jsx)(Fe.a,{open:e.modal.open,onClose:e.closeModal,size:"mini",children:Object(V.jsx)(Fe.a.Content,{children:e.modal.body})})})),We=n(402);function De(){var e=Object(c.useState)(-1),t=Object(R.a)(e,2),n=t[0],r=t[1],s=function(e,t){var c=t.index;r(n===c?-1:c)};return Object(V.jsxs)(F.a,{className:"ui segment content-container",children:[Object(V.jsx)("title",{children:"MWS | FAQ"}),Object(V.jsx)(_.a,{as:"h1",className:"black-header",children:"F.A.Q"}),Object(V.jsxs)(We.a,{styled:!0,className:"faq-accordion",children:[Object(V.jsxs)(We.a.Title,{index:0,onClick:s,children:[Object(V.jsx)(G.a,{name:"dropdown"}),"FAQ #1"]}),Object(V.jsx)(We.a.Content,{active:0===n,children:Object(V.jsx)("p",{children:"Answer #1"})}),Object(V.jsxs)(We.a.Title,{index:1,onClick:s,children:[Object(V.jsx)(G.a,{name:"dropdown"}),"FAQ #2"]}),Object(V.jsx)(We.a.Content,{active:1===n,children:Object(V.jsx)("p",{children:"Answer #2"})})]})]})}var Le=n(393);function He(){return Object(V.jsx)(V.Fragment,{children:Object(V.jsxs)(F.a,{className:"contact-form-container",children:[Object(V.jsx)("title",{children:"MWS | Contact"}),Object(V.jsxs)(l.a,{children:[Object(V.jsx)(l.a.Column,{width:"8",children:Object(V.jsx)(Le.a,{})}),Object(V.jsx)(l.a.Column,{width:"8",children:Object(V.jsx)(pe,{})})]})]})})}function Ue(e){var t=e.user,n=E().userStore.createWebsite;return Object(V.jsx)(H.d,{initialValues:{id:"",progress:0,userId:t.id,url:""},onSubmit:function(e){return function(e){var t=Object(L.a)(Object(L.a)({},e),{},{id:Object(Te.a)()});n(t)}(e)},children:function(e){var t=e.handleSubmit;return Object(V.jsxs)(H.c,{className:"ui form",onSubmit:t,autoComplete:"off",children:[Object(V.jsx)(_.a,{as:"h1",style:{color:"black"},children:"Create Website Instance"}),Object(V.jsx)(ne,{placeholder:"Any Progress?",name:"progress"}),Object(V.jsx)(ne,{placeholder:"URL",name:"url"}),Object(V.jsx)(D.a,{positive:!0,type:"submit",children:"Submit"})]})}})}function Be(e){var t=e.client,n=E(),c=n.userStore,r=n.modalStore,s=c.clientManager;return Object(V.jsxs)(F.a,{clearing:!0,className:"clientManager",children:[Object(V.jsxs)("p",{children:[Object(V.jsx)("strong",{children:"Username:"})," ",t.username,Object(V.jsx)("strong",{children:" Role:"})," ",t.role]}),Object(V.jsx)(D.a,{onClick:function(e){return n=t.id,c.deleteUser(n),void s.delete(n);var n},negative:!0,floated:"right",children:"Remove User"}),Object(V.jsx)(D.a,{positive:!0,floated:"right",onClick:function(){return r.openModal(Object(V.jsx)(Ue,{user:t}))},children:"Create Website"})]})}var ze=Object(o.a)((function(){var e=E().userStore,t=e.clientManager;return Object(c.useEffect)((function(){e.getClients()}),[e,t]),Object(V.jsxs)(F.a,{children:[Object(V.jsx)("title",{children:"MWS | Client Dashboard"}),function(){var e,n=[],c=Object(i.a)(t.values());try{for(c.s();!(e=c.n()).done;){var r=e.value;r.role.includes("SuperAdmin")||n.push(Object(V.jsx)(Be,{client:r},r.id))}}catch(s){c.e(s)}finally{c.f()}return n}()]})}));function Ve(){return Object(V.jsxs)(F.a,{placeholder:!0,children:[Object(V.jsxs)(_.a,{icon:!0,style:{color:"black"},children:[Object(V.jsx)(G.a,{name:"search"}),"Oops - we've looked everywhere and could not find this page."]}),Object(V.jsx)(F.a.Inline,{children:Object(V.jsx)(D.a,{as:$.a,to:"/",primary:!0,children:"Return to Home Page"})})]})}var qe=Object(o.a)((function(){var e=E(),t=e.commonStore,n=e.userStore;return Object(c.useEffect)((function(){t.token?n.getUser().finally((function(){return t.setAppLoaded()})):t.setAppLoaded()}),[t,n]),Object(V.jsxs)(c.Fragment,{children:[Object(V.jsx)(Pe,{}),Object(V.jsx)(m.a,{position:"bottom-right",hideProgressBar:!0}),Object(V.jsx)(re,{}),Object(V.jsxs)("div",{id:"page-container",children:[Object(V.jsx)("div",{id:"content-wrapper",children:Object(V.jsxs)(se.c,{children:[Object(V.jsx)(se.a,{exact:!0,path:"/",component:ve}),Object(V.jsx)(se.a,{path:"/faq",component:De}),Object(V.jsx)(se.a,{path:"/tickets",component:Y}),Object(V.jsx)(se.a,{path:"/clientManager",component:ze}),Object(V.jsx)(se.a,{path:"/contact",component:He}),Object(V.jsx)(se.a,{path:"/profile",component:Me}),Object(V.jsx)(se.a,{path:"/login",component:ce}),Object(V.jsx)(se.a,{component:Ve})]})}),Object(V.jsx)("div",{children:Object(V.jsx)(ke,{})})]})]})})),Ke=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,411)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))},Ge=n(44),Qe=Object(Ge.a)();a.a.render(Object(V.jsx)(A.Provider,{value:I,children:Object(V.jsx)(se.b,{history:Qe,children:Object(V.jsx)(qe,{})})}),document.getElementById("root")),Ke()}},[[381,1,2]]]);
//# sourceMappingURL=main.08c07a87.chunk.js.map