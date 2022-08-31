let url;
const offset = 3;
//홈페이지에 인기글 최근글 3개 불러오기
const best_card = document.querySelector(".best-card");
const notice_card = document.querySelector(".notice-card");
const study_card = document.querySelector(".study-card");
const memory_card = document.querySelector(".memory-card");
const knowhow_card = document.querySelector(".knowhow-card");

url = `http://34.64.161.55:8001/`;
const sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({'x-pocs-session-token': sessiontoken});

fetch(url, {headers: header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        //bestPosts
        if (data.data.bestPosts.length === 0) {
            //더보기 버튼 삭제
            document.getElementById("category-best-button").classList.add("hidden");
            best_card.innerHTML += `
                <div class="card" id="card-area">
            <div class="card-body">
                <img src="../img/Pencil_icon.png" style="width : 100px;">
                <div style="margin-top : 5px;">
                    현재 게시글이 없습니다!
                </div>
            </div>
        </div>`;
        }
        else {
            for (let i = 0; i < data.data.bestPosts.length; i++) {
                if (data.data.bestPosts[i].content.length > 30) {
                    if(data.data.bestPosts[i].category === "notice"){
                        best_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.bestPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.bestPosts[i].writerName || "익명"} · ${data.data.bestPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.bestPosts[i].content.substring(0, 30) + "..."}<a href="notices_detail.html?postId=${data.data.bestPosts[i].postId}" class="card-link">더보기</a></p>
                          </div>
                        </div>
                        </div>
                         `;
                    }
                    else{
                        best_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.bestPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.bestPosts[i].writerName || "익명"} · ${data.data.bestPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.bestPosts[i].content.substring(0, 30) + "..."}<a href="posts_detail.html?postId=${data.data.bestPosts[i].postId}" class="card-link">더보기</a></p>
                          </div>
                        </div>
                        </div>
                         `;
                    }
                }
                else{
                    if(data.data.bestPosts[i].category === "notice"){
                        best_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.bestPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.bestPosts[i].writerName || "익명"} · ${data.data.bestPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.bestPosts[i].content}</p>
                          </div>
                        </div>
                        </div>
                         `;
                    }
                    else{
                        best_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.bestPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.bestPosts[i].writerName || "익명"} · ${data.data.bestPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.bestPosts[i].content}</p>
                          </div>
                        </div>
                        </div>
                         `;
                    }
                }
            }
        }

        //noticePosts
        if (data.data.noticePosts.length === 0) {
            //더보기 버튼 삭제
            document.getElementById("category-notice-button").classList.add("hidden");
            notice_card.innerHTML += `
            <div class="card" id="card-area">
        <div class="card-body">
            <img src="../img/Pencil_icon.png" style="width : 100px;">
            <div style="margin-top : 5px;">
                현재 게시글이 없습니다!
            </div>
        </div>
    </div>`;
        }
        else {
            for (let i = 0; i < data.data.noticePosts.length; i++) {
                if (data.data.noticePosts[i].content.length > 30) {
                    
                    notice_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.noticePosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.noticePosts[i].writerName || "익명"} · ${data.data.noticePosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.noticePosts[i].content.substring(0, 30) + "..."}<a href="notices_detail.html?postId=${data.data.noticePosts[i].postId}" class="card-link">더보기</a></p>
                          </div>
                        </div>
                        </div>
                         `;
                    
                }
                else{
                    notice_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.noticePosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.noticePosts[i].writerName || "익명"} · ${data.data.noticePosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.noticePosts[i].content}</p>
                          </div>
                        </div>
                        </div>
                         `;
                }
            }


            
        }

        //studyPosts
        if (data.data.studyPosts.length === 0) {
            //더보기 버튼 삭제
            document.getElementById("category-study-button").classList.add("hidden");
            study_card.innerHTML += `
            <div class="card" id="card-area">
        <div class="card-body">
            <img src="../img/Pencil_icon.png" style="width : 100px;">
            <div style="margin-top : 5px;">
                현재 게시글이 없습니다!
            </div>
        </div>
    </div>`;
        }
        else {
            for (let i = 0; i < data.data.studyPosts.length; i++) {
                if (data.data.studyPosts[i].content.length > 30) {
                    study_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.studyPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.studyPosts[i].writerName || "익명"} · ${data.data.studyPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.studyPosts[i].content.substring(0, 30) + "..."}<a href="posts_detail.html?postId=${data.data.studyPosts[i].postId}" class="card-link">더보기</a></p>
                          </div>
                        </div>
                        </div>
                         `;
                }
                else{
                    study_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.studyPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.studyPosts[i].writerName || "익명"} · ${data.data.studyPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.studyPosts[i].content}</p>
                          </div>
                        </div>
                        </div>
                         `;   
                }
            }
        }

        //memoryPosts
        if (data.data.memoryPosts.length === 0) {
            //더보기 버튼 삭제
            document.getElementById("category-memory-button").classList.add("hidden");
            memory_card.innerHTML += `
            <div class="card" id="card-area">
        <div class="card-body">
            <img src="../img/Pencil_icon.png" style="width : 100px;">
            <div style="margin-top : 5px;">
                현재 게시글이 없습니다!
            </div>
        </div>
    </div>`;
        }
        else{
            for (let i = 0; i < data.data.memoryPosts.length; i++) {
                if (data.data.memoryPosts[i].content.length > 30) {
                    memory_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.memoryPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.memoryPosts[i].writerName || "익명"} · ${data.data.memoryPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.memoryPosts[i].content.substring(0, 30) + "..."}<a href="posts_detail.html?postId=${data.data.memoryPosts[i].postId}" class="card-link">더보기</a></p>
                          </div>
                        </div>
                        </div>
                         `;
                }
                else{
                    memory_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.memoryPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.memoryPosts[i].writerName || "익명"} · ${data.data.memoryPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.memoryPosts[i].content}</p>
                          </div>
                        </div>
                        </div>
                         `;   
                }
            }
        }

        //knowhowPosts
        if (data.data.knowhowPosts.length === 0) {
            //더보기 버튼 삭제
            document.getElementById("category-knowhow-button").classList.add("hidden");
            knowhow_card.innerHTML += `
            <div class="card" id="card-area">
        <div class="card-body">
            <img src="../img/Pencil_icon.png" style="width : 100px;">
            <div style="margin-top : 5px;">
                현재 게시글이 없습니다!
            </div>
        </div>
    </div>`;
        }
        else{
            for (let i = 0; i < data.data.knowhowPosts.length; i++) {
                if (data.data.knowhowPosts[i].content.length > 30) {
                    knowhow_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.knowhowPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.knowhowPosts[i].writerName || "익명"} · ${data.data.knowhowPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.knowhowPosts[i].content.substring(0, 30) + "..."}<a href="posts_detail.html?postId=${data.data.knowhowPosts[i].postId}" class="card-link">더보기</a></p>
                          </div>
                        </div>
                        </div>
                         `;
                }
                else{
                    knowhow_card.innerHTML +=
                        `
                        <div class="col-xl">
                        <div id="main" class="card">
                          <div class="card-body">
                            <h3 class="card-title mb-3">${data.data.knowhowPosts[i].title}</h3>
                            <h6 class="card-subtitle mb-2 text-muted">${data.data.knowhowPosts[i].writerName || "익명"} · ${data.data.knowhowPosts[i].createdAt}</h6>
                            <p class="card-text">${data.data.knowhowPosts[i].content}</p>
                          </div>
                        </div>
                        </div>
                         `;   
                }
            }
        }
    })







url = `http://34.64.161.55:8001/users?offset=5&pageNum=1`;
//정보
const user_main = document.querySelector("#user-main");
fetch(url, {headers: header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.data === null) {
            console.log('존재하지 않는 유저입니다.');
        } else {
            for (let i = 0; i < 5; i++) {
                user_main.innerHTML +=
                    `
            <div class="col" style="text-align: center;">
                <img src="../img/profile.png" style="width:100px;" class="rounded-pill">
                    <div>
                        <div id="user_main_userName">${data.data.users[i].defaultInfo.name || "익명"}</div>
                        <div id="user_main_generation">${data.data.users[i].defaultInfo.generation}</div>
                    </div>
            </div>
            `
            }
        }
    })

  