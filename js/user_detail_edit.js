const Url = window.location.href;
const arr = Url.split("?userId=");
const id = arr[1];
const url = new URL("http://34.64.161.55:80/api/users/" + id);

let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({ "x-pocs-session-token": sessiontoken });

const title = document.querySelector("#user_detail_edit_title");
const saveBtn = document.querySelector("#user_detail_edit_saveBtn"); //[Login]로그인 정보와 유저 정보가 같아야 보이도록
const cancelBtn = document.querySelector("#user_detail_edit_cancelBtn");

//정보
const userName = document.querySelector("#user_detail_edit_userName");
const password = document.querySelector("#user_detail_edit_password");
const email = document.querySelector("#user_detail_edit_email");
const studentId = document.querySelector("#user_detail_edit_studentId");
const generation = document.querySelector("#user_detail_edit_generation");
const company = document.querySelector("#user_detail_edit_company");
const github = document.querySelector("#user_detail_edit_github");
const editForm = document.querySelector("#editForm");
const chooseFile = document.getElementById("chooseFile");

let formData = new FormData();

function loadFile(input) {
  var file = input.files[0]; //선택된 파일 가져오기
  console.log(file);

  formData.append("image", file);

  //미리 만들어 놓은 div에 text(파일 이름) 추가
  var newImage = document.getElementById("profileImg");
  newImage.setAttribute("class", "img");

  //이미지 source 가져오기
  newImage.src = URL.createObjectURL(file);
  console.log(newImage.src);
  newImage.style.width = "200px";
  newImage.style.height = "200px";

  var cancelImage = document.getElementById("cancelImage");
  cancelImage.classList.remove("hidden");
}

const cancelFile = () => {
  var newImage = document.getElementById("profileImg");
  newImage.src = "../img/logo.png";
  chooseFile.value = null;
  console.log(chooseFile);
  var cancelImage = document.getElementById("cancelImage");
  cancelImage.classList.add("hidden");
};

fetch(url, { headers: header })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.status === 403) {
      title.innerHTML = `${data.message}`;
      editForm.classList.add("hidden");
    } else {
      title.innerHTML = `
                ${data.data.defaultInfo.name}님의 정보 수정
            `;
      userName.value = `${data.data.defaultInfo.name}`;
      email.value = `${data.data.defaultInfo.email}`;
      studentId.innerHTML = `${data.data.defaultInfo.studentId}`;
      generation.innerHTML = `${data.data.defaultInfo.generation}`;

      if (
        data.data.defaultInfo.company == "-" ||
        data.data.defaultInfo.company == "undefined" ||
        data.data.defaultInfo.company == null
      )
        company.value = ``;
      else company.value = `${data.data.defaultInfo.company}`;
      if (
        data.data.defaultInfo.github == "-" ||
        data.data.defaultInfo.github == "undefined" ||
        data.data.defaultInfo.github == null
      )
        github.value = ``;
      else github.value = `${data.data.defaultInfo.github}`;
    }
  });

//저장버튼-업데이트
editForm.addEventListener("submit", async function userEdit(event) {
  event.preventDefault();
  console.log("edit");
  const sendData = {
    password: password.value,
    name: userName.value,
    email: email.value,
    github: github.value,
    company: company.value,
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
    `http://34.64.161.55:80/api/users/${id}`,
    options
  );
  const result = await response.json();
  console.log(result);

  //profile 업로드
  // let formData = new FormData();
  // formData.append("image", chooseFile.files[0]);

  //console.log(chooseFile.files[0]);

  const profileOptions = {
    method: "PATCH",
    header: {
      //"Content-Type": "multipart/form-data",
      "x-pocs-session-token": sessiontoken,
    },
    body: formData,
  };

  const imageResponse = await fetch(
    `http://34.64.161.55:80/api/users/${id}/profile`,
    profileOptions
  );
  const result2 = await imageResponse.json();
  console.log(result2);

  // if (result.status !== 302) {
  //   //에러 발생시
  //   window.location.href = "../html/user_detail.html?userId=" + id;
  // } else {
  //   //잘 되었다면
  //   console.log(result.message);
  //   window.location.href = "../html/user_detail.html?userId=" + id; ////편집후 바로 이전화면으로
  // }
});

//저장버튼-업데이트
// editForm.addEventListener("submit",async function userEdit(event){
//     event.preventDefault();
//     console.log('edit');

//     const body=JSON.stringify({
//         password: password.value,
//         name:userName.value,
//         email:email.value,
//         github:github.value,
//         company:company.value,
//     });

//     let formData = new FormData();
//     formData.append('body', body);
//     formData.append('files', chooseFile.files[0]);

//     console.log(formData);

//     const options = {
//         method : 'PATCH',
//         headers : {
//             'x-pocs-session-token' : sessionToken
//         },
//         body : formData
//     };

//     const response = await fetch(`http://34.64.161.55:8001/users/${id}`, options);
//     const result = await response.json();
//     console.log(result);

//     if(result.status !==302){ //에러 발생시
//         window.location.href = '../html/user_detail.html?userId='+id;

//     }
//     else{ //잘 되었다면
//         console.log(result.message);
//         window.location.href = '../html/user_detail.html?userId='+id;////편집후 바로 이전화면으로
//     }
// });

//유저 정보 수정을 취소하는 버튼 이벤트
cancelBtn.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "../html/user_detail.html?userId=" + id;
});
