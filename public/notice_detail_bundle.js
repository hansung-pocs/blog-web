(()=>{const t=window.location.href.split("?postId=")[1];console.log(t);let e=localStorage.getItem("sessionToken"),n=new Headers({"x-pocs-session-token":e});function o(){window.location.href="../html/notices.html"}window.backToList=o,window.gotoNoticeEditPage=function(){window.location.href=`../html/notices_detail_edit.html?postId=${t}`},window.DeleteNotice=async function(){const n={userId},s={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":e},body:JSON.stringify(n)},i=await fetch(`http://www.hansungpocs.site:80/api/posts/${t}/delete`,s),a=await i.json();console.log(a.status),200===a.status?o():console.log(a.message)},async function(){const e=document.querySelector(".notice-title-first"),o=document.querySelector(".notice-title-second"),s=document.querySelector(".notice-detail-content"),i=`http://www.hansungpocs.site:80/api/posts/${t}`;await fetch(i,{headers:n}).then((t=>t.json())).then((t=>{console.log(t),403===t.status||404===t.status||500===t.status?(e.innerHTML="삭제되었거나 없는 게시글입니다.",o.innerHTML="",posts_buttons.classList.add("hidden")):(e.innerHTML=`<h3>[<span id="title_category">${t.data.category}</span>]${t.data.title}</h3>`,o.innerHTML=`\n                <div class="me-2">${t.data.onlyMember?"회원 전용 | ":""}</div>\n                <div class="me-2">${t.data.updatedAt||t.data.createdAt}</div>\n                <div class="me-2"> ${t.data.writer.name} </div>\n                <div>조회수 ${t.data.views}</div>\n                `,s.innerHTML=`<div style="min-height: 200px">${marked.parse(t.data.content)}</div>`,userId=t.data.writer.userId,qaWriterId="")}))}()})();