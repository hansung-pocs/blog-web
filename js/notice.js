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

//공지사항 목록 조회
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
        if (data.data === null) {
            tbody.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            for (let i = 0; i < data.data.posts.length; i++) {
                tbody.innerHTML +=
                    `
        <tr onclick="GotoDetailPage(${data.data.posts[i].postId})">
        <td>${data.data.posts[i].postId}</td>
        <td>${data.data.posts[i].title}</td>
        <td>${data.data.posts[i].writerName}</td>
        <td>${data.data.posts[i].createdAt}</td>
        <td>${data.data.posts[i].updatedAt}</td>
        <td>${data.data.posts[i].category}</td>
        </tr>
        `;
            }
        }
    })

//공지사항 상세페이지 구현
function GotoDetailPage(Id) {
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

//새로고침하면 페이지 원상복구 되는것을 막음
function NotReload(event) {
    if ((event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) || (event.keyCode == 116)) {
        event.keyCode = 0;
        event.cancelBubble = true;
        event.returnValue = false;
    }
}

document.onkeydown = NotReload;

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToList() {
    window.location.href = '../html/notices.html';
}

function moveNoticeAddPage(){
    window.location.href = '../html/notices_add.html';
}

//공지사항 수정 페이지
function noticeEditPage(){
    const notice_edit = document.querySelector(".notice-edit");
    notice_edit.classList.remove("hidden");
    notice_detail.classList.add("hidden");

    notice_title.value = present_page_title;
    notice_content.value = present_page_content;

}

//공지사항 수정하기 버튼 눌렀을때 호출되는 함수
async function noticeEdit(){
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
        backToList();
    }
    else{
        console.log(result.message);
    }
}

//공지사항 삭제하기
async function DeleteNotice(){
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
    if(result.status ===302){
        backToList();
    }
    else{
        console.log(result.message);
    }
}






