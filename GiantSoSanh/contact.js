/* =========================
   ACCOUNT
========================= */

function updateAccountMenu(){
    const accountMenu =
        document.getElementById("accountMenu");

    if (!accountMenu) return;

    const user =
        JSON.parse(localStorage.getItem("currentUser"));

    accountMenu.textContent = user
        ? "👤 " + user.name.toUpperCase()
        : "👤 TÀI KHOẢN";
}

function openAccount(){
    const user =
        JSON.parse(localStorage.getItem("currentUser"));

    window.location.href = user
        ? "profile.html"
        : "login.html";
}

/* =========================
   VALIDATION
========================= */

function setFieldError(element, message){
    const formGroup = element.closest(".form-group");
    const errorElement =
        formGroup.querySelector(".form-error");

    formGroup.classList.add("invalid");
    errorElement.textContent = message;
}

function clearFieldError(element){
    const formGroup = element.closest(".form-group");
    const errorElement =
        formGroup.querySelector(".form-error");

    formGroup.classList.remove("invalid");
    errorElement.textContent = "";
}

function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone){
    return /^(0|\+84)[0-9]{9,10}$/.test(
        phone.replace(/\s/g, "")
    );
}

/* =========================
   SUBMIT CONTACT
========================= */

function submitContactForm(event){
    event.preventDefault();

    const nameInput =
        document.getElementById("contactName");

    const phoneInput =
        document.getElementById("contactPhone");

    const emailInput =
        document.getElementById("contactEmail");

    const topicInput =
        document.getElementById("contactTopic");

    const messageInput =
        document.getElementById("contactMessage");

    const fields = [
        nameInput,
        phoneInput,
        emailInput,
        topicInput,
        messageInput
    ];

    fields.forEach(clearFieldError);

    let isValid = true;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const topic = topicInput.value;
    const message = messageInput.value.trim();

    if (name.length < 2){
        setFieldError(
            nameInput,
            "Vui lòng nhập họ và tên."
        );

        isValid = false;
    }

    if (!isValidPhone(phone)){
        setFieldError(
            phoneInput,
            "Số điện thoại chưa hợp lệ."
        );

        isValid = false;
    }

    if (!isValidEmail(email)){
        setFieldError(
            emailInput,
            "Email chưa đúng định dạng."
        );

        isValid = false;
    }

    if (!topic){
        setFieldError(
            topicInput,
            "Vui lòng chọn nội dung hỗ trợ."
        );

        isValid = false;
    }

    if (message.length < 10){
        setFieldError(
            messageInput,
            "Tin nhắn phải có ít nhất 10 ký tự."
        );

        isValid = false;
    }

    if (!isValid) return;

    const contactRequest = {
        id: Date.now(),
        name,
        phone,
        email,
        topic,
        message,
        createdAt:
            new Date().toLocaleString("vi-VN")
    };

    const requests =
        JSON.parse(
            localStorage.getItem("contactRequests")
        ) || [];

    requests.push(contactRequest);

    localStorage.setItem(
        "contactRequests",
        JSON.stringify(requests)
    );

    document
        .getElementById("contactForm")
        .reset();

    showContactToast();
}

/* =========================
   TOAST
========================= */

let toastTimer;

function showContactToast(){
    const toast =
        document.getElementById("contactToast");

    clearTimeout(toastTimer);

    toast.classList.add("show");

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

/* =========================
   REMOVE ERROR WHILE TYPING
========================= */

document
    .querySelectorAll(
        ".contact-form input, " +
        ".contact-form select, " +
        ".contact-form textarea"
    )
    .forEach(field => {

        field.addEventListener("input", () => {
            clearFieldError(field);
        });

        field.addEventListener("change", () => {
            clearFieldError(field);
        });

    });

/* =========================
   AUTO FILL USER
========================= */

function fillCurrentUser(){
    const user =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!user) return;

    const nameInput =
        document.getElementById("contactName");

    const emailInput =
        document.getElementById("contactEmail");

    if (nameInput && !nameInput.value){
        nameInput.value = user.name || "";
    }

    if (emailInput && !emailInput.value){
        emailInput.value = user.email || "";
    }
}

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting){
                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold:0.12
    }
);

revealElements.forEach((element, index) => {

    element.style.transitionDelay =
        `${Math.min(index % 4, 3) * 0.08}s`;

    revealObserver.observe(element);

});

/* =========================
   INIT
========================= */

updateAccountMenu();
fillCurrentUser();