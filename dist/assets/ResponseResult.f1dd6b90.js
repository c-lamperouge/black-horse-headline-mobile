var d=Object.defineProperty;var R=(s,e,r)=>e in s?d(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var o=(s,e,r)=>(R(s,typeof e!="symbol"?e+"":e,r),r);const p=Symbol("@ts-pattern/matcher"),v="@ts-pattern/anonymous-select-key",f=s=>Boolean(s&&typeof s=="object"),c=s=>s&&!!s[p],i=(s,e,r)=>{if(f(s)){if(c(s)){const t=s[p](),{matched:n,selections:a}=t.match(e);return n&&a&&Object.keys(a).forEach(u=>r(u,a[u])),n}if(!f(e))return!1;if(Array.isArray(s))return!!Array.isArray(e)&&s.length===e.length&&s.every((t,n)=>i(t,e[n],r));if(s instanceof Map)return e instanceof Map&&Array.from(s.keys()).every(t=>i(s.get(t),e.get(t),r));if(s instanceof Set){if(!(e instanceof Set))return!1;if(s.size===0)return e.size===0;if(s.size===1){const[t]=Array.from(s.values());return c(t)?Array.from(e.values()).every(n=>i(t,n,r)):e.has(t)}return Array.from(s.values()).every(t=>e.has(t))}return Object.keys(s).every(t=>{const n=s[t];return(t in e||c(a=n)&&a[p]().matcherType==="optional")&&i(n,e[t],r);var a})}return Object.is(e,s)},w=s=>new h(s,[]);class h{constructor(e,r){this.value=void 0,this.cases=void 0,this.value=e,this.cases=r}with(...e){const r=e[e.length-1],t=[e[0]],n=[];return e.length===3&&typeof e[1]=="function"?(t.push(e[0]),n.push(e[1])):e.length>2&&t.push(...e.slice(1,e.length-1)),new h(this.value,this.cases.concat([{match:a=>{let u={};const y=Boolean(t.some(l=>i(l,a,(m,g)=>{u[m]=g}))&&n.every(l=>l(a)));return{matched:y,value:y&&Object.keys(u).length?v in u?u[v]:u:a}},handler:r}]))}when(e,r){return new h(this.value,this.cases.concat([{match:t=>({matched:Boolean(e(t)),value:t}),handler:r}]))}otherwise(e){return new h(this.value,this.cases.concat([{match:r=>({matched:!0,value:r}),handler:e}])).run()}exhaustive(){return this.run()}run(){let e,r=this.value;for(let t=0;t<this.cases.length;t++){const n=this.cases[t],a=n.match(this.value);if(a.matched){r=a.value,e=n.handler;break}}if(!e){let t;try{t=JSON.stringify(this.value)}catch{t=this.value}throw new Error(`Pattern matching error: no pattern matches value ${t}`)}return e(r,this.value)}}const A="http://toutiao.itheima.net";class Q{constructor(e,r,t){o(this,"requestName");o(this,"responseType");o(this,"responseContent");this.requestName=e,this.responseType=r,this.responseContent=t}}class T{constructor(e){o(this,"requestName");o(this,"responseType");o(this,"responseResultQueue");this.requestName=e,this.responseType="pending",this.responseResultQueue=[]}enqueue(e){this.responseResultQueue.push(e)}concat(e){this.responseResultQueue.concat(e.responseResultQueue)}lastContent(){return this.responseResultQueue.at(-1).responseContent}len(){return this.responseResultQueue.length}succeed(){this.responseType="success"}fail(){this.responseType="failure"}}export{w as K,T as M,Q as R,A as b};