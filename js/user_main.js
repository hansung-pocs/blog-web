const user_url =`http://34.64.161.55:8001/users?offset=5&pageNum=1`;
let sessiontoken = localStorage.getItem("sessionToken");

//정보
const user_main =document.querySelector("#user-main");
let header = new Headers({'x-pocs-session-token' : sessiontoken});
fetch(user_url, {headers : header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.data === null){
            console.log('존재하지 않는 유저입니다.');
        }
        else{
            for(let i=0; i<5; i++){
                user_main.innerHTML+=
                    `
            <div class="col" style="text-align: center;">
                <img src="../img/profile.png" style="width:100px;" class="rounded-pill">
                    <div>
                        <div id="user_main_userName">${data.data.users[i].name}</div>
                        <div id="user_main_generation">${data.data.users[i].generation}</div>
                    </div>
            </div>
            `
            }
        }
    })