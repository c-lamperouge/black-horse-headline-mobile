import{a as o,c as n,b as e,_ as x,d as k,z as b,r as C,u as S,f as r,g as c,w as v,D as p,J as H,k as I,p as $,h as z,F as D,A as M,t as j,H as B}from"./index.1605adbd.js";import{I as V}from"./baseline-close.c82a44f0.js";import{u as A}from"./articleSearch.9a4d260e.js";import"./openDB.477f2690.js";const L={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},F=e("path",{fill:"currentColor",d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"},null,-1),R=[F];function N(a,l){return o(),n("svg",L,R)}var Y={name:"ic-baseline-delete",render:N};const E={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},G=e("path",{fill:"currentColor",d:"M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"},null,-1),J=[G];function T(a,l){return o(),n("svg",E,J)}var q={name:"ic-baseline-check",render:T};const K=a=>($("data-v-a51e2d90"),a=a(),z(),a),O={class:"search-history"},P={class:"search-heading"},Q=K(()=>e("span",null,"\u641C\u7D22\u5386\u53F2",-1)),U={class:"right"},W=["onClick"],X=["onClick"],Z=k({__name:"SearchHistories",async setup(a){let l,h;const i=A();try{[l,h]=b(()=>i.loadHistories()),await l,h()}catch(t){console.error(t)}let s=C(!1);const f=()=>{s.value?(i.clearHistories(),s.value=!1):s.value=!0},u=()=>{s.value=!1},_=S(),g=t=>{i.searchValue=t,_.push("/main/search/result")},m=t=>{console.log(`delete index ${t}`),i.deleteHistory(t)};return(t,ee)=>(o(),n("div",O,[e("h3",P,[Q,e("div",U,[e("div",{class:"delete1",onClick:f},[r(c(Y),{class:"icon1"})]),v(e("div",{class:"finish",onClick:u},[r(c(q),{class:"icon2"})],512),[[p,s.value]])])]),r(H,{name:"list",tag:"ul",class:"history-list"},{default:I(()=>[(o(!0),n(D,null,M(c(i).histories,(d,w)=>(o(),n("li",{key:d.timeStamp,class:"item",onClick:y=>g(d.content)},[e("span",null,j(d.content),1),v(e("div",{class:"delete2",onClick:B(y=>m(w),["stop"])},[r(c(V),{class:"icon3"})],8,X),[[p,s.value]])],8,W))),128))]),_:1})]))}});var oe=x(Z,[["__scopeId","data-v-a51e2d90"]]);export{oe as default};
