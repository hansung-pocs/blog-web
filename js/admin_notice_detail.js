const Url = window.location.href;
const arr = Url.split("?postId=");
const notice_Id = arr[1];

const notice_detail = document.querySelector(".notice-detail");
const notice_title_first = document.querySelector(".notice-title-first");
const notice_title_second = document.querySelector(".notice-title-second");
const notice_detail_content = document.querySelector(".notice-detail-content");

//공지사항 제목, 공지사항 내용 가져오기
const notice_title = document.querySelector("#title");
const notice_content = document.querySelector("#content");
const admin_notice_buttons = document.querySelector("#admin-notice-buttons");
const flexCheckDefault = document.querySelector("#flexCheckDefault");

const d_url = `http://34.64.161.55:80/api/posts/${notice_Id}`;
let sessiontoken = localStorage.getItem("sessionToken");
const userId = localStorage.getItem("userId");
let writerId;
let header = new Headers({ "x-pocs-session-token": sessiontoken });

//공지사항 수정때 쓰일 변수들
let present_page_title;
let present_page_content;
let category;

function fetchAdminNotice() {
  fetch(d_url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.status === 404) {
        notice_title_first.innerHTML = `삭제된 게시글입니다.`;
        admin_notice_buttons.classList.add("hidden");
      } else {
        notice_title_first.innerHTML = `<h3>${data.data.title}</h3>`;
        notice_title_second.innerHTML = `<div>${data.data.category}  |</div>
            <div> ${data.data.createdAt}  | </div>
            <div> ${data.data.updatedAt || ""}  | </div>
            <div> ${data.data.writer.name || "익명"} </div>
            `;
        notice_detail_content.innerHTML = `<div>${data.data.content}</div>`;

        present_page_title = data.data.title;
        present_page_content = data.data.content;
        category = data.data.category;
        writerId = data.data.writer.userId;
      }
    });
}

//공지사항 수정 페이지
function noticeEditPage() {
  const notice_edit = document.querySelector(".notice-edit");
  notice_edit.classList.remove("hidden");
  notice_detail.classList.add("hidden");

  notice_title.value = present_page_title;
  notice_content.value = present_page_content;
}

//공지사항 수정하기 버튼 눌렀을때 호출되는 함수
async function noticeEdit() {
  if (category === "추억") category = "memory";
  else if (category === "추천") category = "reference";
  else if (category === "스터디") category = "study";
  else if (category === "노하우") category = "knowhow";

  const sendData = {
    title: notice_title.value,
    content: notice_content.value,
    userId: writerId,
    onlyMember: flexCheckDefault.checked,
    category: category,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-pocs-session-token": sessionToken,
    },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `http://34.64.161.55:80/api/posts/${notice_Id}`,
    options
  );
  const result = await response.json();
  if (result.status === 302) {
    backToAdminPage();
  } else {
    console.log(result.message);
  }
}

//공지사항 삭제하기
async function DeleteNotice() {
  const sendData = {
    userId: userId,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-pocs-session-token": sessionToken,
    },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `http://34.64.161.55:80/api/posts/${notice_Id}/delete`,
    options
  );
  const result = await response.json();
  console.log(result.status);

  //삭제 성공(result.status===201)하면
  if (result.status === 201) {
    backToAdminPage();
  } else {
    console.log(result.message);
  }
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToAdminPage() {
  window.location.href = "../html/admin.html";
}

fetchAdminNotice();
