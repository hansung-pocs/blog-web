(()=>{const t=window.location.href.split("?postId=")[1],e=document.querySelector("#edit-button");document.querySelector("#delete-form"),localStorage.getItem("userType");let n,a=localStorage.getItem("sessionToken"),o=new Headers({"x-pocs-session-token":a});window.DeleteQa=async function(){const e={userId:n},o={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":a},body:JSON.stringify(e)},s=await fetch(`http://www.hansungpocs.site:80/api/posts/${t}/delete`,o),i=await s.json();console.log(i.status),201===i.status?(window.location.href="../html/qa.html",console.log("삭제 성공")):console.log(i.message)},window.qaWriterId=n,e.addEventListener("click",(function(){window.location.href=`../html/qa_detail_edit.html?postId=${t}`})),async function(){const e=document.querySelector("#qa-title-first"),a=document.querySelector("#qa-title-second"),s=document.querySelector("#qa-detail-content"),i=`http://www.hansungpocs.site:80/api/posts/${t}`;await fetch(i,{headers:o}).then((t=>t.json())).then((t=>{if(console.log(t),403===t.status||404===t.status||500===t.status)e.innerHTML="삭제되었거나 없는 게시글입니다.",a.innerHTML="",qa_buttons.classList.add("hidden");else{let o=function(t){return"QNA"===t||"qna"===t?"Q/A":"?"}(t.data.category);console.log(o),e.innerHTML=`<h3>[<span id="title_category">${o}</span>]${t.data.title}</h3>`,a.innerHTML=`\n                <div class="me-2">${t.data.onlyMember?"회원 전용 | ":""}</div>\n            <div class="me-2">${t.data.updatedAt||t.data.createdAt}</div>\n            <div class="me-2"> 익명 </div>\n            <div>조회수 ${t.data.views}</div>\n            `,s.innerHTML=`<div style="min-height: 200px">${marked.parse(t.data.content)}</div>`,n=t.data.writer.userId,present_page_title=t.data.title,present_page_content=t.data.content,category=t.data.category,n=""}})),await function(){let t=localStorage.getItem("userId");const e=document.querySelector(".qa-buttons");t!=n?e.classList.add("hidden"):e.classList.add("non-hidden")}()}()})();