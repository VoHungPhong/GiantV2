/* ================== DOM ================== */
const searchInput = document.getElementById('search');
const products = document.getElementById('products');
const compareBox = document.getElementById('compareBox');
const compareTable = document.getElementById('compareTable');
const cartPopup = document.getElementById('cartPopup');
const cartItems = document.getElementById('cartItems');
const cancelBtn = document.getElementById('cancelCompare');
cancelBtn.onclick = () => {
    compare = [];               // Xóa hết sản phẩm đang chọn để so sánh
    cancelBtn.style.display = 'none'; // Ẩn nút
    render();       
    syncFavoriteProducts();            // Cập nhật lại danh sách sản phẩm và bảng so sánh
};


/* ================== DATA ================== */
const bikes = [
  { id: 1, name: "Giant Escape 1 Disc", price: "17.990.000đ", year: 2024, type: "Touring", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Tektro HD-R280) ", drivetrain: "Shimano CUES 2(Shimano CUES U4010)x 9(Shimano CUES RDU3020)", wheel: "700C (700x38)" },
  { id: 2, name: "Giant Escape 2 Disc", price: "14.790.000đ", year: 2025, type: "Touring", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Tektro HD-R280)", drivetrain: "Shimano CUES 2(Shimano CUES U4010)x 9(Shimano CUES U3020)", wheel: "700C (700x38)" },
  { id: 5, name: "Giant Escape 2 City Disc", price: "15.790.000đ", year: 2025, type: "Touring", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Tektro HD-R280)", drivetrain: "Shimano CUES 2(Shimano CUES U4010)x 9(Shimano CUES U3020)", wheel: "700C (700x38)" },
  { id: 4, name: "Giant Escape 4 Disc", price: "11.790.000đ", year: 2025, type: "Touring", frame: "ALUXX Aluminum", brake: "Đĩa Cơ (Shimano Tourney TX)", drivetrain: "Shimano Tourney 1(N/A)x 8(Shimano Tourney TX)", wheel: "700C (700x38)" },
  { id: 3, name: "Giant Escape 3 (V-Brake)", price: "9.590.000đ", year: 2023, type: "Touring", frame: "ALUXX Aluminum", brake: "Gôm (Linear pull)", drivetrain: "Shimano Tourney 3x7S", wheel: "700C (700x38)" },
  
  { id: 6, name: "Giant Talon 29 4", price: "11.790.000đ", year: 2025, type: "MTB", frame: "ALUXX Aluminum", brake: "Đĩa Cơ (Tektro MT3.0)", drivetrain: "microSHIFT Acolyte 1(N/A)x 8(microSHIFT Acolyte)", wheel: "29 inch (29x2.2)" },
  { id: 7, name: "Giant Talon 3 (27.5)", price: "13.590.000đ", year: 2025, type: "MTB", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Tektro HDC M275)", drivetrain: "Shimano Altus/Acera 2(Shimano Altus)x 8(Shimano Acera)", wheel: "27.5 inch (27.5x2.2)" },
  { id: 8, name: "Giant ATX 830", price: "14.590.000đ", year: 2025, type: "MTB", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Hydraulic disc brake)", drivetrain: "Shimano CUES 2(Shimano CUES)x 9(Shimano CUES)", wheel: "27.5 inch (27.5x1.95)" },
  { id: 9, name: "Giant ATX 620", price: "8.790.000đ", year: 2025, type: "MTB", frame: "ALUXX Aluminum", brake: "Đĩa Cơ (JAK mechanical disc brake)", drivetrain: "Microshift 3(Microshift)x 7(Microshift)", wheel: "26 inch (26x1.95)" },
  { id: 10, name: "Giant XTC Advanced 29 1.5", price: "76.990.000đ", year: 2024, type: "MTB", frame: "Carbon (Advanced-grade composite)", brake: "Đĩa Dầu (Shimano BR-MT500)", drivetrain: "SRAM NX Eagle 1(N/A)x 12(SRAM NX Eagle)", wheel: "29 inch (29x2.25)" },

  { id: 11, name: "Giant Contend AR 4", price: "21.290.000đ", year: 2025, type: "Road", frame: "ALUXX Aluminum", brake: "Đĩa Cơ (Tektro MD-C550 mechanical)", drivetrain: "Shimano Claris 2x8S", wheel: "700C (700x32)" },
  { id: 12, name: "Giant Contend 2 (V-Brake)", price: "14.990.000đ", year: 2024, type: "Road", frame: "ALUXX Aluminum", brake: "Gôm (Tektro mechanical rim brakes)", drivetrain: "Shimano Claris 2(Shimano Claris FD-R2000)x 8(Shimano Claris)", wheel: "700C (700x32)" },
  { id: 13, name: "Giant TCR Advanced 3 Disc", price: "55.790.000đ", year: 2026, type: "Road", frame: "Carbon (Advanced-grade Composite)", brake: "Đĩa Dầu (Shimano BR-U6030 hydraulic)", drivetrain: "Shimano Cues 2(Shimano CUES U6030)x 10(Shimano CUES U6020-10)", wheel: "700C (700x28)" },
  { id: 14, name: "Giant TCR Advanced Pro 2", price: "92.990.000đ", year: 2026, type: "Road", frame: "Carbon (Advanced-grade Composite)", brake: "Đĩa Dầu (Shimano 105 hydraulic)", drivetrain: "Shimano 105 2x11S", wheel: "700C (700x28)" },
  { id: 15, name: "Giant Propel Advanced 2", price: "72.990.000đ", year: 2026, type: "Road", frame: "Carbon (Advanced-grade Composite)", brake: "Đĩa Dầu (Shimano 105 hydraulic)", drivetrain: "Shimano 105 2x11S", wheel: "700C (700x28)" },

  { id: 16, name: "Giant Roam 2 Disc", price: "14.490.000đ", year: 2024, type: "Hybrid", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Tektro TKD-143 hydraulic)", drivetrain: "Shimano CUES 2(Shimano Cues U4000)x 9(Shimano Cues U3020)S", wheel: "700C (700x42)" },
  { id: 17, name: "Giant Roam 3", price: "14.790.000đ", year: 2025, type: "Hybrid", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Tektro TKD-143 hydraulic)", drivetrain: "Shimano CUES 2(Shimano Cues U4010-L)x 9(Shimano RD-U3020)", wheel: "700C (700x42)" },
  { id: 18, name: "Giant Roam 4", price: "12.790.000đ", year: 2026, type: "Hybrid", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Tektro TKD-143 hydraulic)", drivetrain: "Shimano Altus 2(Shimano Tourney FD-TY606)x 8(Shimano Altus RD-M310)", wheel: "700C (700x42)" },
  { id: 19, name: "Giant FastRoad AR Adv 1-Asia", price: "48.790.000đ", year: 2026, type: "Hybrid", frame: "Carbon (Advanced-grade composite)", brake: "Đĩa Dầu (Tektro HD-R280)", drivetrain: "Shimano 105 2x11S", wheel: "700C (700X32)" },
  { id: 20, name: "Giant FastRoad 1", price: "26.990.000đ", year: 2024, type: "Hybrid", frame: "ALUXX Aluminum", brake: "Đĩa Dầu (Tektro HD-R280)", drivetrain: "Shimano Claris 2(Shimano Tiagra FD-44700)x 10(Shimano Tiagra FD-4700)", wheel: "700C (700X32)" }
];

let filter = '';
let compare = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let cart = [];
function addCart(name){

  const bike = bikes.find(b => b.name === name);

  const existing = cart.find(item => item.id === bike.id);

  if(existing){

      existing.quantity++;

  }else{

      cart.push({
          ...bike,
          quantity:1
      });

  }

  updateCartCount();

  renderCart();

  alert("Đã thêm vào giỏ hàng");

}
function openCart(){
  document.getElementById('cartModal').style.display = 'flex';
  renderCart();
}
function closeCart(){
  document.getElementById('cartModal').style.display = 'none';
}
function renderCart(){

  const box = document.getElementById('cartItems');
  const totalBox = document.getElementById('cartTotal');

  box.innerHTML = '';

  let total = 0;

  cart.forEach(item => {

    const price = parseInt(item.price.replace(/\D/g,''));

    total += price * item.quantity;

    box.innerHTML += `

      <div class="cart-item">

        <div>

          <strong>${item.name}</strong><br>

          ${item.price}<br>

          Số lượng: ${item.quantity}

        </div>

        <button onclick="removeCart(${item.id})">

          ❌

        </button>

      </div>

    `;

  });

  totalBox.innerText =
      total.toLocaleString('vi-VN') + '₫';

  updateCartCount();

}
function removeCart(id){

    cart = cart.filter(item => item.id !== id);

    renderCart();

}

function updateCartCount(){

    const count =
        document.getElementById("cartCount");

    if(!count) return;

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    count.innerText = total;

}


/* ================== RENDER ================== */
function render() {
  const keyword = document.getElementById('search').value.toLowerCase();
  products.innerHTML = '';

  bikes
    .filter(b =>
      (!filter || b.type === filter) &&
      b.name.toLowerCase().includes(keyword)
    )
    .forEach(b => {
      const selected = compare.some(x => x.id === b.id);

      products.innerHTML += `
      <div class="card">
        <img 
          src="images/bike-${b.id}.jpg"
          class="product-img"
          alt="${b.name}"
          onerror="this.src='images/no-image.jpg'"
        >

        <h3>${b.name}</h3>
        <div class="price">${b.price}</div>

        <button class="btn buy" onclick="addCart('${b.name}')">Mua hàng</button>

        <button class="btn compare ${selected ? 'active' : ''}"
          onclick="toggle(${b.id})">
          ${selected ? '✔ Đã chọn' : '⇄ So sánh'}
        </button>
      </div>`;
    });

  renderCompare();
}

function filterType(type) {
    const select = document.getElementById('filterType');
    if (select) {
        select.value = type;   // đồng bộ dropdown
    }
    applyAdvancedFilter();     // lọc lại
}

function filterMenu(type){

    // Đồng bộ với bộ lọc
    document.getElementById("filterType").value = type;

    // Áp dụng bộ lọc hiện có
    applyAdvancedFilter();

    // Cuộn xuống danh sách sản phẩm
    document.querySelector(".product-section").scrollIntoView({
        behavior: "smooth"
    });

}

function showAllBikes() {

    const search = document.getElementById("search");
    const searchAdvanced = document.getElementById("searchAdvanced");
    const filterType = document.getElementById("filterType");
    const filterPrice = document.getElementById("filterPrice");
    const filterWheel = document.getElementById("filterWheel");
    const filterYear = document.getElementById("filterYear");

    if (search) search.value = "";
    if (searchAdvanced) searchAdvanced.value = "";
    if (filterType) filterType.value = "";
    if (filterPrice) filterPrice.value = "";
    if (filterWheel) filterWheel.value = "";
    if (filterYear) filterYear.value = "";

    applyAdvancedFilter();

    const productSection =
        document.querySelector(".product-section");

    if (productSection) {
        productSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}
/* ================== TOGGLE ================== */
function toggle(id) {
  const bike = bikes.find(b => b.id === id);
  const index = compare.findIndex(b => b.id === id);

  if (index !== -1) {
    compare.splice(index, 1);
  } else {
    if (compare.length === 2) return alert('Chỉ so sánh tối đa 2 xe');
    compare.push(bike);
  }

  cancelBtn.style.display = compare.length ? 'block' : 'none';
  render();
}
function syncCancelBtn(){
  cancelBtn.style.display = compare.length ? 'block' : 'none';
}

/* ================== COMPARE ================== */
function renderCompare() {
  if (compare.length < 2) {
    compareBox.style.display = 'none';
    return;
  }

  compareBox.style.display = 'block';

  const fields = [
    ['price', 'Giá 💰'],
    ['year', 'Năm sản xuất 📅'],
    ['frame', 'Khung 🦾'],
    ['brake', 'Thắng 🛑'],
    ['drivetrain', 'Bộ truyền động ⚙️'],
    ['wheel', 'Size bánh 💿']
  ];

  let html = `
<tr>
  <th>Thuộc tính</th>
  ${compare.map(b => `
    <th>
      <img 
        src="images/bike-${b.id}.jpg"
        alt="${b.name}"
        class="compare-img"
        onerror="this.src='images/no-image.jpg'"
      >
      <div class="compare-name">${b.name}</div>
    </th>
  `).join('')}
</tr>`;


  fields.forEach(([key, label]) => {
    const values = compare.map(b => b[key]);
    const same = values.every(v => v === values[0]);

    html += `
      <tr>
        <td><b>${label}</b></td>
        ${values.map(v => `
      <td class="${same ? 'same' : 'diff'} tooltip"
          data-tip="${
            key === 'wheel' ? wheelTip(v) : 
            key === 'frame' ? frameTip(v) : 
            key === 'brake' ? brakeTip(v) : 
            key === 'drivetrain' ? drivetrainTip(v) : 
            key === 'price' ? priceTip(v) : 
            key === 'year' ? yearTip(v) : ''
          }">
        ${v}
            <span class="${same ? 'icon-yes' : 'icon-no'}"></span>
          </td>`).join('')}
      </tr>`;
  });

  compareTable.innerHTML = html;
}

/* ================== TOOLTIP TEXT ================== */
function wheelTip(wheel) {
  // Lấy phần tiền tố (700C, 27.5 inch, 29 inch, 26 inch)
  let size = '';
  if (wheel.includes('700C')) size = '700C';
  else if (wheel.includes('27.5')) size = '27.5 inch';
  else if (wheel.includes('29')) size = '29 inch';
  else if (wheel.includes('26')) size = '26 inch';

  const tips = {
    '700C': '700C (700x28,700x32,700x38,700x42): tốc độ cao, phù hợp Road & Hybrid',
    '27.5 inch': '27.5 inch (27.5x1.92,27.5x2.2): linh hoạt, dễ điều khiển',
    '29 inch': '29 inch (29x2.2,29x2.25): vượt địa hình tốt, ổn định',
    '26 inch': '26 inch (26x1.95): nhỏ gọn, truyền thống MTB'
  };

  return tips[size] || 'Chưa có thông tin cho loại bánh này';
}

function frameTip(material) {
  // Chuyển về chữ thường để so sánh chính xác hơn nếu dữ liệu đầu vào không đồng nhất
  const m = material.toLowerCase();

  if (m.includes('aluxx')) {
    return 'Nhôm ALUXX: Nhẹ hơn thép, bền bỉ và tối ưu chi phí (12->14kg)';
  }
  if (m.includes('carbon')) {
    return 'Carbon: Trọng lượng siêu nhẹ (>10 kg), hấp thụ xung lực cực tốt';
  }
  return '';
}
function brakeTip(type) {
  const t = type.toLowerCase();

  if (t.includes('gôm') || t.includes('v-brake') || t.includes('thắng u')) {
    return 'Thắng gôm/U: Giá rẻ, nhẹ, dễ sửa nhưng nhanh mòn bố, cần bảo dưỡng thường xuyên.';
  }
  if (t.includes('đĩa cơ')) {
    return 'Đĩa cơ: Thiết kế đẹp, lực phanh tốt hơn thắng gôm, dễ bị trùng cáp sau một thời gian.';
  }
  if (t.includes('đĩa dầu')) {
    return 'Đĩa dầu: Cao cấp nhất, lực phanh cực nhẹ và chính xác, bền bỉ, ít phải bảo dưỡng.';
  }
  return '';
}
function drivetrainTip(name) {
  if (!name) return '';
  const g = name.toLowerCase();

  // Road
  if (g.includes('105')) return 'Shimano 105 (2x11S): Dòng đua chuyên nghiệp tầm trung, chuyển số cực mượt, độ bền rất cao.';
  if (g.includes('claris')) return 'Shimano Claris (2x8S): Nhập môn xe Road, bền bỉ, thiết kế tay lắc gọn gàng.';
  
  // MTB / Hybrid
  if (g.includes('cues')) return 'Shimano CUES (2x9): Siêu bền, công nghệ mới nhất của Shimano cho xe địa hình và phố.';
  if (g.includes('nx eagle')) return 'SRAM NX Eagle (1x12): Hệ 12 líp không cần đề trước, leo dốc cực nhẹ và chuẩn xác.';
  if (g.includes('altus')) return 'Shimano Altus (2x8): Dòng địa hình phổ thông, ổn định và dễ sửa chữa.';
  
  // Phổ thông
  if (g.includes('tourney')) {
    if (g.includes('3x7')) return 'Shimano Tourney (3x7): Nhiều cấp số, giá rẻ, phù hợp đi phố nhẹ nhàng.';
    if (g.includes('2x7')) return 'Shimano Tourney (2x7): Gọn nhẹ, thường dùng cho dòng Road giá rẻ.';
    return 'Shimano Tourney: Bộ truyền động cơ bản, bền bỉ cho nhu cầu hằng ngày.';
  }
  if (g.includes('microshift')) return 'Microshift (3x7): Thương hiệu Đài Loan, hoạt động chính xác, chi phí thay thế thấp.';

  return '';
}
function priceTip(price) {
  // Chuyển đổi giá về dạng số để so sánh (xóa bỏ dấu chấm, chữ "đ" hoặc "vnđ")
  const p = parseInt(price.toString().replace(/[^0-9]/g, ''));

  if (p < 15000000) {
    return 'Xe phổ thông: Phù hợp cho người mới tìm hiểu, chưa có nhiều kinh nghiệm và kiến thức.';
  }
  if (p >= 15000000 && p <= 30000000) {
    return 'Xe trung cấp: Dành cho người đã có kinh nghiệm và có các kiến thức cơ bản.';
  }
  if (p > 30000000) {
    return 'Xe cao cấp: Dành cho người đam mê, có nhiều kinh nghiệm và kiến thức chuyên môn sâu.';
  }
  return '';
}
function yearTip(year) {
  // Chuyển giá trị về số nguyên để so sánh
  const y = parseInt(year);
  if (isNaN(y)) return '';

  if (y < 2025) {
    return `Đáp ứng tốt đầy đủ nhu cầu sử dụng và linh kiện thay thế dễ tìm.`;
  }
  if (y >= 2025) {
    return `Mới nhất với nhiều công nghệ, tối ưu hiệu suất và thẩm mỹ.`;
  }
  return '';
}


/* ================== INIT ================== */
/* ===== HOT PRODUCTS ===== */
let hotIndex = 0;
let hotInterval;

function renderHotProducts() {
  const track = document.getElementById('hotTrack');
  if (!track) return;

  // Lọc xe < 15 triệu và SẮP XẾP GIÁ THẤP ĐẾN CAO
  const hot = bikes
    .filter(b => parseInt(b.price.replace(/\D/g,'')) < 15000000)
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));
      return priceA - priceB;
    })
    .slice(0, 10);

  track.innerHTML = hot.map(b => `
    <div class="hot-card">
      <div class="hot-badge">HOT</div>

      <img src="images/bike-${b.id}.jpg"
           onerror="this.src='images/no-image.jpg'">

      <h4>${b.name}</h4>
      <div class="price">${b.price}</div>

      <button class="btn buy" onclick="addCart('${b.name}')">Mua</button>

      <button class="btn compare"
        onclick="toggle(${b.id}); syncCancelBtn();">
        ⇄ So sánh
      </button>
    </div>
  `).join('');

  hotIndex = 0;
  track.style.transform = 'translateX(0)';
  startHotAuto();
}

function slideHot(step) {
  const track = document.getElementById('hotTrack');
  if (!track) return;
  const cardWidth = 236;
  const visible = 4;
  const maxIndex = Math.max(0, track.children.length - visible);

  hotIndex += step;
  if (hotIndex < 0) hotIndex = maxIndex;
  if (hotIndex > maxIndex) hotIndex = 0;

  track.style.transform = `translateX(${-hotIndex * cardWidth}px)`;
}

function startHotAuto() {
  clearInterval(hotInterval);
  hotInterval = setInterval(() => slideHot(1), 2000);
}

/* ===== NEW PRODUCTS 2026 ===== */
let newIndex = 0;
let newInterval;

function renderNewProducts() {
  const track = document.getElementById('newTrack');
  if (!track) return;

  // Lọc xe năm 2026 và SẮP XẾP GIÁ THẤP ĐẾN CAO
  const list = bikes
    .filter(b => b.year === 2026)
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));
      return priceA - priceB;
    })
    .slice(0, 10);

  track.innerHTML = list.map(b => `
    <div class="new-card">
      <div class="new-badge">NEW</div>

      <img src="images/bike-${b.id}.jpg"
           onerror="this.src='images/no-image.jpg'">

      <h4>${b.name}</h4>
      <div class="price">${b.price}</div>

      <button class="btn buy" onclick="addCart('${b.name}')">Mua</button>

      <button class="btn compare"
        onclick="toggle(${b.id}); syncCancelBtn();">
        ⇄ So sánh
      </button>
    </div>
  `).join('');

  newIndex = 0;
  track.style.transform = 'translateX(0)';
  startNewAuto();
}

function slideNew(step){
  const track = document.getElementById('newTrack');
  if (!track) return;
  const cardWidth = 236;
  const visible = 4;
  const maxIndex = Math.max(0, track.children.length - visible);

  newIndex += step;
  if (newIndex < 0) newIndex = maxIndex;
  if (newIndex > maxIndex) newIndex = 0;

  track.style.transform = `translateX(${-newIndex * cardWidth}px)`;
}

function startNewAuto(){
  clearInterval(newInterval);
  newInterval = setInterval(() => slideNew(1), 2400);
}

// KHỞI CHẠY TẤT CẢ
render(); 
renderHotProducts();
renderNewProducts();
/* ===== SLIDESHOW ===== */
const slides = [
  'images/vibe-1.jpg',
  'images/vibe-2.jpg',
  'images/vibe-3.jpg',
  'images/vibe-4.jpg',
  'images/vibe-5.jpg'
];

let slideIndex = 0;
const slideImg = document.getElementById('slideImage');

setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  slideImg.src = slides[slideIndex];
}, 4000); // đổi ảnh mỗi 4 giây
function goHome() {

    // Reset ô tìm kiếm
    document.getElementById("search").value = "";
    document.getElementById("searchAdvanced").value = "";

    // Reset các bộ lọc
    document.getElementById("filterType").value = "";
    document.getElementById("filterPrice").value = "";
    document.getElementById("filterWheel").value = "";
    document.getElementById("filterYear").value = "";

    // Reset so sánh
    compare = [];
    cancelBtn.style.display = "none";

    // Hiển thị lại toàn bộ sản phẩm
    applyAdvancedFilter();

    // Cuộn lên đầu trang
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
// Hàm đóng/mở popup
function togglePopup(show) {
    const popup = document.getElementById('popup-consult');
    const reopenBtn = document.getElementById('reopen-btn');

    if (show) {
        popup.style.display = 'block';
        reopenBtn.style.display = 'none';
    } else {
        popup.style.display = 'none';
        reopenBtn.style.display = 'flex';
    }
}

// Tự động bật sau khi mở web 2 giây
window.onload = function() {
    setTimeout(function() {
        togglePopup(true);
    }, 2000); // 2000ms = 2 giây
};
/* ================== HỆ THỐNG LỌC NÂNG CAO TỐI ƯU ================== */

// Hàm bổ trợ để hiển thị thẻ sản phẩm (Tránh lỗi renderProductCard không tồn tại)
function createProductHTML(b) {
    const selected = compare.some(x => x.id === b.id);
    const liked = favorites.includes(b.id);

    return `
    <div class="card">

        <button
            type="button"
            class="favorite-btn ${liked ? 'active' : ''}"
            onclick="toggleFavorite(${b.id}, event)"
            title="${liked ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}">
            ${liked ? '♥' : '♡'}
        </button>

        <button
            type="button"
            class="quick-view-btn"
            onclick="openQuickView(${b.id}, event)"
            title="Xem nhanh cấu hình">
            🔍
        </button>

        <img
            src="images/bike-${b.id}.jpg"
            class="product-img"
            alt="${b.name}"
            onerror="this.src='images/no-image.jpg'">

        <h3>${b.name}</h3>

        <div class="price">${b.price}</div>

        <button
            class="btn buy"
            onclick="addCart('${b.name}')">
            Mua hàng
        </button>

        <button
            class="btn compare ${selected ? 'active' : ''}"
            onclick="toggle(${b.id})">
            ${selected ? '✔ Đã chọn' : '⇄ So sánh'}
        </button>

    </div>`;
}
function filterMenu(type) {

    // Đồng bộ với dropdown bộ lọc
    document.getElementById("filterType").value = type;

    // Xóa từ khóa tìm kiếm để tránh bị lọc chồng
    document.getElementById("search").value = "";
    document.getElementById("searchAdvanced").value = "";

    // Lọc sản phẩm
    applyAdvancedFilter();

    // Cuộn xuống danh sách sản phẩm
    document.querySelector(".product-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}
function applyAdvancedFilter() {
    // 1. Lấy giá trị từ các bộ lọc
    const keyword = (document.getElementById('searchAdvanced')?.value || document.getElementById('search')?.value || '').toLowerCase();
    const typeV = document.getElementById('filterType')?.value || '';
    const priceV = document.getElementById('filterPrice')?.value || '';
    const wheelV = document.getElementById('filterWheel')?.value || '';
    const yearV = document.getElementById('filterYear')?.value || '';

    // 2. Thực hiện lọc dữ liệu
    const filteredBikes = bikes.filter(b => {
        // Lọc từ khóa
        if (keyword && !b.name.toLowerCase().includes(keyword)) return false;
        // Lọc loại xe
        if (typeV && b.type !== typeV) return false;
        // Lọc năm
        if (yearV && b.year != yearV) return false;
        // Lọc kích thước bánh
        if (wheelV && !b.wheel.includes(wheelV)) return false;
        // Lọc giá
        if (priceV) {
            const p = parseInt(b.price.replace(/\D/g, ''));
            if (priceV === 'low' && p >= 15000000) return false;
            if (priceV === 'mid' && (p < 15000000 || p > 30000000)) return false;
            if (priceV === 'high' && p <= 30000000) return false;
        }
        return true;
    });

    // 3. Hiển thị kết quả
    const productsContainer = document.getElementById('products');
    if (productsContainer) {
        productsContainer.innerHTML = filteredBikes.length > 0 
            ? filteredBikes.map(createProductHTML).join('') 
            : '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">Không tìm thấy sản phẩm phù hợp.</p>';
    }

    renderCompare(); 
}

/* ================== GÁN SỰ KIỆN LẮNG NGHE ================== */
// Tự động gán sự kiện cho tất cả các dropdown và ô search
['filterType', 'filterPrice', 'filterWheel', 'filterYear'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.onchange = applyAdvancedFilter;
});

['search', 'searchAdvanced'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.oninput = applyAdvancedFilter;
});

// Ghi đè hàm render cũ để đồng bộ với bộ lọc mới
function render() {
    applyAdvancedFilter();
}
function clearAllFilters() {
    // 1. Reset tất cả các giá trị trong HTML
    const inputs = ['searchAdvanced', 'search', 'filterType', 'filterPrice', 'filterWheel', 'filterYear'];
    
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = ''; // Đưa về giá trị rỗng (Tất cả)
    });

    // 2. Chạy lại hàm lọc để cập nhật danh sách xe (sẽ hiển thị tất cả)
    applyAdvancedFilter();

    // 3. Hiệu ứng thông báo nhỏ (Tùy chọn)
    console.log("Đã làm mới danh sách sản phẩm");
}
/*=========================================
/*=========================================
    TÀI KHOẢN
=========================================*/

window.addEventListener("load", function () {

    const account = document.getElementById("accountMenu");

    if (!account) return;

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {

        account.innerHTML = "👤 Xin chào, " + user.name;

    } else {

        account.innerHTML = "👤 TÀI KHOẢN";

    }

});

function openAccount() {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {

        window.location.href = "profile.html";

    } else {

        window.location.href = "login.html";

    }

}
function toggleFavorite(id, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const index = favorites.indexOf(id);

    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }

    // Lưu danh sách ID yêu thích
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    // Lưu đầy đủ thông tin sản phẩm yêu thích
    const favoriteProducts = bikes.filter(bike =>
        favorites.includes(bike.id)
    );

    localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProducts)
    );

    applyAdvancedFilter();
}
function syncFavoriteProducts() {
    const favoriteProducts = bikes.filter(bike =>
        favorites.includes(bike.id)
    );

    localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProducts)
    );
}
/* =========================
   QUICK VIEW
========================= */

function openQuickView(id, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const bike = bikes.find(item => item.id === id);

    if (!bike) return;

    const quickViewBox = document.getElementById("quickViewBox");
    const quickView = document.getElementById("quickView");

    quickView.innerHTML = `
        <button
            type="button"
            class="quick-close"
            onclick="closeQuickView()">
            ×
        </button>

        <div class="quick-view-layout">

            <div class="quick-view-image">
                <img
                    src="images/bike-${bike.id}.jpg"
                    alt="${bike.name}"
                    onerror="this.src='images/no-image.jpg'">
            </div>

            <div class="quick-view-info">

                <h2>${bike.name}</h2>

                <div class="quick-price">
                    ${bike.price}
                </div>

                <div class="quick-specs">

                    <div>
                        <span>Loại xe</span>
                        <strong>${bike.type}</strong>
                    </div>

                    <div>
                        <span>Năm sản xuất</span>
                        <strong>${bike.year}</strong>
                    </div>

                    <div>
                        <span>Khung</span>
                        <strong>${bike.frame}</strong>
                    </div>

                    <div>
                        <span>Phanh</span>
                        <strong>${bike.brake}</strong>
                    </div>

                    <div>
                        <span>Bộ truyền động</span>
                        <strong>${bike.drivetrain}</strong>
                    </div>

                    <div>
                        <span>Kích thước bánh</span>
                        <strong>${bike.wheel}</strong>
                    </div>

                </div>

                <div class="quick-actions">

                    <button
                        class="btn buy"
                        onclick="addCart('${bike.name}')">
                        Mua hàng
                    </button>

                    <button
                        class="btn compare"
                        onclick="toggle(${bike.id}); closeQuickView();">
                        So sánh
                    </button>

                </div>

            </div>

        </div>
    `;

    quickViewBox.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeQuickView() {
    const quickViewBox = document.getElementById("quickViewBox");

    if (!quickViewBox) return;

    quickViewBox.classList.remove("show");
    document.body.classList.remove("modal-open");
}

document.addEventListener("click", function (event) {
    const quickViewBox = document.getElementById("quickViewBox");

    if (
        quickViewBox &&
        event.target === quickViewBox
    ) {
        closeQuickView();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeQuickView();
    }
});
/* Lọc sản phẩm từ đường dẫn trang khác */
window.addEventListener("load", function(){

    const params =
        new URLSearchParams(window.location.search);

    const type = params.get("type");

    if (
        type &&
        ["Touring", "MTB", "Road", "Hybrid"].includes(type)
    ){
        filterMenu(type);
    }

});
function toggleSearch(){

    document
        .querySelector(".search-box")
        .classList
        .toggle("active");

    if(document.querySelector(".search-box").classList.contains("active")){

        document.getElementById("search").focus();

    }

}
window.addEventListener("load", function () {

    compare = [
        bikes[0],
        bikes[1]
    ];

    renderCompare();

    compareBox.style.display = "block";

});