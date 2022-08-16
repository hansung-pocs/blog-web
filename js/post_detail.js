const Url = window.location.href;
const arr = Url.split("?postId=");
const id = arr[1];

const posts_buttons = document.querySelector(".posts-buttons");
let postWriterId;

//게시글 상세페이지 구현
async function PostDetailPage() {
    const notice_title_first = document.querySelector(".notice-title-first");
    const notice_title_second = document.querySelector(".notice-title-second");
    const notice_detail_content = document.querySelector(".notice-detail-content");
    const d_url = `http://34.64.161.55:8001/posts/${id}`;

    await fetch(d_url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === 403) {
                notice_title_first.innerHTML = `${data.message}`;
                notice_title_second.innerHTML="";
                posts_buttons.classList.add("hidden");
            } else {
                notice_title_first.innerHTML = `<h3>${data.data.title}</h3>`;
                notice_title_second.innerHTML = `<div>${data.data.category}  |</div>
            <div> ${data.data.createdAt}  |</div>
            <div> ${data.data.updatedAt || ""} |</div>
            <div> ${data.data.writer.name} </div>
            `;
                notice_detail_content.innerHTML = `<div>${data.data.content}</div>`;
                postWriterId = data.data.writer.userId;
                present_page_title = data.data.title;
                present_page_content = data.data.content;
                category = data.data.category;
            }
        })
    await checktoShowButtons();
}

//게시글 삭제하기
async function DeletePost() {
    const sendData = {
        userId: postWriterId,
    };

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
    };

    const response = await fetch(`http://34.64.161.55:8001/posts/${id}/delete`, options);
    const result = await response.json();
    console.log(result.status);

    //삭제 성공(result.status===201)하면
    if (result.status === 201) {
        backToPostList();
    } else {
        console.log(result.message);
    }
}

function checktoShowButtons(){
    let login_id=localStorage.getItem("userId");
    let user_type = localStorage.getItem("userType");
    if(user_type==="member"){
        //자기가 쓴글이 아닌 게시그을 조회했을 경우
        if(login_id!==postWriterId){
            posts_buttons.classList.add("hidden");
        }
    }
}

//공지사항 수정 페이지
function GotoPostEditPage() {
    window.location.href = `../html/posts_detail_edit.html?postId=${id}`;
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToPostList() {
    window.location.href = '../html/posts.html';
}

PostDetailPage();

