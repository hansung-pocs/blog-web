(()=>{"use strict";function e(e){return`https://hansungpocs.site/${e}`}const t=window.location.href.split("?postId=")[1];let o=localStorage.getItem("sessionToken"),n=new Headers({"x-pocs-session-token":o});const s=document.querySelector("#flexCheckDefault"),a=document.querySelector("#title"),c=document.querySelector("#content");let l;window.QaEdit=async function(){const n={userId:l,title:a.value,content:c.value,onlyMember:s.checked,category:"qna"},i={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":o},body:JSON.stringify(n)},r=await fetch(e(`api/posts/${t}`),i),d=await r.json();302===d.status?window.location.href="./qa.html":console.log(d.message)},fetch(e(`api/posts/${t}`),{headers:n}).then((e=>e.json())).then((e=>{console.log(e),a.value=`${e.data.title}`,c.value=`${e.data.content}`,s.checked=e.data.onlyMember,l=e.data.writer.userId,console.log(l)}))})();