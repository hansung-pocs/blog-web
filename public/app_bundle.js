(()=>{let t;const s=document.querySelector(".best-card"),a=document.querySelector(".notice-card"),d=document.querySelector(".study-card"),e=document.querySelector(".memory-card"),n=document.querySelector(".knowhow-card");t="http://34.64.170.244:80/api";const o=localStorage.getItem("sessionToken");let i=new Headers({"x-pocs-session-token":o});fetch(t,{headers:i}).then((t=>t.json())).then((t=>{if(console.log(t),0===t.data.bestPosts.length)document.getElementById("category-best-button").classList.add("hidden"),s.innerHTML+='\n                <div class="card" id="card-area">\n            <div class="card-body">\n                <img src="../img/Pencil_icon.png" style="width : 100px;">\n                <div style="margin-top : 5px;">\n                    현재 게시글이 없습니다!\n                </div>\n            </div>\n        </div>';else for(let a=0;a<t.data.bestPosts.length;a++)t.data.bestPosts[a].content.length>30?"notice"===t.data.bestPosts[a].category?s.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='notices_detail.html?postId=${t.data.bestPosts[a].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.bestPosts[a].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.bestPosts[a].writerName||"익명"} · ${t.data.bestPosts[a].createdAt}</h6>\n                            <p class="card-text">${t.data.bestPosts[a].content.substring(0,30)+"..."}<a href="notices_detail.html?postId=${t.data.bestPosts[a].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:s.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.bestPosts[a].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.bestPosts[a].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.bestPosts[a].writerName||"익명"} · ${t.data.bestPosts[a].createdAt}</h6>\n                            <p class="card-text">${t.data.bestPosts[a].content.substring(0,30)+"..."}<a href="posts_detail.html?postId=${t.data.bestPosts[a].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:"notice"===t.data.bestPosts[a].category?s.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='notices_detail.html?postId=${t.data.bestPosts[a].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.bestPosts[a].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.bestPosts[a].writerName||"익명"} · ${t.data.bestPosts[a].createdAt}</h6>\n                            <p class="card-text">${t.data.bestPosts[a].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `:s.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.bestPosts[a].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.bestPosts[a].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.bestPosts[a].writerName||"익명"} · ${t.data.bestPosts[a].createdAt}</h6>\n                            <p class="card-text">${t.data.bestPosts[a].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `;if(0===t.data.noticePosts.length)document.getElementById("category-notice-button").classList.add("hidden"),a.innerHTML+='\n            <div class="card" id="card-area">\n        <div class="card-body">\n            <img src="../img/Pencil_icon.png" style="width : 100px;">\n            <div style="margin-top : 5px;">\n                현재 게시글이 없습니다!\n            </div>\n        </div>\n    </div>';else for(let s=0;s<t.data.noticePosts.length;s++)t.data.noticePosts[s].content.length>30?a.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='notices_detail.html?postId=${t.data.noticePosts[s].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.noticePosts[s].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.noticePosts[s].writerName||"익명"} · ${t.data.noticePosts[s].createdAt}</h6>\n                            <p class="card-text">${t.data.noticePosts[s].content.substring(0,30)+"..."}<a href="notices_detail.html?postId=${t.data.noticePosts[s].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:a.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='notices_detail.html?postId=${t.data.noticePosts[s].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.noticePosts[s].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.noticePosts[s].writerName||"익명"} · ${t.data.noticePosts[s].createdAt}</h6>\n                            <p class="card-text">${t.data.noticePosts[s].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `;if(0===t.data.studyPosts.length)document.getElementById("category-study-button").classList.add("hidden"),d.innerHTML+='\n            <div class="card" id="card-area">\n        <div class="card-body">\n            <img src="../img/Pencil_icon.png" style="width : 100px;">\n            <div style="margin-top : 5px;">\n                현재 게시글이 없습니다!\n            </div>\n        </div>\n    </div>';else for(let s=0;s<t.data.studyPosts.length;s++)t.data.studyPosts[s].content.length>30?d.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.studyPosts[s].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.studyPosts[s].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.studyPosts[s].writerName||"익명"} · ${t.data.studyPosts[s].createdAt}</h6>\n                            <p class="card-text">${t.data.studyPosts[s].content.substring(0,30)+"..."}<a href="posts_detail.html?postId=${t.data.studyPosts[s].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:d.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.studyPosts[s].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.studyPosts[s].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.studyPosts[s].writerName||"익명"} · ${t.data.studyPosts[s].createdAt}</h6>\n                            <p class="card-text">${t.data.studyPosts[s].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `;if(0===t.data.memoryPosts.length)document.getElementById("category-memory-button").classList.add("hidden"),e.innerHTML+='\n            <div class="card" id="card-area">\n        <div class="card-body">\n            <img src="../img/Pencil_icon.png" style="width : 100px;">\n            <div style="margin-top : 5px;">\n                현재 게시글이 없습니다!\n            </div>\n        </div>\n    </div>';else for(let s=0;s<t.data.memoryPosts.length;s++)t.data.memoryPosts[s].content.length>30?e.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.memoryPosts[s].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.memoryPosts[s].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.memoryPosts[s].writerName||"익명"} · ${t.data.memoryPosts[s].createdAt}</h6>\n                            <p class="card-text">${t.data.memoryPosts[s].content.substring(0,30)+"..."}<a href="posts_detail.html?postId=${t.data.memoryPosts[s].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:e.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.memoryPosts[s].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.memoryPosts[s].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.memoryPosts[s].writerName||"익명"} · ${t.data.memoryPosts[s].createdAt}</h6>\n                            <p class="card-text">${t.data.memoryPosts[s].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `;if(0===t.data.knowhowPosts.length)document.getElementById("category-knowhow-button").classList.add("hidden"),n.innerHTML+='\n            <div class="card" id="card-area">\n        <div class="card-body">\n            <img src="../img/Pencil_icon.png" style="width : 100px;">\n            <div style="margin-top : 5px;">\n                현재 게시글이 없습니다!\n            </div>\n        </div>\n    </div>';else for(let s=0;s<t.data.knowhowPosts.length;s++)t.data.knowhowPosts[s].content.length>30?n.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.knowhowPosts[s].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.knowhowPosts[s].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.knowhowPosts[s].writerName||"익명"} · ${t.data.knowhowPosts[s].createdAt}</h6>\n                            <p class="card-text">${t.data.knowhowPosts[s].content.substring(0,30)+"..."}<a href="posts_detail.html?postId=${t.data.knowhowPosts[s].postId}" class="card-link">더보기</a></p>\n                          </div>\n                        </div>\n                        </div>\n                         `:n.innerHTML+=`\n                        <div class="col-xl">\n                        <div id="main" class="card" onClick="location.href='posts_detail.html?postId=${t.data.knowhowPosts[s].postId}'">\n                          <div class="card-body">\n                            <h3 class="card-title mb-3">${t.data.knowhowPosts[s].title}</h3>\n                            <h6 class="card-subtitle mb-2 text-muted">${t.data.knowhowPosts[s].writerName||"익명"} · ${t.data.knowhowPosts[s].createdAt}</h6>\n                            <p class="card-text">${t.data.knowhowPosts[s].content}</p>\n                          </div>\n                        </div>\n                        </div>\n                         `})),t="http://34.64.170.244:80/api/users?offset=5&pageNum=1";const c=document.querySelector("#user-main");fetch(t,{headers:i}).then((t=>t.json())).then((t=>{if(console.log(t),null===t.data)console.log("존재하지 않는 유저입니다.");else for(let s=0;s<5;s++)null===t.data.users[s].defaultInfo.userProfilePath?c.innerHTML+=`\n            <div class="col" style="text-align: center;">\n                <img src="../img/profile.png" style="width:100px;height:100px" class="rounded-pill">\n                    <div>\n                        <div id="user_main_userName">${t.data.users[s].defaultInfo.name||"익명"}</div>\n                        <div id="user_main_generation">${t.data.users[s].defaultInfo.generation}</div>\n                    </div>\n            </div>\n            `:c.innerHTML+=`\n          <div class="col" style="text-align: center;">\n              <img src="http://34.64.170.244:80${t.data.users[s].defaultInfo.userProfilePath}"\n                style="width:100px;height:100px;object-fit: cover" class="rounded-pill">\n                  <div>\n                      <div id="user_main_userName">${t.data.users[s].defaultInfo.name||"익명"}</div>\n                      <div id="user_main_generation">${t.data.users[s].defaultInfo.generation}</div>\n                  </div>\n          </div>\n          `}))})();