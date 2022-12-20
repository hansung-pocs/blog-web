import { makeUrl } from "./common/util";

const usersDiv = document.querySelector("#usersDiv");
const radio0 = document.querySelector("#inlineRadio0");
const radio1 = document.querySelector("#inlineRadio1");
const radio2 = document.querySelector("#inlineRadio2");
const search = document.querySelector("#user_search"); //검색
const userNum = document.querySelector("#userNum");

//유저 데이터와 정렬에 대한 변수
let userArr;
let sortOption;

//pagination에 필요한 변수
const offset = 9;
let currentPage = 1;
let totalPage;

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });
console.log(sessiontoken);

window.btnClick = btnClick;
window.movePage = movePage;
window.moveNextPage = moveNextPage;
window.movePreviousPage = movePreviousPage;
window.checktoGoDetailPage = checktoGoDetailPage;

function btnClick() {
  const name = document.getElementById("searchUser").value;
  searchName(name);
}

async function doFetch(url) {
  await fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.data.users === null) {
        usersDiv.innerHTML = "<div>유저를 추가 하세요.</div>";
      } else {
        //받은 데이터로 유저 목록 그리기
        userArr = data.data.users;
        totalPage = Math.ceil(data.data.countAllUsers / 9);
        optionCheck(sortOption);
        sortArr(userArr, sortOption);
        drawUserList(userArr);
        userNum.innerHTML = `(${data.data.countAllUsers})`;
      }
    });
  await showPagination();
}
//유저 목록 그리기
/// Arr[i]?.->Uncaught TypeError: Cannot read properties of undefined 에러를 막기 위한 것(Optional Chaining)
function drawUserList(Arr) {
  console.log(Arr);
  usersDiv.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    if (Arr[i] == undefined) continue;
    let profilePath;
    if (Arr[i]?.defaultInfo.userProfilePath != null) {
      profilePath = makeUrl(`${Arr[i]?.defaultInfo.userProfilePath}`);
      console.log(profilePath);
    } else {
      profilePath = "../img/profile.png";
    }
    usersDiv.innerHTML += `
            <div class="col-3 p-4 m-2" onclick="checktoGoDetailPage(${
              Arr[i]?.userId
            })" 
                    style="cursor:pointer;text-align: center;border: solid white 1px;border-radius: 10px;box-shadow:0px 1px 3px 1px gray">
                    <img class="w-50" src=${profilePath} style="width:140px;height:140px;object-fit: cover">
                    <div class="my-1" style="font-size: large"><b>${
                      Arr[i]?.defaultInfo.name || "비회원"
                    }</b></div>
                    <div class="my-1"><b>${
                      Arr[i]?.defaultInfo.generation
                    }기</b></div>
                    <div class="my-1">${Arr[i]?.defaultInfo.studentId}</div>
                    <div class="my-1">
                        <span title="${Arr[i]?.defaultInfo.email}" class="me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                            </svg>
                        </span>
                        <a href="${
                          Arr[i]?.defaultInfo.github
                        }" style="color: inherit;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </a>
                    </div>
            </div>
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
        if (Arr[i]?.defaultInfo.generation < Arr[j]?.defaultInfo.generation) {
          let temp = Arr[i];
          Arr[i] = Arr[j];
          Arr[j] = temp;
        }
      }
    }
  } else if (option == "studentId") {
    for (let i = 0; i < Arr.length - 1; i++) {
      for (let j = i + 1; j < Arr.length; j++) {
        if (
          parseInt(Arr[i]?.defaultInfo.studentId) >
          parseInt(Arr[j]?.defaultInfo.studentId)
        ) {
          let temp = Arr[i];
          Arr[i] = Arr[j];
          Arr[j] = temp;
        }
      }
    }
  }
}

async function render() {
  await doFetch(makeUrl(`api/users?offset=${offset}&pageNum=${currentPage}`));
  showPagination();
}

//pgaination 구현
function showPagination() {
  let pageHTML = `<ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>
                </li>`;
  let pageGroup = Math.ceil(currentPage / 5);
  let last = pageGroup * 5;
  if (last > totalPage) {
    // 마지막 그룹이 5개 이하이면
    last = totalPage;
  }

  let first_num = last - 4 <= 0 ? 1 : last - 4;
  for (let i = first_num; i <= last; i++) {
    pageHTML += `<li class="page-item ${
      currentPage == i ? "active" : ""
    }"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`;
  }

  pageHTML += `<li class="page-item">
                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>
                </li>`;

  document.querySelector("#pagination-bar").innerHTML = pageHTML;
}

async function movePage(pageNum) {
  if (pageNum > totalPage) return;
  //이동할 페이지가 이미 그 페이지라면
  if (currentPage === pageNum) return;
  currentPage = pageNum;
  render();
}

async function moveNextPage() {
  if (currentPage >= totalPage) return;
  //넘길페이지가 전체 페이지보다 클경우 그냥 return
  currentPage++;
  render();
}

async function movePreviousPage() {
  //뒤로갈페이지가 1보다 작거나 같을경우 그냥 return
  if (currentPage <= 1) return;
  currentPage--;
  render();
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

function checktoGoDetailPage(Id) {
  let user_type = localStorage.getItem("userType");
  if (user_type === null) {
    alert("블로그 회원만 조회 가능합니다.");
  } else {
    window.location.href = `user_detail.html?userId=${Id}`;
  }
}
radio0.addEventListener("click", onClick);
radio1.addEventListener("click", onClick);
radio2.addEventListener("click", onClick);

async function searchName(name) {
  await doFetch(
    makeUrl(`api/users?search=${name}&offset=${offset}&pageNum=${currentPage}`)
  );
}

doFetch(makeUrl(`api/users?offset=${offset}&pageNum=${currentPage}`));
