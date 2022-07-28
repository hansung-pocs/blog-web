let sort='';
const url = new URL("http://34.64.161.55:8001/users"+sort);

const user = document.querySelector("#user table");
const thead = document.querySelector("#user table thead");
const tbody = document.querySelector("#user table tbody");

const radio0= document.querySelector("#inlineRadio0");
const radio1= document.querySelector("#inlineRadio1");
const radio2= document.querySelector("#inlineRadio2");
const search= document.querySelector("#user_search"); //검색


function doFetch(){
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            thead.innerHTML="<tr><td>#</td><td>성명</td><td>학번</td><td>e-mail</td></tr>";
            tbody.innerHTML='';
            if(data.data.users ===  null ){
                tbody.innerHTML="<tr><td>유저를</td><td>추가</td><td>하세요.</td><td></td></tr>";
            }
            else{
                for(let i=0; i<data.data.users.length;i++){
                    tbody.innerHTML+=
                        `
                <tr>
                    <td>${i+1}</td>
                    <td><a  href='user_detail.html?userId=${data.data.users[i].userId}'>${data.data.users[i].userName}</a></td>
                    <td>${data.data.users[i].studentId}</td>
                    <td>${data.data.users[i].email}</td>
                </tr>
                `
                }

            }
        })
}

function onClick(event){
    console.log(event.target.id);
    if(event.target.id==inlineRadio0)
        sort="";
    else if(event.target.id==inlineRadio1)
        sort="?sort=generation";
    else if(event.target.id==inlineRadio2)
        sort="?sort=studentId";
    doFetch();
}
radio0.addEventListener("click", onClick);
radio1.addEventListener("click", onClick);
radio2.addEventListener("click", onClick);

doFetch();

