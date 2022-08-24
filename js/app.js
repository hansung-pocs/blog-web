let url;

//홈페이지에 인기글 최근글 3개 불러오기
const best_card = document.querySelector(".best-card");
url = "http://34.64.161.55:8001/posts?id=best&offset=3&pageNum=1";
const sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ 'x-pocs-session-token': sessiontoken });

fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        best_card.innerHTML = "";
        if (data.data === null) {
            best_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt = 0;
            for (let i = 0; i < data.data.posts.length; i++) {
                if (cnt > 2)
                    break;
                if (1) {
                    best_card.innerHTML +=
                        `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0,30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                    cnt++;
                }
            }
        }
    })

//홈페이지에 공지사항 최근글 3개 불러오기
const notice_card = document.querySelector(".notice-card");
url = "http://34.64.161.55:8001/posts?id=notice&offset=3&pageNum=1";
fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        notice_card.innerHTML = "";
        if (data.data === null) {
            notice_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt = 0;
            for (let i = 0; i < data.data.posts.length; i++) {
                if (cnt > 2)
                    break;
                notice_card.innerHTML +=
                    `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0,30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                cnt++;
            }
        }
    })


//홈페이지에 스터디 최근글 3개 불러오기
const study_card = document.querySelector(".study-card");
url = "http://34.64.161.55:8001/posts?id=study&offset=3&pageNum=1";
fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        study_card.innerHTML = "";
        if (data.data === null) {
            study_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt = 0;
            for (let i = 0; i < data.data.posts.length; i++) {
                if (cnt > 2)
                    break;
                study_card.innerHTML +=
                    `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0,30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                cnt++;
            }
        }
    })

//홈페이지에 추억 최근글 3개 불러오기
const memory_card = document.querySelector(".memory-card");
url = "http://34.64.161.55:8001/posts?id=memory&offset=3&pageNum=1";
fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        memory_card.innerHTML = "";
        if (data.data === null) {
            memory_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt = 0;
            for (let i = 0; i < data.data.posts.length; i++) {
                if (cnt > 2)
                    break;
                memory_card.innerHTML +=
                    `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0,30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                cnt++;
            }
        }
    })

//홈페이지에 노하우 최근글 3개 불러오기
const knowhow_card = document.querySelector(".knowhow-card");
url = "http://34.64.161.55:8001/posts?id=knowhow&offset=3&pageNum=1";
fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        knowhow_card.innerHTML = "";
        if (data.data === null) {
            knowhow_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt = 0;
            for (let i = 0; i < data.data.posts.length; i++) {
                if (cnt > 2)
                    break;
                knowhow_card.innerHTML +=
                    `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content.length > 30 ? data.data.posts[i].content.substring(0,30) + "..." : data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                cnt++;
            }
        }
    })

url = `http://34.64.161.55:8001/users?offset=5&pageNum=1`;
//정보
const user_main = document.querySelector("#user-main");
fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.data === null) {
            console.log('존재하지 않는 유저입니다.');
        }
        else {
            for (let i = 0; i < 5; i++) {
                user_main.innerHTML +=
                    `
            <div class="col" style="text-align: center;">
                <img src="../img/profile.png" style="width:100px;" class="rounded-pill">
                    <div>
                        <div id="user_main_userName">${data.data.users[i].defaultInfo.name}</div>
                        <div id="user_main_generation">${data.data.users[i].defaultInfo.generation}</div>
                    </div>
            </div>
            `
            }
        }
    })