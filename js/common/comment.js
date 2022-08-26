//현재 페이지(window) url변수
const WP_Url = window.location.href;
const W_arr = Url.split("?postId=");
const W_id = arr[1];

let w_sessiontoken = localStorage.getItem("sessionToken");
let w_header = new Headers({'x-pocs-session-token' : w_sessiontoken});

const c_url = `http://34.64.161.55:8001/comments/${W_id}`;

//회원인지 비회원인지 체크(qna게시판은 상관x)-타입에 따라 다른 html구성
function checkNonMember(input_type="comment"){
    const userType = localStorage.getItem("userType");
    const comment_input = document.querySelector("#comment_input");
    const comment_input_btn = document.querySelector("#comment_input_btn");
    const reply_input = document.querySelector(".reply_input");
    const reply_input_btn = document.querySelector(".reply_input_btn");
    const category = document.querySelector("#title_category"); //html을 통해서 카테고리 정보 가져옴
    if(category.innerHTML=="Q/A")
        return;
    if (userType === "anonymous") {// && Category !== 'qna'|| Category !== 'qna') {
        comment_input.placeholder = '회원만 작성할 수 있습니다.';
        comment_input_btn.classList.add('hidden');
        reply_input.placeholder = '회원만 작성할 수 있습니다.';
        reply_input_btn.classList.add('hidden');
    }
}


async function checkComments(c_url){
    const comments_count = document.querySelector("#comments_count");
    const comments_div = document.querySelector("#comments_div");//댓글
    const comment_input = document.querySelector("#comment_input"); //댓글 입력
    await fetch(c_url, {headers : w_header})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            comments_count.innerHTML=`(${data.data.comments.length})`;
            comments_div.innerHTML=``;
            comment_input.value='';
            if(data.data.comments.length!=0){
                //comments.innerHTML
                for(let i=0;i<data.data.comments.length;i++){
                    if(data.data.comments[i].canceledAt!==null){  //삭제된 댓글인데 답글이 있을 때
                        const cid=data.data.comments[i].commentId;
                        comments_div.innerHTML+=`
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
                                        <span class="reply_count">${data.data.comments[i].childrenCount || 0}</span>
                                    </div>
                                </div>
                                <hr>
                                <div class="hidden reply">
                                </div>
                            </div>
                    `
                    }else if(data.data.comments[i].commentId===data.data.comments[i].parentId){
                        const cid=data.data.comments[i].commentId;
                        comments_div.innerHTML+=`
                            <div id="comment${cid}" class="row p-2">
                                <div style="font-size: small">${data.data.comments[i].writer.name || `익명`}</div>
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
                                        <span class="reply_count">${data.data.comments[i].childrenCount || 0}</span>
                                    </div>
                                </div>
                                <hr>
                                <div class="hidden reply">
                                    <div class="row mb-3 mx-1">
                                        <div class="col">
                                            <input class="form-control me-2 reply_input" type="text" placeholder="답글" aria-label="Comment" />
                                        </div>
                                        <div class="col-1">
                                            <button type="button" class="reply_input_btn btn btn-primary w-100" onclick="AddComment(${cid},'reply')">등록</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `
                    }else{
                        const cid=data.data.comments[i].commentId;
                        const pid=data.data.comments[i].parentId;

                        const replyDIV = document.querySelector(`#comment${pid} .reply`);
                        if(replyDIV==null) //댓글에러 임시로 막음-에러있는 댓글 안보이게
                            continue;
                        replyDIV.innerHTML+=`
                            <div id="reply${cid}" class="row px-3">
                                <div style="font-size: small">${data.data.comments[i].writer.name || `익명`}</div>
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
                                <hr>
                            </div>
                        `;
                    }
                }
            }
        })
        checkNonMember(); //댓글 html이 만들어진 후 회원 타입에 따라 html 수정
}

//댓글,답글 추가
async function AddComment(pId=null,type="comment") {
    let input;
    if(type==="comment")
        input= document.querySelector(`#${type}_input`);
    else
        input= document.querySelector(`#comment${pId} .${type}_input`);
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
    checkComments(c_url);
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
    checkComments(c_url);
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
    checkComments(c_url);
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

checkComments(c_url);

