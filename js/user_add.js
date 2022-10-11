const userName = document.querySelector("#user_detail_edit_userName");
const passWord = document.querySelector("#user_detail_edit_password");
const name = document.querySelector("#user_detail_edit_Name");
const email = document.querySelector("#user_detail_edit_email");
const studentId = document.querySelector("#user_detail_edit_studentId");
const generation = document.querySelector("#user_detail_edit_generation");
const company = document.querySelector("#user_detail_edit_company");
const github = document.querySelector("#user_detail_edit_github");
const addBtn = document.querySelector("#addBtn");
const dataForm = document.querySelector("#dataForm");

let sessiontoken = localStorage.getItem("sessionToken");

const member = "member";

async function addUser(event) {
  event.preventDefault();

  const sendData = {
    userName: userName.value,
    password: passWord.value,
    name: name.value,
    studentId: studentId.value,
    email: email.value,
    generation: generation.value,
    type: member,
    company: company.value,
    github: github.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-pocs-session-token": sessionToken,
    },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `http://${process.env.DEV_API_KEY}:80/api/admin/users`,
    options
  );
  const result = await response.json();
  console.log(result);

  if (result.status === 201) {
    window.location.href = "../html/admin.html";
  } else {
    console.log(result.message);
  }
}

dataForm.addEventListener("submit", addUser);
