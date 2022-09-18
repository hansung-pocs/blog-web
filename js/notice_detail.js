const Url = window.location.href;
const arr = Url.split("?postId=");
const id = arr[1];
console.log(id);

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

//공지사항 상세페이지 구현
async function NoticeDetailPage() {
  const notice_title_first = document.querySelector(".notice-title-first");
  const notice_title_second = document.querySelector(".notice-title-second");
  const notice_detail_content = document.querySelector(
    ".notice-detail-content"
  );
  const d_url = `http://34.64.161.55:80/api/posts/${id}`;

  await fetch(d_url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === 403 || data.status === 404 || data.status === 500) {
        notice_title_first.innerHTML = "삭제되었거나 없는 게시글입니다.";
        notice_title_second.innerHTML = "";
        posts_buttons.classList.add("hidden");
      } else {
        notice_title_first.innerHTML = `<h3>[<span id="title_category">${data.data.category}</span>]${data.data.title}</h3>`;
        notice_title_second.innerHTML = `
                <div class="me-2">${
                  data.data.onlyMember ? "회원 전용 | " : ""
                }</div>
                <div class="me-2">${
                  data.data.updatedAt || data.data.createdAt
                }</div>
                <div class="me-2"> ${data.data.writer.name} </div>
                <div>조회수 ${data.data.views}</div>
                `;
        notice_detail_content.innerHTML = `<div style="min-height: 200px">${marked.parse(
          data.data.content
        )}</div>`;
        userId = data.data.writer.userId;
        qaWriterId = "";
      }
    });
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
    `http://34.64.161.55:80/api/posts/${id}/delete`,
    options
  );
  const result = await response.json();
  console.log(result.status);

  //삭제 성공(result.status===201)하면
  if (result.status === 201) {
    backToList();
  } else {
    console.log(result.message);
  }
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToList() {
  window.location.href = "../html/notices.html";
}

//공지사항 수정 페이지
function gotoNoticeEditPage() {
  window.location.href = `../html/notices_detail_edit.html?postId=${id}`;
}

NoticeDetailPage();
