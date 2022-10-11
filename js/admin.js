let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });
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
let Notice_totalPage;

//유저목록 pagination에 필요한 변수
let User_cntPageNum = 0;
let User_currentPage = 1;
let User_totalPage;

const offset = 15;

let post_url = `http://${process.env.DEV_API_KEY}:80/api/admin/posts?offset=${offset}&pageNum=${Notice_currentPage}`;
let user_url = `http://${process.env.DEV_API_KEY}:80/api/admin/users?offset=${offset}&pageNum=${User_currentPage}`;

async function fetchNotice() {
  await fetch(post_url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      post_data = data.data.posts;
      notice_thead.innerHTML = `
                <tr class="post-list">
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>카테고리</th>
            </tr>`;
      notice_tbody.innerHTML = "";

      if (data.data === null) {
        notice_tbody.innerHTML =
          "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
      } else {
        Notice_totalPage = Math.ceil(
          (data.data.categories[0].count +
            data.data.categories[1].count +
            data.data.categories[2].count +
            data.data.categories[3].count +
            data.data.categories[4].count +
            data.data.categories[5].count) /
            15
        );
        for (let i = 0; i < data.data.posts.length; i++) {
          notice_tbody.innerHTML += `
                <tr class="post-list">
                <td>${data.data.posts[i].postId}</td>
                <td onclick="moveNoticeDetailPage(${post_data[i].postId})"
                    >${post_data[i].title}</td>
                <td>${post_data[i].writerName || "익명"}</td>
                <td>${post_data[i].createdAt}</td>
                <td>${post_data[i].category}</td>
                </tr>
                `;
        }
      }
    });
  await showNoticePagination();
}

async function fetchUser() {
  await fetch(user_url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      user_thead.innerHTML = `
                <tr class="user-list">
                <th>번호</th>
                <th>성명</th>
                <th>학번</th>
                <th>e-mail</th>
                </tr>`;
      user_tbody.innerHTML = "";
      if (data.data.users === null) {
        user_tbody.innerHTML =
          "<tr><td>유저를</td><td>추가</td><td>하세요.</td><td></td></tr>";
      } else {
        User_totalPage = Math.ceil(data.data.countAllUsers / 15);
        for (let i = 0; i < data.data.users.length; i++) {
          if (data.data.users[i].type === "anonymous") {
            user_tbody.innerHTML += `
                <tr class="user-list">
                    <td>${data.data.users[i].userId}</td>
                    <td onclick="moveUserDetailPage(${
                      data.data.users[i].userId
                    })"
                        style="cursor:pointer">익명${
                          data.data.users[i].userId
                        }</td>
                    <td>${""}</td>
                    <td>${""}</td>
                </tr>
                `;
          } else {
            user_tbody.innerHTML += `
                <tr class="user-list">
                    <td>${data.data.users[i].userId}</td>
                    <td onclick="moveUserDetailPage(${
                      data.data.users[i].userId
                    })"
                    style="cursor:pointer">${
                      data.data.users[i].defaultInfo.name ||
                      `익명${data.data.users[i].userId}`
                    }</td>
                    <td>${data.data.users[i].defaultInfo.studentId || " "}</td>
                    <td>${data.data.users[i].defaultInfo.email || " "}</td>
                </tr>
                `;
          }
        }
      }
    });
  await showUserPagination();
}

//Noticepgaination 구현
function showNoticePagination() {
  let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousNoticePage()">Previous</a>
                </li>`;
  let pageGroup = Math.ceil(Notice_currentPage / 5);
  let last = pageGroup * 5;
  if (last > Notice_totalPage) {
    // 마지막 그룹이 5개 이하이면
    last = Notice_totalPage;
  }
  let first_num = last - 4 <= 0 ? 1 : last - 4;
  for (let i = first_num; i <= last; i++) {
    pageHTML += `<li class="page-item ${
      Notice_currentPage == i ? "active" : ""
    }"><a class="page-link" onclick="moveAdminNoticePage(${i})">${i}</a></li>`;
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
  post_url = `http://${process.env.DEV_API_KEY}:80/api/admin/posts?offset=${offset}&pageNum=${Notice_currentPage}`;
  fetchNotice();
  showNoticePagination();
}

function moveNextNoticePage() {
  if (Notice_currentPage >= Notice_totalPage) return;
  Notice_currentPage++;
  post_url = `http://${process.env.DEV_API_KEY}:80/api/admin/posts?offset=${offset}&pageNum=${Notice_currentPage}`;
  fetchNotice();
  showNoticePagination();
}

function movePreviousNoticePage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (Notice_currentPage <= 1) return;
  Notice_currentPage--;
  post_url = `http://${process.env.DEV_API_KEY}:80/api/admin/posts?offset=${offset}&pageNum=${Notice_currentPage}`;
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
  let last = pageGroup * 5;
  if (last > User_totalPage) {
    // 마지막 그룹이 5개 이하이면
    last = User_totalPage;
  }
  let first_num = last - 4 <= 0 ? 1 : last - 4;
  for (let i = first_num; i <= last; i++) {
    pageHTML += `<li class="page-item ${
      User_currentPage == i ? "active" : ""
    }"><a class="page-link" onclick="moveAdminUserPage(${i})">${i}</a></li>`;
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
  user_url = `http://${process.env.DEV_API_KEY}:80/api/admin/users?offset=${offset}&pageNum=${User_currentPage}`;
  fetchUser();
  showUserPagination();
}

function moveNextUserPage() {
  if (User_currentPage >= User_totalPage) return;
  User_currentPage++;
  user_url = `http://${process.env.DEV_API_KEY}:80/api/admin/users?offset=${offset}&pageNum=${User_currentPage}`;
  fetchUser();
  showUserPagination();
}

function movePreviousUserPage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (User_currentPage <= 1) return;
  User_currentPage--;
  user_url = `http://${process.env.DEV_API_KEY}:80/api/admin/users?offset=${offset}&pageNum=${User_currentPage}`;
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
// showNoticePagination();
// showUserPagination();
