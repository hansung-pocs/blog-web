const url = "http://34.64.161.55:8001/posts";

const notice = document.querySelector("#notice table");
const thead = document.querySelector("#notice table thead");
const tbody = document.querySelector("#notice table tbody");
//공지사항 목록, 공지사항 세부목록  container 가져오기
const notice_list = document.querySelector(".notice-list");
const notice_detail = document.querySelector(".notice-detail");

let category;
let notice_Id;
let userId;

//pagination에 필요한 변수
let notice_index = [];
let currentPage = 1;
let totalPage;
let first = 0;
let last;
let cnt = 0;

function getArticleCount() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.data.posts.length; i++) {
                if (data.data.posts[i].category === "notice") {
                    cnt++;
                    notice_index.push(i);
                }
            }
            console.log(notice_index);
            //마지막페이지 계산
            totalPage = Math.ceil(cnt / 10);
        });
}

//공지사항 목록 조회
function fetchNotice() {
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
                    if (data.data.posts[notice_index[i]].category === "notice") {
                        tbody.innerHTML += `
                <tr>
                <td>${notice_index.length - i}</td>
                <td onclick="window.location.href='notices_detail.html?postId=${data.data.posts[notice_index[i]].postId}'"
                    style="cursor:pointer">${data.data.posts[notice_index[i]].title}</td>
                <td>${data.data.posts[notice_index[i]].writerName}</td>
                <td>${data.data.posts[notice_index[i]].createdAt}</td>
                <td>${data.data.posts[notice_index[i]].updatedAt || ""}</td>
                <td>${data.data.posts[notice_index[i]].category}</td>
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

    document.querySelector("#notice-pagination-bar").innerHTML = pageHTML;
}

function movePage(pageNum) {
    if (pageNum > totalPage) return;
    //이동할 페이지가 이미 그 페이지라면
    if (currentPage === pageNum) return;
    currentPage = pageNum;
    fetchNotice();
    showPagination();
}

function moveNextPage() {
    //넘길페이지가 전체 페이지보다 클경우 그냥 return
    if (currentPage >= totalPage) return;
    currentPage++;
    fetchNotice();
    showPagination();
}

function movePreviousPage() {
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if (currentPage <= 1) return;
    currentPage--;
    fetchNotice();
    showPagination();
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToList() {
    window.location.href = "../html/notices.html";
}

function moveNoticeAddPage() {
    window.location.href = "../html/notices_add.html";
}

getArticleCount();
fetchNotice();
showPagination();
