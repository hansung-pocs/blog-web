const validationUrl = "http://34.64.161.55:8001/auth/validation";
const logoutUrl = "http://34.64.161.55:8001/auth/logout";
const toggle = document.getElementById("toggle");
const sessionToken = localStorage.getItem("sessionToken");
const toggleDetail = document.getElementById("toggleDetail");
//const logoutBtn = document.getElementById("logoutBtn");

async function handleToggle(event){
    event.preventDefault();

    if(!toggle.classList.contains("show")){
        return;
    }

    if(sessionToken != null){
        let userId = await handleValidation(sessionToken);
        if(userId != null){
            settingToggle(userId);    
        }
        else{
            console.log("유효하지 않은 토큰입니다.");
        }
    }
    else{
        settingToggle("loginFirst");
    }
}

async function handleValidation(token){
    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'x-pocs-session-token' : token
        }
    };

    const response = await fetch(validationUrl, options);
    const result = await response.json();

    console.log(result);

    if(result.status === 200){
        console.log(result.data.userId);
        return result.data.userId;
    }
    else{
        console.log(result.message);
        return false;
    }
}

function settingToggle(userId){
    if(userId === "loginFirst"){
        toggleDetail.innerHTML = `<li><a class="dropdown-item" href="../html/index.html">로그인</a></li>`;
    }
    else{
        toggleDetail.innerHTML = 
        `
            <li><a class="dropdown-item" href="../html/user_detail_edit.html?userId=${userId}">내 정보 수정</a></li>
            <li><a class="dropdown-item" href="#" onclick="handleLogout()">로그아웃</a></li>
        `;
    }
}

async function handleLogout(event){
    //event.preventDefault();

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'x-pocs-session-token' : sessionToken
        }
    };

    const response = await fetch(logoutUrl, options);
    const result = await response.json();

    console.log(result);

    if(result.status === 200){
        localStorage.removeItem("sessionToken");
        alert("로그아웃 되었습니다.")
        window.location.href = "../html/main.html"
    }
    else{
        console.log(result.message);
    }
}

toggle.addEventListener("click", handleToggle);
//logoutBtn.addEventListener("click", handleLogout)