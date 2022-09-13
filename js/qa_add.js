const qa_title = document.querySelector("#title");
const qa_content = document.querySelector("#content");
//const QaForm = document.querySelector("#putQaForm");
let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });
const flexCheckDefault = document.querySelector("#flexCheckDefault");
let user_type1 = localStorage.getItem("userType");

if (user_type1 === "anonymous") {
  flexCheckDefault.checked = false;
}

async function qaSubmit() {
  let user_id = localStorage.getItem("userId");

  const sendData = {
    title: qa_title.value,
    content: qa_content.value,
    userId: user_id,
    onlyMember: flexCheckDefault.checked,
    category: "qna",
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-pocs-session-token": sessionToken,
    },
    body: JSON.stringify(sendData),
  };

  const response = await fetch("http://34.64.161.55:80/api/posts", options);
  const result = await response.json();
  console.log(result);

  if (result.status === 201) {
    window.location.href = "../html/qa.html";
  } else {
    console.log(result.message);
  }
}

// async function qaSubmit(event) {
//     event.preventDefault();
//     let user_id = localStorage.getItem("userId");
//     console.log(user_id);
//     const sendData = {
//         title: qa_title.value,
//         content: qa_content.value,
//         userId: user_id,
//         onlyMember: flexCheckDefault.checked,
//         category: "qna",
//     };

//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             'x-pocs-session-token' : sessionToken
//         },
//         body: JSON.stringify(sendData),
//     };
//     console.log(sendData);
//     const response = await fetch("http://34.64.161.55:80/api/posts", options);
//     const result = await response.json();
//     console.log(result);

//     if (result.status === 201) {
//         window.location.href = "../html/qa.html";
//     } else {
//         console.log(result.message);
//     }
// }

// QaForm.addEventListener("submit", qaSubmit);
