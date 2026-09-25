
//    PRODUCTS


const products = [
  {
    id: 1,
    name: "Turquoise Heritage Necklace",
    category: "Necklace",
    price: 35,
    image: "images/Bracelet.jpeg",
    description: "A classic necklace inspired by Afghan turquoise jewelry.",
  },
  {
    id: 2,
    name: "Kuchi Silver Earrings",
    category: "Earrings",
    price: 22,
    image: "images/Afghan Kuchi Silber Schmuc.jpeg",
    description: "Traditional-inspired earrings with a simple silver finish.",
  },
  {
    id: 3,
    name: "Traditional Kuchi Bracelet",
    category: "Bracelet",
    price: 28,
    image: "images/Handmade Afghan.jpeg",
    description: "A colorful bracelet inspired by traditional Kuchi designs.",
  },
  {
    id: 4,
    name: "Afghan Turquoise Ring",
    category: "Ring",
    price: 18,
    image: "images/ring.jpg",
    description: "A simple turquoise ring for everyday style.",
  },
  {
    id: 5,
    name: "Classic Afghan Silver Necklace",
    category: "Necklace",
    price: 42,
    image: "images/silver-necklace.jpg",
    description: "A silver necklace inspired by Afghan traditional jewelry.",
  },
  {
    id: 6,
    name: "Silver Heritage Earrings",
    category: "Earrings",
    price: 25,
    image: "images/silver-earrings.jpg",
    description: "Elegant silver earrings with a traditional touch.",
  },
  {
    id: 7,
    name: "Blue Stone Bracelet",
    category: "Bracelet",
    price: 31,
    image: "images/blue-bracelet.jpg",
    description: "A blue stone bracelet inspired by Afghan colors.",
  },
  {
    id: 8,
    name: "Classic Silver Ring",
    category: "Ring",
    price: 20,
    image: "images/silver-ring.jpg",
    description: "A simple silver ring with a clean traditional style.",
  },
  {
    id: 9,
    name: "Kuchi Statement Necklace",
    category: "Necklace",
    price: 48,
    image: "images/kuchi-necklace.jpg",
    description: "A detailed necklace inspired by Kuchi jewelry.",
  },
  {
    id: 10,
    name: "Turquoise Drop Earrings",
    category: "Earrings",
    price: 27,
    image: "images/turquoise-earrings.jpg",
    description: "Turquoise-inspired earrings for a simple elegant look.",
  },
  {
    id: 11,
    name: "Afghan Gold Tone Bracelet",
    category: "Bracelet",
    price: 30,
    image: "images/gold-bracelet.jpg",
    description: "A warm gold-tone bracelet inspired by Afghan designs.",
  },
  {
    id: 12,
    name: "Blue Stone Silver Ring",
    category: "Ring",
    price: 24,
    image: "images/blue-ring.jpg",
    description: "A silver ring featuring a beautiful blue stone style.",
  },
];


//    ELEMENTS


const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const productResult = document.getElementById("productResult");
const categoryButtons = document.querySelectorAll(".category-button");
const moreButton = document.getElementById("moreButton");

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartContainer = document.getElementById("cartContainer");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const toast = document.getElementById("toast");


//    CART


let cart = JSON.parse(localStorage.getItem("afghanJewelryCart")) || [];


//    SHOP STATE


let currentCategory = "All";


//    DISPLAY PRODUCTS


function displayProducts() {
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter(function (product) {
    const matchesSearch = product.name.toLowerCase().includes(searchText);

    const matchesCategory =
      currentCategory === "All" || product.category === currentCategory;

    return matchesSearch && matchesCategory;
  });

  /* Homepage shows only 3 products */

  const visibleProducts = filteredProducts.slice(0, 3);

  productContainer.innerHTML = "";

  /* No products */

  if (visibleProducts.length === 0) {
    productContainer.innerHTML = `
            <p class="empty-cart">
                No jewelry found.
            </p>
        `;

    productResult.textContent = "No products found.";

    moreButton.style.display = "none";

    return;
  }

  /* Create product cards */

  visibleProducts.forEach(function (product) {
    productContainer.innerHTML += `

            <article class="product-card">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-bottom">

                        <span class="product-price">
                            $${product.price}
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </article>

        `;
  });

  productResult.textContent = `Showing ${visibleProducts.length} of ${filteredProducts.length} products`;

  /* Show See More */

  if (filteredProducts.length > 3) {
    moreButton.style.display = "inline-block";
  } else {
    moreButton.style.display = "none";
  }
}


//    CATEGORY BUTTONS


categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    categoryButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    currentCategory = button.dataset.category;

    displayProducts();
  });
});


//    SEARCH


searchInput.addEventListener("input", function () {
  displayProducts();
});

//    ADD TO CART


function addToCart(productId) {
  const product = products.find(function (item) {
    return item.id === productId;
  });

  if (!product) {
    return;
  }

  const existingItem = cart.find(function (item) {
    return item.id === productId;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart();
  updateCart();

  showToast(`${product.name} added to your cart`);
}


//    REMOVE FROM CART

function removeFromCart(productId) {
  const item = cart.find(function (product) {
    return product.id === productId;
  });

  cart = cart.filter(function (product) {
    return product.id !== productId;
  });

  saveCart();
  updateCart();

  if (item) {
    showToast(`${item.name} removed`);
  }
}

//    CHANGE QUANTITY

function changeQuantity(productId, amount) {
  const item = cart.find(function (product) {
    return product.id === productId;
  });

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(productId);

    return;
  }

  saveCart();
  updateCart();
}


//    UPDATE CART

function updateCart() {
  updateCartCount();
  displayCart();
}

//    CART COUNT


function updateCartCount() {
  const totalItems = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}


//    DISPLAY CART


function displayCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    cartTotal.textContent = "0.00";

    return;
  }

  cart.forEach(function (item) {
    cartContainer.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p class="cart-item-price">
                        $${item.price}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;
  });

  const total = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  cartTotal.textContent = total.toFixed(2);
}

//    SAVE CART

function saveCart() {
  localStorage.setItem("afghanJewelryCart", JSON.stringify(cart));
}

//    OPEN CART

function openCart() {
  cartPanel.classList.add("open");

  overlay.classList.add("show");
}

//    CLOSE CART

function closeCartPanel() {
  cartPanel.classList.remove("open");

  overlay.classList.remove("show");
}

cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

overlay.addEventListener("click", closeCartPanel);


//    CHECKOUT


checkoutButton.addEventListener("click", function () {
  if (cart.length === 0) {
    showToast("Your cart is empty.");

    return;
  }

  window.location.href = "checkout.html";
});


//    CONTACT FORM


const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const message = document.getElementById("message").value.trim();

  const formMessage = document.getElementById("formMessage");

  if (!name || !email || !message) {
    formMessage.textContent = "Please complete all fields.";

    return;
  }

  formMessage.textContent = `Thank you, ${name}. Your message has been received.`;

  contactForm.reset();
});

//    NEWSLETTER


const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("newsletterEmail").value.trim();

  const newsletterMessage = document.getElementById("newsletterMessage");

  if (!email) {
    newsletterMessage.textContent = "Please enter your email.";

    return;
  }

  newsletterMessage.textContent = "Thank you for subscribing!";

  newsletterForm.reset();
});


//    TOAST


function showToast(message) {
  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}


//    START WEBSITE


displayProducts();

updateCart();
