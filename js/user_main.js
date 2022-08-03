const user_url = new URL("http://34.64.161.55:8001/users");

//정보
const userName = document.querySelector("#user_main_userName");
const generation =document.querySelector("#user_main_generation");
const tbody =document.querySelector("#user_main")
fetch(user_url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.data === null){
            console.log('존재하지 않는 유저입니다.');
        }
        else{
            for(let i=0; i<data.data.users.length; i++){
                tbody.innerHTML+=
            `
            <div class="col" style="text-align: center;">
                <img src="../img/profile.png" style="width:100px;" class="rounded-pill">
                    <div>
                        <div id="user_main_userName">${data.data.users[i].userName}</div>
                        <div id="user_main_generation">${data.data.users[i].generation}</div>
                    </div>
            </div>
            `   
            }
            
        }
    })

