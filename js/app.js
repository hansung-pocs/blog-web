let url;
const offset = 3;
//홈페이지에 인기글 최근글 3개 불러오기
const best_card = document.querySelector(".best-card");
url = `http://34.64.161.55:8001/posts?id=best&offset=${offset}&pageNum=1`;
const sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({'x-pocs-session-token': sessiontoken});

fetch(url, {headers: header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        best_card.innerHTML = "";
        if (data.data === null) {
            best_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt;
            //데이터가 3개미만일때
            if (data.data.length < 3) {
                cnt = data.data.posts[i].length;
            } else
                cnt = offset;

            if (cnt === 0) {
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
            else{
                for (let i = 0; i < cnt; i++) {
                    best_card.innerHTML +=
                        `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName || "익명"} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0, 30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                }
            }
        }
    })

//홈페이지에 공지사항 최근글 3개 불러오기
const notice_card = document.querySelector(".notice-card");
url = `http://34.64.161.55:8001/posts?id=notice&offset=${offset}&pageNum=1`;
fetch(url, {headers: header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        notice_card.innerHTML = "";
        if (data.data === null) {
            notice_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt;
            //데이터가 3개미만일때
            if (data.data.length < 3) {
                cnt = data.data.posts[i].length;
            } else
                cnt = offset;
            if (cnt === 0) {
                //더보기 버튼 삭제
                document.getElementById("category-notice-button").classList.add("hidden");
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
            else{
                for (let i = 0; i < cnt; i++) {
                    notice_card.innerHTML +=
                        `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName || "익명"} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0, 30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                    cnt++;
                }
            }
        }
    })


//홈페이지에 스터디 최근글 3개 불러오기
const study_card = document.querySelector(".study-card");
url = `http://34.64.161.55:8001/posts?id=study&offset=${offset}&pageNum=1`;
fetch(url, {headers: header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        study_card.innerHTML = "";
        if (data.data === null) {
            study_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt;
            //데이터가 3개미만일때
            if (data.data.length < 3) {
                cnt = data.data.posts[i].length;
            } else
                cnt = offset;
            if (cnt === 0) {
                //더보기 버튼 삭제
                document.getElementById("category-study-button").classList.add("hidden");
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
            else{
                for (let i = 0; i < cnt; i++) {
                    study_card.innerHTML +=
                        `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName || "익명"} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0, 30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                    cnt++;
                }
            }
        }
    })

//홈페이지에 추억 최근글 3개 불러오기
const memory_card = document.querySelector(".memory-card");
url = `http://34.64.161.55:8001/posts?id=memory&offset=${offset}&pageNum=1`;
fetch(url, {headers: header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        memory_card.innerHTML = "";
        if (data.data === null) {
            memory_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt;
            //데이터가 3개미만일때
            if (data.data.length < 3) {
                cnt = data.data.posts[i].length;
            } else
                cnt = offset;
            if (cnt === 0) {
                //더보기 버튼 삭제
                document.getElementById("category-memory-button").classList.add("hidden");
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
            else{
                for (let i = 0; i < cnt; i++) {
                    memory_card.innerHTML +=
                        `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName || "익명"} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0, 30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                    cnt++;
                }
            }
        }
    })

//홈페이지에 노하우 최근글 3개 불러오기
const knowhow_card = document.querySelector(".knowhow-card");
url = `http://34.64.161.55:8001/posts?id=knowhow&offset=${offset}&pageNum=1`;
fetch(url, {headers: header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        knowhow_card.innerHTML = "";
        if (data.data === null) {
            knowhow_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt;
            //데이터가 3개미만일때
            if (data.data.length < 3) {
                cnt = data.data.posts[i].length;
            } else
                cnt = offset;
            if (cnt === 0) {
                //더보기 버튼 삭제
                document.getElementById("category-knowhow-button").classList.add("hidden");
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
            else{
                for (let i = 0; i < cnt; i++) {
                    knowhow_card.innerHTML +=
                        `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName || "익명"} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0, 30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                    cnt++;
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