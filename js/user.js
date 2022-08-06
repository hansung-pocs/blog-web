let sort='';
let url = "http://34.64.161.55:8001/users";

const user = document.querySelector("#user table");
const thead = document.querySelector("#user table thead");
const tbody = document.querySelector("#user table tbody");

const radio0= document.querySelector("#inlineRadio0");
const radio1= document.querySelector("#inlineRadio1");
const radio2= document.querySelector("#inlineRadio2");
const search= document.querySelector("#user_search"); //검색

//pagination에 필요한 변수
let currentPage=1;
let totalPage;
let first=0;
let last=1;

function doFetch(){
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(url);
            console.log(data);
            thead.innerHTML="<tr><td>번호</td><td>성명</td><td>학번</td><td>e-mail</td></tr>";
            tbody.innerHTML='';
            if(data.data.users ===  null ){
                tbody.innerHTML="<tr><td>유저를</td><td>추가</td><td>하세요.</td><td></td></tr>";
            }
            else{
                let cnt=0;
                data.data.users.forEach((item)=>{
                    //데이터 개수
                    cnt++;
                })
                //마지막페이지 계산
                totalPage = Math.ceil(cnt/10);

                //페이지에 10개만 보여주기 위해 변수 설정
                last = 10*currentPage;
                first = last-10;

                for(let i=first; i<last;i++){
                    tbody.innerHTML+=
                        `
                <tr onclick="window.location.href='user_detail.html?userId=${data.data.users[i].userId}'">
                    <td>${i+1}</td>
                    <td>${data.data.users[i].userName}</td>
                    <td>${data.data.users[i].generation}</td>
                    <td>${data.data.users[i].studentId}</td>
                    <td>${data.data.users[i].email}</td>
                </tr>
                `
                }

            }
        })
}

//pgaination 구현
function showPagination(){
    let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>
                </li>`;
    let pageGroup = Math.ceil(currentPage/5);
    let last_num = pageGroup*5;
    if(last_num>totalPage){
        last=totalPage;
    }

    let first_num = last_num-4 <=0 ? 1 : last_num-4;
    for(let i=first_num; i<=last_num;i++){
        pageHTML+=`<li class="page-item ${currentPage==i?"active":""}"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`;
    }

    pageHTML +=`<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>
                </li>`;

    document.querySelector("#pagination-bar").innerHTML = pageHTML;
}

function movePage(pageNum){
    if(pageNum > totalPage)
        return;
    //이동할 페이지가 이미 그 페이지라면
    if(currentPage===pageNum)
        return;
    currentPage =pageNum;
    doFetch();
    showPagination();
}


function moveNextPage(){
    //넘길페이지가 전체 페이지보다 클경우 그냥 return
    if(currentPage>=totalPage)
        return;
    currentPage++;
    doFetch();
    showPagination();
}

function movePreviousPage(){
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if(currentPage<=1)
        return;
    currentPage--;
    doFetch();
    showPagination();
}

function onClick(event){
    console.log(event.target.id);
    if(event.target.id==="inlineRadio0")
        url="http://34.64.161.55:8001/users";
    else if(event.target.id==="inlineRadio1")
        url="http://34.64.161.55:8001/users/?sort=generation";
    else if(event.target.id==="inlineRadio2")
        url="http://34.64.161.55:8001/users/?sort=studentId";
    doFetch();
}
radio0.addEventListener("click", onClick);
radio1.addEventListener("click", onClick);
radio2.addEventListener("click", onClick);

doFetch();
showPagination();

