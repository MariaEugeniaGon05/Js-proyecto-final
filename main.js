document.addEventListener("DOMContentLoaded", function () {
  let itemsContainer = document.getElementById("items");
  let cart = document.getElementById("cart");
  let storageKey = "cartItems";
  let cremasContainer = document.getElementById("cremas");
  let cartIcon = document.querySelector(".cart-icon");

  cartIcon.addEventListener("click", (e) => {
    e.target.parentNode.querySelector("ul").classList.toggle("cart-modal-open");
  });

  // Agregar artículos al carrito
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
    while (cart.firstChild) {
      cart.removeChild(cart.firstChild);
    }

    let totalAmount = 0;

    let cartItems = JSON.parse(sessionStorage.getItem(storageKey)) || [];

    cartItems.forEach((item) => {
      let contenedor = document.createElement("DIV");
      contenedor.classList.add("list-group-item");
      contenedor.innerHTML = `
       <p class='item-name'>${item.name}</p>
       <p class='item-price'>${item.price}</p>
       <p class='item-quantity'>${item.quantity}</p>
      `;

      let removeBtn = document.createElement("button");
      removeBtn.classList.add("btn", "btn-danger", "btn-sm");
      removeBtn.textContent = "Eliminar";
      removeBtn.addEventListener("click", function () {
        removeCartItem(item.id);
      });

      contenedor.appendChild(removeBtn);
      cart.appendChild(contenedor);
    });

    if (cartItems.length === 0) {
      Swal.fire({
        title: "Carrito vacío",
        text: "¡Tu carrito está vacío!",
        icon: "info",
        confirmButtonText: "Aceptar",
      });
    }
  }

  // Eliminar un artículo del carrito
  function removeCartItem(itemId) {
    let cartItems = JSON.parse(sessionStorage.getItem(storageKey)) || [];

    // Filtrar los artículos para excluir el artículo a eliminar
    cartItems = cartItems.filter((item) => item.id !== itemId);

    sessionStorage.setItem(storageKey, JSON.stringify(cartItems));
    displayCart();
  }

  // Mostrar los artículos en la página perfumes
  function displayItems() {
    itemsContainer.innerHTML = "";

    fetch("../items.json")
      .then((response) => response.json())
      .then((items) => {
        items.forEach(function (item) {
          let card = document.createElement("div");
          card.classList.add("card", "col-md-4", "col-sm-6");

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
      })
      .catch((error) => {
        console.log("Error al obtener los artículos:", error);
      });
  }
  displayItems();
  displayCart();
});
