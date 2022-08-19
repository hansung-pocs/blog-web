const sign_up_id = document.querySelector("#sign-up-id");
const sign_up_pw = document.querySelector("#sign-up-pw");
const sign_up_form = document.querySelector("#sign-up-form");
const login_id = document.querySelector("#login-id");
const login_pw = document.querySelector("#login-pw");
const login_form = document.querySelector("#login-form");
const qa_title = document.querySelector("#title");
const qa_content = document.querySelector("#content");
const QaForm = document.querySelector("#putQaForm");
const sessionToken = localStorage.getItem("sessionToken");

if(localStorage.getItem("userType") === "비회원") {
  sign_up_form.innerHTML = "";
  login_form.innerHTML = "";
}

async function SignUpNonMember(event) {
    event.preventDefault();
    const sendData = {
        userName: non_member_id.value,
        password: non_member_pw.value,
    };

    console.log(sendData);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'x-pocs-device-type' : 'web'
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch("http://34.64.161.55:8001/users", options);
    const result = await response.json();

    console.log(result);

    if (result.status === 201) {
        // localStorage.setItem("sessionToken", result.data.sessionToken)
        sign_up_form.innerHTML = `<b>${non_member_id.value}님 비회원 등록 완료.</b>`;
    } else {
        alert("다시 입력해주세요");
        console.log("비회원 회원가입 실패");
    }
}

async function login(event) {
    event.preventDefault();
    const sendData = {
        username: login_id.value,
        password: login_pw.value,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-pocs-device-type": "web",
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch("http://34.64.161.55:8001/auth/login", options);
    const result = await response.json();

    console.log(result);

    if (result.status === 200) {
        localStorage.setItem("sessionToken", result.data.sessionToken);
        localStorage.setItem("userId", result.data.user.userId);
        localStorage.setItem("userType", result.data.user.type);
        console.log("비회원 로그인 성공");
        login_form.innerHTML = `<b>${login_id.value}님 환영합니다.</b>`;
    } else {
        console.log("비회원 로그인 실패");
    }
}

async function qaSubmit(event) {
    event.preventDefault();
    let user_id = localStorage.getItem("userId");
    console.log(user_id);
    const sendData = {
        title: qa_title.value,
        content: qa_content.value,
        userId: user_id,
        category: "QNA",
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'x-pocs-session-token' : sessionToken
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch("http://34.64.161.55:8001/posts", options);
    const result = await response.json();
    console.log(result);

    if (result.status === 201) {
        window.location.href = "../html/qa.html";
    } else {
        console.log(result.message);
    }
}

sign_up_form.addEventListener("submit", SignUpNonMember);
login_form.addEventListener("submit", login);
QaForm.addEventListener("submit", qaSubmit);

