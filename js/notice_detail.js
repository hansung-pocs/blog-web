const Url = window.location.href;
const arr = Url.split("?postId=");
const id = arr[1];
console.log(id);

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({'x-pocs-session-token' : sessiontoken});

//공지사항 상세페이지 구현
async function NoticeDetailPage() {
    const notice_title_first = document.querySelector(".notice-title-first");
    const notice_title_second = document.querySelector(".notice-title-second");
    const notice_detail_content = document.querySelector(".notice-detail-content");
    const d_url = `http://34.64.161.55:8001/posts/${id}`;
    const c_url = `http://34.64.161.55:8001/comments/${id}`;

    await fetch(d_url, {headers : header})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === 403 || data.status === 404 || data.status === 500) {
                notice_title_first.innerHTML = "삭제되었거나 없는 게시글입니다.";
                notice_title_second.innerHTML="";
                posts_buttons.classList.add("hidden");
            } else {
                notice_title_first.innerHTML = `<h3>[${data.data.category}]${data.data.title}</h3>`;
                notice_title_second.innerHTML = `
            <div class="me-2">${data.data.updatedAt || data.data.createdAt}</div>
            <div class="me-2"> ${data.data.writer.name} </div>
            <div>조회수 ${data.data.views}</div>
            `;
                notice_detail_content.innerHTML = `<div style="min-height: 200px">${data.data.content}</div>`;
                userId = data.data.writer.userId;
            }
        })
    await checkComments(c_url);
}

//공지사항 삭제하기
async function DeleteNotice(){
    const sendData={
        userId : userId,
    };

    const options = {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json',
            'x-pocs-session-token' : sessionToken
        },
        body : JSON.stringify(sendData)
    };

    const response = await fetch(`http://34.64.161.55:8001/posts/${id}/delete`, options);
    const result = await response.json();
    console.log(result.status);

    //삭제 성공(result.status===201)하면
    if(result.status ===201){
        backToList();
    }
    else{
        console.log(result.message);
    }
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToList() {
    window.location.href = '../html/notices.html';
}

//공지사항 수정 페이지
function gotoNoticeEditPage(){
    window.location.href = `../html/notices_detail_edit.html?postId=${id}`;
}

async function checkComments(c_url){
    const comments = document.querySelector("#comments");
    const comments_count = document.querySelector("#comments_count");
    await fetch(c_url, {headers : header})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            comments_count.innerHTML=`(${data.data.comments.length})`;

            if(data.data.comments.length!=0){
                for(let i=0;i<data.data.comments.length;i++){
                    if(data.data.comments[i].canceledAt!==null){  //삭제된 댓글인데 답글이 있을 때
                        const cid=data.data.comments[i].commentId;
                        comments.innerHTML+=`
                            <div id="comment${cid}" class="row p-2" >
                                <div style="font-size: small"></div>
                                <div class="non-hidden content d-flex justify-content-between my-2">
                                    <div style="color:lightgray">작성자가 삭제한 댓글입니다.</div>
                                </div>
                                <div class="d-flex">
                                    <div onclick="commentBtnClick(${cid})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                        </svg>
                                        <span class="reply_count">0</span>
                                    </div>
                                </div>
                                <hr>
                                <div class="hidden reply">
                                </div>
                            </div>
                    `
                    }else if(data.data.comments[i].commentId===data.data.comments[i].parentId){
                        const cid=data.data.comments[i].commentId;
                        comments.innerHTML+=`
                            <div id="comment${cid}" class="row p-2">
                                <div style="font-size: small">${data.data.comments[i].writer.name}</div>
                                <div class="non-hidden content d-flex justify-content-between my-2">
                                    <div>${data.data.comments[i].content}</div>
                                    <div class="mx-5">
                                        <button type="button" class="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                            </svg>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" onclick="clickEditCommentBtn(${cid})">수정</a></li>
                                            <li><a class="dropdown-item" onclick="DeleteComment(${cid})">삭제</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="hidden contentEdit row mb-3 my-2">
                                    <div class="col">
                                        <input class="editInput form-control me-2" type="text" value="${data.data.comments[i].content}" aria-label="Comment" />
                                    </div>
                                    <div class="col-1">
                                        <button type="button" class="btn btn-primary w-100" onclick="EditComment(${cid})">수정</button>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-2"  viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                    </svg>
                                    <div class="me-3" style="font-size: smaller">${data.data.comments[i].updatedAt || data.data.comments[i].createdAt}</div>
                                    <div onclick="commentBtnClick(${cid})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                        </svg>
                                        <span class="reply_count">0</span>
                                    </div>
                                </div>
                                <hr>
                                <div class="hidden reply">
                                    <div class="row mb-3 mx-1">
                                        <div class="col">
                                            <input id="reply_input" class="form-control me-2" type="text" placeholder="답글" aria-label="Comment" />
                                        </div>
                                        <div class="col-1">
                                            <button type="button" class="btn btn-primary w-100" onclick="AddComment(${cid},'reply')">등록</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `
                    }else{
                        const cid=data.data.comments[i].commentId;
                        const pid=data.data.comments[i].parentId;
                        //답글의 부모댓글에 답글 개수 표시
                        const replyCount = document.querySelector(`#comment${pid} .reply_count`);
                        replyCount.innerHTML = Number(replyCount.innerHTML) + 1;

                        const replyDIV = document.querySelector(`#comment${pid} .reply`);
                        replyDIV.innerHTML+=`
                            <div id="reply${cid}" class="row px-3" style="border-bottom: solid lightgray 1px">
                                <div style="font-size: small">${data.data.comments[i].writer.name}</div>
                                <div class="non-hidden content d-flex justify-content-between my-2">
                                    <div>${data.data.comments[i].content}</div>
                                    <div class="mx-5">
                                        <button type="button" class="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                            </svg>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" onclick="clickEditCommentBtn(${cid},'reply')">수정</a></li>
                                            <li><a class="dropdown-item" onclick="DeleteComment(${cid},'reply')">삭제</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="hidden contentEdit row mb-3 my-2">
                                    <div class="col">
                                        <input class="editInput form-control me-2" type="text" value="${data.data.comments[i].content}" aria-label="Comment" />
                                    </div>
                                    <div class="col-1">
                                        <button type="button" class="btn btn-primary w-100" onclick="EditComment(${cid},'reply')">수정</button>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-2"  viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                    </svg>
                                    <div class="me-3" style="font-size: smaller">${data.data.comments[i].updatedAt || data.data.comments[i].createdAt}</div>
                                </div>
                            </div>
                            </div>
                        `;
                    }
                }
            }
        })
}

//댓글,답글 추가
async function AddComment(pId=null,type="comment") {
    let input;
    if(type==="comment")
        input= document.querySelector(`#${type}_input`);
    else
        input= document.querySelector(`#comment${pId} #${type}_input`);
    const sendData = {
        postId: Number(id),
        content: input.value,
        parentId: pId
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-pocs-session-token' : sessionToken,
        },
        body: JSON.stringify(sendData)
    };
    console.log(sendData);
    const response = await fetch(`http://34.64.161.55:8001/comments`, options);
    const result = await response.json();
    console.log(result,response);
    alert('댓글이 등록되었습니다');
    //result 404면 중복 금지
    window.location.href = Url;
}
//수정 버튼 클릭후 댓글내용을 입력창으로 변경
function clickEditCommentBtn(id,type="comment"){
    console.log(`#${type}${id} .content`);
    const content= document.querySelector(`#${type}${id} .content`);
    const contentEdit= document.querySelector(`#${type}${id} .contentEdit`);
    content.classList.replace('non-hidden','hidden');
    content.classList.replace('d-flex','d-flexN');
    contentEdit.classList.replace('hidden','non-hidden');
}
//댓글 수정
async function EditComment(id,type="comment") {
    const content= document.querySelector(`#${type}${id} .content`);
    const contentEdit= document.querySelector(`#${type}${id} .contentEdit`);
    const editInput=document.querySelector(`#${type}${id} .editInput`);
    const sendData = {
        content: editInput.value
    }
    console.log(sendData);
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-pocs-session-token' : sessionToken
        },
        body: JSON.stringify(sendData)
    };
    const response = await fetch(`http://34.64.161.55:8001/comments/${id}`, options);
    const result = await response.json();
    console.log(result);

    content.classList.replace('hidden','non-hidden');
    content.classList.replace('d-flexN','d-flex');
    contentEdit.classList.replace('non-hidden','hidden');

    //수정전 확인 한번 더 필요함
    alert('댓글이 수정되었습니다');
    window.location.href = Url;
}
//댓글 삭제
async function DeleteComment(id) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-pocs-session-token' : sessionToken
        }
    };
    const response = await fetch(`http://34.64.161.55:8001/comments/${id}/delete`, options);
    const result = await response.json();
    console.log(result);

    //삭제전 확인 한번 더 필요함
    alert('댓글이 삭제되었습니다');
    window.location.href = Url;
}
//답글 hidden/non-hidden
function commentBtnClick(id) {
    let replyPath = `#comment${id} .reply`;
    let replyDiv = document.querySelector(replyPath);//'#comment(n) #reply'
    if (replyDiv.classList[0] == 'hidden')
        replyDiv.classList.replace('hidden','non-hidden');
    else
        replyDiv.classList.replace('non-hidden','hidden');
}

NoticeDetailPage();