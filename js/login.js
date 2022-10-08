if (window.location.href.includes("index")) {
  const url = `http://${process.env.DEV_API_KEY}:80/api/auth/login`;
  const username = document.getElementById("floatingInput");
  const password = document.getElementById("floatingPassword");
  const loginForm = document.getElementById("loginForm");
  const RegisterBtn = document.getElementById("RegisterBtn");
  const Register_username = document.getElementById("register-id");
  const Register_password = document.getElementById("register-password");

  // if (process.env.DEV === "on") {
  //   console.log(`process.env.DEV_API_KEY:`, process.env.DEV_API_KEY);
  //   console.log(`env = ${process.env.process.env.DEV_API_KEY}`);
  // } else {
  //   console.log(`PRO_process.env.DEV_API_KEY:`, PRO_process.env.DEV_API_KEY);
  // }

  async function register_anonymous(event) {
    event.preventDefault();
    const sendData = {
      userName: Register_username.value,
      password: Register_password.value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pocs-device-type": "web",
      },
      body: JSON.stringify(sendData),
    };

    const response = await fetch(
      `http://${process.env.DEV_API_KEY}:80/api/users`,
      options
    );
    const result = await response.json();
    console.log(result);
    if (result.status === 201) {
      alert("비회원 가입 완료");
      window.location.href = "../html/main.html";
    } else {
      alert("다시 입력해주세요");
      console.log("비회원 회원가입 실패");
    }
  }

  async function login(event) {
    event.preventDefault();

    const sendData = {
      userName: username.value,
      password: password.value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pocs-device-type": "web",
      },
      body: JSON.stringify(sendData),
    };

    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result);

    if (result.status === 200) {
      localStorage.setItem("sessionToken", result.data.sessionToken);
      localStorage.setItem("userId", result.data.user.userId);
      localStorage.setItem("userType", result.data.user.type);
      window.location.href = "../html/main.html";
    } else {
      console.log("로그인 실패");
    }
  }
  loginForm.addEventListener("submit", login);
  RegisterBtn.addEventListener("click", register_anonymous);
}
