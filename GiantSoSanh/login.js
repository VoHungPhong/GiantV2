// ===============================
// ĐĂNG NHẬP GIANT
// ===============================

function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Kiểm tra nhập liệu
    if (email === "" || password === "") {

        alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");

        return;
    }

    // Lấy dữ liệu đã đăng ký
    const user = JSON.parse(localStorage.getItem("giantUser"));

    // Chưa có tài khoản
    if (!user) {

        alert("Chưa có tài khoản. Vui lòng đăng ký!");

        window.location.href = "register.html";

        return;
    }

    // Kiểm tra đăng nhập
    if (email === user.email && password === user.password) {

        localStorage.setItem("isLogin", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Đăng nhập thành công!");

        window.location.href = "index.html";

    } else {

        alert("Sai Email hoặc Mật khẩu!");

    }

}
document.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        login();

    }

});
window.onload = function(){

    document.getElementById("email").focus();

}