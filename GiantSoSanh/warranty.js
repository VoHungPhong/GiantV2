/* ==============================
   ACCOUNT
============================== */

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

/* ==============================
   ACCORDION
============================== */

function toggleAccordion(button){
    const item = button.closest(".accordion-item");
    const content = item.querySelector(".accordion-content");

    const isActive = item.classList.contains("active");

    document
        .querySelectorAll(".accordion-item")
        .forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherContent =
                otherItem.querySelector(".accordion-content");

            otherContent.style.maxHeight = null;
        });

    if (!isActive){
        item.classList.add("active");

        content.style.maxHeight =
            content.scrollHeight + "px";
    }
}

/* ==============================
   SCROLL REVEAL
============================== */

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

/* ==============================
   INIT
============================== */

updateAccountMenu();