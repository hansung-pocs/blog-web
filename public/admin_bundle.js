(()=>{let t,e=localStorage.getItem("sessionToken"),n=new Headers({"x-pocs-session-token":e});document.querySelector("#notice table");const a=document.querySelector("#notice table thead"),i=document.querySelector("#notice table tbody"),o=(document.querySelector("#user table"),document.querySelector("#user table thead")),s=document.querySelector("#user table tbody");let d,r,l=1,c=1,u=`http://34.64.170.244:80/api/admin/posts?offset=15&pageNum=${l}`,m=`http://34.64.170.244:80/api/admin/users?offset=15&pageNum=${c}`;async function h(){await fetch(u,{headers:n}).then((t=>t.json())).then((e=>{if(console.log(e),t=e.data.posts,a.innerHTML='\n                <tr class="post-list">\n                <th>번호</th>\n                <th>제목</th>\n                <th>작성자</th>\n                <th>작성일</th>\n                <th>카테고리</th>\n            </tr>',i.innerHTML="",null===e.data)i.innerHTML="<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";else{d=Math.ceil((e.data.categories[0].count+e.data.categories[1].count+e.data.categories[2].count+e.data.categories[3].count+e.data.categories[4].count+e.data.categories[5].count)/15);for(let n=0;n<e.data.posts.length;n++)i.innerHTML+=`\n                <tr class="post-list">\n                <td>${e.data.posts[n].postId}</td>\n                <td onclick="moveNoticeDetailPage(${t[n].postId})"\n                    >${t[n].title}</td>\n                <td>${t[n].writerName||"익명"}</td>\n                <td>${t[n].createdAt}</td>\n                <td>${t[n].category}</td>\n                </tr>\n                `}})),await p()}async function g(){await fetch(m,{headers:n}).then((t=>t.json())).then((t=>{if(console.log(t),o.innerHTML='\n                <tr class="user-list">\n                <th>번호</th>\n                <th>성명</th>\n                <th>학번</th>\n                <th>e-mail</th>\n                </tr>',s.innerHTML="",null===t.data.users)s.innerHTML="<tr><td>유저를</td><td>추가</td><td>하세요.</td><td></td></tr>";else{r=Math.ceil(t.data.countAllUsers/15);for(let e=0;e<t.data.users.length;e++)"anonymous"===t.data.users[e].type?s.innerHTML+=`\n                <tr class="user-list">\n                    <td>${t.data.users[e].userId}</td>\n                    <td onclick="moveUserDetailPage(${t.data.users[e].userId})"\n                        style="cursor:pointer">익명${t.data.users[e].userId}</td>\n                    <td></td>\n                    <td></td>\n                </tr>\n                `:s.innerHTML+=`\n                <tr class="user-list">\n                    <td>${t.data.users[e].userId}</td>\n                    <td onclick="moveUserDetailPage(${t.data.users[e].userId})"\n                    style="cursor:pointer">${t.data.users[e].defaultInfo.name||`익명${t.data.users[e].userId}`}</td>\n                    <td>${t.data.users[e].defaultInfo.studentId||" "}</td>\n                    <td>${t.data.users[e].defaultInfo.email||" "}</td>\n                </tr>\n                `}})),await f()}function p(){let t='<ul class="pagination justify-content-center">\n                <li class="page-item">\n                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousNoticePage()">Previous</a>\n                </li>',e=5*Math.ceil(l/5);e>d&&(e=d);for(let n=e-4<=0?1:e-4;n<=e;n++)t+=`<li class="page-item ${l==n?"active":""}"><a class="page-link" onclick="moveAdminNoticePage(${n})">${n}</a></li>`;t+='<li class="page-item">\n                    <a class="page-link" href="#" onclick="moveNextNoticePage()">Next</a>\n                </li>',document.querySelector("#notice-pagination-bar").innerHTML=t}function f(){let t='<ul class="pagination justify-content-center">\n                <li class="page-item">\n                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousUserPage()">Previous</a>\n                </li>',e=5*Math.ceil(c/5);e>r&&(e=r);for(let n=e-4<=0?1:e-4;n<=e;n++)t+=`<li class="page-item ${c==n?"active":""}"><a class="page-link" onclick="moveAdminUserPage(${n})">${n}</a></li>`;t+='<li class="page-item">\n                    <a class="page-link" href="#" onclick="moveNextUserPage()">Next</a>\n                </li>',document.querySelector("#user-pagination-bar").innerHTML=t}window.moveNoticeDetailPage=function(t){window.location.href=`../html/admin_notice_detail.html?postId=${t}`},window.moveUserDetailPage=function(t){window.location.href=`../html/admin_user_detail.html?userId=${t}`},window.moveNoticeAddPage=function(){window.location.href="../html/notices_add.html"},window.moveNextNoticePage=function(){l>=d||(l++,u=`http://34.64.170.244:80/api/admin/posts?offset=15&pageNum=${l}`,h(),p())},window.moveAdminNoticePage=function(t){l!==t&&(l=t,u=`http://34.64.170.244:80/api/admin/posts?offset=15&pageNum=${l}`,h(),p())},window.moveUserAddPage=function(){window.location.href="../html/user_add.html"},window.moveNextUserPage=function(){c>=r||(c++,m=`http://34.64.170.244:80/api/admin/users?offset=15&pageNum=${c}`,g(),f())},window.moveAdminUserPage=function(t){c!==t&&(c=t,m=`http://34.64.170.244:80/api/admin/users?offset=15&pageNum=${c}`,g(),f())},window.movePreviousNoticePage=function(){l<=1||(l--,u=`http://34.64.170.244:80/api/admin/posts?offset=15&pageNum=${l}`,h(),p())},window.movePreviousUserPage=function(){c<=1||(c--,m=`http://34.64.170.244:80/api/admin/users?offset=15&pageNum=${c}`,g(),f())},h(),g()})();