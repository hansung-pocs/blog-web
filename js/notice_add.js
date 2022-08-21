const notice_title = document.querySelector("#title");
const notice_content = document.querySelector("#content");
let sessiontoken = localStorage.getItem("sessionToken");


async function noticeSubmit(){

    const sendData={
        title : notice_title.value,
        content: notice_content.value,
        userId: 1,
        category : "notice"
    };

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'x-pocs-session-token' : sessionToken
        },
        body : JSON.stringify(sendData)
    };

    const response = await fetch('http://34.64.161.55:8001/posts', options);
    const result = await response.json();
    console.log(result);

    if(result.status ===201){
        window.location.href = '../html/notices.html';
    }
    else{
        console.log(result.message);
    }
}
