(()=>{const e=window.location.href.split("?userId=")[1],n=new URL(`http://www.hansungpocs.site:80/api/admin/users/${e}`);let t=localStorage.getItem("sessionToken"),a=new Headers({"x-pocs-session-token":t});const o=document.querySelector("#user_detail_title"),i=document.querySelector("#user_detail_editBtn a"),s=document.querySelector("#user_detail_userName"),d=document.querySelector("#user_detail_email"),r=document.querySelector("#user_detail_studentId"),u=document.querySelector("#user_detail_generation"),l=document.querySelector("#user_detail_company"),c=document.querySelector("#user_detail_github"),f=document.querySelector("#user_img");window.LookupUserPost=function(){window.location.href=`../html/user_posts.html?userId=${e}`},window.userKick=async function(){const n=new Date,t={canceldAt:`${n.getFullYear()}-${("0"+(n.getMonth()+1)).slice(-2)}-${("0"+n.getDate()).slice(-2)} ${("0"+n.getHours()).slice(-2)}:${("0"+n.getMinutes()).slice(-2)}:${("0"+n.getSeconds()).slice(-2)}`},a={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":sessionToken},body:JSON.stringify(t)},o=await fetch(`http://www.hansungpocs.site:80/api/admin/users/${e}/kick`,a),i=await o.json();201===i.status?window.location.href="../html/admin.html":console.log(i.message)},fetch(n,{headers:a}).then((e=>e.json())).then((n=>{console.log(n),403===n.status?(o.innerHTML="존재하지 않은 회원입니다.",s.innerHTML="",d.innerHTML="",r.innerHTML="",u.innerHTML="",l.innerHTML="",c.innerHTML=""):"anonymous"===n.data.type?(user_detail_editBtn.classList.add("hidden"),o.innerHTML="해당 회원은 비회원입니다.",s.innerHTML=`익명${n.data.userId}`,d.innerHTML="",r.innerHTML="",u.innerHTML="",l.innerHTML="",c.innerHTML=""):(o.innerHTML=`\n                ${n.data.defaultInfo.name||`익명${n.data.userId}`}님의 정보\n            `,i.href="user_detail_edit.html?userId="+e,s.innerHTML=`${n.data.defaultInfo.name}`,d.innerHTML=`${n.data.defaultInfo.email}`,r.innerHTML=`${n.data.defaultInfo.studentId}`,u.innerHTML=`${n.data.defaultInfo.generation}`,null!=n.data.defaultInfo.userProfilePath?f.src=`http://www.hansungpocs.site${n.data.defaultInfo.userProfilePath}`:f.src="../img/logo.png",null==n.data.defaultInfo.company||"undefined"==n.data.defaultInfo.company?l.innerHTML="":l.innerHTML=`${n.data.defaultInfo.company}`,null==n.data.defaultInfo.company||"undefined"==n.data.defaultInfo.company?c.innerHTML="":c.innerHTML=`${n.data.defaultInfo.github}`)}))})();