(()=>{const t=window.location.href.split("?userId=")[1];let e=localStorage.getItem("sessionToken"),n=new Headers({"x-pocs-session-token":e});document.querySelector("#notice table");const a=document.querySelector("#notice table thead"),o=document.querySelector("#notice table tbody"),s=document.querySelector("#user-post-title");let i,l=1,d=0,r=`http://34.64.170.244:80/api/admin/posts/${t}?offset=15&pageNum=${l}`;function c(){let t='<ul class="pagination justify-content-center">\n                <li class="page-item">\n                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>\n                </li>',e=5*Math.ceil(l/5);for(let n=e-4<=0?1:e-4;n<=e;n++)t+=`<li class="page-item ${l==n?"active":""}"><a class="page-link" onclick="movePage(${n})">${n}</a></li>`;t+='<li class="page-item">\n                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>\n                </li>',document.querySelector("#pagination-bar").innerHTML=t}fetch(`http://34.64.170.244:80/api/users/${t}`,{headers:n}).then((t=>t.json())).then((e=>{console.log(e),s.innerHTML=`${e.data.defaultInfo.name||`비회원${t}`}님의 게시글`})),fetch(r,{headers:n}).then((t=>t.json())).then((t=>{if(console.log(t),404===t.status)return alert("데이터가 없습니다!"),l=1,void c();if(i=t.data.posts.length,a.innerHTML="<tr>\n        <th>번호</th>\n        <th>제목</th>\n        <th>작성자</th>\n        <th>작성일</th>\n        <th>수정일</th>\n        <th>카테고리</th>\n    </tr>",o.innerHTML="",null===t.data)o.innerHTML="<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";else{d=15*l-15;for(let e=0;e<i;e++)o.innerHTML+=`\n            <tr onclick="movePostDetailPage(${t.data.posts[e].postId})">\n            <td>${d+e+1}</td>\n            <td>${t.data.posts[e].title}</td>\n            <td>${t.data.posts[e].writerName||""}</td>\n            <td>${t.data.posts[e].createdAt}</td>\n            <td>${t.data.posts[e].updatedAt||""}</td>\n            <td>${t.data.posts[e].category}</td>\n            </tr>\n            `}})),c()})();