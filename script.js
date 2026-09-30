// ==============================
// MENU MOBILE
// ==============================

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("open");
}

// ==============================
// WHATSAPP
// ==============================

function openWhatsApp() {
  const phone = "5579996075263";
  const message = "Olá! Gostaria de fazer um pedido.";
  const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

// ==============================
// QUANTIDADE
// ==============================

function changeQuantity(button, value) {
  const container = button.closest(".quantity");
  const number = container.querySelector("span");

  let quantity = parseInt(number.textContent);
  quantity += value;

  if (quantity < 1) {
    quantity = 1;
  }

  number.textContent = quantity;
}

// ==============================
// CARRINHO
// ==============================

let cart = [];

function addProduct(name, price, button) {
  const productCard = button.closest(".product-card");

  const quantity = parseInt(
    productCard.querySelector(".quantity span").textContent,
  );

  cart.push({
    name: name,
    price: price,
    quantity: quantity,
  });

  updateCart();

  showNotification(name + " adicionado ao pedido!");
}

function updateCart() {
  const count = cart.reduce((total, product) => total + product.quantity, 0);

  document.getElementById("cartCount").textContent = count;
}

// ==============================
// MOSTRAR CARRINHO
// ==============================

function showCart() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  renderCartSummary();

  document.getElementById("cartOverlay").classList.add("open");
  document.getElementById("cartModal").classList.add("open");

  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.getElementById("cartModal").classList.remove("open");

  document.body.style.overflow = "";
}

function renderCartSummary() {
  let html = "";
  let total = 0;

  cart.forEach((product) => {
    const subtotal = product.price * product.quantity;

    total += subtotal;

    html += `
      <div class="cart-line">
        <span>${product.quantity}x ${product.name}</span>
        <strong>
          R$ ${subtotal.toFixed(2).replace(".", ",")}
        </strong>
      </div>
    `;
  });

  document.getElementById("cartSummary").innerHTML = html;

  document.getElementById("cartTotal").textContent =
    "R$ " + total.toFixed(2).replace(".", ",");
}

// ==============================
// FINALIZAR PEDIDO WHATSAPP
// ==============================

function checkoutWhatsApp() {
  const name = document.getElementById("clientName").value.trim();
  const location = document.getElementById("clientLocation").value.trim();

  const pagamento = document.getElementById("clientPagamento").value.trim();

  const reference = document.getElementById("clientReference").value.trim();

  const note = document.getElementById("clientNote").value.trim();

  if (name === "" || location === "" || pagamento === "") {
    if (name === "") {
      document.getElementById("clientName").classList.add("field-error");
    }

    if (location === "") {
      document.getElementById("clientLocation").classList.add("field-error");
    }

    if (pagamento === "") {
      document.getElementById("clientPagamento").classList.add("field-error");
    }

    showNotification("Preencha seu nome, localização e forma de pagamento!");

    return;
  }

  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const grouped = [];

  cart.forEach((product) => {
    const existing = grouped.find(
      (item) => item.name === product.name && item.price === product.price,
    );

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      grouped.push({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
    }
  });

  let message = "*NOVO PEDIDO - JR DISTRIBUIDORA*\n\n";

  message += "Cliente: " + name + "\n";
  message += "Localização: " + location + "\n";
  message += "Pagamento: " + pagamento + "\n";

  if (reference !== "") {
    message += "Referência: " + reference + "\n";
  }

  if (note !== "") {
    message += "Observação: " + note + "\n";
  }

  message += "\nItens do pedido:\n";

  let total = 0;

  grouped.forEach((product) => {
    const subtotal = product.price * product.quantity;

    total += subtotal;

    message +=
      product.quantity +
      "x " +
      product.name +
      " - R$ " +
      subtotal.toFixed(2).replace(".", ",") +
      "\n";
  });

  message += "\nTotal: R$ " + total.toFixed(2).replace(".", ",");

  const phone = "5579996075263";

  window.open(
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(message),
    "_blank",
  );

  cart = [];

  updateCart();
  closeCart();

  showNotification("Pedido enviado com sucesso!");
}

// ==============================
// FECHAR CARRINHO COM ESC
// ==============================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
  }
});

// ==============================
// REMOVER ERRO DOS CAMPOS
// ==============================

["clientName", "clientLocation", "clientPagamento"].forEach((id) => {
  const field = document.getElementById(id);

  if (field) {
    field.addEventListener("input", function () {
      this.classList.remove("field-error");
    });
  }
});

// ==============================
// NOTIFICAÇÃO
// ==============================

function showNotification(message) {
  const notification = document.createElement("div");

  notification.textContent = message;

  notification.style.position = "fixed";
  notification.style.bottom = "95px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.background = "#006fc1";
  notification.style.color = "white";
  notification.style.padding = "14px 24px";
  notification.style.borderRadius = "30px";
  notification.style.fontSize = "12px";
  notification.style.fontWeight = "700";
  notification.style.zIndex = "5000";
  notification.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transition = ".4s";

    setTimeout(() => {
      notification.remove();
    }, 400);
  }, 2200);
}

// ==============================
// FAQ
// ==============================

function toggleFaq(button) {
  const item = button.closest(".faq-item");

  const allItems = document.querySelectorAll(".faq-item");

  allItems.forEach((other) => {
    if (other !== item) {
      other.classList.remove("active");
    }
  });

  item.classList.toggle("active");
}

function openAllFaqs() {
  const allItems = document.querySelectorAll(".faq-item");

  allItems.forEach((item) => {
    item.classList.add("active");
  });
}

// ==============================
// EVENTOS
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const mobileMenuButton = document.getElementById("mobileMenuButton");

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMenu);
  }

  // Botões de diminuir quantidade
  document.querySelectorAll(".quantity-minus").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(button, -1);
    });
  });

  // Botões de aumentar quantidade
  document.querySelectorAll(".quantity-plus").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(button, 1);
    });
  });

  // Adicionar produtos
  document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.product;

      const price = Number(button.dataset.price);

      addProduct(name, price, button);
    });
  });

  // FAQ
  document.querySelectorAll(".faq-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      toggleFaq(button);
    });
  });

  // Abrir todas as perguntas
  const allFaqButton = document.getElementById("openAllFaqs");

  if (allFaqButton) {
    allFaqButton.addEventListener("click", openAllFaqs);
  }

  // Carrinho flutuante
  const cartFloating = document.getElementById("cartFloating");

  if (cartFloating) {
    cartFloating.addEventListener("click", showCart);

    cartFloating.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showCart();
      }
    });
  }

  // Overlay do carrinho
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }

  // Botão fechar carrinho
  const cartModalClose = document.getElementById("cartModalClose");

  if (cartModalClose) {
    cartModalClose.addEventListener("click", closeCart);
  }

  // Botão finalizar pedido
  const checkoutButton = document.getElementById("checkoutWhatsApp");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", checkoutWhatsApp);
  }

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("mobileMenu").classList.remove("open");
    });
  });

  // ==============================
  // ANIMAÇÃO DOS PRODUTOS
  // ==============================

  const cards = document.querySelectorAll(".product-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";

          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  cards.forEach((card) => {
    card.style.opacity = "0";

    card.style.transform = "translateY(20px)";

    card.style.transition = "opacity .5s ease, transform .5s ease";

    observer.observe(card);
  });
});
