(()=>{"use strict";function e(e){return`https://hansungpocs.site/${e}`}const t=document.getElementById("floatingInput"),n=document.getElementById("floatingPassword"),o=document.getElementById("loginForm"),s=document.getElementById("RegisterBtn"),a=document.getElementById("register-id"),i=document.getElementById("register-password");o.addEventListener("submit",(async function(o){o.preventDefault();const s={userName:t.value,password:n.value},a={method:"POST",headers:{"Content-Type":"application/json","x-pocs-device-type":"web"},body:JSON.stringify(s)},i=await fetch(e("api/auth/login"),a),l=await i.json();console.log(l),200===l.status?(localStorage.setItem("sessionToken",l.data.sessionToken),localStorage.setItem("userId",l.data.user.userId),localStorage.setItem("userType",l.data.user.type),window.location.href="./main.html"):console.log("로그인 실패")})),s.addEventListener("click",(async function(t){t.preventDefault();const n={userName:a.value,password:i.value},o={method:"POST",headers:{"Content-Type":"application/json","x-pocs-device-type":"web"},body:JSON.stringify(n)},s=await fetch(e("api/users"),o),l=await s.json();console.log(l),201===l.status?(alert("비회원 가입 완료"),window.location.href="./main.html"):(alert("다시 입력해주세요"),console.log("비회원 회원가입 실패"))}))})();