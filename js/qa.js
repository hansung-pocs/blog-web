const qa = document.querySelector("#qa table");
const thead = document.querySelector("#qa table thead");
const tbody = document.querySelector("#qa table tbody");
const userType = localStorage.getItem("userType");

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

//pagination에 필요한 변수
let post_index = [];
const offset = 15;
let currentPage = 1;
let cnt = 0;
let cntPageNum = 0;
let totalPage;

let url = `http://${process.env.DEV_API_KEY}:80/api/posts?id=qna&offset=${offset}&pageNum=${currentPage}`;

function getArticleCount() {
  fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      /*for (let i = 0; i < data.data.postsAll.length; i++) {
                if (data.data.postsAll[i].category === "QNA") {
                    cnt++;
                    post_index.push(i);
                }
            }*/
      //console.log(post_index);
    });
}

//공지사항 목록 조회
async function fetchQa() {
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
        totalPage = Math.ceil(data.data.categories[5].count / 15);
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
  await showPagination();
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

function movePage(pageNum) {
  //이동할 페이지가 이미 그 페이지라면
  if (currentPage === pageNum) return;
  currentPage = pageNum;
  url = `http://${process.env.DEV_API_KEY}:80/api/posts?id=qna&offset=${offset}&pageNum=${currentPage}`;
  fetchQa();
  showPagination();
}

function moveNextPage() {
  if (currentPage >= totalPage) return;
  currentPage++;
  url = `http://${process.env.DEV_API_KEY}:80/api/posts?id=qna&offset=${offset}&pageNum=${currentPage}`;
  fetchQa();
  showPagination();
}

function movePreviousPage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (currentPage <= 1) return;
  currentPage--;
  url = `http://${process.env.DEV_API_KEY}:80/api/posts?id=qna&offset=${offset}&pageNum=${currentPage}`;
  fetchQa();
  showPagination();
}

function goQaDetailPage(Id) {
  window.location.href = `qa_detail.html?postId=${Id}`;
}

function backToQaList() {
  window.location.href = "../html/qa.html";
}

// 모든 회원이 질문 작성 가능
function moveQaAddPage() {
  const checkUserType = localStorage.getItem("userType");
  console.log(checkUserType);
  window.location.href = "../html/qa_add.html";
}

getArticleCount();
fetchQa();
//showPagination();
