const Url = window.location.href;
const arr = Url.split("?userId=");
const id = arr[1];
const url = new URL('http://34.64.161.55:8001/users/' + id);

const title = document.querySelector("#user_detail_edit_title");
const saveBtn = document.querySelector("#user_detail_edit_saveBtn"); //[Login]로그인 정보와 유저 정보가 같아야 보이도록
const cancelBtn = document.querySelector("#user_detail_edit_cancelBtn");

//정보
const userName = document.querySelector("#user_detail_edit_userName");
const email = document.querySelector("#user_detail_edit_email");
const studentId =document.querySelector("#user_detail_edit_studentId");
const generation =document.querySelector("#user_detail_edit_generation");
const company =document.querySelector("#user_detail_edit_company");
const github =document.querySelector("#user_detail_edit_github");

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
                ${data.data.userName}님의 정보 수정
            `
            userName.value=`${data.data.userName}`;
            email.value=`${data.data.email}`;
            studentId.innerHTML=`${data.data.studentId}`;
            generation.innerHTML=`${data.data.generation}`;

            if(data.data.company==null ||data.data.company=='undefined') 
                company.value=`-`;
            else company.value=`${data.data.company}`;
            if(data.data.company==null ||data.data.company=='undefined') 
                github.value=`-`;
            else github.value=`${data.data.github}`;

        }
    })

//저장버튼-업데이트
saveBtn.addEventListener("click",async function userEdit(event){
    event.preventDefault();
    console.log('edit');
    const sendData={
        password: "password",
        userName:userName.value,
        email:email.value,
        github:github.value,
        company:company.value,
    };

    const options = {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(sendData)
    };

    const response = await fetch(`http://34.64.161.55:8001/users/${id}`, options);
    const result = await response.json();
    console.log(result);

    if(result.status !==302){ //에러 발생시
        window.location.href = '../html/user_detail.html?userId='+id;

    }
    else{ //잘 되었다면
        console.log(result.message);
        window.location.href = '../html/user_detail.html?userId='+id;////편집후 바로 이전화면으로
    }
});
//유저 정보 수정을 취소하는 버튼 이벤트
cancelBtn.addEventListener("click",function (event) {
    event.preventDefault();
    window.location.href = '../html/user_detail.html?userId='+id;
});



