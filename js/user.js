let url = "http://34.64.161.55:8001/users";

const user = document.querySelector("#user table");
const thead = document.querySelector("#user table thead");
const tbody = document.querySelector("#user table tbody");

const radio0 = document.querySelector("#inlineRadio0");
const radio1 = document.querySelector("#inlineRadio1");
const radio2 = document.querySelector("#inlineRadio2");
const search = document.querySelector("#user_search"); //검색

//유저 데이터와 정렬에 대한 변수
let userArr;
let sortOption;

//pagination에 필요한 변수
let currentPage = 1;
let totalPage;
let first = 0;
let last = 1;

function doFetch() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(url);
            console.log(data);
            thead.innerHTML = "<tr><td>번호</td><td>성명</td><td>기수</td><td>학번</td><td>e-mail</td></tr>";
            if (data.data.users === null) {
                tbody.innerHTML = "<tr><td>유저를</td><td>추가</td><td>하세요.</td><td></td></tr>";
            } else {
                let cnt = 0;
                data.data.users.forEach((item) => {
                    //데이터 개수
                    cnt++;
                });
                //마지막페이지 계산
                totalPage = Math.ceil(cnt / 10);

                //페이지에 10개만 보여주기 위해 변수 설정
                last = 10 * currentPage;
                first = last - 10;

                //받은 데이터로 유저 목록 그리기
                userArr = data.data.users;

                optionCheck(sortOption);
                sortArr(userArr, sortOption);
                drawUserList(userArr);
            }
        });
}
//유저 목록 그리기
/// Arr[i]?.->Uncaught TypeError: Cannot read properties of undefined 에러를 막기 위한 것(Optional Chaining)
function drawUserList(Arr) {
    tbody.innerHTML = "";
    for (let i = first; i < last; i++) {
        if (Arr[i] == undefined) continue;
        tbody.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td onclick="window.location.href='user_detail.html?userId=${Arr[i]?.userId}'"
                        style="cursor:pointer">${Arr[i]?.name}</td>
                    <td>${Arr[i]?.generation}</td>
                    <td>${Arr[i]?.studentId}</td>
                    <td>${Arr[i]?.email}</td>  
                </tr>
                `;
    }
}
//유저 데이터를 정렬하는 함수: 생성 시간 내림차, 기수 내림차, 학번 오름차
function sortArr(Arr, option) {
    if (option == "created") {
        for (let i = 0; i < Arr.length - 1; i++) {
            for (let j = i + 1; j < Arr.length; j++) {
                //생성 시간까진 확인 할 수 없어 userId로 대체
                if (Arr[i]?.userId < Arr[j]?.userId) {
                    let temp = Arr[i];
                    Arr[i] = Arr[j];
                    Arr[j] = temp;
                }
            }
        }
    } else if (option == "generation") {
        for (let i = 0; i < Arr.length - 1; i++) {
            for (let j = i + 1; j < Arr.length; j++) {
                if (Arr[i]?.generation < Arr[j]?.generation) {
                    let temp = Arr[i];
                    Arr[i] = Arr[j];
                    Arr[j] = temp;
                }
            }
        }
    } else if (option == "studentId") {
        for (let i = 0; i < Arr.length - 1; i++) {
            for (let j = i + 1; j < Arr.length; j++) {
                if (parseInt(Arr[i]?.studentId) > parseInt(Arr[j]?.studentId)) {
                    let temp = Arr[i];
                    Arr[i] = Arr[j];
                    Arr[j] = temp;
                }
            }
        }
    }
}

//pgaination 구현
function showPagination() {
    let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>
                </li>`;
    let pageGroup = Math.ceil(currentPage / 5);
    let last_num = pageGroup * 5;
    if (last_num > totalPage) {
        last = totalPage;
    }

    let first_num = last_num - 4 <= 0 ? 1 : last_num - 4;
    for (let i = first_num; i <= last_num; i++) {
        pageHTML += `<li class="page-item ${currentPage == i ? "active" : ""}"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`;
    }

    pageHTML += `<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>
                </li>`;

    document.querySelector("#pagination-bar").innerHTML = pageHTML;
}

function movePage(pageNum) {
    if (pageNum > totalPage) return;
    //이동할 페이지가 이미 그 페이지라면
    if (currentPage === pageNum) return;
    currentPage = pageNum;
    doFetch();
    showPagination();
}

function moveNextPage() {
    //넘길페이지가 전체 페이지보다 클경우 그냥 return
    if (currentPage >= totalPage) return;
    currentPage++;
    doFetch();
    showPagination();
}

function movePreviousPage() {
    //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
    if (currentPage <= 1) return;
    currentPage--;
    doFetch();
    showPagination();
}
//옵션이 선택 될 때 목록 다시 그림
function onClick(event) {
    if (event.target.id === "inlineRadio0") sortOption = "created";
    else if (event.target.id === "inlineRadio1") sortOption = "generation";
    else if (event.target.id === "inlineRadio2") sortOption = "studentId";
    sortArr(userArr, sortOption);
    drawUserList(userArr);
}
//페이지네이션 할 때 옵션 체크
function optionCheck(option) {
    if (radio0.checked) {
        option = "created";
    } else if (radio1.checked) {
        option = "generation";
    } else if (radio2.checked) {
        option = "studentId";
    }
}
radio0.addEventListener("click", onClick);
radio1.addEventListener("click", onClick);
radio2.addEventListener("click", onClick);

doFetch();
showPagination();
