import{u as w}from"./articleSearch.7cc43881.js";import{a as i,c as r,b as p,_ as y,d as S,y as b,I as x,J as k,u as C,F as d,A as g,f as L,g as R,n as z,t as I}from"./index.62268a27.js";import{b as N,R as h,K as T}from"./ResponseResult.f1dd6b90.js";import"./openDB.477f2690.js";const V=async c=>{const s=new URL(`${N}/v1_0/suggestion`);s.searchParams.set("q",c);const e=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}});return e.ok?new h("getSearchSuggestions","success",e):new h("getSearchSuggestions","failure",e)},$=(c,s)=>{let e;return(...l)=>{clearTimeout(e),e=setTimeout(()=>{c(...l)},s)}},B={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},E=p("path",{fill:"currentColor",d:"M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84l3.96-5.58a.99.99 0 0 0 0-1.16l-3.96-5.58z"},null,-1),j=[E];function D(c,s){return i(),r("svg",B,j)}var M={name:"ic-round-label",render:D};const q={class:"search-suggestions"},A={class:"suggestion-list"},F=["onClick"],U=S({__name:"SearchSuggestions",setup(c){const s=w(),e=b([]),l=$(async a=>{a===""?e.splice(0,e.length):T(await V(a)).with({responseType:"success"},async t=>{const n=(await t.responseContent.json()).data.options;n.at(0)!==null?e.splice(0,e.length,...n):e.splice(0,e.length)}).otherwise(t=>{console.log(t)})},750);x(()=>{l(s.searchValue)}),k(()=>{e.splice(0,e.length)});const m=a=>{const t=s.searchValue,o=[];return a.split(t).forEach(n=>{o.push({className:"normal",content:n}),o.push({className:"highlight",content:t})}),o.pop(),o},f=C(),v=a=>{s.searchValue=a,f.push("/main/search/result");try{s.addHistory(a)}catch(t){console.error(t)}};return(a,t)=>(i(),r("div",q,[p("ul",A,[(i(!0),r(d,null,g(e,(o,n)=>(i(),r("li",{key:n,class:"item",onClick:u=>v(o)},[L(R(M),{class:"icon"}),(i(!0),r(d,null,g(m(o),(u,_)=>(i(),r("span",{key:_,class:z(u.className)},I(u.content),3))),128))],8,F))),128))])]))}});var P=y(U,[["__scopeId","data-v-37a4d192"]]);export{P as default};
