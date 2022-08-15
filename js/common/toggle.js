const validationUrl = "http://34.64.161.55:8001/auth/validation";
const logoutUrl = "http://34.64.161.55:8001/auth/logout";
const toggle = document.getElementById("toggle");
const sessionToken = localStorage.getItem("sessionToken");
const toggleDetail = document.getElementById("toggleDetail");
const navItem = document.getElementById("navItem");
const adminBtn = document.getElementById("adminBtn");

async function handleToggle(event){
    event.preventDefault();

    if(!toggle.classList.contains("show")){
        return;
    }

    if(sessionToken != null){
        let user = await handleValidation(sessionToken);
        if(user.userId != null){
            settingToggle(user.userId);    
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
        console.log(result.data.user);
        return result.data.user;
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
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        window.location.href = "../html/main.html"
        alert("로그아웃 되었습니다.")
    }
    else{
        console.log(result.message);
    }
}

async function handleNavigation(){
    if(sessionToken != null){
        let user = await handleValidation(sessionToken);
        if(user.type === "admin"){
            console.log(user.type);
            //관리자 메뉴
            // const li = document.createElement("li");
            // li.classList = "nav-item";
            // const a = document.createElement("a");
            // a.href="../html/admin.html";
            // a.classList= "nav-link";
            // a.innerText="Admin";
            // li.appendChild(a);
            // navItem.appendChild(li);    

            adminBtn.classList.toggle("hidden");
            try{
                const noticeBtn = document.getElementById("noticeBtn");
                noticeBtn.classList.toggle("hidden");
            }
            catch{

            }
            try{
                const noticeEditBtn = document.getElementById("noticeEditBtn");
                noticeEditBtn.classList.toggle("hidden");
            }
            catch{

            }
        }
    }
}

window.addEventListener("load", handleNavigation);
toggle.addEventListener("click", handleToggle);
