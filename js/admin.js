const post_url = "http://34.64.161.55:8001/admin/posts";
const user_url = "http://34.64.161.55:8001/admin/users";
let post_data;

//공지사항에 필요한 dom
const notice = document.querySelector("#notice table");
const notice_thead = document.querySelector("#notice table thead");
const notice_tbody = document.querySelector("#notice table tbody");

//회원목록에 필요한 dom
const user = document.querySelector("#user table");
const user_thead = document.querySelector("#user table thead");
const user_tbody = document.querySelector("#user table tbody");

//공지사항 pagination에 필요한 변수
let Notice_cnt=0;
let Notice_currentPage=1;
let Notice_totalPage;
let Notice_first;
let Notice_last=1;

//유저목록 pagination에 필요한 변수
let User_cnt;
let User_currentPage=1;
let User_totalPage;
let User_first=0;
let User_last=1;

function fetchNotice(){
    fetch(post_url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            post_data = data.data.posts;

            //데이터 개수
            Notice_cnt = data.data.posts.length;
            //마지막페이지 계산
            Notice_totalPage = Math.ceil( Notice_cnt/10);

            notice_thead.innerHTML = `<tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>수정일</th>
                <th>카테고리</th>
            </tr>`;
            notice_tbody.innerHTML= "";

            if (data.data === null) {
                notice_tbody.innerHTML = "<tr><td>0</td><td>글을 작성하세요.</td><td></td></tr>";
            } else {
                //페이지에 10개만 보여주기 위해 변수 설정
                Notice_last = 10*Notice_currentPage;
                Notice_first = Notice_last-10;

                for (let i = Notice_first; i < Notice_last; i++) {
                    notice_tbody.innerHTML +=
                        `
                <tr>
                <td>${i+1}</td>
                <td>${post_data[i].title}</td>
                <td>${post_data[i].writerName}</td>
                <td>${post_data[i].createdAt}</td>
                <td>${post_data[i].updatedAt}</td>
                <td>${post_data[i].category}</td>
                </tr>
                `;
                }
            }
        })
}

function fetchUser(){
    fetch(user_url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            User_cnt=0;
            data.data.users.forEach((item)=>{
                //데이터 개수
                User_cnt++;
            })

            //마지막페이지 계산
            User_totalPage = Math.ceil(User_cnt/10);

            //페이지에 10개만 보여주기 위해 변수 설정
            User_last = 10*User_currentPage;

            User_first = User_last-10;

            user_thead.innerHTML="<tr><td>번호</td><td>성명</td><td>학번</td><td>e-mail</td></tr>";
            user_tbody.innerHTML="";
            if(data.data.users ===  null ){
                user_tbody.innerHTML="<tr><td>유저를</td><td>추가</td><td>하세요.</td><td></td></tr>";
            }
            else{
                for(let i=User_first; i<User_last;i++){
                    user_tbody.innerHTML+=
                        `
                <tr onclick="moveUserDetailPage(${data.data.users[i].userId})">
                    <td>${i+1}</td>
                    <td>${data.data.users[i].userName}</td>
                    <td>${data.data.users[i].studentId}</td>
                    <td>${data.data.users[i].email}</td>
                </tr>
                `
                }
            }
        })
}

//Noticepgaination 구현
function showNoticePagination(){
    let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousNoticePage()">Previous</a>
                </li>`;
    let pageGroup = Math.ceil(Notice_currentPage/5);
    let last_num = pageGroup*5;
    if(last_num>Notice_totalPage){
        Notice_last=Notice_totalPage;
    }

    let first_num = last_num-4 <=0 ? 1 : last_num-4;
    for(let i=first_num; i<=last_num;i++){
        pageHTML+=`<li class="page-item ${Notice_currentPage==i?"active":""}"><a class="page-link" onclick="moveNoticePage(${i})">${i}</a></li>`;
    }

    pageHTML +=`<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextNoticePage()">Next</a>
                </li>`;

    document.querySelector("#notice-pagination-bar").innerHTML = pageHTML;
}

function moveNoticePage(pageNum){
    if(pageNum > Notice_totalPage)
        return;
    //이동할 페이지가 이미 그 페이지라면
    if(Notice_currentPage===pageNum)
        return;
    Notice_currentPage =pageNum;
    fetchNotice()
    showNoticePagination();
}


function moveNextNoticePage(){
    //넘길페이지가 전체 페이지보다 클경우 그냥 return
    if(Notice_currentPage>=Notice_totalPage)
        return;
    Notice_currentPage++;
    fetchNotice()
    showNoticePagination();
}

function movePreviousNoticePage(){
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if(Notice_currentPage<=1)
        return;
    Notice_currentPage--;
    fetchNotice()
    showNoticePagination();
}

//UserPagination 구현
function showUserPagination(){
    let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousUserPage()">Previous</a>
                </li>`;
    let pageGroup = Math.ceil(User_currentPage/5);
    let last_num = pageGroup*5;
    if(last_num>User_totalPage){
        User_last=User_totalPage;
    }

    let first_num = last_num-4 <=0 ? 1 : last_num-4;
    for(let i=first_num; i<=last_num;i++){
        pageHTML+=`<li class="page-item ${User_currentPage==i?"active":""}"><a class="page-link" onclick="moveUserPage(${i})">${i}</a></li>`;
    }

    pageHTML +=`<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextUserPage()">Next</a>
                </li>`;

    document.querySelector("#user-pagination-bar").innerHTML = pageHTML;
}

function moveUserPage(pageNum){
    if(pageNum > User_totalPage)
        return;
    //이동할 페이지가 이미 그 페이지라면
    if(User_currentPage===pageNum)
        return;
    User_currentPage =pageNum;
    fetchUser();
    showUserPagination();
}


function moveNextUserPage(){
    //넘길페이지가 전체 페이지보다 클경우 그냥 return
    if(User_currentPage>=User_totalPage)
        return;
    User_currentPage++;
    fetchUser();
    showUserPagination();
}

function movePreviousUserPage(){
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if(User_currentPage<=1)
        return;
    User_currentPage--;
    fetchUser();
    showUserPagination();
}

function moveUserAddPage(){
    window.location.href = '../html/user_add.html';
}

function moveNoticeAddPage(){
    window.location.href = '../html/notices_add.html';
}

function moveUserDetailPage(Id){
    window.location.href =`../html/user_detail.html?userId=${Id}`
}

fetchNotice();
fetchUser();
showNoticePagination();
showUserPagination();


