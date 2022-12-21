(()=>{"use strict";function e(e,t,n){return`https://www.hansungpocs.site/${e}?offset=${t}&pageNum=${n}`}let t,n=localStorage.getItem("sessionToken"),a=new Headers({"x-pocs-session-token":n});document.querySelector("#notice table");const i=document.querySelector("#notice table thead"),s=document.querySelector("#notice table tbody"),o=(document.querySelector("#user table"),document.querySelector("#user table thead")),d=document.querySelector("#user table tbody");let r,c,l=1,u=1;const m=15;let g=e("api/admin/posts",m,l),h=e("api/admin/users",m,l);async function p(){await fetch(g,{headers:a}).then((e=>e.json())).then((e=>{if(console.log(e),t=e.data.posts,i.innerHTML='\n                <tr class="post-list">\n                <th>번호</th>\n                <th>제목</th>\n                <th>작성자</th>\n                <th>작성일</th>\n                <th>카테고리</th>\n            </tr>',s.innerHTML="",null===e.data)s.innerHTML="<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";else{r=Math.ceil((e.data.categories[0].count+e.data.categories[1].count+e.data.categories[2].count+e.data.categories[3].count+e.data.categories[4].count+e.data.categories[5].count)/15);for(let n=0;n<e.data.posts.length;n++)s.innerHTML+=`\n                <tr class="post-list">\n                <td>${e.data.posts[n].postId}</td>\n                <td onclick="moveNoticeDetailPage(${t[n].postId})"\n                    >${t[n].title}</td>\n                <td>${t[n].writerName||"익명"}</td>\n                <td>${t[n].createdAt}</td>\n                <td>${t[n].category}</td>\n                </tr>\n                `}})),await w()}async function f(){await fetch(h,{headers:a}).then((e=>e.json())).then((e=>{if(console.log(e),o.innerHTML='\n                <tr class="user-list">\n                <th>번호</th>\n                <th>성명</th>\n                <th>학번</th>\n                <th>e-mail</th>\n                </tr>',d.innerHTML="",null===e.data.users)d.innerHTML="<tr><td>유저를</td><td>추가</td><td>하세요.</td><td></td></tr>";else{c=Math.ceil(e.data.countAllUsers/15);for(let t=0;t<e.data.users.length;t++)"anonymous"===e.data.users[t].type?d.innerHTML+=`\n                <tr class="user-list">\n                    <td>${e.data.users[t].userId}</td>\n                    <td onclick="moveUserDetailPage(${e.data.users[t].userId})"\n                        style="cursor:pointer">익명${e.data.users[t].userId}</td>\n                    <td></td>\n                    <td></td>\n                </tr>\n                `:d.innerHTML+=`\n                <tr class="user-list">\n                    <td>${e.data.users[t].userId}</td>\n                    <td onclick="moveUserDetailPage(${e.data.users[t].userId})"\n                    style="cursor:pointer">${e.data.users[t].defaultInfo.name||`익명${e.data.users[t].userId}`}</td>\n                    <td>${e.data.users[t].defaultInfo.studentId||" "}</td>\n                    <td>${e.data.users[t].defaultInfo.email||" "}</td>\n                </tr>\n                `}})),await v()}function w(){let e='<ul class="pagination justify-content-center">\n                <li class="page-item">\n                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousNoticePage()">Previous</a>\n                </li>',t=5*Math.ceil(l/5);t>r&&(t=r);for(let n=t-4<=0?1:t-4;n<=t;n++)e+=`<li class="page-item ${l==n?"active":""}"><a class="page-link" onclick="moveAdminNoticePage(${n})">${n}</a></li>`;e+='<li class="page-item">\n                    <a class="page-link" href="#" onclick="moveNextNoticePage()">Next</a>\n                </li>',document.querySelector("#notice-pagination-bar").innerHTML=e}function v(){let e='<ul class="pagination justify-content-center">\n                <li class="page-item">\n                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousUserPage()">Previous</a>\n                </li>',t=5*Math.ceil(u/5);t>c&&(t=c);for(let n=t-4<=0?1:t-4;n<=t;n++)e+=`<li class="page-item ${u==n?"active":""}"><a class="page-link" onclick="moveAdminUserPage(${n})">${n}</a></li>`;e+='<li class="page-item">\n                    <a class="page-link" href="#" onclick="moveNextUserPage()">Next</a>\n                </li>',document.querySelector("#user-pagination-bar").innerHTML=e}function $(){f(),v()}window.moveNoticeDetailPage=function(e){window.location.href=`./admin_notice_detail.html?postId=${e}`},window.moveUserDetailPage=function(e){window.location.href=`./admin_user_detail.html?userId=${e}`},window.moveNoticeAddPage=function(){window.location.href="./notices_add.html"},window.moveNextNoticePage=function(){l>=r||(l++,g=e("api/admin/posts",m,l),p(),w())},window.moveAdminNoticePage=function(t){l!==t&&(l=t,g=e("api/admin/posts",m,l),p(),w())},window.moveUserAddPage=function(){window.location.href="./user_add.html"},window.moveNextUserPage=function(){u>=c||(u++,h=e("api/admin/users",m,u),$())},window.moveAdminUserPage=function(t){u!==t&&(u=t,h=e("api/admin/users",m,u),$())},window.movePreviousNoticePage=function(){l<=1||(l--,g=e("api/admin/posts",m,l),p(),w())},window.movePreviousUserPage=function(){u<=1||(u--,h=e("api/admin/users",m,u),$())},p(),f()})();