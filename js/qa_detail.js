const Url = window.location.href;
const arr = Url.split("?postId=");
const id = arr[1];
const headComment = document.querySelector("#head-comment");
const childCommentForm = document.querySelector("#child-comment-form");
const editButton = document.querySelector("#edit-button");
const deleteForm = document.querySelector("#delete-form");
const userType = localStorage.getItem("userType");

const qa_buttons = document.querySelector(".qa-buttons");
let qaWriterId;

// 게시글 상세페이지 구현
async function QaDetailPage() {
    const qa_title_first = document.querySelector("#qa-title-first");
    const qa_title_second = document.querySelector("#qa-title-second");
    const qa_detail_content = document.querySelector("#qa-detail-content");
    const d_url = `http://34.64.161.55:8001/posts/${id}`;

    await fetch(d_url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === 403) {
                qa_title_first.innerHTML = `${data.message}`;
                qa_title_second.innerHTML = "";
                posts_buttons.classList.add("hidden");
            } else {
                qa_title_first.innerHTML = `<h3>${data.data.title}</h3>`;
                qa_title_second.innerHTML = `<div>${data.data.category}  |</div>
                <div> ${data.data.createdAt}  |</div>
                <div> ${data.data.updatedAt || ""} |</div>
                <div> 비회원 </div>
                `;
                qa_detail_content.innerHTML = `<div>${data.data.content}</div>`;
                qaWriterId = data.data.writer.userId;
                // present_page_title = data.data.title;
                // present_page_content = data.data.content;
                // category = data.data.category;
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

function checktoShowButtons() {
    let login_id = localStorage.getItem("userId");
    if (login_id != qaWriterId) {
        qa_buttons.classList.add("hidden");
    } else {
        qa_buttons.classList.add("non-hidden");
    }
}

//대댓글 hidden/non-hidden
function commentBtnClick(event) {
    if (childCommentForm.style.display == "none") {
        childCommentForm.style.display = "block";
    } else {
        childCommentForm.style.display = "none";
    }
}

//질문 수정 페이지
function moveQaEditPage() {
    window.location.href = `../html/qa_detail_edit.html?postId=${id}`;
}

//목록으로 버튼을 누르면 다시 목록으로 복귀
function backToQaList() {
    window.location.href = "../html/qa.html";
}

headComment.addEventListener("click", commentBtnClick);
editButton.addEventListener("click", moveQaEditPage);
QaDetailPage();
