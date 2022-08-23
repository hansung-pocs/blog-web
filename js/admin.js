let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({'x-pocs-session-token': sessiontoken});
let post_data;

//공지사항에 필요한 dom
const notice = document.querySelector("#notice table");
const notice_thead = document.querySelector("#notice table thead");
const notice_tbody = document.querySelector("#notice table tbody");

//회원목록에 필요한 dom
const user = document.querySelector("#user table");
const user_thead = document.querySelector("#user table thead");
const user_tbody = document.querySelector("#user table tbody");

//공지사항 pagination에 필요한 변수
let Notice_currentPage = 1;
let Notice_cntPageNum = 0;

//유저목록 pagination에 필요한 변수
let User_cntPageNum = 0;
let User_currentPage = 1;

const offset = 15;

let post_url = `http://34.64.161.55:8001/admin/posts?offset=${offset}&pageNum=${Notice_currentPage}`;
let user_url = `http://34.64.161.55:8001/admin/users?offset=${offset}&pageNum=${User_currentPage}`;

function fetchNotice() {
    fetch(post_url, {headers: header})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            post_data = data.data.posts;
            notice_thead.innerHTML = `<tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>수정일</th>
                <th>카테고리</th>
            </tr>`;
            notice_tbody.innerHTML = "";

            if (data.data === null) {
                notice_tbody.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
            } else {
                Notice_cntPageNum = 15 * Notice_currentPage - 15;

                for (let i = 0; i < 15; i++) {
                    notice_tbody.innerHTML += `
                <tr>
                <td>${Notice_cntPageNum + i + 1}</td>
                <td onclick="moveNoticeDetailPage(${post_data[i].postId})"
                    style="cursor:pointer">${post_data[i].title}</td>
                <td>${post_data[i].writerName || "비회원"}</td>
                <td>${post_data[i].createdAt}</td>
                <td>${post_data[i].updatedAt || ""}</td>
                <td>${post_data[i].category}</td>
                </tr>
                `;
                }
            }
        });
}

function fetchUser() {
    fetch(user_url, {headers: header})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            user_thead.innerHTML = "<tr><td>번호</td><td>성명</td><td>학번</td><td>e-mail</td></tr>";
            user_tbody.innerHTML = "";
            if (data.data.users === null) {
                user_tbody.innerHTML = "<tr><td>유저를</td><td>추가</td><td>하세요.</td><td></td></tr>";
            } else {
                for (let i = 0; i < data.data.users.length; i++) {
                    User_cntPageNum = 15 * User_currentPage - 15;
                    user_tbody.innerHTML += `
                <tr>
                    <td>${User_cntPageNum + i + 1}</td>
                    <td onclick="moveUserDetailPage(${data.data.users[i].userId})"
                        style="pointer">${data.data.users[i].name || `비회원${data.data.users[i].userId}`}</td>
                    <td>${data.data.users[i].studentId || ""}</td>
                    <td>${data.data.users[i].email || ""}</td>
                </tr>
                `;
                }
            }
        });
}

//Noticepgaination 구현
function showNoticePagination() {
    let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousNoticePage()">Previous</a>
                </li>`;
    let pageGroup = Math.ceil(Notice_currentPage / 5);
    let last_num = pageGroup * 5;

    let first_num = last_num - 4 <= 0 ? 1 : last_num - 4;
    for (let i = first_num; i <= last_num; i++) {
        pageHTML += `<li class="page-item ${Notice_currentPage == i ? "active" : ""}"><a class="page-link" onclick="moveAdminNoticePage(${i})">${i}</a></li>`;
    }

    pageHTML += `<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextNoticePage()">Next</a>
                </li>`;

    document.querySelector("#notice-pagination-bar").innerHTML = pageHTML;
}

function moveAdminNoticePage(pageNum) {
    //이동할 페이지가 이미 그 페이지라면
    if (Notice_currentPage === pageNum) return;
    Notice_currentPage = pageNum;
    post_url = `http://34.64.161.55:8001/admin/posts?offset=${offset}&pageNum=${Notice_currentPage}`;
    fetchNotice();
    showNoticePagination();
}

function moveNextNoticePage() {
    Notice_currentPage++;
    post_url = `http://34.64.161.55:8001/admin/posts?offset=${offset}&pageNum=${Notice_currentPage}`;
    fetchNotice();
    showNoticePagination();
}

function movePreviousNoticePage() {
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if (Notice_currentPage <= 1) return;
    Notice_currentPage--;
    post_url = `http://34.64.161.55:8001/admin/posts?offset=${offset}&pageNum=${Notice_currentPage}`;
    fetchNotice();
    showNoticePagination();
}

//UserPagination 구현
function showUserPagination() {
    let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousUserPage()">Previous</a>
                </li>`;
    let pageGroup = Math.ceil(User_currentPage / 5);
    let last_num = pageGroup * 5;

    let first_num = last_num - 4 <= 0 ? 1 : last_num - 4;
    for (let i = first_num; i <= last_num; i++) {
        pageHTML += `<li class="page-item ${User_currentPage == i ? "active" : ""}"><a class="page-link" onclick="moveAdminUserPage(${i})">${i}</a></li>`;
    }

    pageHTML += `<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextUserPage()">Next</a>
                </li>`;

    document.querySelector("#user-pagination-bar").innerHTML = pageHTML;
}

function moveAdminUserPage(pageNum) {
    //이동할 페이지가 이미 그 페이지라면
    if (User_currentPage === pageNum) return;
    User_currentPage = pageNum;
    user_url = `http://34.64.161.55:8001/admin/users?offset=${offset}&pageNum=${User_currentPage}`;
    fetchUser();
    showUserPagination();
}

function moveNextUserPage() {
    User_currentPage++;
    user_url = `http://34.64.161.55:8001/admin/users?offset=${offset}&pageNum=${User_currentPage}`;
    fetchUser();
    showUserPagination();
}

function movePreviousUserPage() {
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if (User_currentPage <= 1) return;
    User_currentPage--;
    user_url = `http://34.64.161.55:8001/admin/users?offset=${offset}&pageNum=${User_currentPage}`;
    fetchUser();
    showUserPagination();
}

function moveUserAddPage() {
    window.location.href = "../html/user_add.html";
}

function moveNoticeAddPage() {
    window.location.href = "../html/notices_add.html";
}

function moveUserDetailPage(Id) {
    window.location.href = `../html/admin_user_detail.html?userId=${Id}`;
}

function moveNoticeDetailPage(postId) {
    window.location.href = `../html/admin_notice_detail.html?postId=${postId}`;
}

fetchNotice();
fetchUser();
showNoticePagination();
showUserPagination();
