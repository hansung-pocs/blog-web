const Url = window.location.href;
const arr = Url.split("?postId=");
const notice_Id = arr[1];

const notice_detail = document.querySelector(".notice-detail");
const notice_title_first = document.querySelector(".notice-title-first");
const notice_title_second = document.querySelector(".notice-title-second");
const notice_detail_content = document.querySelector(".notice-detail-content");

//공지사항 제목, 공지사항 내용 가져오기
const notice_title = document.querySelector("#title");
const notice_content = document.querySelector("#content");

const d_url = `http://34.64.161.55:8001/posts/${notice_Id}`;

//공지사항 수정때 쓰일 변수들
let present_page_title;
let present_page_content;
let category;

function fetchAdminNotice(){
    fetch(d_url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if(data.status===404){
                notice_title_first.innerHTML =`삭제된 게시글입니다.`
            }
            else{
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
            }
        })
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
        backToAdminPage();
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
    console.log(result.status);

    //삭제 성공(result.status===201)하면
    if(result.status ===201){
        backToAdminPage();
    }
    else{
        console.log(result.message);
    }
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToAdminPage() {
    window.location.href = '../html/admin.html';
}

fetchAdminNotice();