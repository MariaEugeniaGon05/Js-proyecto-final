document.addEventListener("DOMContentLoaded", function () {
  let itemsContainer = document.getElementById("items");
  let cart = document.getElementById("cart");
  let total = document.getElementById("total");
  let storageKey = "cartItems";

  // Agregar artículo al carrito
  function addToCart(item) {
    let cartItems = JSON.parse(sessionStorage.getItem(storageKey)) || [];

    // Verificar si el artículo ya está en el carrito
    let existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Incrementar la cantidad del artículo existente
      existingItem.quantity += 1;
    } else {
      // Agregar el artículo al carrito
      item.quantity = 1;
      cartItems.push(item);
    }

    sessionStorage.setItem(storageKey, JSON.stringify(cartItems));
    displayCart();
  }

  // Mostrar el contenido del carrito y el total en pantalla
  function displayCart() {
    cart.innerHTML = "";
    let totalAmount = 0;

    let cartItems = JSON.parse(sessionStorage.getItem(storageKey)) || [];

    cartItems.forEach(function (item) {
      let li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = `${item.name} (Cantidad: ${item.quantity})`;

      cart.appendChild(li);

      let itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;
      total.textContent = `Total a pagar: $${totalAmount}`;
    });
  }

  // Mostrar los artículos en la página
  function displayItems() {
    itemsContainer.innerHTML = "";

    items.forEach(function (item) {
      let card = document.createElement("div");
      card.classList.add("card", "col-4");

      let cardImg = document.createElement("img");
      cardImg.classList.add("card-img-top");
      cardImg.src = item.image;
      cardImg.alt = item.name;

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let itemName = document.createElement("h5");
      itemName.classList.add("card-title");
      itemName.textContent = item.name;

      let itemPrice = document.createElement("p");
      itemPrice.classList.add("card-text");
      itemPrice.textContent = `${item.descripcion} $${item.price}`;

      let addToCartBtn = document.createElement("button");
      addToCartBtn.classList.add("btn", "btn-primary");
      addToCartBtn.textContent = "Agregar al carrito";
      addToCartBtn.addEventListener("click", function () {
        addToCart(item);
      });

      cardBody.appendChild(itemName);
      cardBody.appendChild(itemPrice);
      cardBody.appendChild(addToCartBtn);

      card.appendChild(cardImg);
      card.appendChild(cardBody);
      itemsContainer.appendChild(card);
    });
  }

  displayItems();
  displayCart();
});