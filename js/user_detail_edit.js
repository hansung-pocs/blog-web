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
const showImage = document.querySelector("#show-image");
const uploadImage = document.querySelector("#upload-image");
const formData = new FormData();
let imageFlag = 0;
let currentImage;

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
            currentImage = `${data.data.defaultInfo.userProfilePath}`;
            if(data.data.defaultInfo.userProfilePath !== null) {
                showImage.innerHTML = `<img src="http://34.64.161.55${data.data.defaultInfo.userProfilePath}" alt="..." style="width: 200px; height: 200px"/>`;
            }
            if (data.data.defaultInfo.company == "-" || data.data.defaultInfo.company == "undefined" || data.data.defaultInfo.company == null) company.value = ``;
            else company.value = `${data.data.defaultInfo.company}`;
            if (data.data.defaultInfo.github == "-" || data.data.defaultInfo.github == "undefined" || data.data.defaultInfo.github == null) github.value = ``;
            else github.value = `${data.data.defaultInfo.github}`;
        }
    });
// 이미지 검사, 이미지 선택시 화면에 보여주는 함수
function checkImage(file) {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("jpeg/png 타입이 아닙니다");
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        alert("파일 사이즈 10mb 초과입니다");
    }
    // 업로드 한 이미지를 화면에 보여주는 부분
    const reader = new FileReader();
    reader.onload = (e) => {
        showImage.innerHTML = `<img src="${e.target.result}" alt="..." style="width: 200px; height: 200px"/>`;
    };
    reader.readAsDataURL(file);
    formData.append("image", file);
}
async function patchImg() {
    const options = {
        method: "PATCH",
        headers: {
            // "Content-Type": 'multipart/form-data',
            "x-pocs-session-token": sessionToken,
        },
        body: formData,
    };
    const response = await fetch(`http://34.64.161.55:80/api/users/${id}/profile`, options);
    const result = await response.json();
    console.log(result);

    if (result.status !== 200) {
        //에러 발생시
        alert(result.message);
    } else {
        //잘 되었다면
        window.location.href = "../html/user_detail.html?userId=" + id; ////편집후 바로 이전화면으로
    }   
}
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
            "x-pocs-session-token": sessionToken,
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch(`http://34.64.161.55:80/api/users/${id}`, options);
    const result = await response.json();
    console.log(result);
    
    if (result.status !== 200) {
        // 오류시 오류메시지 alert후 화면 안넘어감
        alert(result.message);
    } else {
        if(imageFlag == 1) {
            // null to new image && current image to new image
            patchImg();
        } else if(currentImage !== null && imageFlag == 0){
            // current image to null
            formData.append("image", null);
            patchImg();
        } else {
            // null to null
            window.location.href = "../html/user_detail.html?userId=" + id; //편집후 바로 이전화면으로
        }
    }
});
//유저 정보 수정을 취소하는 버튼 이벤트
cancelBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "../html/user_detail.html?userId=" + id;
});
// 파일 선택시 이벤트
uploadImage.addEventListener("change", () => {
    checkImage(uploadImage.files[0]);
    imageFlag = 1;
});
