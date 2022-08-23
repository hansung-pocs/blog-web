const url = "http://34.64.161.55:8001/auth/login";

const username = document.getElementById("floatingInput");
const password = document.getElementById("floatingPassword");
const loginForm = document.getElementById("loginForm");
const anonymous_checkbox = document.getElementById("anonymous-checkbox");

anonymous_checkbox.addEventListener("click", ()=>{
    if(anonymous_checkbox.checked===true){
        loginForm.addEventListener("submit", register_anonymous);
    }
})

async function register_anonymous(event){
    event.preventDefault();
    const sendData = {
        userName: username.value,
        password: password.value,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'x-pocs-device-type' : 'web'
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch("http://34.64.161.55:8001/users", options);
    const result = await response.json();
    console.log(result);
    if (result.status === 201) {
        anonynous_login();
    } else {
        alert("다시 입력해주세요");
        console.log("비회원 회원가입 실패");
    }
}

async function anonynous_login(event){
    const sendData = {
        username: username.value,
        password: password.value,
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
        window.location.href = '../html/main.html';
    } else {
        console.log("비회원 로그인 실패");
    }
}

async function login(event){
    event.preventDefault();

    const sendData={
        username : username.value,
        password: password.value,
    };

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'x-pocs-device-type' : 'web'
        },
        body : JSON.stringify(sendData)
    };

    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result);

    if(result.status === 200){
        localStorage.setItem("sessionToken", result.data.sessionToken)
        localStorage.setItem("userId", result.data.user.userId);
        localStorage.setItem("userType", result.data.user.type);
        window.location.href = '../html/main.html';

    }
    else{
        console.log("로그인 실패");
    }
}
loginForm.addEventListener("submit", login);

