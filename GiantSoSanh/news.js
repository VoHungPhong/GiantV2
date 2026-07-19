/* ===============================
   ACCOUNT MENU
=============================== */

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

/* ===============================
   NEWS DATA
=============================== */

const newsArticles = {
    1: {
        category: "CÔNG NGHỆ",
        date: "16/07/2026",
        title: "HÀNH TRÌNH TIÊN PHONG CÔNG NGHỆ KHUNG SƯỜN GIANT",
        image: "images/news-frame.jpg",
        fallback: "images/vibe-1.jpg",
        content: `
            <p>
                Khung xe là nền tảng quyết định cảm giác vận hành,
                khả năng kiểm soát và hiệu suất của một chiếc xe đạp.
                Giant phát triển nhiều loại khung để đáp ứng các nhu cầu
                từ di chuyển hằng ngày đến thi đấu chuyên nghiệp.
            </p>

            <h3>Vật liệu ALUXX</h3>

            <p>
                Khung nhôm ALUXX hướng đến sự cân bằng giữa độ bền,
                trọng lượng và chi phí. Đây là lựa chọn phù hợp cho
                người mới, người đi phố và người sử dụng xe thường xuyên.
            </p>

            <h3>Vật liệu Carbon Composite</h3>

            <p>
                Carbon giúp giảm trọng lượng và tăng khả năng hấp thụ
                rung động. Vật liệu này thường xuất hiện trên các dòng
                xe đua hoặc xe địa hình hiệu suất cao.
            </p>

            <h3>Tối ưu theo từng dòng xe</h3>

            <ul>
                <li>Road: ưu tiên trọng lượng và khí động học.</li>
                <li>MTB: chú trọng độ cứng và khả năng kiểm soát.</li>
                <li>Touring: hướng đến sự thoải mái và độ bền.</li>
                <li>Hybrid: cân bằng giữa tốc độ và tính linh hoạt.</li>
            </ul>
        `
    },

    2: {
        category: "SẢN PHẨM",
        date: "15/07/2026",
        title: "GIANT TCR ADVANCED PRO: HIỆU SUẤT DÀNH CHO ĐƯỜNG ĐUA",
        image: "images/news-tcr.jpg",
        fallback: "images/bike-14.jpg",
        content: `
            <p>
                Giant TCR Advanced Pro được phát triển dành cho người
                yêu thích tốc độ, khả năng leo dốc và cảm giác điều khiển
                chính xác trên đường trường.
            </p>

            <h3>Khung carbon nhẹ</h3>

            <p>
                Khung composite giúp giảm trọng lượng tổng thể,
                hỗ trợ tăng tốc và duy trì hiệu suất trên những
                hành trình dài.
            </p>

            <h3>Tư thế vận hành</h3>

            <p>
                Hình học khung hướng đến tư thế thể thao, mang lại
                cảm giác phản hồi nhanh khi vào cua hoặc thay đổi tốc độ.
            </p>

            <h3>Phù hợp với ai?</h3>

            <ul>
                <li>Người tập luyện xe đạp đường trường.</li>
                <li>Người yêu thích tốc độ.</li>
                <li>Người cần một mẫu xe hiệu suất cao.</li>
            </ul>
        `
    },

    3: {
        category: "KINH NGHIỆM",
        date: "14/07/2026",
        title: "CÁCH CHỌN XE ĐẠP GIANT PHÙ HỢP CHO NGƯỜI MỚI",
        image: "images/news-choose-bike.jpg",
        fallback: "images/vibe-2.jpg",
        content: `
            <p>
                Trước khi chọn xe, người dùng nên xác định địa hình,
                quãng đường và mục tiêu sử dụng chính.
            </p>

            <h3>Touring</h3>

            <p>
                Phù hợp với nhu cầu đi phố, tập thể dục và di chuyển
                hằng ngày với tư thế ngồi tương đối thoải mái.
            </p>

            <h3>Mountain Bike</h3>

            <p>
                Thích hợp cho đường xấu, địa hình gồ ghề và người
                thích phong cách thể thao mạnh mẽ.
            </p>

            <h3>Road Bike</h3>

            <p>
                Dành cho người chú trọng tốc độ, quãng đường dài
                và trải nghiệm đạp xe trên mặt đường bằng phẳng.
            </p>

            <h3>Hybrid</h3>

            <p>
                Kết hợp đặc điểm của xe đường phố và xe địa hình,
                phù hợp với nhiều điều kiện sử dụng khác nhau.
            </p>
        `
    },

    4: {
        category: "BẢO DƯỠNG",
        date: "13/07/2026",
        title: "5 MẸO GIÚP XE ĐẠP GIANT LUÔN BỀN ĐẸP",
        image: "images/news-maintenance.jpg",
        fallback: "images/vibe-3.jpg",
        content: `
            <p>
                Việc kiểm tra và chăm sóc xe định kỳ giúp tăng độ bền,
                đảm bảo an toàn và duy trì cảm giác vận hành ổn định.
            </p>

            <h3>1. Kiểm tra áp suất lốp</h3>

            <p>
                Bơm lốp theo mức áp suất phù hợp giúp xe lăn nhẹ,
                hạn chế nguy cơ thủng lốp và mòn lốp không đều.
            </p>

            <h3>2. Vệ sinh bộ truyền động</h3>

            <p>
                Lau sạch sên, líp và đĩa trước khi tra dầu để hạn chế
                bụi bẩn làm giảm độ chính xác khi chuyển số.
            </p>

            <h3>3. Kiểm tra phanh</h3>

            <p>
                Theo dõi độ mòn của bố phanh và kiểm tra phản hồi
                của tay phanh trước mỗi chuyến đi.
            </p>

            <h3>4. Kiểm tra ốc và khớp nối</h3>

            <p>
                Đảm bảo các vị trí như pô tăng, ghi đông,
                yên và bánh xe được siết đúng mức.
            </p>

            <h3>5. Bảo dưỡng định kỳ</h3>

            <p>
                Đưa xe đến trung tâm hoặc cửa hàng chuyên môn
                khi phát hiện tiếng động bất thường hoặc sau
                một thời gian sử dụng dài.
            </p>
        `
    }
};

/* ===============================
   NEWS MODAL
=============================== */

function openNewsDetail(id){
    const article = newsArticles[id];

    if (!article) return;

    const modal =
        document.getElementById("newsModal");

    const content =
        document.getElementById("newsDetailContent");

    content.innerHTML = `
        <img
            src="${article.image}"
            alt="${article.title}"
            class="news-detail-image"
            onerror="this.src='${article.fallback}'"
        >

        <span class="news-detail-category">
            ${article.category}
        </span>

        <h2 class="news-detail-title">
            ${article.title}
        </h2>

        <div class="news-date">
            📅 ${article.date}
        </div>

        <div class="news-detail-body">
            ${article.content}
        </div>
    `;

    modal.classList.add("show");
    document.body.classList.add("news-modal-open");
}

function closeNewsDetail(){
    const modal =
        document.getElementById("newsModal");

    modal.classList.remove("show");
    document.body.classList.remove("news-modal-open");
}

function closeModalOutside(event){
    if (event.target.id === "newsModal"){
        closeNewsDetail();
    }
}

document.addEventListener("keydown", function(event){
    if (event.key === "Escape"){
        closeNewsDetail();
    }
});

updateAccountMenu();