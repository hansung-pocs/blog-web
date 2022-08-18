let url = "http://34.64.161.55:8001/posts";
const notice = document.querySelector("#notice table");
const thead = document.querySelector("#notice table thead");
const tbody = document.querySelector("#notice table tbody");

let category;
let notice_Id;
let userId;

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
            post_index = [] //카테고리 선택하고 재 fetch시 []부터 시작하도록
            for (let i = 0; i < data.data.posts.length; i++) {
                if (data.data.posts[i].category !== "notice") {
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
function fetchPost() {
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
                    if (data.data.posts[post_index[i]].category !== "notice") {
                        let category=CategoryEn2Kr(data.data.posts[post_index[i]].category);
                        tbody.innerHTML += `
        <tr>
        <td>${post_index.length - i}</td>
        <td  onclick="checktoGoDetailPage(${data.data.posts[post_index[i]].postId})"
            style="cursor:pointer">${data.data.posts[post_index[i]].title}</td>
        <td>${data.data.posts[post_index[i]].writerName}</td>
        <td>${data.data.posts[post_index[i]].createdAt}</td>
        <td>${data.data.posts[post_index[i]].updatedAt || ""}</td>
        <td>${category}</td>
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

function checktoGoDetailPage(Id){
    let user_type = localStorage.getItem("userType");
    if(user_type===null){
        alert("블로그 회원만 조회 가능합니다.");
    }
    else{
        window.location.href=`posts_detail.html?postId=${Id}`;
    }
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToPostList() {
    window.location.href = "../html/posts.html";
}

function movePostAddPage() {
    window.location.href = "../html/posts_add.html";
}

//api의 category En을 Kr로 변경
function CategoryEn2Kr(category){
    console.log(category);
    if(category==="knowhow"){
        return '노하우'
    }else if(category==="study"){
        return '스터디'
    }else if(category==="memory"){
        return '추억'
    }else if(category==="reference"){
        return '질문';
    }else
        return "?";
}
//카테고리 클릭시 해당하는 게시글 목록을 보여줌
function clickCategory(Category){
    console.log('클릭시 url 변경 예정:'+Category);
    //url = "http://34.64.161.55:8001/posts/category~";
    //fetchPost();
}

getArticleCount();
fetchPost();
showPagination();
