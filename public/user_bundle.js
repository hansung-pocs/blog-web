(()=>{const e=document.querySelector("#usersDiv"),t=document.querySelector("#inlineRadio0"),n=document.querySelector("#inlineRadio1"),i=document.querySelector("#inlineRadio2"),a=(document.querySelector("#user_search"),document.querySelector("#userNum"));let o,s,l,c=1,r=`http://www.hansungpocs.site:80/api/users?offset=9&pageNum=${c}`,d=localStorage.getItem("sessionToken"),u=new Headers({"x-pocs-session-token":d});async function f(){await fetch(r,{headers:u}).then((e=>e.json())).then((c=>{console.log(c),null===c.data.users?e.innerHTML="<div>유저를 추가 하세요.</div>":(o=c.data.users,l=Math.ceil(c.data.countAllUsers/9),t.checked||n.checked||i.checked,h(o,s),g(o),a.innerHTML=`(${c.data.countAllUsers})`)})),await w()}function g(t){console.log(t),e.innerHTML="";for(let n=0;n<9;n++){if(null==t[n])continue;let i;null!=t[n]?.defaultInfo.userProfilePath?(i=`http://www.hansungpocs.site${t[n]?.defaultInfo.userProfilePath}`,console.log(i)):i="../img/profile.png",e.innerHTML+=`\n            <div class="col-3 p-4 m-2" onclick="checktoGoDetailPage(${t[n]?.userId})" \n                    style="cursor:pointer;text-align: center;border: solid white 1px;border-radius: 10px;box-shadow:0px 1px 3px 1px gray">\n                    <img class="w-50" src=${i} style="width:140px;height:140px;object-fit: cover">\n                    <div class="my-1" style="font-size: large"><b>${t[n]?.defaultInfo.name||"비회원"}</b></div>\n                    <div class="my-1"><b>${t[n]?.defaultInfo.generation}기</b></div>\n                    <div class="my-1">${t[n]?.defaultInfo.studentId}</div>\n                    <div class="my-1">\n                        <span title="${t[n]?.defaultInfo.email}" class="me-2">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">\n                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>\n                            </svg>\n                        </span>\n                        <a href="${t[n]?.defaultInfo.github}" style="color: inherit;">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">\n                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>\n                            </svg>\n                        </a>\n                    </div>\n            </div>\n            `}}function h(e,t){if("created"==t){for(let t=0;t<e.length-1;t++)for(let n=t+1;n<e.length;n++)if(e[t]?.userId<e[n]?.userId){let i=e[t];e[t]=e[n],e[n]=i}}else if("generation"==t){for(let t=0;t<e.length-1;t++)for(let n=t+1;n<e.length;n++)if(e[t]?.defaultInfo.generation<e[n]?.defaultInfo.generation){let i=e[t];e[t]=e[n],e[n]=i}}else if("studentId"==t)for(let t=0;t<e.length-1;t++)for(let n=t+1;n<e.length;n++)if(parseInt(e[t]?.defaultInfo.studentId)>parseInt(e[n]?.defaultInfo.studentId)){let i=e[t];e[t]=e[n],e[n]=i}}function w(){let e='<ul class="pagination justify-content-center">\n                <li class="page-item">\n                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="movePreviousPage()">Previous</a>\n                </li>',t=5*Math.ceil(c/5);t>l&&(t=l);for(let n=t-4<=0?1:t-4;n<=t;n++)e+=`<li class="page-item ${c==n?"active":""}"><a class="page-link" onclick="movePage(${n})">${n}</a></li>`;e+='<li class="page-item">\n                    <a class="page-link" href="#" onclick="moveNextPage()">Next</a>\n                </li>',document.querySelector("#pagination-bar").innerHTML=e}function p(e){"inlineRadio0"===e.target.id?s="created":"inlineRadio1"===e.target.id?s="generation":"inlineRadio2"===e.target.id&&(s="studentId"),h(o,s),g(o)}console.log(d),window.btnClick=function(){!async function(e){r=`http://www.hansungpocs.site:80/api/users?search=${e}&offset=9&pageNum=${c}`,await f()}(document.getElementById("searchUser").value)},window.movePage=async function(e){e>l||c!==e&&(c=e,r=`http://www.hansungpocs.site:80/api/users?offset=9&pageNum=${c}`,await f(),await w())},window.moveNextPage=async function(){c>=l||(c++,r=`http://www.hansungpocs.site:80/api/users?offset=9&pageNum=${c}`,await f(),await w())},window.movePreviousPage=async function(){c<=1||(c--,r=`http://www.hansungpocs.site:80/api/users?offset=9&pageNum=${c}`,await f(),await w())},window.checktoGoDetailPage=function(e){null===localStorage.getItem("userType")?alert("블로그 회원만 조회 가능합니다."):window.location.href=`user_detail.html?userId=${e}`},t.addEventListener("click",p),n.addEventListener("click",p),i.addEventListener("click",p),f()})();