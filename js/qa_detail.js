const Url = window.location.href;
const arr = Url.split("?postId=");
const id = arr[1];
// 질문 수정, 삭제 dom
const editButton = document.querySelector("#edit-button");
const deleteForm = document.querySelector("#delete-form");
const userType = localStorage.getItem("userType");

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

let qaWriterId;

// 게시글 상세페이지 구현
async function QaDetailPage() {
    const qa_title_first = document.querySelector("#qa-title-first");
    const qa_title_second = document.querySelector("#qa-title-second");
    const qa_detail_content = document.querySelector("#qa-detail-content");
    const d_url = `http://34.64.161.55:8001/posts/${id}`;

    await fetch(d_url, { headers: header })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === 403 || data.status === 404 || data.status === 500) {
                qa_title_first.innerHTML = "삭제되었거나 없는 게시글입니다.";
                qa_title_second.innerHTML = "";
                qa_buttons.classList.add("hidden");
            } else {
                let cateKR = CategoryEn2Kr(data.data.category);
                console.log(cateKR);
                qa_title_first.innerHTML = `<h3>[${cateKR}]${data.data.title}</h3>`;
                qa_title_second.innerHTML = `
            <div class="me-2">${data.data.updatedAt || data.data.createdAt}</div>
            <div class="me-2"> 익명 </div>
            <div>조회수 ${data.data.views}</div>
            `;
                qa_detail_content.innerHTML = `<div style="min-height: 200px">${data.data.content}</div>`;
                qaWriterId = data.data.writer.userId;
                present_page_title = data.data.title;
                present_page_content = data.data.content;
                category = data.data.category;
            }
        });
    await checktoShowButtons();
}

//게시글 삭제하기
async function DeleteQa() {
    const sendData = {
        userId: qaWriterId,
    };

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-pocs-session-token": sessiontoken,
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch(`http://34.64.161.55:8001/posts/${id}/delete`, options);
    const result = await response.json();
    console.log(result.status);

    if (result.status === 201) {
        backToQaList();
        console.log("삭제 성공");
    } else {
        console.log(result.message);
    }
}

// 게시물 수정, 삭제 버튼 hidden/non-hidden
function checktoShowButtons() {
    let login_id = localStorage.getItem("userId");
    const qa_buttons = document.querySelector(".qa-buttons");
    if (login_id != qaWriterId) {
        qa_buttons.classList.add("hidden");
    } else {
        qa_buttons.classList.add("non-hidden");
    }
}
//질문 수정 페이지
function moveQaEditPage() {
    window.location.href = `../html/qa_detail_edit.html?postId=${id}`;
}
//목록으로 복귀
function backToQaList() {
    window.location.href = "../html/qa.html";
}
//api의 category En을 Kr로 변경
function CategoryEn2Kr(category) {
    //console.log(category);
    //카테고리 이름이 중간에 바뀌었음
    if (category === "QNA"||category === "qna") {
        return "Q/A";
    } else return "?";
}
editButton.addEventListener("click", moveQaEditPage);
QaDetailPage();
