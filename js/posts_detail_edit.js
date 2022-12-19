const Url = window.location.href;
const arr = Url.split("?postId=");
const id = arr[1];
const url = `http://${process.env.DEV_API_KEY}:80/api/posts/${id}`;
let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

//공지사항 제목, 공지사항 내용 가져오기
const notice_title = document.querySelector("#title");
const post_content = document.querySelector("#editContent");
const flexCheckDefault = document.querySelector("#flexCheckDefault");
let user_Id;

let category;

window.postEdit = postEdit;

function PostEditPage() {
  fetch(url, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      notice_title.value = `${data.data.title}`;
      post_content.value = `${data.data.content}`;
      flexCheckDefault.checked = data.data.onlyMember;
      user_Id = data.data.writer.userId;
      category = data.data.category;
      console.log(user_Id);
    });
}

//게시글 수정하기 버튼 눌렀을때 호출되는 함수
async function postEdit() {
  if (category === "추억") category = "memory";
  else if (category === "추천") category = "reference";
  else if (category === "스터디") category = "study";
  else if (category === "노하우") category = "knowhow";

  const sendData = {
    userId: user_Id,
    title: notice_title.value,
    content: post_content.value,
    onlyMember: flexCheckDefault.checked,
    category: category,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-pocs-session-token": sessiontoken,
    },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `http://${process.env.DEV_API_KEY}:80/api/posts/${id}`,
    options
  );
  const result = await response.json();
  if (result.status === 302) {
    backToPostList();
  } else {
    console.log(result.message);
  }
}

//목록으로 버튼을 누르면 다시 공지사항목록으로 복귀
function backToPostList() {
  window.location.href = "../html/posts.html";
}

PostEditPage();
