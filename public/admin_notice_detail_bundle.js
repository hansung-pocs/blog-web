(()=>{const e=window.location.href.split("?postId=")[1],t=document.querySelector(".notice-detail"),o=document.querySelector(".notice-title-first"),n=document.querySelector(".notice-title-second"),s=document.querySelector(".notice-detail-content"),i=document.querySelector("#title"),a=document.querySelector("#content"),c=document.querySelector("#admin-notice-buttons"),d=document.querySelector("#flexCheckDefault"),l=`http://www.hansungpocs.site:80/api/posts/${e}`;let r=localStorage.getItem("sessionToken");const u=localStorage.getItem("userId");let h,w,m,p,y=new Headers({"x-pocs-session-token":r});function g(){window.location.href="../html/admin.html"}window.noticeEditPage=function(){document.querySelector(".notice-edit").classList.remove("hidden"),t.classList.add("hidden"),i.value=w,a.value=m},window.noticeEdit=async function(){"추억"===p?p="memory":"추천"===p?p="reference":"스터디"===p?p="study":"노하우"===p&&(p="knowhow");const t={title:i.value,content:a.value,userId:h,onlyMember:d.checked,category:p},o={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":sessionToken},body:JSON.stringify(t)},n=await fetch(`http://www.hansungpocs.site:80/api/posts/${e}`,o),s=await n.json();302===s.status?g():console.log(s.message)},window.DeleteNotice=async function(){const t={userId:u},o={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":sessionToken},body:JSON.stringify(t)},n=await fetch(`http://www.hansungpocs.site:80/api/posts/${e}/delete`,o),s=await n.json();console.log(s.status),201===s.status?g():console.log(s.message)},fetch(l,{headers:y}).then((e=>e.json())).then((e=>{console.log(e),404===e.status?(o.innerHTML="삭제된 게시글입니다.",c.classList.add("hidden")):(o.innerHTML=`<h3>${e.data.title}</h3>`,n.innerHTML=`<div>${e.data.category}  |</div>\n            <div> ${e.data.createdAt}  | </div>\n            <div> ${e.data.updatedAt||""}  | </div>\n            <div> ${e.data.writer.name||"익명"} </div>\n            `,s.innerHTML=`<div>${e.data.content}</div>`,w=e.data.title,m=e.data.content,p=e.data.category,h=e.data.writer.userId)}))})();