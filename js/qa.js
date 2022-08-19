const url = "http://34.64.161.55:8001/posts";
const qa = document.querySelector("#qa table");
const thead = document.querySelector("#qa table thead");
const tbody = document.querySelector("#qa table tbody");
const userType = localStorage.getItem("userType");

//pagination에 필요한 변수
let post_index = [];
let currentPage = 1;
let totalPage;
let first = 0;
let last = 1;
let cnt = 0;

function getArticleCount() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.data.postsAll.length; i++) {
                if (data.data.postsAll[i].category === "QNA") {
                    cnt++;
                    post_index.push(i);
                }
            }
            console.log(post_index);
            //마지막페이지 계산
            totalPage = Math.ceil(cnt / 10);
        });
}

//공지사항 목록 조회
function fetchQa() {
  fetch(url)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
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
              tbody.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
          } else {
              //페이지에 10개만 보여주기 위해 변수 설정
              last = 10 * currentPage;
              first = last - 10;

              for (let i = first; i < last; i++) {
                  if (data.data.postsAll[post_index[i]].category === "QNA") {
                      tbody.innerHTML += `
      <tr>
      <td>${post_index.length - i}</td>
      <td onclick="goQaDetailPage(${data.data.postsAll[post_index[i]].postId})"
          style="cursor:pointer">${data.data.postsAll[post_index[i]].title}</td>
      <td>비회원</td>
      <td>${data.data.postsAll[post_index[i]].createdAt}</td>
      <td>${data.data.postsAll[post_index[i]].updatedAt || ""}</td>
      <td>${data.data.postsAll[post_index[i]].category}</td>
      </tr>
      `;
                  }
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
  if (last_num > totalPage) {
      last = totalPage;
  }

  let first_num = last_num - 4 <= 0 ? 1 : last_num - 4;
  for (let i = first_num; i <= last_num; i++) {
      pageHTML += `<li class="page-item ${currentPage == i ? "active" : ""}"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`;
  }

  pageHTML += `<li class="page-item">
                  <a class="page-link" href="#" onclick="moveNextPage()">Next</a>
              </li>`;

  document.querySelector("#post-pagination-bar").innerHTML = pageHTML;
}

function movePage(pageNum) {
  if (pageNum > totalPage) return;
  //이동할 페이지가 이미 그 페이지라면
  if (currentPage === pageNum) return;
  currentPage = pageNum;
  fetchPost();
  showPagination();
}

function moveNextPage() {
  //넘길페이지가 전체 페이지보다 클경우 그냥 return
  if (currentPage >= totalPage) return;
  currentPage++;
  fetchPost();
  showPagination();
}

function movePreviousPage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (currentPage <= 1) return;
  currentPage--;
  fetchPost();
  showPagination();
}

function goQaDetailPage(Id){
  window.location.href=`qa_detail.html?postId=${Id}`;
}

function backToQaList() {
  window.location.href = "../html/qa.html";
}

// 비회원만 질문 작성 가능
function moveQaAddPage() {
  const checkUserType = localStorage.getItem("userType");
  if(checkUserType === "비회원") {
    window.location.href = "../html/qa_add.html";
  } else {
    alert("비회원만 작성할 수 있습니다");
  }
}

getArticleCount();
fetchQa();
showPagination();