(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{AXf8:function(t,e,n){"use strict";n.r(e);var a=n("0iUn"),i=n("sLSF"),o=n("MI3g"),c=n("a7VT"),l=n("AT/M"),u=n("Tit0"),s=n("vYYK"),d=n("q1tI"),r=n.n(d),b=n("6mVS"),p=r.a.createElement,h=function(t){function e(){var t,n;Object(a.a)(this,e);for(var i=arguments.length,u=new Array(i),d=0;d<i;d++)u[d]=arguments[d];return n=Object(o.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(u))),Object(s.a)(Object(l.a)(n),"state",{discount:"10%",enabled:!1}),Object(s.a)(Object(l.a)(n),"handleSubmit",(function(){n.setState({discount:n.state.discount}),console.log("submission",n.state)})),Object(s.a)(Object(l.a)(n),"handleChange",(function(t){return function(e){return n.setState(Object(s.a)({},t,e))}})),Object(s.a)(Object(l.a)(n),"handleToggle",(function(){n.setState((function(t){return{enabled:!t.enabled}}))})),n}return Object(u.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this.state,e=t.discount,n=t.enabled,a=n?"Disable":"Enable",i=n?"enabled":"disabled";return p(b.m,null,p(b.l,null,p(b.l.AnnotatedSection,{title:"Default discount",description:"Add a product to Sample App, it will automatically be discounted."},p(b.d,{sectioned:!0},p(b.i,{onSubmit:this.handleSubmit},p(b.j,null,p(b.s,{value:e,onChange:this.handleChange("discount"),label:"Discount percentage",type:"discount"}),p(b.r,{distribution:"trailing"},p(b.c,{primary:!0,submit:!0},"Save")))))),p(b.l.AnnotatedSection,{title:"Price updates",description:"Temporarily disable all Sample App price updates"},p(b.q,{action:{content:a,onAction:this.handleToggle},enabled:n},"This setting is"," ",p(b.t,{variation:"strong"},i),"."))))}}]),e}(r.a.Component);e.default=h},mhuj:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/annotated-layout",function(){return n("AXf8")}])}},[["mhuj",1,0]]]);