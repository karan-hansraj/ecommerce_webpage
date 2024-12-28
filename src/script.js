document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "IPhone 12",
      price: 599,
    },
    {
      id: 2,
      name: "IPhone 13",
      price: 799,
    },
    {
      id: 3,
      name: "IPhone 14",
      price: 899,
    },
  ];

  

  const productList = document.getElementById("product-list");

  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderCart();

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}  </span>
    <button data-id="${product.id}">Add to cart</button>
    `;

    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productid = parseInt(e.target.getAttribute("data-id"));

      const product = products.find((p) => p.id === productid);

      AddToCart(product);
    }
  });

  function AddToCart(product) {
    cart.push(product);
    renderCart();
    saveProducts();
  }

  function RemoveFromCart(product) {
    const index = cart.findIndex((p) => p.id === product.id);
    cart.splice(index, 1);
    renderCart();
    saveProducts();
  }

  function renderCart() {
    cartItems.innerText = "";
    
    let totalprice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item) => {
        totalprice += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("item");
        cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(cartItem);

        totalPriceDisplay.textContent = `$${totalprice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }
  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productid = parseInt(e.target.getAttribute("data-id"));

      const product = products.find((p) => p.id === productid);

      RemoveFromCart(product);
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout Sucessfully");
    renderCart();
  });

  function saveProducts() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
