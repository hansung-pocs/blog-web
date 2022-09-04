const post_title = document.querySelector("#title");
const post_content = document.querySelector("#inputContent");
const post_md = document.querySelector("#compiledMarkdown");
const flexCheckDefault = document.querySelector("#flexCheckDefault");
let category;
let sessiontoken = localStorage.getItem("sessionToken");
const userId = localStorage.getItem("userId");

async function postSubmit(){

    function nodeToString(node) {   
        var tmpNode = document.createElement("div");   
        tmpNode.appendChild(node.cloneNode(true));   
        var str = tmpNode.innerHTML;   
        tmpNode = node = null;  // prevent memory leaks in IE   
        return str;
    }

    const res = post_content.value + "pocs_project_@구분자@_???" + nodeToString(post_md);

    console.log(res)

    const sendData={
        title : post_title.value,
        content: res,
        userId: userId,
        onlyMember: flexCheckDefault.checked,
        category : category
    };

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'x-pocs-session-token' : sessiontoken
        },
        body : JSON.stringify(sendData)
    };

    const response = await fetch('http://34.64.161.55:8001/posts', options);
    const result = await response.json();
    console.log(result);

    if(result.status ===201){
        window.location.href = '../html/posts.html';
    }
    else{
        console.log(result.message);
    }
}

function checkedCategory(e){
    if(e.target.innerText === "노하우"){
        category="knowhow";
    }else if(e.target.innerText === "스터디"){
        category="study";
    }else if(e.target.innerText === "추억"){
        category="memory";
    }else if(e.target.innerText === "추천"){
        category="reference";
    }

    const btnText = document.querySelector("#category-button");
    btnText.innerText = e.target.innerText;

}

