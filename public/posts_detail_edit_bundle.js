(()=>{const e=window.location.href.split("?postId=")[1],t=`http://34.64.170.244:80/api/posts/${e}`;let o=localStorage.getItem("sessionToken"),n=new Headers({"x-pocs-session-token":o});const s=document.querySelector("#title"),a=document.querySelector("#editContent"),c=document.querySelector("#flexCheckDefault");let l,d;window.postEdit=async function(){"추억"===d?d="memory":"추천"===d?d="reference":"스터디"===d?d="study":"노하우"===d&&(d="knowhow");const t={userId:l,title:s.value,content:a.value,onlyMember:c.checked,category:d},n={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":o},body:JSON.stringify(t)},i=await fetch(`http://34.64.170.244:80/api/posts/${e}`,n),r=await i.json();302===r.status?window.location.href="../html/posts.html":console.log(r.message)},fetch(t,{headers:n}).then((e=>e.json())).then((e=>{console.log(e),s.value=`${e.data.title}`,a.value=`${e.data.content}`,c.checked=e.data.onlyMember,l=e.data.writer.userId,d=e.data.category,console.log(l)}))})();