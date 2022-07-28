const Url = window.location.href;
const arr = Url.split("?userId=");
const id = arr[1];
const url = new URL('http://34.64.161.55:8001/users/' + id);

const title = document.querySelector("#user_detail_title");

const editBtn = document.querySelector("#user_detail_editBtn"); //[Login]로그인 정보와 유저 정보가 같아야 보이도록
const editBtn_a = document.querySelector("#user_detail_editBtn a");


//정보
const userName = document.querySelector("#user_detail_userName");
const email = document.querySelector("#user_detail_email");
const studentId =document.querySelector("#user_detail_studentId");
const generation =document.querySelector("#user_detail_generation");
const company =document.querySelector("#user_detail_company");
const github =document.querySelector("#user_detail_github");

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.data === null){
            console.log('존재하지 않는 유저입니다.');
        }
        else{
            title.innerHTML=
            `
                ${data.data.userName}님의 정보
            `
            editBtn_a.href='user_detail_edit.html?userId='+id;

            userName.innerHTML=`${data.data.userName}`;
            email.innerHTML=`${data.data.email}`;
            studentId.innerHTML=`${data.data.studentId}`;
            generation.innerHTML=`${data.data.generation}`;

            if(data.data.company==null ||data.data.company=='undefined') 
                company.innerHTML=`-`;
            else company.innerHTML=`${data.data.company}`;
            if(data.data.company==null ||data.data.company=='undefined') 
                github.innerHTML=`-`;
            else github.innerHTML=`${data.data.github}`;

        }
    })

