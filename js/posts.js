import { makeUrl } from "./common/util";

const thead = document.querySelector("#notice table thead");
const tbody = document.querySelector("#notice table tbody");

//pagination에 필요한 변수
const offset = 15;
let currentPage = 1;
let totalPage;
let cateID = "";

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

const userType = localStorage.getItem("userType");

window.backToPostList = backToPostList;
window.movePostAddPage = movePostAddPage;
window.clickCategory = clickCategory;
window.checktoGoDetailPage = checktoGoDetailPage;
window.movePage = movePage;
window.movePreviousPage = movePreviousPage;
window.moveNextPage = moveNextPage;

//공지사항 목록 조회
async function fetchPost(url) {
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

async function render(category, cateId, offset, currentPage) {
  await getCategoriesCount(category);
  await fetchPost(
    makeUrl(`api/posts?${cateId}&offset=${offset}&pageNum=${currentPage}`)
  );
  showPagination();
}

async function movePage(pageNum) {
  if (pageNum > totalPage) return;
  //이동할 페이지가 이미 그 페이지라면
  if (currentPage === pageNum) return;
  currentPage = pageNum;
  let Category = cateID.split("id=");

  render(Category[1], cateID, offset, currentPage);
}

async function moveNextPage() {
  if (currentPage >= totalPage) return;
  currentPage++;
  let Category = cateID.split("id=");

  render(Category[1], cateID, offset, currentPage);
}

async function movePreviousPage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (currentPage <= 1) return;
  currentPage--;
  let Category = cateID.split("id=");

  render(Category[1], cateID, offset, currentPage);
}

function checktoGoDetailPage(Id) {
  window.location.href = `posts_detail.html?postId=${Id}`;
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToPostList() {
  window.location.href = "./posts.html";
}

function movePostAddPage() {
  window.location.href = "./posts_add.html";
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

    render(Category, cateID, offset, currentPage);
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
  await fetch(
    makeUrl(`api/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`),
    { headers: header }
  )
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
      // else if (category === "qna")
      //   totalPage = Math.ceil(data.data.categories[5].count / 15);
      // +data.data.categories[5].count
      else
        totalPage = Math.ceil(
          (data.data.categories[0].count +
            data.data.categories[1].count +
            data.data.categories[2].count +
            data.data.categories[3].count +
            data.data.categories[4].count) /
            15
        );
    })
    .catch((e) => console.log(e));
}
//카테고리 별 게시글 수 표시:
// 카테고리에 변경 있을시 인덱스를 직접 수정해주어야함(카테고리명으로 인덱싱하는방법?)
function categoryPostCountCheck(Cdata) {
  //stduy:0 memory:2 reference:3 knowhow:4
  const study = document.querySelector(".category #study_count");
  const memory = document.querySelector(".category #memory_count");
  const reference = document.querySelector(".category #reference_count");
  const knowhow = document.querySelector(".category #knowhow_count");
  Cdata.map((data) => {
    switch (data.category) {
      case "스터디":
        study.innerHTML = `(${data.count})`;
        break;
      case "추억":
        memory.innerHTML = `(${data.count})`;
        break;
      case "노하우":
        knowhow.innerHTML = `(${data.count})`;
        break;
      case "추천":
        reference.innerHTML = `(${data.count})`;
        break;
    }
  });
  // c_study.innerHTML = `(${Cdata[0].count})`;
  // c_memory.innerHTML = `(${Cdata[2].count})`;
  // c_reference.innerHTML = `(${Cdata[3].count})`;
  // c_knowhow.innerHTML = `(${Cdata[4].count})`;
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
    render("", cateID, offset, currentPage);
  } else {
    cateID = `id=${get_category_from_url}`;
    render(get_category_from_url, cateID, offset, currentPage);
  }
}

function checktoShowPostAddButton() {
  const post_add_button = document.getElementById("post-add-button");
  let userType = localStorage.getItem("userType");
  if (userType === "anonymous") post_add_button.classList.add("hidden");
}

ShowPostsByCategory();
checktoShowPostAddButton();
