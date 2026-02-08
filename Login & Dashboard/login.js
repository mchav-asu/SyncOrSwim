const ADMIN = "admin";
const PASS = "1234"

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user == ADMIN && pass == PASS) {
        localStorage.setItem("isLoggedIn", "true")
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid credentils";
    }
}