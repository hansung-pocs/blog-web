(()=>{"use strict";function e(e){return`https://hansungpocs.site/${e}`}const t=window.location.href.split("?userId=")[1];let n=localStorage.getItem("sessionToken"),a=new Headers({"x-pocs-session-token":n});const o=document.querySelector("#user_detail_title"),s=document.querySelector("#user_detail_editBtn a"),d=document.querySelector("#user_detail_editBtn"),l=document.querySelector("#user_detail_kickBtn"),i=document.querySelector("#user_detail_look_postBtn"),r=document.querySelector("#user_detail_userName"),u=document.querySelector("#user_detail_email"),c=document.querySelector("#user_detail_studentId"),f=document.querySelector("#user_detail_generation"),m=document.querySelector("#user_detail_company"),_=document.querySelector("#user_detail_github");function h(){let e=localStorage.getItem("userId"),n=localStorage.getItem("userType");console.log(e+","+t),"member"===n&&(e!==t?(d.classList.add("hidden"),l.classList.add("hidden"),i.classList.add("hidden"),document.querySelector("#user_detail_userName").classList.replace("col-8","col-10")):(l.classList.add("hidden"),i.classList.add("hidden"),document.querySelector("#user_detail_userName").classList.replace("col-8","col-10")))}window.userKick=async function(){const n=new Date,a={canceldAt:`${n.getFullYear()}-${("0"+(n.getMonth()+1)).slice(-2)}-${("0"+n.getDate()).slice(-2)} ${("0"+n.getHours()).slice(-2)}:${("0"+n.getMinutes()).slice(-2)}:${("0"+n.getSeconds()).slice(-2)}`},o={method:"PATCH",headers:{"Content-Type":"application/json","x-pocs-session-token":sessionToken},body:JSON.stringify(a)},s=await fetch(e(`api/admin/users/${t}/kick`),o),d=await s.json();201===d.status?window.location.href="./admin.html":console.log(d.message)},window.LookupUserPost=function(){window.location.href=`./user_posts.html?userId=${t}`},window.checktoShowButtons=h,fetch(e(`api/users/${t}`),{headers:a}).then((e=>e.json())).then((n=>{console.log(n),403===n.status?(o.innerHTML="존재하지 않은 회원입니다.",r.innerHTML="",u.innerHTML="",c.innerHTML="",f.innerHTML="",m.innerHTML="",_.innerHTML=""):(o.innerHTML=`\n                ${n.data.defaultInfo.name}님의 정보\n            `,s.href="user_detail_edit.html?userId="+t,r.innerHTML=`${n.data.defaultInfo.name}`,u.innerHTML=`${n.data.defaultInfo.email}`,c.innerHTML=`${n.data.defaultInfo.studentId}`,f.innerHTML=`${n.data.defaultInfo.generation}`,""===n.data.defaultInfo.company||"undefined"==n.data.defaultInfo.company||null==n.data.defaultInfo.company?m.innerHTML="-":m.innerHTML=`${n.data.defaultInfo.company}`,""===n.data.defaultInfo.company||"undefined"==n.data.defaultInfo.company||null==n.data.defaultInfo.github?_.innerHTML="-":_.innerHTML=`${n.data.defaultInfo.github}`,null===n.data.defaultInfo.userProfilePath?profileImage.src="../img/logo.png":profileImage.src=`${e(n.data.defaultInfo.userProfilePath)}`)})),h()})();