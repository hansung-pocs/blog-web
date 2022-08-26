const notice = document.querySelector("#notice table");
const thead = document.querySelector("#notice table thead");
const tbody = document.querySelector("#notice table tbody");

let category;
let userId;

//pagination에 필요한 변수
let post_index = [];
const offset=15;
let currentPage = 1;
let cnt = 0;
let cntPageNum=0;
let cateID='';

let url = `http://34.64.161.55:8001/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({'x-pocs-session-token' : sessiontoken});

function getArticleCount() {
    fetch(url, {headers : header})
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
            //totalPage = Math.ceil(cnt / 10);
        });
}

//공지사항 목록 조회
function fetchPost() {
    fetch(url, {headers : header})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(url);
            categoryPostCountCheck(data.data.categories);
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
        <td  onclick="checktoGoDetailPage(${data.data.posts[i].postId})"
            style="cursor:pointer">${data.data.posts[i].title}</td>
        <td>${data.data.posts[i].writerName || "익명"}</td>
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

    document.querySelector("#post-pagination-bar").innerHTML = pageHTML;
}

async function movePage(pageNum) {
    //이동할 페이지가 이미 그 페이지라면
    if (currentPage === pageNum) return;
    currentPage = pageNum;
    url = `http://34.64.161.55:8001/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
    await fetchPost();
    await showPagination();
}

async function moveNextPage() {
    currentPage++;
    url = `http://34.64.161.55:8001/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
    await fetchPost();
    await showPagination();
}

async function movePreviousPage() {
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if (currentPage <= 1) return;
    currentPage--;
    url = `http://34.64.161.55:8001/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
    await fetchPost();
    await showPagination();
}

function checktoGoDetailPage(Id){
    window.location.href=`posts_detail.html?postId=${Id}`;
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
    //console.log(category);
    if(category==="knowhow"){
        return '노하우'
    }else if(category==="study"){
        return '스터디'
    }else if(category==="notice"){
        return '공지'
    }else if(category==="memory"){
        return '추억'
    }else if(category==="reference"){
        return '추천';
    }else if(category==="QNA"){
        return 'Q/A';
    }else
        return "?";
}
//카테고리 클릭시 해당하는 게시글 목록을 보여줌
function clickCategory(Category){
    //비회원은 스터디게시글만 보여주게 함
    let userType = localStorage.getItem("userType");
    if(userType==="anonymous" && Category!=='study'){
        alert("비회원은 스터디 글만 볼수 있습니다.")
    }
    else{
        cateID=`id=${Category}`;
        currentPage=1;
        url = `http://34.64.161.55:8001/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
        getArticleCount();
        fetchPost();
        showPagination();
    }
}
//카테고리 별 게시글 수 표시:
// 카테고리에 변경 있을시 인덱스를 직접 수정해주어야함(카테고리명으로 인덱싱하는방법?)
function categoryPostCountCheck(Cdata){
    //stduy:0 memory:2 reference:3 knowhow:4
    const c_study = document.querySelector(".category #study_count");
    const c_memory = document.querySelector(".category #memory_count");
    const c_reference = document.querySelector(".category #reference_count");
    const c_knowhow = document.querySelector(".category #knowhow_count");
    c_study.innerHTML=`(${Cdata[0].count})`;
    c_memory.innerHTML=`(${Cdata[2].count})`;
    c_reference.innerHTML=`(${Cdata[3].count})`;
    c_knowhow.innerHTML=`(${Cdata[4].count})`;
}

function ShowPostsByCategory(){
    const Url = window.location.href;
    const arr = Url.split("?category=");
    let get_category_from_url
    if(arr.length<2)
        get_category_from_url="undefined"
    else{
        get_category_from_url = arr[1];
    }

    if(get_category_from_url==="undefined"){
        cateID="";
        url = `http://34.64.161.55:8001/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
        fetchPost();
        showPagination();
    }
    else{
        cateID=`id=${get_category_from_url}`;
        url = `http://34.64.161.55:8001/posts?${cateID}&offset=${offset}&pageNum=${currentPage}`;
        fetchPost();
        showPagination();
    }
}

function checktoShowPostAddButton(){
    const post_add_button = document.getElementById("post-add-button");
    let userType= localStorage.getItem("userType");
    if(userType==="anonymous")
        post_add_button.classList.add("hidden");
}

ShowPostsByCategory();
checktoShowPostAddButton();