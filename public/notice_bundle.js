(()=>{"use strict";function t(t){return`https://www.hansungpocs.site/${t}`}if(window.location.href.includes("notices.html")){const e=document.querySelector("#notice table thead"),n=document.querySelector("#notice table tbody"),o=15;let a,s=1,i=localStorage.getItem("sessionToken"),c=new Headers({"x-pocs-session-token":i});const d=localStorage.getItem("userType");async function l(t){await fetch(t,{headers:c}).then((t=>t.json())).then((t=>{if(console.log(t),e.innerHTML='<tr class="post-list">\n                <th>번호</th>\n                <th>제목</th>\n                <th>작성자</th>\n                <th>작성일</th>\n                <th>카테고리</th>\n            </tr>',n.innerHTML="",null===t.data)n.innerHTML="<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";else{a=Math.ceil(t.data.categories[1].count/15);for(let e=0;e<t.data.posts.length;e++)t.data.posts[e].onlyMember&&"anonymous"===d?n.innerHTML+=`\n                <tr class="post-list">\n                <td>${t.data.posts[e].postId}</td>\n                <td>비공개</td>\n                <td></td>\n                <td></td>\n                <td></td>\n                </tr>\n                `:n.innerHTML+=`\n                <tr class="post-list">\n                <td>${t.data.posts[e].postId}</td>\n                <td onclick="window.location.href='notices_detail.html?postId=${t.data.posts[e].postId}'"\n                    style="cursor:pointer">${t.data.posts[e].title}</td>\n                <td>${t.data.posts[e].writerName}</td>\n                <td>${t.data.posts[e].createdAt}</td>\n                <td>${t.data.posts[e].category}</td>\n                </tr>\n                `}})),await r()}function r(){let t='<ul class="pagination justify-content-center">\n                <li class="page-item">\n                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>\n                </li>',e=5*Math.ceil(s/5);e>a&&(e=a);for(let n=e-4<=0?1:e-4;n<=e;n++)t+=`<li class="page-item ${s==n?"active":""}"><a class="page-link" onclick="movePage(${n})">${n}</a></li>`;t+='<li class="page-item">\n                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>\n                </li>',document.querySelector("#notice-pagination-bar").innerHTML=t}async function p(){await l(t(`api/posts?id=notice&offset=${o}&pageNum=${s}`)),r()}async function u(t){t>a||s!==t&&(s=t,p())}async function h(){s>=a||(s++,p())}async function g(){s<=1||(s--,p())}function f(){window.location.href="./notices_add.html"}window.moveNoticeAddPage=f,window.movePage=u,window.moveNextPage=h,window.movePreviousPage=g,l(t(`api/posts?id=notice&offset=${o}&pageNum=${s}`))}})();