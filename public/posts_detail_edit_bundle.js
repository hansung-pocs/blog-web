(()=>{"use strict";function e(e){return`https://www.hansungpocs.site/${e}`}const t=window.location.href.split("?postId=")[1];let o=localStorage.getItem("sessionToken"),n=new Headers({"x-pocs-session-token":o});const s=document.querySelector("#title"),a=document.querySelector("#editContent"),c=document.querySelector("#flexCheckDefault");let l,i;window.postEdit=async function(){"추억"===i?i="memory":"추천"===i?i="reference":"스터디"===i?i="study":"노하우"===i&&(i="knowhow");const n={userId:l,title:s.value,content:a.value,onlyMember:c.checked,category:i},r={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":o},body:JSON.stringify(n)},d=await fetch(e(`api/posts/${t}`),r),u=await d.json();200===u.status?window.location.href="./posts.html":console.log(u.message)},fetch(e(`api/posts/${t}`),{headers:n}).then((e=>e.json())).then((e=>{console.log(e),s.value=`${e.data.title}`,a.value=`${e.data.content}`,c.checked=e.data.onlyMember,l=e.data.writer.userId,i=e.data.category,console.log(l)}))})();