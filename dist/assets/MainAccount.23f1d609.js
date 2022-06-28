import{o as j}from"./openDB.477f2690.js";import{I}from"./round-star.f65dba17.js";import{a as d,c as u,e as a,_ as g,d as w,h as i,i as l,A as M,r as s,o as E,t as r,B as D,j as S,p as V,f as U}from"./index.ae061ee8.js";const O={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},L=a("path",{fill:"currentColor",d:"M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8a.5.5 0 0 0-.36-.85H6c0-3.9 3.18-7.05 7.1-7c3.72.05 6.85 3.18 6.9 6.9c.05 3.91-3.1 7.1-7 7.1c-1.61 0-3.1-.55-4.28-1.48a.994.994 0 0 0-1.32.08c-.42.42-.39 1.13.08 1.49A8.858 8.858 0 0 0 13 21c5.05 0 9.14-4.17 9-9.26c-.13-4.69-4.05-8.61-8.74-8.74zm-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26c.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74z"},null,-1),N=[L];function R(e,n){return d(),u("svg",O,N)}var H={name:"ic-round-history",render:R};const Y={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},T=a("path",{fill:"currentColor",d:"M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"},null,-1),W=[T];function q(e,n){return d(),u("svg",Y,W)}var m={name:"ic-baseline-keyboard-arrow-right",render:q};const G={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},J=a("path",{fill:"currentColor",d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"},null,-1),K=[J];function P(e,n){return d(),u("svg",G,K)}var Q={name:"ic-baseline-error",render:P};const X={class:"exit-account"},Z={class:"heading"},aa=M(" \u786E\u8BA4\u9000\u51FA\uFF1F "),ta=w({__name:"ExitAccount",emits:["close","ok"],setup(e,{emit:n}){const v=()=>{n("close")},f=()=>{n("ok")};return(p,_)=>(d(),u("div",X,[a("h3",Z,[i(l(Q),{class:"icon"}),aa]),a("div",{class:"bottom"},[a("button",{class:"cancel",onClick:v}," \u53D6\u6D88 "),a("button",{class:"ok",onClick:f}," \u786E\u8BA4 ")])]))}});var oa=g(ta,[["__scopeId","data-v-112a1036"]]);const o=e=>(V("data-v-aa752628"),e=e(),U(),e),ea={class:"main-account"},na={class:"base-information"},sa={class:"character"},ia={class:"left"},ca=["src"],ra={class:"name"},la=o(()=>a("button",null,"\u7F16\u8F91\u8D44\u6599",-1)),da={class:"count"},ua={class:"item"},va={class:"number"},fa=o(()=>a("span",{class:"field"},"\u5934\u6761",-1)),ha={class:"item"},pa={class:"number"},_a=o(()=>a("span",{class:"field"},"\u5173\u6CE8",-1)),ba={class:"item"},ma={class:"number"},ga=o(()=>a("span",{class:"field"},"\u7C89\u4E1D",-1)),wa={class:"item"},xa={class:"number"},ya=o(()=>a("span",{class:"field"},"\u83B7\u8D5E",-1)),ka={class:"favorite-and-history"},Ca={class:"cell"},za=o(()=>a("span",{class:"text"},"\u6536\u85CF",-1)),Aa=o(()=>a("span",{class:"separator"},null,-1)),Ba={class:"cell"},$a=o(()=>a("span",{class:"text"},"\u5386\u53F2",-1)),Fa={class:"function-list"},ja={class:"row"},Ia=o(()=>a("span",{class:"text"},"\u6D88\u606F\u901A\u77E5",-1)),Ma=o(()=>a("div",{class:"separator"},null,-1)),Ea={class:"row"},Da=o(()=>a("span",{class:"text"},"\u5C0F\u667A\u540C\u5B66",-1)),Sa=w({__name:"MainAccount",setup(e){let n=s(""),v=s(""),f=s(0),p=s(0),_=s(0),b=s(0);E(async()=>{const t=(await j()).transaction("userInformation"),h=await t.store.get("name"),C=await t.store.get("avatarUrl"),z=await t.store.get("articleCount"),A=await t.store.get("followerCount"),B=await t.store.get("fansCount"),$=await t.store.get("likeCount");t.done.then(()=>{n.value=h,v.value=C,f.value=z,p.value=A,_.value=B,b.value=$}).catch(F=>{console.log(F)})});let c=s(!1);const x=()=>{c.value=!0},y=()=>{c.value=!1};return(k,t)=>(d(),u("div",ea,[a("section",na,[a("div",sa,[a("div",ia,[a("img",{src:v.value,alt:"avatar",class:"avatar"},null,8,ca),a("span",ra,r(n.value),1)]),la]),a("div",da,[a("div",ua,[a("span",va,r(f.value),1),fa]),a("div",ha,[a("span",pa,r(p.value),1),_a]),a("div",ba,[a("span",ma,r(_.value),1),ga]),a("div",wa,[a("span",xa,r(b.value),1),ya])])]),a("section",ka,[a("div",Ca,[i(l(I),{class:"icon -favorite"}),za]),Aa,a("div",Ba,[i(l(H),{class:"icon -history"}),$a])]),a("section",Fa,[a("div",ja,[Ia,i(l(m),{class:"icon"})]),Ma,a("div",Ea,[Da,i(l(m),{class:"icon"})])]),a("section",{class:"exit-login",onClick:x}," \u9000\u51FA\u767B\u5F55 "),i(D,{modelValue:c.value,"onUpdate:modelValue":t[1]||(t[1]=h=>c.value=h),"backdrop-theme":"light","slot-transition-name":"scale"},{default:S(()=>[i(oa,{onClose:t[0]||(t[0]=h=>c.value=!1),onOk:y})]),_:1},8,["modelValue"])]))}});var Na=g(Sa,[["__scopeId","data-v-aa752628"]]);export{Na as default};
