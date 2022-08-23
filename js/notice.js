const notice = document.querySelector("#notice table");
const thead = document.querySelector("#notice table thead");
const tbody = document.querySelector("#notice table tbody");

let category;
let notice_Id;
let userId;

//pagination에 필요한 변수
const offset=15;
let currentPage = 1;
const first = 0;
let cntPageNum=0;

let url = `http://34.64.161.55:8001/posts?id=notice&offset=${offset}&pageNum=${currentPage}`;
let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({'x-pocs-session-token' : sessiontoken});

//공지사항 목록 조회
function fetchNotice() {
    fetch(url, {headers : header})
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
                cntPageNum=currentPage*15-15;
                for (let i = 0; i < data.data.posts.length; i++) {
                    tbody.innerHTML += `
                <tr>
                <td>${cntPageNum+i+1}</td>
                <td onclick="window.location.href='notices_detail.html?postId=${data.data.posts[i].postId}'"
                    style="cursor:pointer">${data.data.posts[i].title}</td>
                <td>${data.data.posts[i].writerName}</td>
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
        pageHTML += `<li class="page-item ${currentPage == i ? "active" : ""}"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`;
    }

    pageHTML += `<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>
                </li>`;

    document.querySelector("#notice-pagination-bar").innerHTML = pageHTML;
}

async function movePage(pageNum) {
    //이동할 페이지가 이미 그 페이지라면
    if (currentPage === pageNum) return;
    currentPage = pageNum;
    url = `http://34.64.161.55:8001/posts?id=notice&offset=${offset}&pageNum=${currentPage}`;
    await fetchNotice();
    await showPagination();
}

async function moveNextPage() {
    currentPage++;
    url = `http://34.64.161.55:8001/posts?id=notice&offset=${offset}&pageNum=${currentPage}`;
    await fetchNotice();
    await showPagination();
}

async function movePreviousPage() {
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if (currentPage <= 1) return;
    currentPage--;
    url = `http://34.64.161.55:8001/posts?id=notice&offset=${offset}&pageNum=${currentPage}`;
    await fetchNotice();
    await showPagination();
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToList() {
    window.location.href = "../html/notices.html";
}

function moveNoticeAddPage() {
    window.location.href = "../html/notices_add.html";
}

fetchNotice();
showPagination();
