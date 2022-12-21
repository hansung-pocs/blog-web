import { makeUrl } from "./common/api_util";

const notice_title = document.querySelector("#title");
const notice_content = document.querySelector("#content");
let sessiontoken = localStorage.getItem("sessionToken");
const userId = localStorage.getItem("userId");
const flexCheckDefault = document.querySelector("#flexCheckDefault");

window.noticeSubmit = noticeSubmit;

async function noticeSubmit() {
  const sendData = {
    title: notice_title.value,
    content: notice_content.value,
    userId: userId,
    onlyMember: flexCheckDefault.checked,
    category: "notice",
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-pocs-session-token": sessiontoken,
    },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(makeUrl(`api/posts`), options);
  const result = await response.json();
  console.log(result);

  if (result.status === 201) {
    window.location.href = "./notices.html";
  } else {
    console.log(result.message);
  }
}
