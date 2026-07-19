// Chỉ tạo tài khoản demo khi chưa có currentUser
if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify({
        name: "Demo User",
        email: "demo@gmail.com"
    }));
}

const user = JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("userName").innerHTML = user.name;
document.getElementById("userEmail").innerHTML = user.email;

document.getElementById("profileName").value = user.name;
document.getElementById("profileEmail").value = user.email;
function saveProfile(){

    user.name=document.getElementById("profileName").value;

    localStorage.setItem("currentUser",JSON.stringify(user));

    localStorage.setItem("giantUser",JSON.stringify(user));

    document.getElementById("userName").innerHTML=user.name;

    alert("Đã cập nhật thông tin!");

}

function logout(){

    localStorage.removeItem("currentUser");

    localStorage.removeItem("isLogin");

    alert("Đăng xuất thành công!");

    window.location.href="index.html";

}
/* =================================
   PROFILE NAVIGATION
================================= */

function showProfileSection(sectionName, clickedItem) {
    const sections = {
        info: document.getElementById("profileInfoSection"),
        favorites: document.getElementById("favoritesSection"),
        orders: document.getElementById("ordersSection"),
        security: document.getElementById("securitySection")
    };

    Object.values(sections).forEach(section => {
        if (section) {
            section.classList.remove("active-section");
        }
    });

    document.querySelectorAll(".sidebar li").forEach(item => {
        item.classList.remove("active");
    });

    const selectedSection = sections[sectionName];

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }

    if (clickedItem) {
        clickedItem.classList.add("active");
    }

    if (sectionName === "favorites") {
        renderFavoriteProducts();
    }

    if (sectionName === "orders") {
        renderOrders();
    }
}

/* =================================
   FAVORITE PRODUCTS
================================= */

function getFavoriteProducts() {
    return JSON.parse(
        localStorage.getItem("favoriteProducts")
    ) || [];
}

function updateFavoriteCount() {
    const countElement =
        document.getElementById("favoriteCount");

    if (!countElement) return;

    const favoriteProducts = getFavoriteProducts();

    countElement.textContent = favoriteProducts.length;
}

function renderFavoriteProducts() {
    const favoriteList =
        document.getElementById("favoriteList");

    if (!favoriteList) return;

    const favoriteProducts = getFavoriteProducts();

    updateFavoriteCount();

    if (favoriteProducts.length === 0) {
        favoriteList.innerHTML = `
            <div class="favorite-empty">

                <div class="empty-icon">♡</div>

                <h3>Chưa có sản phẩm yêu thích</h3>

                <p>
                    Hãy chọn biểu tượng trái tim trên sản phẩm
                    mà bạn quan tâm.
                </p>

                <a href="index.html">
                    Khám phá xe đạp
                </a>

            </div>
        `;

        return;
    }

    favoriteList.innerHTML = favoriteProducts.map(bike => `
        <article class="favorite-profile-card">

            <img
                src="images/bike-${bike.id}.jpg"
                alt="${bike.name}"
                onerror="this.src='images/no-image.jpg'">

            <h3>${bike.name}</h3>

            <div class="favorite-type">
                ${bike.type} • ${bike.year}
            </div>

            <div class="price">
                ${bike.price}
            </div>

            <div class="favorite-actions">

                <a href="index.html">
                    Xem sản phẩm
                </a>

                <button
                    type="button"
                    onclick="removeFavorite(${bike.id})">

                    Xóa

                </button>

            </div>

        </article>
    `).join("");
}

function removeFavorite(id) {
    let favoriteIds =
        JSON.parse(localStorage.getItem("favorites")) || [];

    let favoriteProducts = getFavoriteProducts();

    favoriteIds = favoriteIds.filter(
        favoriteId => favoriteId !== id
    );

    favoriteProducts = favoriteProducts.filter(
        bike => bike.id !== id
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favoriteIds)
    );

    localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProducts)
    );

    renderFavoriteProducts();
}

/* Khởi tạo số lượng yêu thích */
updateFavoriteCount();
/* =========================
   ĐƠN HÀNG DEMO
========================= */

const demoOrders = [
    {
        code: "DH001",
        bikeId: 1,
        name: "Giant Escape 1 Disc",
        price: "17.990.000đ",
        date: "15/07/2026",
        status: "Đã giao",
        statusClass: "completed"
    },
    {
        code: "DH002",
        bikeId: 7,
        name: "Giant Talon 3 (27.5)",
        price: "13.590.000đ",
        date: "18/07/2026",
        status: "Đang giao",
        statusClass: "shipping"
    }
];

function getOrders() {
    const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

    return savedOrders.length > 0
        ? savedOrders
        : demoOrders;
}

function renderOrders() {
    const orderList = document.getElementById("orderList");

    if (!orderList) return;

    const orders = getOrders();

    if (orders.length === 0) {
        orderList.innerHTML = `
            <div class="order-empty">
                <h3>Bạn chưa có đơn hàng nào</h3>
                <p>Hãy chọn một mẫu xe phù hợp tại trang chủ.</p>
                <a href="index.html">Xem sản phẩm</a>
            </div>
        `;
        return;
    }

    orderList.innerHTML = orders.map(order => `
        <article class="order-card">

            <div class="order-header">

                <span class="order-code">
                    Đơn hàng #${order.code}
                </span>

                <span class="order-status ${order.statusClass}">
                    ${order.status}
                </span>

            </div>

            <div class="order-product">

                <img
                    src="images/bike-${order.bikeId}.jpg"
                    alt="${order.name}"
                    onerror="this.src='images/no-image.jpg'"
                >

                <div>
                    <h3>${order.name}</h3>

                    <p>
                        Ngày đặt: ${order.date}
                    </p>

                    <p class="order-price">
                        ${order.price}
                    </p>
                </div>

            </div>

        </article>
    `).join("");
}
/* =========================
   ĐỔI MẬT KHẨU
========================= */

function changePassword() {
    const oldPassword =
        document.getElementById("oldPassword").value.trim();

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmNewPassword").value.trim();

    const registeredUser =
        JSON.parse(localStorage.getItem("giantUser"));

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!registeredUser || !currentUser) {
        alert("Không tìm thấy thông tin tài khoản.");
        return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    if (oldPassword !== registeredUser.password) {
        alert("Mật khẩu hiện tại không đúng.");
        return;
    }

    if (newPassword.length < 6) {
        alert("Mật khẩu mới phải có ít nhất 6 ký tự.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp.");
        return;
    }

    registeredUser.password = newPassword;
    currentUser.password = newPassword;

    localStorage.setItem(
        "giantUser",
        JSON.stringify(registeredUser)
    );

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";

    alert("Đổi mật khẩu thành công.");
}
window.onload = function () {
    showProfileSection("favorites");
};