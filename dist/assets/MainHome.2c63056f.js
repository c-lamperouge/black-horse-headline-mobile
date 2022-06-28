import{a as n,c as i,b as d,_ as y,d as B,y as j,z as F,F as L,A as T,C as G,t as z,w as R,D as E,f as _,g as k,r as b,x as V,l as A,k as S,s as Y,p as P,h as X,E as Z,B as ee,n as te,G as ae}from"./index.1605adbd.js";import{b as D,R as g,K as I}from"./ResponseResult.f1dd6b90.js";import{g as N,a as Q,A as ne}from"./ArticleItem.e3801919.js";import{I as H}from"./baseline-close.c82a44f0.js";import"./openDB.477f2690.js";const se=async()=>{const e=await fetch(`${D}/v1_0/user/channels`,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8",Authorization:`Bearer ${await N()}`}});return e.ok?new g("getUserChannels","success",e):new g("getUserChannels","failure",e)},oe=Q(se),le={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},ie=d("path",{fill:"currentColor",d:"M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"},null,-1),ce=[ie];function re(e,a){return n(),i("svg",le,ce)}var de={name:"ic-round-menu",render:re};const ue=async()=>{const e=await fetch(`${D}/v1_0/channels`,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8"}});return e.ok?new g("getRecommendChannels","success",e):new g("getRecommendChannels","failure",e)},he={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},ve=d("path",{fill:"currentColor",d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"},null,-1),pe=[ve];function fe(e,a){return n(),i("svg",he,pe)}var _e={name:"ic-baseline-add",render:fe};const me={class:"channel-list"},we={class:"add"},be=B({__name:"RecommendChannelList",props:{isEditing:{type:Boolean}},async setup(e){let a,u;const p=e,c=j([]),x=([a,u]=F(()=>ue()),a=await a,u(),a);return I(x).with({responseType:"success"},async r=>{(await r.responseContent.json()).data.channels.forEach(h=>{c.push(h)})}).otherwise(r=>{console.error(r)}),(r,w)=>(n(),i("div",me,[(n(!0),i(L,null,T(c,h=>(n(),i("div",{key:h.id,class:"item"},[G(z(h.name)+" ",1),R(d("div",we,[_(k(_e),{class:"icon"})],512),[[E,p.isEditing]])]))),128))]))}});var ge=y(be,[["__scopeId","data-v-7857a49a"]]);const ye={},xe={class:"channel-list-loading"};function ke(e,a){return n(),i("div",xe," Loading... ")}var Ce=y(ye,[["render",ke],["__scopeId","data-v-58007658"]]);const q=e=>(P("data-v-533ae9bb"),e=e(),X(),e),$e={class:"edit-channel"},Ae={class:"row-top"},Ie={key:0,class:"close"},Le={class:"my-channels"},Te=q(()=>d("h3",null,"\u6211\u7684\u9891\u9053",-1)),ze={class:"channel-list"},Re={class:"delete"},Ee={class:"recommend-channels"},Se=q(()=>d("h3",null,"\u9891\u9053\u63A8\u8350",-1)),Me=B({__name:"EditChannel",props:{channels:null},emits:["close"],setup(e,{emit:a}){const u=e,p=()=>{a("close")};let c=b(!1);const x=()=>{c.value=!c.value},r=()=>{c.value=!1};return(w,h)=>(n(),i("div",$e,[d("div",Ae,[c.value?V("",!0):(n(),i("span",Ie,[_(k(H),{class:"icon",onClick:p})])),R(d("button",{class:"cancel",onClick:r}," \u53D6\u6D88 ",512),[[E,c.value]]),d("button",{class:"edit",onClick:x},z(c.value?"\u5B8C\u6210":"\u7F16\u8F91"),1)]),d("section",Le,[Te,d("div",ze,[(n(!0),i(L,null,T(u.channels,f=>(n(),i("div",{key:f.id,class:"item"},[G(z(f.name)+" ",1),R(d("div",Re,[_(k(H),{class:"icon"})],512),[[E,c.value]])]))),128))])]),d("section",Ee,[Se,(n(),A(Y,null,{fallback:S(()=>[_(Ce)]),default:S(()=>[_(ge,{"is-editing":c.value},null,8,["is-editing"])]),_:1}))])]))}});var je=y(Me,[["__scopeId","data-v-533ae9bb"]]);const Be=async(e,a)=>{const u=await fetch(`${D}/v1_0/articles?channel_id=${e}&timestamp=${a}`,{method:"GET",headers:{"Content-Type":"application/json;charset=utf-8",Authorization:`Bearer ${await N()}`}});return u.ok?new g("getChannelRecommendArticles","success",u):new g("getChannelRecommendArticles","failure",u)},U=Q(Be);const De={},He={class:"article-list-loading"};function Ue(e,a){return n(),i("div",He," Loading... ")}var Fe=y(De,[["render",Ue],["__scopeId","data-v-1eec10d4"]]);const Ge={},Ve={class:"article-item-load-more"};function Ye(e,a){return n(),i("div",Ve," More Article Loading... ")}var Ne=y(Ge,[["render",Ye],["__scopeId","data-v-e06cb4a2"]]);const Qe=e=>{let a=!1;return(...u)=>{if(!a)return a=!0,window.requestAnimationFrame(()=>{a=!1}),e(...u)}};const qe={class:"main-home"},Oe={class:"suspense-container"},We={class:"channel-tab-bar"},Ke=["onClick"],Je={class:"title"},Pe=B({__name:"MainHome",async setup(e){let a,u;const p=j([]);I(([a,u]=F(()=>oe()),a=await a,u(),a)).with({responseType:"success"},async s=>{var t,v;(await s.lastContent().json()).data.channels.forEach(m=>{p.push({id:m.id.toString(),name:m.name})}),r.value=(v=(t=p.at(0))==null?void 0:t.id)!=null?v:null}).otherwise(s=>{console.log(s.responseResultQueue)});let c=b(!1);const x=()=>{c.value=!0};let r=b(null),w=b(!1);const h=b(null),f=j([]),C=new Map;Z(r,async s=>{if(s!==null){const l=C.get(s);if(l!==void 0)f.splice(0,f.length,...l.articles),ae(()=>{var t;(t=h.value)==null||t.scrollTo({top:l.scrollTop})});else{w.value=!0;const t=Date.now();I(await U(s,t)).with({responseType:"success"},async v=>{const m=await v.lastContent().json(),M=m.data.results.map(o=>({id:parseInt(o.art_id),title:o.title,authorId:parseInt(o.aut_id),author:o.aut_name,commentsCount:parseInt(o.comm_count),publishDate:new Date(o.pubdate),cover:{type:o.cover.type,urls:o.cover.images}}));C.set(s,{articles:M,timeStamps:[t,m.data.pre_timestamp],scrollTop:0}),f.splice(0,f.length,...M)}).otherwise(v=>{console.log(v.responseResultQueue)}),w.value=!1}}});const O=s=>{r.value=s.id},W=Qe(s=>{const l=s.target.scrollTop;C.get(r.value).scrollTop=l}),K=s=>{h.value&&(h.value.scrollTop===0?s.deltaY<0&&console.log("loading on top"):Math.abs(h.value.scrollHeight-h.value.clientHeight-h.value.scrollTop)<1&&s.deltaY>0&&J())};let $=b(!1);const J=async()=>{if(!$.value&&($.value=!0,r.value!==null)){const s=C.get(r.value),l=s.timeStamps,t=l.at(l.length-1);I(await U(r.value,t)).with({responseType:"success"},async v=>{const m=await v.lastContent().json();m.data.results.map(o=>({id:parseInt(o.art_id),title:o.title,authorId:parseInt(o.aut_id),author:o.aut_name,commentsCount:parseInt(o.comm_count),publishDate:new Date(o.pubdate),cover:{type:o.cover.type,urls:o.cover.images}})).forEach(o=>{s.articles.push(o),s.timeStamps.push(m.data.pre_timestamp),f.push(o)}),$.value=!1}).otherwise(v=>{console.log(v.responseResultQueue)})}};return(s,l)=>(n(),i("div",qe,[(n(),A(Y,null,{default:S(()=>[d("div",Oe,[d("nav",We,[(n(!0),i(L,null,T(p,t=>(n(),i("div",{key:t.id,class:te(["item",{"-active":r.value===t.id}]),onClick:v=>O(t)},[d("span",Je,z(t.name),1)],10,Ke))),128)),p.length>=4?(n(),i("div",{key:0,class:"menu",onClick:x},[_(k(de),{class:"icon1"})])):V("",!0)]),w.value?(n(),A(Fe,{key:0})):(n(),i("div",{key:1,ref_key:"articleListEl",ref:h,class:"article-list",onScroll:l[0]||(l[0]=t=>k(W)(t)),onWheel:l[1]||(l[1]=t=>K(t))},[(n(!0),i(L,null,T(f,t=>(n(),A(ne,{key:t.id,article:t},null,8,["article"]))),128)),R(_(Ne,null,null,512),[[E,$.value]])],544))])]),_:1})),_(ee,{modelValue:c.value,"onUpdate:modelValue":l[3]||(l[3]=t=>c.value=t),"slot-transition-name":"slide"},{default:S(()=>[_(je,{channels:p,onClose:l[2]||(l[2]=t=>c.value=!1)},null,8,["channels"])]),_:1},8,["modelValue"])]))}});var nt=y(Pe,[["__scopeId","data-v-eeee9f60"]]);export{nt as default};
