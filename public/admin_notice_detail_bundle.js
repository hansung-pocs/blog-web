(()=>{const e=window.location.href.split("?postId=")[1],t=(document.querySelector(".notice-detail"),document.querySelector(".notice-title-first")),n=document.querySelector(".notice-title-second"),o=document.querySelector(".notice-detail-content"),d=(document.querySelector("#title"),document.querySelector("#content"),document.querySelector("#admin-notice-buttons")),a=(document.querySelector("#flexCheckDefault"),`http://34.64.170.244:80/api/posts/${e}`);let c=localStorage.getItem("sessionToken");localStorage.getItem("userId");let i,r,l,s,u=new Headers({"x-pocs-session-token":c});fetch(a,{headers:u}).then((e=>e.json())).then((e=>{console.log(e),404===e.status?(t.innerHTML="삭제된 게시글입니다.",d.classList.add("hidden")):(t.innerHTML=`<h3>${e.data.title}</h3>`,n.innerHTML=`<div>${e.data.category}  |</div>\n            <div> ${e.data.createdAt}  | </div>\n            <div> ${e.data.updatedAt||""}  | </div>\n            <div> ${e.data.writer.name||"익명"} </div>\n            `,o.innerHTML=`<div>${e.data.content}</div>`,r=e.data.title,l=e.data.content,s=e.data.category,i=e.data.writer.userId)}))})();