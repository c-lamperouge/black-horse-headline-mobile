import{G as a}from"./index.62268a27.js";import{o as i}from"./openDB.477f2690.js";const r=async()=>{const s=await i(),t=s.transaction("articleSearchHistories"),e=await t.store.getAll();return t.done.catch(o=>{console.error(o)}),s.close(),e},c=async s=>{const t=await i(),e=t.transaction("articleSearchHistories","readwrite");e.store.add(s),e.done.catch(o=>{console.error(o)}),t.close()},n=async s=>{const t=await i(),e=t.transaction("articleSearchHistories","readwrite");e.store.delete(s),e.done.catch(o=>{console.error(o)}),t.close()},h=async()=>{const s=await i(),t=s.transaction("articleSearchHistories","readwrite");t.store.clear(),t.done.catch(e=>{console.error(e)}),s.close()},y=a("articleSearch",{state:()=>({searchValue:"",histories:[]}),actions:{async loadHistories(){const s=await r();this.histories.splice(0,this.histories.length,...s)},async addHistory(s){if(this.histories.find(t=>t.content===s)===void 0){const t={content:s,timeStamp:Date.now(),author:"anonymous"};this.histories.push(t),await c(t)}},async deleteHistory(s){const t=this.histories[s].content;this.histories.splice(s,1),await n(t)},async clearHistories(){this.histories.splice(0,this.histories.length),await h()}}});export{y as u};
