(()=>{"use strict";function e(e){return`http://www.hansungpocs.site:80/${e}`}const t=window.location.href.split("?postId=")[1];let o,n,s=localStorage.getItem("sessionToken"),c=new Headers({"x-pocs-session-token":s});const a=document.querySelector("#title"),i=document.querySelector("#editContent"),l=document.querySelector("#flexCheckDefault");function d(){window.location.href="./notices.html"}window.noticeEdit=async function(){const c={userId:o,title:a.value,content:i.value,onlyMember:l.checked,category:n};console.log(c);const r={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":s},body:JSON.stringify(c)},u=await fetch(e(`api/posts/${t}`),r),h=await u.json();console.log(h.status),200===h.status?d():console.log(h.message)},window.backToList=d,fetch(e(`api/posts/${t}`),{headers:c}).then((e=>e.json())).then((e=>{console.log(e),a.value=`${e.data.title}`,i.value=`${e.data.content}`,l.checked=e.data.onlyMember,o=e.data.writer.userId,n=e.data.category,console.log(o)}))})();