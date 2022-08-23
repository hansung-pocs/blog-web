const Url = window.location.href;
const arr = Url.split("?postId=");
const id = arr[1];
const addCommentForm = document.querySelector("#add-comment-form");
const replyCommentForm = document.querySelector("#reply-comment-form");
const commentDiv = document.querySelector("#comments_div");
const commentValue = document.querySelector("#comment-value");
const editButton = document.querySelector("#edit-button");
const deleteForm = document.querySelector("#delete-form");
const userType = localStorage.getItem("userType");
let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

const qa_buttons = document.querySelector(".qa-buttons");
let qaWriterId;
let commentWriterId;

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
            <div class="me-2"> 비회원 </div>
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

async function CommentShow() {
    const url = `http://34.64.161.55:8001/comments/${id}`;
    // innerHTML로 추가할 parent-comment, child-comment div 태그 dom 제어 변수
    let parentComment;
    let childComment;
    let childCommentInput;
    let parentEditForm;
    let parentEditInput;
    let childEditForm;
    let childEditInput;

    await fetch(url, { headers: header })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status == 403) {
                commentsDiv.innerHTML = "";
            } else {
                data.data.comments.map((comments) => {
                    commentWriterId = comments.writer.userId;
                    if (comments.commentId == comments.parentId) {
                        commentDiv.innerHTML += `
                    <div id="parent-comment" class="row p-2">
                        <div style="font-size: small">${comments.writer.name}</div>
                        <div class="d-flex justify-content-between my-2" >
                            <div>${comments.content}</div>
                            <div id="comment-buttons" class="mx-5">
                                <button type="button" class="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    </svg>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" onclick="showEditCommentForm(${comments.commentId})">수정</a></li>
                                    <li><a class="dropdown-item" onclick="commentDelete(${comments.commentId})">삭제</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-2"  viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                            </svg>
                            <div class="me-3" style="font-size: smaller">${comments.createdAt}</div>
                            <div onclick="commentBtnClick(${comments.commentId});">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                            </div>
                        </div>
                        <div id="parent-edit-form" style="display:none">
                            <form class="row mb-3 mt-2 mx-1" >
                                <div class="col">
                                    <input id="parent-edit-input" class="form-control me-2" type="text" placeholder="수정" aria-label="Comment" />
                                </div>
                                <div class="col-1">
                                    <button type="button" class="btn btn-primary w-100" onclick="editComment(${comments.commentId})">수정</button>
                                </div>
                            </form>
                        </div>
                        <hr>
                        <div id="child-comment" style="display:none">
                            <form id="reply-comment-form" class="row mb-3 mx-1">
                                <div class="col">
                                    <input id="child-comment-input" class="form-control me-2" type="text" placeholder="대댓글" aria-label="Comment" />
                                </div>
                                <div class="col-1">
                                    <button type="button" class="btn btn-primary w-100" onclick="addChildComment(${comments.parentId})">등록</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    `;
                        parentComment = document.querySelector("#parent-comment");
                        parentEditForm = document.querySelector("#parent-edit-form");
                        parentEditInput = document.querySelector("#parent-edit-input");
                        childComment = document.querySelector("#child-comment");
                        childCommentInput = document.querySelector("#child-comment-input");
                        // parentComment와 childComment의 id값을 각 댓글에 해당하는 commentId 값으로 변경
                        parentComment.setAttribute("id", `commentId${comments.commentId}`);
                        parentEditForm.setAttribute("id", `commentId${comments.commentId}Edit`);
                        parentEditInput.setAttribute("id", `commentId${comments.commentId}EditInput`);
                        childComment.setAttribute("id", `commentId${comments.commentId}Child`);
                        childCommentInput.setAttribute("id", `commentId${comments.commentId}Input`);
                    } else {
                        // 대댓글이 있는경우
                        if ((comments.commentId != comments.parentId) != false && parentComment.id === `commentId${comments.parentId}`) {
                            console.log("대댓글 있음");
                            childComment.innerHTML += `
                            <div id="comment_reply" class="row px-3" style="border-bottom: solid lightgray 1px">
                                <div style="font-size: small">${comments.writer.name}</div>
                                <div class="d-flex justify-content-between my-2" >
                                    <div>${comments.content}</div>
                                    <div id="comment-buttons" class="mx-5">
                                        <button type="button" class="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                            </svg>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" onclick="showEditCommentForm(${comments.commentId})">수정</a></li>
                                            <li><a class="dropdown-item" onclick="commentDelete(${comments.commentId})">삭제</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-2"  viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                    </svg>
                                    <div class="me-3" style="font-size: smaller">${comments.createdAt}</div>
                                </div>
                                <div id="child-edit-form" style="display:none">
                                    <form class="row mb-3 mt-2 mx-1" >
                                        <div class="col">
                                            <input id="child-edit-input" class="form-control me-2" type="text" placeholder="수정" aria-label="Comment" />
                                        </div>
                                        <div class="col-1">
                                            <button type="button" class="btn btn-primary w-100" onclick="editComment(${comments.commentId})">수정</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                                `;
                            childEditForm = document.querySelector("#child-edit-form");
                            childEditInput = document.querySelector("#child-edit-input");
                            childEditForm.setAttribute("id", `commentId${comments.commentId}Edit`);
                            childEditInput.setAttribute("id", `commentId${comments.commentId}EditInput`);
                        } else {
                            // 대댓글이 존재하지 않는 경우 (전체 댓글에 대댓글이 하나도 없는 경우)
                            console.log("대댓글 없음");
                        }
                    }
                });
            }
        });
        await checktoShowButtons2();
}

// 댓글 추가
async function addComment(event) {
    event.preventDefault();
    const url = `http://34.64.161.55:8001/comments`;

    const sendData = {
        postId: id,
        content: commentValue.value,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-pocs-session-token": sessiontoken,
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.status);

    if (result.status === 201) {
        window.location.href = `../html/qa_detail.html?postId=${id}`;
    } else {
        console.log(result.message);
    }
}

// 대댓글 추가
async function addChildComment(parentid) {
    const url = `http://34.64.161.55:8001/comments`;
    const childCommentValue = document.querySelector(`#commentId${parentid}Input`);
    const sendData = {
        postId: id,
        content: childCommentValue.value,
        parentId: parentid,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-pocs-session-token": sessiontoken,
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.status);

    if (result.status === 201) {
        console.log("대댓글 추가 성공");
        window.location.href = `../html/qa_detail.html?postId=${id}`;
    } else {
        console.log(result.message);
    }
}

// 댓글 삭제
async function commentDelete(commentId) {
    const userId = localStorage.getItem("userId");
    if (userId == commentWriterId) {
        const url = `http://34.64.161.55:8001/comments/${commentId}/delete`;
        
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-pocs-session-token": sessiontoken,
            },
        };

        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.status);

        if (result.status === 201) {
            alert("삭제되었습니다");
            window.location.href = `../html/qa_detail.html?postId=${id}`;
        } else {
            console.log(result.message);
        }
    } else {
        alert("본인이 작성한 댓글만 삭제 가능합니다");
    }
}

// 댓글 수정
async function editComment(commentId) {
    const userId = localStorage.getItem("userId");
    const editValue = document.querySelector(`#commentId${commentId}EditInput`);
    if (userId == commentWriterId) {
        const url = `http://34.64.161.55:8001/comments/${commentId}`;

        const sendData = {
            content: editValue.value,
        };

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-pocs-session-token": sessiontoken,
            },
            body: JSON.stringify(sendData),
        };

        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.status);

        if (result.status === 200) {
            window.location.href = `../html/qa_detail.html?postId=${id}`;
        } else {
            console.log(result.message);
        }
    } else {
        alert("본인이 작성한 댓글만 수정 가능합니다");
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

function checktoShowButtons2() {
    let login_id = localStorage.getItem("userId");
    let commentButtons = document.querySelector("#comment-buttons")
    if(login_id != commentWriterId) {
        commentButtons.classList.add("hidden");
    } else {
        commentButtons.classList.add("non-hidden");
    }
}

//대댓글 hidden/non-hidden
function commentBtnClick(parentId) {
    let childComment = document.querySelector(`#commentId${parentId}Child`);
    console.log(childComment);
    if (childComment.style.display == "none") {
        childComment.style.display = "block";
    } else {
        childComment.style.display = "none";
    }
}

function showEditCommentForm(commentId) {
    let editForm = document.querySelector(`#commentId${commentId}Edit`);
    if(editForm.style.display == "none") {
        editForm.style.display = "block"; 
    } else {
        editForm.style.display = "none";
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

//api의 category En을 Kr로 변경
function CategoryEn2Kr(category) {
    //console.log(category);
    if (category === "QNA") {
        return "Q/A";
    } else return "?";
}

editButton.addEventListener("click", moveQaEditPage);
addCommentForm.addEventListener("submit", addComment);
QaDetailPage();
CommentShow();
