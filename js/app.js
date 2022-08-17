let user_type = localStorage.getItem("userType");
//홈페이지에서 공지사항 더보기 눌렀을때 공지사항 페이지로 이동
function moveNoticePage(event) {
    if(user_type===null){
        moveLoginPage();
        //alert("블로그 회원만 조회 가능합니다.");
    }
    else{
        window.location.href=`../html/notices.html`;
    }
}

function movePostPage(){
    if(user_type===null){
        moveLoginPage();
        //alert("블로그 회원만 조회 가능합니다.");
    }
    else{
        window.location.href=`../html/posts.html`;
    }
}

function moveUserPage(){
    if(user_type===null){
        moveLoginPage();
        //alert("블로그 회원만 조회 가능합니다.");
    }
    else{
        window.location.href=`../html/user.html`;
    }
}

//alert대신 사용하면 됨(로그인페이지로 이동가능)
function moveLoginPage(){
    if(confirm("블로그 회원만 조회 가능합니다.\n로그인하시겠습니까?")){
        window.location.href=`../html/index.html`;
    }
    else{
        return;
    }

}

//홈페이지에 공지사항 최근글 3개 불러오기
const notice_card = document.querySelector(".notice-card");
const url = "http://34.64.161.55:8001/posts";
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        notice_card.innerHTML = "";
        if (data.data === null) {
            notice_card.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
        } else {
            let cnt=0;
            for (let i = 0; i < data.data.posts.length; i++) {
                if(cnt>2)
                    break;
                if(data.data.posts[i].category==="notice"){
                    notice_card.innerHTML +=
                        `
                    <div class="col-xl">
                        <div class="card">
                            <div class="card-header">${data.data.posts[i].title}</div>
                            <div class="card-body">${data.data.posts[i].writerName} - ${data.data.posts[i].createdAt}</div>
                           <div class="card-footer">${data.data.posts[i].content}</div>
                        </div>
                    </div>
                     `;
                    cnt++;
                }
            }
        }
    })

