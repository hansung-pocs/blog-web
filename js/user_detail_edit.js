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

const img = document.querySelector("#user_detail_edit_img");
const img_input = document.querySelector("#user_detail_edit_img_input");
const img_preview = document.querySelector("#user_detail_edit_img_preview");

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
      img_preview.src="../img/logo.png"; //받아올 사진이 있으면 받아와서 url

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
  let formData = new FormData();
  if(img_input.files[0]==null)
    formData=null;
  else if(img_input.files.length>1){
    alert('1개의 이미지만 선택해주세요.');
    return;
  } else{
    let file=img_input.files[0];
    if(!file.type.match("image/.*")){
      alert('jpg나 png 파일이 아닙니다.');
      return;
    }
    else if(file.size>1000000){
      alert('이미지의 크기가 10mb 이상입니다. ');
      return;
    }
    else{
      formData.append('file',file);
      console.log('append');
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
      "x-pocs-session-token": sessionToken,
    },
    body: JSON.stringify(sendData),
  };

  const response = await fetch(
    `http://34.64.161.55:80/api/users/${id}`,
    options
  );
  const result = await response.json();
  console.log(result);

  if(formData!=null){
    const sendImg = {
      image:formData
    }

    const options2 = {
      method: "PATCH",
      headers: {
        "Content-Type": 'multipart/form-data',//"",//"application/json",
        "x-pocs-session-token": sessionToken,
      },
      body: JSON.stringify(sendImg),
    };
    //console.log(options);
    const response2 = await fetch(
        `http://34.64.161.55:80/api/users/${id}/profile`,
        options2
    );
    const result2 = await response2.json();
    console.log(result2);
  }

  // if (result.status !== 302) {
  //   //에러 발생시
  //   window.location.href = "../html/user_detail.html?userId=" + id;
  // } else {
  //   //잘 되었다면
  //   console.log(result.message);
  //   window.location.href = "../html/user_detail.html?userId=" + id; ////편집후 바로 이전화면으로
  // }
});
//유저 정보 수정을 취소하는 버튼 이벤트
cancelBtn.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "../html/user_detail.html?userId=" + id;
});
//업로드한 이미지 미리보기
img_input.addEventListener("change",function (event){
  // console.log("eventListener",img_input);
  // console.log(img_input.files);
  let reader = new FileReader();
  let AA= event.target.files[0];
  reader.onload = function(event) {
    img_preview.src=event.target.result;
    //console.log(event.target.result);
  };
  reader.readAsDataURL(AA);
})