const Url = window.location.href;
const arr = Url.split("?userId=");
const id = arr[1];

const user_detail_url = new URL('http://34.64.161.55:8001/admin/users/' + id);
let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({'x-pocs-session-token' : sessiontoken});

const title = document.querySelector("#user_detail_title");
const editBtn_a = document.querySelector("#user_detail_editBtn a");

//정보
const userName = document.querySelector("#user_detail_userName");
const email = document.querySelector("#user_detail_email");
const studentId =document.querySelector("#user_detail_studentId");
const generation =document.querySelector("#user_detail_generation");
const company =document.querySelector("#user_detail_company");
const github =document.querySelector("#user_detail_github");

fetch(user_detail_url, {headers : header})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.status ===403){
            title.innerHTML=`존재하지 않은 회원입니다.`
            userName.innerHTML="";
            email.innerHTML="";
            studentId.innerHTML="";
            generation.innerHTML="";
            company.innerHTML="";
            github.innerHTML="";
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
                company.innerHTML=``;
            else company.innerHTML=`${data.data.company}`;
            if(data.data.company==null ||data.data.company=='undefined')
                github.innerHTML='';
            else github.innerHTML=`${data.data.github}`;

        }
    })

function backToAdminPage(){
    window.location.href = '../html/admin.html'
}

async function userKick(){

    const today = new Date();

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2)
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);

    const sendData={
        canceldAt : `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    };

    const options = {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json',
            'x-pocs-session-token' : sessionToken
        },
        body : JSON.stringify(sendData)
    };

    const response = await fetch(`http://34.64.161.55:8001/admin/users/${id}/kick`, options);
    const result = await response.json();
    if(result.status ===201){
        backToAdminPage();
    }
    else{
        console.log(result.message);
    }
}

function LookupUserPost(){
    window.location.href=`../html/user_posts.html?userId=${id}`;
}
