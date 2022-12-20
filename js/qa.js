import { makeUrl } from "./common/util";

const thead = document.querySelector("#qa table thead");
const tbody = document.querySelector("#qa table tbody");

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

//pagination에 필요한 변수
const offset = 15;
let currentPage = 1;
let totalPage = 0;

window.moveQaAddPage = moveQaAddPage;
window.movePage = movePage;
window.moveNextPage = moveNextPage;
window.movePreviousPage = movePreviousPage;
window.goQaDetailPage = goQaDetailPage;

function getArticleCount() {
  fetch(makeUrl(`api/posts?id=qna&offset=${offset}&pageNum=${currentPage}`), {
    headers: header,
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.categories.map((data) => {
        totalPage += data.count;
        console.log(totalPage);
      });
      totalPage = Math.ceil(totalPage / 15);
      console.log(totalPage);
    });
}

//공지사항 목록 조회
async function fetchQa(url) {
  await fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      thead.innerHTML = `<tr class="post-list">
      <th>번호</th>
      <th>제목</th>
      <th>작성자</th>
      <th>작성일</th>
      <th>카테고리</th>
  </tr>`;
      tbody.innerHTML = "";
      if (data.data === null) {
        tbody.innerHTML =
          "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
      } else {
        for (let i = 0; i < data.data.posts.length; i++) {
          tbody.innerHTML += `
      <tr class="post-list">
      <td>${data.data.posts[i].postId}</td>
      <td onclick="goQaDetailPage(${data.data.posts[i].postId})"
          >${data.data.posts[i].title}</td>
      <td>익명</td>
      <td>${data.data.posts[i].createdAt}</td>
      <td>${data.data.posts[i].category}</td>
      </tr>
      `;
        }
      }
    });
  showPagination();
}

//pgaination 구현
function showPagination() {
  let pageHTML = `<ul class="pagination justify-content-center">
              <li class="page-item">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>
              </li>`;

  let pageGroup = Math.ceil(currentPage / 5);
  let last = pageGroup * 5;
  if (last > totalPage) {
    // 마지막 그룹이 5개 이하이면
    last = totalPage;
  }
  let first_num = last - 4 <= 0 ? 1 : last - 4;
  for (let i = first_num; i <= last; i++) {
    pageHTML += `<li class="page-item ${
      currentPage == i ? "active" : ""
    }"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`;
  }

  pageHTML += `<li class="page-item">
                  <a class="page-link" href="#" onclick="moveNextPage()">Next</a>
              </li>`;

  document.querySelector("#post-pagination-bar").innerHTML = pageHTML;
}

function render() {
  fetchQa(makeUrl(`api/posts?id=qna&offset=${offset}&pageNum=${currentPage}`));
  showPagination();
}

function movePage(pageNum) {
  //이동할 페이지가 이미 그 페이지라면
  if (currentPage === pageNum) return;
  currentPage = pageNum;
  render();
}

function moveNextPage() {
  if (currentPage >= totalPage) return;
  currentPage++;
  render();
}

function movePreviousPage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (currentPage <= 1) return;
  currentPage--;
  render();
}

function goQaDetailPage(Id) {
  window.location.href = `qa_detail.html?postId=${Id}`;
}

function backToQaList() {
  window.location.href = "./qa.html";
}

// 모든 회원이 질문 작성 가능
function moveQaAddPage() {
  const checkUserType = localStorage.getItem("userType");
  console.log(checkUserType);
  window.location.href = "./qa_add.html";
}

getArticleCount();
fetchQa(makeUrl(`api/posts?id=qna&offset=${offset}&pageNum=${currentPage}`));
