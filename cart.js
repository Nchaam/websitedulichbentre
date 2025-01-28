// Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng
let cart = JSON.parse(localStorage.getItem("tourCart")) || [];

// Hàm thêm tour vào giỏ hàng
function addToCart(
  tourId,
  tourName,
  tourImage,
  tourPrice,
  tourDuration,
  maxPeople,
  selectedDate
) {
  const tour = {
    id: tourId,
    name: tourName,
    image: tourImage,
    price: tourPrice,
    quantity: parseInt(document.getElementById("tourQuantity").value),
    duration: tourDuration,
    maxPeople: maxPeople,
    departureDate: selectedDate,
  };

  // Kiểm tra xem tour đã có trong giỏ hàng chưa
  const existingTourIndex = cart.findIndex((item) => item.id === tourId);

  if (existingTourIndex !== -1) {
    cart[existingTourIndex].quantity += tour.quantity;
  } else {
    cart.push(tour);
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem("tourCart", JSON.stringify(cart));

  // Đóng modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("bookingModal")
  );
  modal.hide();

  // Hiển thị thông báo
  alert("Đã thêm tour vào giỏ hàng!");
}

// Hàm xóa tour khỏi giỏ hàng
function removeFromCart(tourId) {
  cart = cart.filter((item) => item.id !== tourId);
  localStorage.setItem("tourCart", JSON.stringify(cart));
  displayCart();
}

// Hàm hiển thị giỏ hàng
function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="text-center">Giỏ hàng trống</p>';
    document.getElementById("totalAmount").textContent = "0đ";
    return;
  }

  let totalAmount = 0;
  let cartHTML = "";

  cart.forEach((item) => {
    const itemTotal = parseInt(item.price.replace(/\D/g, "")) * item.quantity;
    totalAmount += itemTotal;

    cartHTML += `
            <div class="cart-item card mb-3">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${
                          item.image
                        }" class="img-fluid rounded-start" alt="${item.name}">
                    </div>
                    <div class="col-md-10">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">${item.name}</h5>
                                <button class="btn btn-danger btn-sm" onclick="removeFromCart('${
                                  item.id
                                }')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                            <div class="tour-details">
                                <p class="card-text">
                                    <small class="text-muted">
                                        <i class="bi bi-clock"></i> ${
                                          item.duration
                                        }
                                        <i class="bi bi-people ms-3"></i> ${
                                          item.maxPeople
                                        } người
                                        <i class="bi bi-calendar-event ms-3"></i> ${
                                          item.departureDate
                                        }
                                    </small>
                                </p>
                                <p class="card-text">
                                    <span class="text-primary">${
                                      item.price
                                    }</span> x ${item.quantity}
                                    = <strong>${itemTotal.toLocaleString(
                                      "vi-VN"
                                    )}đ</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });

  cartContainer.innerHTML = cartHTML;
  document.getElementById(
    "totalAmount"
  ).textContent = `${totalAmount.toLocaleString("vi-VN")}đ`;
}

// Hàm xử lý thanh toán
function processPayment() {
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }
  // Thêm logic thanh toán ở đây
  alert("Cảm ơn bạn đã đặt tour! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
  cart = [];
  localStorage.removeItem("tourCart");
  displayCart();
}

// Khởi tạo hiển thị giỏ hàng khi trang được load
document.addEventListener("DOMContentLoaded", function () {
  displayCart();
});
