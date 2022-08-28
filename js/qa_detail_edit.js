const Url = window.location.href;
const arr = Url.split("?postId=");
const id = arr[1];
const url = `http://34.64.161.55:8001/posts/${id}`;
let sessiontoken = localStorage.getItem("sessionToken");
let header = new Headers({'x-pocs-session-token' : sessiontoken});
const flexCheckDefault = document.querySelector("#flexCheckDefault");

//공지사항 제목, 공지사항 내용 가져오기
const qa_title = document.querySelector("#title");
const qa_content = document.querySelector("#content");
let user_Id;

function QaEditPage() {
    fetch(url, { headers : header })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            qa_title.value = `${data.data.title}`;
            qa_content.value = `${data.data.content}`;
            flexCheckDefault.checked = data.data.onlyMember;
            user_Id = data.data.writer.userId;
            // category = data.data.category;
            console.log(user_Id);
        });
}

//게시글 수정하기 버튼 눌렀을때 호출되는 함수
async function QaEdit() {
    const sendData = {
        userId: user_Id,
        title: qa_title.value,
        content: qa_content.value,
        onlyMember: flexCheckDefault.checked,
        category: "qna",
    };

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-pocs-session-token" : sessiontoken
        },
        body: JSON.stringify(sendData),
    };

    const response = await fetch(`http://34.64.161.55:8001/posts/${id}`, options);
    const result = await response.json();
    if (result.status === 302) {
        backToQaList();
    } else {
        console.log(result.message);
    }
}

function backToQaList() {
    window.location.href = "../html/qa.html";
}

QaEditPage();
