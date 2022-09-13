const Url = window.location.href;
const arr = Url.split("?userId=");
const id = arr[1];
const offset = 15;

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

const notice = document.querySelector("#notice table");
const thead = document.querySelector("#notice table thead");
const tbody = document.querySelector("#notice table tbody");

const title = document.querySelector("#user-post-title");

//pagination에 필요한 변수
let cnt;
let currentPage = 1;
let cntPageNum = 0;

let user_posts_url = `http://34.64.161.55:80/api/admin/posts/${id}?offset=${offset}&pageNum=${currentPage}`;

//제목에 이름을 표시하기 위한 명령어
fetch("http://34.64.161.55:80/api/users/" + id, { headers: header })
  .then((response) => response.json())
  .then((userdata) => {
    console.log(userdata);
    title.innerHTML = `${
      userdata.data.defaultInfo.name || `비회원${id}`
    }님의 게시글`;
  });

//공지사항 목록 조회
function fetchNotice() {
  fetch(user_posts_url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === 404) {
        alert("데이터가 없습니다!");
        currentPage = 1;
        showPagination();
        return;
      }
      //데이터 개수
      cnt = data.data.posts.length;

      thead.innerHTML = `<tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>수정일</th>
        <th>카테고리</th>
    </tr>`;
      tbody.innerHTML = "";
      if (data.data === null) {
        tbody.innerHTML =
          "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
      } else {
        cntPageNum = 15 * currentPage - 15;
        for (let i = 0; i < cnt; i++) {
          tbody.innerHTML += `
            <tr onclick="movePostDetailPage(${data.data.posts[i].postId})">
            <td>${cntPageNum + i + 1}</td>
            <td>${data.data.posts[i].title}</td>
            <td>${data.data.posts[i].writerName || ""}</td>
            <td>${data.data.posts[i].createdAt}</td>
            <td>${data.data.posts[i].updatedAt || ""}</td>
            <td>${data.data.posts[i].category}</td>
            </tr>
            `;
        }
      }
    });
}

//pgaination 구현
function showPagination() {
  let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>
                </li>`;
  let pageGroup = Math.ceil(currentPage / 5);
  let last_num = pageGroup * 5;

  let first_num = last_num - 4 <= 0 ? 1 : last_num - 4;
  for (let i = first_num; i <= last_num; i++) {
    pageHTML += `<li class="page-item ${
      currentPage == i ? "active" : ""
    }"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`;
  }

  pageHTML += `<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>
                </li>`;

  document.querySelector("#pagination-bar").innerHTML = pageHTML;
}

function movePage(pageNum) {
  //이동할 페이지가 이미 그 페이지라면
  if (currentPage === pageNum) return;
  currentPage = pageNum;
  user_posts_url = `http://34.64.161.55:80/api/admin/posts/${id}?offset=${offset}&pageNum=${currentPage}`;
  fetchNotice();
  showPagination();
}

function moveNextPage() {
  currentPage++;
  user_posts_url = `http://34.64.161.55:80/api/admin/posts/${id}?offset=${offset}&pageNum=${currentPage}`;
  fetchNotice();
  showPagination();
}

function movePreviousPage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (currentPage <= 1) return;
  currentPage--;
  user_posts_url = `http://34.64.161.55:80/api/admin/posts/${id}?offset=${offset}&pageNum=${currentPage}`;
  fetchNotice();
  showPagination();
}

function movePostDetailPage(postId) {
  window.location.href = `../html/posts_detail.html?postId=${postId}`;
}

fetchNotice();
showPagination();
