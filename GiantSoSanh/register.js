function register(){

    const name=document.getElementById("name").value.trim();

    const email=document.getElementById("email").value.trim();

    const password=document.getElementById("password").value.trim();

    const confirm=document.getElementById("confirmPassword").value.trim();

    if(name===""||email===""||password===""||confirm===""){

        alert("Vui lòng nhập đầy đủ thông tin!");

        return;

    }

    if(password!==confirm){

        alert("Mật khẩu nhập lại không khớp!");

        return;

    }

    const user={

        name:name,

        email:email,

        password:password

    };

    localStorage.setItem("giantUser",JSON.stringify(user));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");

    window.location="login.html";

}