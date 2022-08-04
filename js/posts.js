const url = "http://34.64.161.55:8001/posts";
const notice = document.querySelector("#notice table");
const thead = document.querySelector("#notice table thead");
const tbody = document.querySelector("#notice table tbody");

//공지사항 목록, 공지사항 세부목록  container 가져오기
const notice_list = document.querySelector(".notice-list");
const notice_detail = document.querySelector(".notice-detail");

//공지사항 제목, 공지사항 내용 가져오기
const notice_title = document.querySelector("#title");
const notice_content = document.querySelector("#content");

//공지사항 수정때 쓰일 변수들
let present_page_title;
let present_page_content;
let category;
let notice_Id;
let userId;

//pagination에 필요한 변수
let cnt=0;
let currentPage=1;
let totalPage;
let first=0;
let last=1;

//공지사항 목록 조회
function fetchPost(){
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            cnt=0;
            thead.innerHTML = `<tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>수정일</th>
        <th>카테고리</th>
    </tr>`;
            tbody.innerHTML="";
            if (data.data === null) {
                tbody.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
            } else {

                data.data.posts.forEach((item)=>{
                    if(item.category!=="notice"){
                        //데이터 개수
                        cnt++;
                    }
                })
                //마지막페이지 계산
                totalPage = Math.ceil(cnt/10);

                //페이지에 10개만 보여주기 위해 변수 설정
                last = 10*currentPage;
                first = last-10;

                for(let i=first;i<data.data.posts.length;i++){
                    if(data.data.posts[i].category!=="notice"){

                        tbody.innerHTML +=
                            `
        <tr onclick="GotoPostDetailPage(${data.data.posts[i].postId})">
        <td>${cnt--}</td>
        <td>${data.data.posts[i].title}</td>
        <td>${data.data.posts[i].writerName}</td>
        <td>${data.data.posts[i].createdAt}</td>
        <td>${data.data.posts[i].updatedAt}</td>
        <td>${data.data.posts[i].category}</td>
        </tr>
        `;
                    }
                };
            }
        })
}

//공지사항 상세페이지 구현
function GotoPostDetailPage(Id) {
    notice_Id=Id;
    notice_list.classList.add("hidden");
    notice_detail.classList.remove("hidden");
    const notice_title_first = document.querySelector(".notice-title-first");
    const notice_title_second = document.querySelector(".notice-title-second");
    const notice_detail_content = document.querySelector(".notice-detail-content");
    const d_url = `http://34.64.161.55:8001/posts/${Id}`;

    fetch(d_url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.title);
            notice_title_first.innerHTML = `<h3>${data.data.title}</h3>`;
            notice_title_second.innerHTML = `<div>${data.data.category}  |</div>
            <div> ${data.data.createdAt}  | </div>
            <div> ${data.data.updatedAt}  | </div>
            <div> ${data.data.writer.userName} </div>
            `;
            notice_detail_content.innerHTML = `<div>${data.data.content}</div>`;

            present_page_title = data.data.title;
            present_page_content = data.data.content;
            category = data.data.category;
        })
}

//pgaination 구현
function showPagination(){
    let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>
                </li>`;
    let pageGroup = Math.ceil(currentPage/5);
    let last_num = pageGroup*5;
    if(last_num>totalPage){
        last=totalPage;
    }

    let first_num = last_num-4 <=0 ? 1 : last_num-4;
    for(let i=first_num; i<=last_num;i++){
        pageHTML+=`<li class="page-item ${currentPage==i?"active":""}"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`;
    }

    pageHTML +=`<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>
                </li>`;

    document.querySelector("#post-pagination-bar").innerHTML = pageHTML;
}

function movePage(pageNum){
    if(pageNum>totalPage)
        return;
    //이동할 페이지가 이미 그 페이지라면
    if(currentPage===pageNum)
        return;
    currentPage =pageNum;
    fetchPost();
    showPagination();
}

function moveNextPage(){
    //넘길페이지가 전체 페이지보다 클경우 그냥 return
    if(currentPage>=totalPage)
        return;
    currentPage++;
    fetchPost();
    showPagination();
}

function movePreviousPage(){
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if(currentPage<=1)
        return;
    currentPage--;
    fetchPost();
    showPagination();
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToPostList() {
    window.location.href = '../html/posts.html';
}

function movePostAddPage(){
    window.location.href = '../html/posts_add.html';
}

//공지사항 수정 페이지
function postEditPage(){
    const notice_edit = document.querySelector(".notice-edit");
    notice_edit.classList.remove("hidden");
    notice_detail.classList.add("hidden");

    notice_title.value = present_page_title;
    notice_content.value = present_page_content;

}

//공지사항 수정하기 버튼 눌렀을때 호출되는 함수
async function postEdit(){
    const sendData={
        title : notice_title.value,
        content: notice_content.value,
        userId: 1,
        category : category
    };

    const options = {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(sendData)
    };

    const response = await fetch(`http://34.64.161.55:8001/posts/${notice_Id}`, options);
    const result = await response.json();
    if(result.status ===302){
        backToPostList();
    }
    else{
        console.log(result.message);
    }
}

//공지사항 삭제하기
async function DeletePost(){
    const sendData={
        userId : 1,
    };

    const options = {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(sendData)
    };

    const response = await fetch(`http://34.64.161.55:8001/posts/${notice_Id}/delete`, options);
    const result = await response.json();
    console.log(result.status);

    //삭제 성공(result.status===201)하면
    if(result.status ===201){
        backToPostList();
    }
    else{
        console.log(result.message);
    }
}

fetchPost();
showPagination();

