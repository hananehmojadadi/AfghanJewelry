
//    GET CART


let cart = JSON.parse(localStorage.getItem("afghanJewelryCart")) || [];


//    ELEMENTS


const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");
const orderMessage = document.getElementById("orderMessage");


//    DISPLAY ORDER


function displayCheckout() {
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    checkoutTotal.textContent = "0.00";
    return;
  }

  cart.forEach(function (item) {
    checkoutItems.innerHTML += `
            <div class="checkout-item">

                <div class="checkout-item-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
                </div>

                <div class="checkout-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        $${Number(item.price).toFixed(2)}
                    </p>

                    <span>
                        Quantity: ${Number(item.quantity)}
                    </span>

                </div>

                <strong>
                    $${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </strong>

            </div>
        `;
  });


    //    CALCULATE TOTAL
  

  const total = cart.reduce(function (sum, item) {
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  checkoutTotal.textContent = total.toFixed(2);
}


//    PLACE ORDER


checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (cart.length === 0) {
    orderMessage.textContent = "Your cart is empty.";

    return;
  }

  const name = document.getElementById("customerName").value.trim();

  orderMessage.textContent = `Thank you, ${name}! Your order has been placed successfully.`;

  checkoutForm.reset();

  /* Clear cart after order */

  localStorage.removeItem("afghanJewelryCart");

  cart = [];

  displayCheckout();
});


//    START CHECKOUT


displayCheckout();
