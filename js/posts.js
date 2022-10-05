const notice = document.querySelector("#notice table");
const thead = document.querySelector("#notice table thead");
const tbody = document.querySelector("#notice table tbody");

let category;
let userId;

//pagination에 필요한 변수
const offset = 15;
let currentPage = 1;
let cntPageNum = 0;
let totalPage;
let cateID = "";

let url = `http://34.64.161.55:80/api/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

const userType = localStorage.getItem("userType");

//공지사항 목록 조회
function fetchPost() {
  fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(url);
      categoryPostCountCheck(data.data.categories);
      drawCategoryColor(cateID);
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
          if (data.data.posts[i].onlyMember && userType === "anonymous") {
            tbody.innerHTML += `<tr class="post-list">
                        <td>${data.data.posts[i].postId}</td>
                        <td>비공개</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>`;
          } else {
            tbody.innerHTML += `
                        <tr class="post-list">
                        <td>${data.data.posts[i].postId}</td>
                        <td onclick="checktoGoDetailPage(${
                          data.data.posts[i].postId
                        })"
                            >${data.data.posts[i].title}</td>
                        <td >${data.data.posts[i].writerName || "익명"}</td>
                        <td>${data.data.posts[i].createdAt}</td>
                        <td>${data.data.posts[i].category}</td>
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

async function movePage(pageNum) {
  if (pageNum > totalPage) return;
  //이동할 페이지가 이미 그 페이지라면
  if (currentPage === pageNum) return;
  currentPage = pageNum;
  url = `http://34.64.161.55:80/api/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
  let Category = cateID.split("id=");
  await getCategoriesCount(Category[1]);
  await fetchPost();
  await showPagination();
}

async function moveNextPage() {
  if (currentPage >= totalPage) return;
  currentPage++;
  url = `http://34.64.161.55:80/api/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
  let Category = cateID.split("id=");
  await getCategoriesCount(Category[1]);
  await fetchPost();
  await showPagination();
}

async function movePreviousPage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (currentPage <= 1) return;
  currentPage--;
  url = `http://34.64.161.55:80/api/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
  let Category = cateID.split("id=");
  await getCategoriesCount(Category[1]);
  await fetchPost();
  await showPagination();
}

function checktoGoDetailPage(Id) {
  window.location.href = `posts_detail.html?postId=${Id}`;
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToPostList() {
  window.location.href = "../html/posts.html";
}

function movePostAddPage() {
  window.location.href = "../html/posts_add.html";
}

//api의 category En을 Kr로 변경
function CategoryEn2Kr(category) {
  //console.log(category);
  if (category === "knowhow") {
    return "노하우";
  } else if (category === "study") {
    return "스터디";
  } else if (category === "notice") {
    return "공지";
  } else if (category === "memory") {
    return "추억";
  } else if (category === "reference") {
    return "추천";
  } else if (category === "QNA") {
    return "Q/A";
  } else return "?";
}

//카테고리 클릭시 해당하는 게시글 목록을 보여줌
async function clickCategory(Category) {
  //비회원은 스터디게시글만 보여주게 함
  let userType = localStorage.getItem("userType");
  if (userType === "anonymous" && Category !== "study") {
    alert("비회원은 스터디 글만 볼수 있습니다.");
  } else {
    cateID = `id=${Category}`;
    currentPage = 1;
    url = `http://34.64.161.55:80/api/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
    await getCategoriesCount(Category);
    await fetchPost();
    await showPagination();
  }
}

function drawCategoryColor(CateId) {
  if (CateId == null || CateId == "") return;
  let Category = CateId.split("=")[1];
  const categories = document.querySelectorAll(`.category .list-group-item`);
  const category = document.querySelector(`.category #${Category}`);
  for (let n = 0; n < categories.length; n++)
    categories[n].style.backgroundColor = "white";
  category.style.backgroundColor = "lightblue";
}

async function getCategoriesCount(category) {
  await fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      if (category === "study")
        totalPage = Math.ceil(data.data.categories[0].count / 15);
      else if (category === "memory")
        totalPage = Math.ceil(data.data.categories[2].count / 15);
      else if (category === "reference")
        totalPage = Math.ceil(data.data.categories[3].count / 15);
      else if (category === "knowhow")
        totalPage = Math.ceil(data.data.categories[4].count / 15);
      else if (category === "qna")
        totalPage = Math.ceil(data.data.categories[5].count / 15);
      else
        totalPage = Math.ceil(
          (data.data.categories[0].count +
            data.data.categories[1].count +
            data.data.categories[2].count +
            data.data.categories[3].count +
            data.data.categories[4].count +
            data.data.categories[5].count) /
            15
        );
    });
  console.log(totalPage);
}
//카테고리 별 게시글 수 표시:
// 카테고리에 변경 있을시 인덱스를 직접 수정해주어야함(카테고리명으로 인덱싱하는방법?)
function categoryPostCountCheck(Cdata) {
  //stduy:0 memory:2 reference:3 knowhow:4
  const c_study = document.querySelector(".category #study_count");
  const c_memory = document.querySelector(".category #memory_count");
  const c_reference = document.querySelector(".category #reference_count");
  const c_knowhow = document.querySelector(".category #knowhow_count");
  c_study.innerHTML = `(${Cdata[0].count})`;
  c_memory.innerHTML = `(${Cdata[2].count})`;
  c_reference.innerHTML = `(${Cdata[3].count})`;
  c_knowhow.innerHTML = `(${Cdata[4].count})`;
}

async function ShowPostsByCategory() {
  const Url = window.location.href;
  const arr = Url.split("?category=");
  let get_category_from_url;
  if (arr.length < 2) get_category_from_url = "undefined";
  else {
    get_category_from_url = arr[1];
  }

  if (
    get_category_from_url === "undefined" ||
    get_category_from_url === "undefined#"
  ) {
    cateID = "";
    url = `http://34.64.161.55:80/api/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
    await getCategoriesCount("");
    await fetchPost();
    await showPagination();
  } else {
    cateID = `id=${get_category_from_url}`;
    url = `http://34.64.161.55:80/api/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
    await getCategoriesCount(get_category_from_url);
    await fetchPost();
    await showPagination();
  }
}

function checktoShowPostAddButton() {
  const post_add_button = document.getElementById("post-add-button");
  let userType = localStorage.getItem("userType");
  if (userType === "anonymous") post_add_button.classList.add("hidden");
}

ShowPostsByCategory();
checktoShowPostAddButton();
