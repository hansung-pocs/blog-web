const Url = window.location.href;
const arr = Url.split("?userId=");
const id = arr[1];
const url = new URL(`http://${process.env.DEV_API_KEY}:80/api/users/` + id);

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
const profileImage = document.getElementById("profileImage");
const basicProfileBtn = document.getElementById("basicProfileBtn");
//useDefaultImage가 true일때만 api를 쏜다.
let useDefaultImage = false;

window.cancelFile = cancelFile;
window.loadFile = loadFile;

function loadFile(input) {
  var file = input.files[0]; //선택된 파일 가져오기
  console.log(file);

  //이미지 사이즈 제한
  if (file.size > 10 * 1024 * 1024) {
    alert("이미지 사이즈는 10MB 이내로 가능합니다.");
    chooseFile.value = null;
    return;
  }
  //이미지만 가능하게
  let point = file.name.lastIndexOf(".");
  let type = file.name.substr(point);
  if (type === ".jpg" || type === ".jpeg" || type === ".png") {
  } else {
    alert(".jpg, .jpeg, .png 파일만 등록 가능합니다.");
    chooseFile.value = null;
    return;
  }

  //미리 만들어 놓은 div에 text(파일 이름) 추가
  var newImage = document.getElementById("profileImage");
  newImage.setAttribute("class", "img");

  //이미지 source 가져오기
  newImage.src = URL.createObjectURL(file);
  console.log(newImage.src);
  newImage.style.width = "200px";
  newImage.style.height = "200px";

  basicProfileBtn.classList.remove("disabled");
  //이미지를 넣었기 때문에 useDefaultImage를 true로 바꿔준다.
  useDefaultImage = true;
}
function cancelFile() {
  //const cancelFile = () => {
  var newImage = document.getElementById("profileImage");
  newImage.src = "../img/logo.png";
  chooseFile.value = null;
  console.log(chooseFile);
  basicProfileBtn.classList.add("disabled");
  //이미지를 기본이미지로 바꿔줬기 때문에 useDefaultImage를 true로 바꿔준다. 그래야 null로 api를 쏜다.
  useDefaultImage = true;
}

const img = document.querySelector("#user_detail_edit_img");
const img_input = document.querySelector("#user_detail_edit_img_input");
const img_preview = document.querySelector("#user_detail_edit_img_preview");
const img_2basic = document.querySelector("#user_detail_edit_img_2basic");
let img2BasicFlag = false;

console.log(sessiontoken);
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

      // if (data.data.defaultInfo.userProfilePath != null) {
      //   img_preview.src = `http://34.64.161.55:80${data.data.defaultInfo.userProfilePath}`;
      //   img.src = `http://34.64.161.55:80"${data.data.defaultInfo.userProfilePath}`;
      // } else {
      //   img_preview.src = "../img/logo.png";
      //   img.src = "../img/logo.png";
      // }

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

      if (data.data.defaultInfo.userProfilePath === null) {
        profileImage.src = "../img/logo.png";
      } else {
        console.log(data.data.defaultInfo.userProfilePath);
        profileImage.src = `http://${process.env.DEV_API_KEY}:80${data.data.defaultInfo.userProfilePath}`;
        basicProfileBtn.classList.remove("disabled");
      }
    }
  });

//저장버튼-업데이트
editForm.addEventListener("submit", async function userEdit(event) {
  event.preventDefault();
  console.log("edit");
  let imageData = new FormData();
  let file;
  if (img_input.files[0] == null) imageData = null;
  else if (img_input.files.length > 1) {
    alert("1개의 이미지만 선택해주세요.");
    return;
  } else {
    file = img_input.files[0];
    if (!file.type.match("image/.*")) {
      alert("jpg나 png 파일이 아닙니다.");
      return;
    } else if (file.size > 1000000) {
      alert("이미지의 크기가 10mb 이상입니다. ");
      return;
    } else {
      imageData.append("image", img_input.files[0]);
      console.log("append");
    }
  }
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
    `http://${process.env.DEV_API_KEY}:80/api/users/${id}`,
    options
  );
  const result = await response.json();

  if (img2BasicFlag || imageData != null) {
    const options2 = {
      method: "PATCH",
      headers: {
        //"Content-Type": 'multipart/form-data;boundary=xxx;',
        "x-pocs-session-token": sessionToken,
      },
      body: imageData,
    };
    console.log(options2);
    const response2 = await fetch(
      `http://${process.env.DEV_API_KEY}:80/api/users/${id}/profile`,
      options2
    );
    const result2 = await response2.json();
    console.log(result2, response2);
  }

  //profile 업로드
  let formData = new FormData();
  formData.append("image", chooseFile.files[0]);

  console.log(chooseFile.files[0]);

  const profileOptions = {
    method: "PATCH",
    headers: {
      //"Content-Type": "multipart/form-data",
      "x-pocs-session-token": sessiontoken,
    },
    body: formData,
  };
  //null일때 api를 쏜다.
  if (useDefaultImage === true) {
    const imageResponse = await fetch(
      `http://${process.env.DEV_API_KEY}:80/api/users/${id}/profile`,
      profileOptions
    );
    const result2 = await imageResponse.json();
    console.log(result2);
  }

  if (result.status !== 302) {
    //에러 발생시
    window.location.href = "../html/user_detail.html?userId=" + id;
  } else {
    //잘 되었다면
    console.log(result.message);
    window.location.href = "../html/user_detail.html?userId=" + id; ////편집후 바로 이전화면으로
  }
});

// //유저 정보 수정을 취소하는 버튼 이벤트
// cancelBtn.addEventListener("click", function (event) {
//   event.preventDefault();
//   window.location.href = "../html/user_detail.html?userId=" + id;
// });
// //업로드한 이미지 미리보기
// img_input.addEventListener("change", function (event) {
//   let reader = new FileReader();
//   let AA = event.target.files[0];
//   reader.onload = function (event) {
//     img_preview.src = event.target.result;
//   };
//   reader.readAsDataURL(AA);
// });
// //미리보기를 기본 이미지로 변경
// //현재 프로필 이미지와 다르면 flag 부여
// img_2basic.addEventListener("click", function (event) {
//   img_preview.src = "../img/logo.png";
//   if (img.src != img_preview.src) img2BasicFlag = true;
// });
