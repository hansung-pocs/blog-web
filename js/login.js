const url = "http://34.64.161.55:8001/auth/login";

const username = document.getElementById("floatingInput");
const password = document.getElementById("floatingPassword");
const loginForm = document.getElementById("loginForm");

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
        window.location.href = '../html/main.html';
    }
    else{
        console.log("로그인 실패");
    }
}

loginForm.addEventListener("submit", login);

