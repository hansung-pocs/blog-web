(()=>{const e=document.getElementById("toggle"),t=localStorage.getItem("sessionToken"),o=document.getElementById("toggleDetail"),n=(document.getElementById("navItem"),document.getElementById("adminBtn")),l=localStorage.getItem("userId"),a=document.querySelector(".navbar .container .nav-item a img");let i=localStorage.getItem("userType");const s=document.querySelector(".nav-item img");async function d(e){const t={method:"POST",headers:{"Content-Type":"application/json","x-pocs-session-token":e}},o=await fetch("http://34.64.170.244:80/api/auth/validation",t),n=await o.json();return console.log(n),200===n.status?(console.log(n.data.user),"anonymous"!=n.data.user.type&&(null!=n.data.user.defaultInfo.userProfilePath?s.src=`http://34.64.170.244${n.data.user.defaultInfo.userProfilePath}`:s.src="../img/logo.png"),n.data.user):(console.log(n.message),!1)}function c(e){o.innerHTML="loginFirst"===e?'<li><a class="dropdown-item" href="../html/index.html">로그인</a></li>':"anonymous"===i?'\n            <li><a class="dropdown-item" href="#" onclick="handleLogout()">로그아웃</a></li>\n        ':`\n            <li><a class="dropdown-item" href="../html/user_detail_edit.html?userId=${e}">내 정보 수정</a></li>\n            <li><a class="dropdown-item" href="#" onclick="handleLogout()">로그아웃</a></li>\n        `}window.location.href.includes("index")||null===t&&(window.location.href="../html/index.html"),window.moveMainPage=function(e){window.location.href="../html/main.html"},window.moveNoticePage=function(e){window.location.href="../html/notices.html"},window.movePostPage=function(e){window.location.href=`../html/posts.html?category=${e}`},window.moveUserPage=function(){null===i||"anonymous"===i?confirm("블로그 회원만 조회 가능합니다.\n로그인하시겠습니까?")&&(window.location.href="../html/index.html"):window.location.href="../html/user.html"},window.handleLogout=async function(e){const o={method:"POST",headers:{"Content-Type":"application/json","x-pocs-session-token":t}},n=await fetch("http://34.64.170.244:80/api/auth/logout",o),l=await n.json();console.log(l),200===l.status?(localStorage.removeItem("sessionToken"),localStorage.removeItem("userId"),localStorage.removeItem("userType"),window.location.href="../html/index.html",alert("로그아웃 되었습니다.")):console.log(l.message)},window.location.href.includes("index")||(window.addEventListener("load",(async function(){if(null!=t){let e=await d(t);"admin"===e.type&&(n.classList.toggle("hidden"),null!=window.location.href.match("notices.html")?document.getElementById("noticeAddBtn").classList.toggle("hidden"):null!=window.location.href.match("notices_detail.html")&&document.getElementById("noticeEditBtn").classList.toggle("hidden")),null!=window.location.href.match("main")?"admin"!==e.type&&"member"!==e.type||document.getElementById("userList").classList.toggle("hidden"):null==window.location.href.match("qa_add")&&null==window.location.href.match("qa_detail_edit")||"anonymous"==e.type||document.getElementById("title-below-area").classList.toggle("hidden"),null!=e.defaultInfo.userProfilePath&&(a.src=`http://34.64.161.55:80${e.defaultInfo.userProfilePath}`)}})),e.addEventListener("click",(async function(o){if(o.preventDefault(),e.classList.contains("show"))if(null!=t){let e=await d(t);null!=e.userId?c(e.userId):console.log("유효하지 않은 토큰입니다.")}else c("loginFirst")})),window.addEventListener("storage",(()=>{alert("userId값은 변경될수 없습니다!"),localStorage.removeItem("userId"),localStorage.setItem("userId",l)})))})();