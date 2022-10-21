(()=>{if(window.location.href.includes("notice_detail")||window.location.href.includes("notices_detail")||window.location.href.includes("posts_detail")||window.location.href.includes("qa_detail")){const e=window.location.href,n=(window.location.href,e.split("?postId="),e.split("?postId=")[1]);let s=localStorage.getItem("sessionToken"),a=new Headers({"x-pocs-session-token":s});const d=localStorage.getItem("userType"),o=localStorage.getItem("userId"),i=`http://34.64.161.55:80/api/comments/${n}`;function t(t,e){const n=document.querySelector(`#editDelBtn${e}`);"admin"!==d&&o!==t||n.classList.replace("hidden","non-hidden")}window.setTimeout((()=>{!async function(e){const n=document.querySelector("#comments_count"),s=document.querySelector("#comments_div"),d=document.querySelector("#comment_input");await fetch(e,{headers:a}).then((t=>t.json())).then((e=>{if(console.log(e),n.innerHTML=`(${e.data.comments.length})`,s.innerHTML="",d.value="",0!=e.data.comments.length)for(let n=0;n<e.data.comments.length;n++)if(null!==e.data.comments[n].canceledAt){const t=e.data.comments[n].commentId;s.innerHTML+=`\n                            <div id="comment${t}" class="row p-2" >\n                                <div style="font-size: small"></div>\n                                <div class="non-hidden content d-flex justify-content-between my-2">\n                                    <div style="color:lightgray">작성자가 삭제한 댓글입니다.</div>\n                                </div>\n                                <div class="d-flex">\n                                    <div onclick="commentBtnClick(${t})">\n                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">\n                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>\n                                        </svg>\n                                        <span class="reply_count">${e.data.comments[n].childrenCount||0}</span>\n                                    </div>\n                                </div>\n                                <hr>\n                                <div class="hidden reply">\n                                </div>\n                            </div>\n                    `}else if(e.data.comments[n].commentId===e.data.comments[n].parentId){const a=e.data.comments[n].commentId,d=e.data.comments[n].writer.userId;s.innerHTML+=`\n                            <div id="comment${a}" class="row p-2">\n                                <div style="font-size: small">${e.data.comments[n].writer.name||"익명"}</div>\n                                <div class="non-hidden content d-flex justify-content-between my-2">\n                                    <div>${e.data.comments[n].content}</div>\n                                    <div class="mx-5">\n                                        <button id="editDelBtn${a}" type="button" class="hidden btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">\n                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">\n                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\n                                            </svg>\n                                        </button>\n                                        <ul class="dropdown-menu">\n                                            <li><a class="dropdown-item" onclick="clickEditCommentBtn(${d}, ${a})">수정</a></li>\n                                            <li><a class="dropdown-item" onclick="DeleteComment(${d}, ${a})">삭제</a></li>\n                                        </ul>\n                                    </div>\n                                </div>\n                                <div class="hidden contentEdit row mb-3 my-2">\n                                    <div class="col">\n                                        <input class="editInput form-control me-2" type="text" value="${e.data.comments[n].content}" aria-label="Comment" />\n                                    </div>\n                                    <div class="col-1">\n                                        <button type="button" class="btn btn-primary w-100" onclick="EditComment(${a})">수정</button>\n                                    </div>\n                                </div>\n                                <div class="d-flex">\n                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-2"  viewBox="0 0 16 16">\n                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>\n                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>\n                                    </svg>\n                                    <div class="me-3" style="font-size: smaller">${e.data.comments[n].updatedAt||e.data.comments[n].createdAt}</div>\n                                    <div onclick="commentBtnClick(${a})">\n                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">\n                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>\n                                        </svg>\n                                        <span class="reply_count">${e.data.comments[n].childrenCount||0}</span>\n                                    </div>\n                                </div>\n                                <hr>\n                                <div class="hidden reply">\n                                    <div class="row mb-3 mx-1">\n                                        <div class="col">\n                                            <input class="form-control me-2 reply_input" type="text" placeholder="답글" aria-label="Comment" />\n                                        </div>\n                                        <div class="col-1">\n                                            <button type="button" class="reply_input_btn btn btn-primary w-100" onclick="AddComment(${a},'reply')">등록</button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                    `,t(d,a)}else{const s=e.data.comments[n].commentId,a=e.data.comments[n].parentId,d=e.data.comments[n].writer.userId,o=document.querySelector(`#comment${a} .reply`);if(null==o)continue;o.innerHTML+=`\n                            <div id="reply${s}" class="row px-3">\n                                <div style="font-size: small">${e.data.comments[n].writer.name||"익명"}</div>\n                                <div class="non-hidden content d-flex justify-content-between my-2">\n                                    <div>${e.data.comments[n].content}</div>\n                                    <div class="mx-5">\n                                        <button id="editDelBtn${s}" type="button" class="hidden btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">\n                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">\n                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\n                                            </svg>\n                                        </button>\n                                        <ul class="dropdown-menu">\n                                            <li><a class="dropdown-item" onclick="clickEditCommentBtn(${d},${s},'reply')">수정</a></li>\n                                            <li><a class="dropdown-item" onclick="DeleteComment(${d}, ${s},'reply')">삭제</a></li>\n                                        </ul>\n                                    </div>\n                                </div>\n                                <div class="hidden contentEdit row mb-3 my-2">\n                                    <div class="col">\n                                        <input class="editInput form-control me-2" type="text" value="${e.data.comments[n].content}" aria-label="Comment" />\n                                    </div>\n                                    <div class="col-1">\n                                        <button type="button" class="btn btn-primary w-100" onclick="EditComment(${s},'reply')">수정</button>\n                                    </div>\n                                </div>\n                                <div class="d-flex">\n                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-2"  viewBox="0 0 16 16">\n                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>\n                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>\n                                    </svg>\n                                    <div class="me-3" style="font-size: smaller">${e.data.comments[n].updatedAt||e.data.comments[n].createdAt}</div>\n                                </div>\n                                <hr>\n                            </div>\n                        `,t(d,s)}})),function(t="comment"){const e=localStorage.getItem("userType"),n=document.querySelector("#comment_input"),s=document.querySelector("#comment_input_btn"),a=document.querySelector(".reply_input"),d=document.querySelector(".reply_input_btn"),i=document.querySelector("#title_category"),l=qaWriterId;"Q/A"==i.innerHTML&&o==l||"anonymous"===e&&(n.placeholder="회원만 작성할 수 있습니다.",s.classList.add("hidden"),null!=a&&(a.placeholder="회원만 작성할 수 있습니다.",d.classList.add("hidden")))}()}(i)}),200)}})(),(()=>{if(!window.location.href.includes("index")){const n="http://34.64.170.244:80/api/auth/validation",s=document.getElementById("toggle"),a=localStorage.getItem("sessionToken"),d=document.getElementById("toggleDetail"),o=(document.getElementById("navItem"),document.getElementById("adminBtn")),i=localStorage.getItem("userId"),l=document.querySelector(".navbar .container .nav-item a img");let c=localStorage.getItem("userType");const r=document.querySelector(".nav-item img");async function t(t){const e={method:"POST",headers:{"Content-Type":"application/json","x-pocs-session-token":t}},s=await fetch(n,e),a=await s.json();return console.log(a),200===a.status?(console.log(a.data.user),"anonymous"!=a.data.user.type&&(null!=a.data.user.defaultInfo.userProfilePath?r.src=`http://34.64.170.244${a.data.user.defaultInfo.userProfilePath}`:r.src="../img/logo.png"),a.data.user):(console.log(a.message),!1)}function e(t){d.innerHTML="loginFirst"===t?'<li><a class="dropdown-item" href="../html/index.html">로그인</a></li>':"anonymous"===c?'\n            <li><a class="dropdown-item" href="#" onclick="handleLogout()">로그아웃</a></li>\n        ':`\n            <li><a class="dropdown-item" href="../html/user_detail_edit.html?userId=${t}">내 정보 수정</a></li>\n            <li><a class="dropdown-item" href="#" onclick="handleLogout()">로그아웃</a></li>\n        `}document.body.insertAdjacentHTML='<nav class="navbar navbar-expand-sm bg-light justify-content-center"\n  style="position: sticky; top: 0; height: auto; z-index: 10">\n<div class="container">\n  <div class="navbar-brand nav-link" onclick="moveMainPage()" style="cursor: pointer;">POCS</div>\n  <ul class="navbar-nav" id="navItem">\n      <li class="nav-item" id="NoticeBtn">\n          <div class=\'nav-link\' onclick="moveNoticePage()" style="cursor: pointer;">Notice</div>\n      </li>\n      <li class="nav-item" id="PostBtn">\n          <div class="nav-link" onclick="movePostPage()" style="cursor: pointer;">Post</div>\n      </li>\n      <li class="nav-item" id="UserBtn">\n          <div class="nav-link" onclick="moveUserPage()" style="cursor: pointer;">User</div>\n      </li>\n      <li class="nav-item">\n          <a class="nav-link" href="qa.html">Q/A</a>\n      </li>\n      <li class="nav-item hidden" id="adminBtn">\n          <a class="nav-link" href="admin.html">Admin</a>\n      </li>\n  </ul>\n  <div class="nav-item dropdown">\n      <a class="nav-link dropdown-toggle" href="#" id="toggle" role="button" data-bs-toggle="dropdown">\n          <img src="../img/logo.png" style="width:40px;" class="rounded-pill">\n      </a>\n      <ul class="dropdown-menu"  id="toggleDetail">\n          \n      </ul>\n  </div>\n</div>\n</nav>',window.location.href.includes("index")||null===a&&(window.location.href="../html/index.html"),window.location.href.includes("index")||(window.addEventListener("load",(async function(){if(null!=a){let e=await t(a);"admin"===e.type&&(o.classList.toggle("hidden"),null!=window.location.href.match("notices.html")?document.getElementById("noticeAddBtn").classList.toggle("hidden"):null!=window.location.href.match("notices_detail.html")&&document.getElementById("noticeEditBtn").classList.toggle("hidden")),null!=window.location.href.match("main")?"admin"!==e.type&&"member"!==e.type||document.getElementById("userList").classList.toggle("hidden"):null==window.location.href.match("qa_add")&&null==window.location.href.match("qa_detail_edit")||"anonymous"==e.type||document.getElementById("title-below-area").classList.toggle("hidden"),null!=e.defaultInfo.userProfilePath&&(l.src=`http://34.64.161.55:80${e.defaultInfo.userProfilePath}`)}})),s.addEventListener("click",(async function(n){if(n.preventDefault(),s.classList.contains("show"))if(null!=a){let n=await t(a);null!=n.userId?e(n.userId):console.log("유효하지 않은 토큰입니다.")}else e("loginFirst")})),window.addEventListener("storage",(()=>{alert("userId값은 변경될수 없습니다!"),localStorage.removeItem("userId"),localStorage.setItem("userId",i)})))}})(),(()=>{if(window.location.href.includes("main")){let t;const e=document.querySelector(".best-card"),n=document.querySelector(".notice-card"),s=document.querySelector(".study-card"),a=document.querySelector(".memory-card"),d=document.querySelector(".knowhow-card");t="http://34.64.170.244:80/api";const o=localStorage.getItem("sessionToken");let i=new Headers({"x-pocs-session-token":o});fetch(t,{headers:i}).then((t=>t.json())).then((t=>{if(console.log(t),0===t.data.bestPosts.length)document.getElementById("category-best-button").classList.add("hidden"),e.innerHTML+='\n                <div class="card" id="card-area">\n            <div class="card-body">\n                <img src="../img/Pencil_icon.png" style="width : 100px;">\n                <div style="margin-top : 5px;">\n                    현재 게시글이 없습니다!\n                </div>\n            </div>\n        </div>';else for(let n=0;n<t.data.bestPosts.length;n++)t.data.bestPosts[n].content.length>30?"notice"===t.data.bestPosts[n].category?e.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='notices_detail.html?postId=${t.data.bestPosts[n].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.bestPosts[n].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.bestPosts[n].writerName||"익명"} · ${t.data.bestPosts[n].createdAt}</h6>\n                            <p class="card-text">${t.data.bestPosts[n].content.substring(0,30)+"..."}<a href="notices_detail.html?postId=${t.data.bestPosts[n].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:e.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.bestPosts[n].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.bestPosts[n].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.bestPosts[n].writerName||"익명"} · ${t.data.bestPosts[n].createdAt}</h6>\n                            <p class="card-text">${t.data.bestPosts[n].content.substring(0,30)+"..."}<a href="posts_detail.html?postId=${t.data.bestPosts[n].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:"notice"===t.data.bestPosts[n].category?e.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='notices_detail.html?postId=${t.data.bestPosts[n].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.bestPosts[n].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.bestPosts[n].writerName||"익명"} · ${t.data.bestPosts[n].createdAt}</h6>\n                            <p class="card-text">${t.data.bestPosts[n].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `:e.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.bestPosts[n].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.bestPosts[n].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.bestPosts[n].writerName||"익명"} · ${t.data.bestPosts[n].createdAt}</h6>\n                            <p class="card-text">${t.data.bestPosts[n].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `;if(0===t.data.noticePosts.length)document.getElementById("category-notice-button").classList.add("hidden"),n.innerHTML+='\n            <div class="card" id="card-area">\n        <div class="card-body">\n            <img src="../img/Pencil_icon.png" style="width : 100px;">\n            <div style="margin-top : 5px;">\n                현재 게시글이 없습니다!\n            </div>\n        </div>\n    </div>';else for(let e=0;e<t.data.noticePosts.length;e++)t.data.noticePosts[e].content.length>30?n.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='notices_detail.html?postId=${t.data.noticePosts[e].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.noticePosts[e].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.noticePosts[e].writerName||"익명"} · ${t.data.noticePosts[e].createdAt}</h6>\n                            <p class="card-text">${t.data.noticePosts[e].content.substring(0,30)+"..."}<a href="notices_detail.html?postId=${t.data.noticePosts[e].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:n.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='notices_detail.html?postId=${t.data.noticePosts[e].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.noticePosts[e].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.noticePosts[e].writerName||"익명"} · ${t.data.noticePosts[e].createdAt}</h6>\n                            <p class="card-text">${t.data.noticePosts[e].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `;if(0===t.data.studyPosts.length)document.getElementById("category-study-button").classList.add("hidden"),s.innerHTML+='\n            <div class="card" id="card-area">\n        <div class="card-body">\n            <img src="../img/Pencil_icon.png" style="width : 100px;">\n            <div style="margin-top : 5px;">\n                현재 게시글이 없습니다!\n            </div>\n        </div>\n    </div>';else for(let e=0;e<t.data.studyPosts.length;e++)t.data.studyPosts[e].content.length>30?s.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.studyPosts[e].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.studyPosts[e].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.studyPosts[e].writerName||"익명"} · ${t.data.studyPosts[e].createdAt}</h6>\n                            <p class="card-text">${t.data.studyPosts[e].content.substring(0,30)+"..."}<a href="posts_detail.html?postId=${t.data.studyPosts[e].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:s.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.studyPosts[e].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.studyPosts[e].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.studyPosts[e].writerName||"익명"} · ${t.data.studyPosts[e].createdAt}</h6>\n                            <p class="card-text">${t.data.studyPosts[e].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `;if(0===t.data.memoryPosts.length)document.getElementById("category-memory-button").classList.add("hidden"),a.innerHTML+='\n            <div class="card" id="card-area">\n        <div class="card-body">\n            <img src="../img/Pencil_icon.png" style="width : 100px;">\n            <div style="margin-top : 5px;">\n                현재 게시글이 없습니다!\n            </div>\n        </div>\n    </div>';else for(let e=0;e<t.data.memoryPosts.length;e++)t.data.memoryPosts[e].content.length>30?a.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.memoryPosts[e].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.memoryPosts[e].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.memoryPosts[e].writerName||"익명"} · ${t.data.memoryPosts[e].createdAt}</h6>\n                            <p class="card-text">${t.data.memoryPosts[e].content.substring(0,30)+"..."}<a href="posts_detail.html?postId=${t.data.memoryPosts[e].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:a.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.memoryPosts[e].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.memoryPosts[e].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.memoryPosts[e].writerName||"익명"} · ${t.data.memoryPosts[e].createdAt}</h6>\n                            <p class="card-text">${t.data.memoryPosts[e].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `;if(0===t.data.knowhowPosts.length)document.getElementById("category-knowhow-button").classList.add("hidden"),d.innerHTML+='\n            <div class="card" id="card-area">\n        <div class="card-body">\n            <img src="../img/Pencil_icon.png" style="width : 100px;">\n            <div style="margin-top : 5px;">\n                현재 게시글이 없습니다!\n            </div>\n        </div>\n    </div>';else for(let e=0;e<t.data.knowhowPosts.length;e++)t.data.knowhowPosts[e].content.length>30?d.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.knowhowPosts[e].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.knowhowPosts[e].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.knowhowPosts[e].writerName||"익명"} · ${t.data.knowhowPosts[e].createdAt}</h6>\n                            <p class="card-text">${t.data.knowhowPosts[e].content.substring(0,30)+"..."}<a href="posts_detail.html?postId=${t.data.knowhowPosts[e].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:d.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.knowhowPosts[e].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.knowhowPosts[e].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.knowhowPosts[e].writerName||"익명"} · ${t.data.knowhowPosts[e].createdAt}</h6>\n                            <p class="card-text">${t.data.knowhowPosts[e].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `})),t="http://34.64.170.244:80/api/users?offset=5&pageNum=1";const l=document.querySelector("#user-main");fetch(t,{headers:i}).then((t=>t.json())).then((t=>{if(console.log(t),null===t.data)console.log("존재하지 않는 유저입니다.");else for(let e=0;e<5;e++)null===t.data.users[e].defaultInfo.userProfilePath?l.innerHTML+=`\n            <div class="col" style="text-align: center;">\n                <img src="../img/profile.png" style="width:100px;height:100px" class="rounded-pill">\n                    <div>\n                        <div id="user_main_userName">${t.data.users[e].defaultInfo.name||"익명"}</div>\n                        <div id="user_main_generation">${t.data.users[e].defaultInfo.generation}</div>\n                    </div>\n            </div>\n            `:l.innerHTML+=`\n          <div class="col" style="text-align: center;">\n              <img src="http://34.64.161.55:80/${t.data.users[e].defaultInfo.userProfilePath}\n              style="width:100px;height:100px;object-fit: cover" class="rounded-pill">\n                  <div>\n                      <div id="user_main_userName">${t.data.users[e].defaultInfo.name||"익명"}</div>\n                      <div id="user_main_generation">${t.data.users[e].defaultInfo.generation}</div>\n                  </div>\n          </div>\n          `}))}})(),(()=>{if(window.location.href.includes("index")){const t="http://34.64.170.244:80/api/auth/login",e=document.getElementById("floatingInput"),n=document.getElementById("floatingPassword"),s=document.getElementById("loginForm"),a=document.getElementById("RegisterBtn"),d=document.getElementById("register-id"),o=document.getElementById("register-password");s.addEventListener("submit",(async function(s){s.preventDefault();const a={userName:e.value,password:n.value},d={method:"POST",headers:{"Content-Type":"application/json","x-pocs-device-type":"web"},body:JSON.stringify(a)},o=await fetch(t,d),i=await o.json();console.log(i),200===i.status?(localStorage.setItem("sessionToken",i.data.sessionToken),localStorage.setItem("userId",i.data.user.userId),localStorage.setItem("userType",i.data.user.type),window.location.href="../html/main.html"):console.log("로그인 실패")})),a.addEventListener("click",(async function(t){t.preventDefault();const e={userName:d.value,password:o.value},n={method:"POST",headers:{"Content-Type":"application/json","x-pocs-device-type":"web"},body:JSON.stringify(e)},s=await fetch("http://34.64.170.244:80/api/users",n),a=await s.json();console.log(a),201===a.status?(alert("비회원 가입 완료"),window.location.href="../html/main.html"):(alert("다시 입력해주세요"),console.log("비회원 회원가입 실패"))}))}})(),(()=>{if(window.location.href.includes("notices.html")){document.querySelector("#notice table");const t=document.querySelector("#notice table thead"),e=document.querySelector("#notice table tbody");let n,s=1,a=`http://34.64.161.55:80/api/posts?id=notice&offset=${15}&pageNum=${s}`,d=localStorage.getItem("sessionToken"),o=new Headers({"x-pocs-session-token":d});const i=localStorage.getItem("userType");!async function(){await fetch(a,{headers:o}).then((t=>t.json())).then((s=>{if(console.log(s),t.innerHTML='<tr class="post-list">\n                <th>번호</th>\n                <th>제목</th>\n                <th>작성자</th>\n                <th>작성일</th>\n                <th>카테고리</th>\n            </tr>',e.innerHTML="",null===s.data)e.innerHTML="<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";else{n=Math.ceil(s.data.categories[1].count/15);for(let t=0;t<s.data.posts.length;t++)s.data.posts[t].onlyMember&&"anonymous"===i?e.innerHTML+=`\n                <tr class="post-list">\n                <td>${s.data.posts[t].postId}</td>\n                <td>비공개</td>\n                <td></td>\n                <td></td>\n                <td></td>\n                </tr>\n                `:e.innerHTML+=`\n                <tr class="post-list">\n                <td>${s.data.posts[t].postId}</td>\n                <td onclick="window.location.href='notices_detail.html?postId=${s.data.posts[t].postId}'"\n                    style="cursor:pointer">${s.data.posts[t].title}</td>\n                <td>${s.data.posts[t].writerName}</td>\n                <td>${s.data.posts[t].createdAt}</td>\n                <td>${s.data.posts[t].category}</td>\n                </tr>\n                `}})),await function(){let t='<ul class="pagination justify-content-center">\n                <li class="page-item">\n                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>\n                </li>',e=5*Math.ceil(s/5);e>n&&(e=n);for(let n=e-4<=0?1:e-4;n<=e;n++)t+=`<li class="page-item ${s==n?"active":""}"><a class="page-link" onclick="movePage(${n})">${n}</a></li>`;t+='<li class="page-item">\n                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>\n                </li>',document.querySelector("#notice-pagination-bar").innerHTML=t}()}()}})();