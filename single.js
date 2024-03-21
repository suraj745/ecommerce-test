// const image = document.querySelector(".single-left");

// let cart = [];
// const getSingleClickedProduct = async () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const id = urlParams.get("id");

//   image.innerHTML = `<h3>Loading...</h3>`;

//   const res = await fetch(`https://fakestoreapi.com/products/${id}`);
//   const data = await res.json();

//   image.innerHTML = ``;

//   loadSingleProduct(data);
// };

// getSingleClickedProduct();

// // const loadSingleProduct = async (data) => {
// //   console.log(data);
// //   const imageTag = document.createElement("img");
// //   imageTag.src = data.image;
// //   imageTag.classList.add("single-image");
// //   image.append(imageTag);

// //   const rightSection = document.querySelector(".single-right");

// //   rightSection.innerHTML = `<li class='heading'>
// //   <h4>${data.title}</h4></li>
// //   <li class='description'>
// //   <p>${data.description}</p></li>
// //   <li class='add_product_button'>
// //   <button class='btn cart-button btn-primary'>Add to Cart</button></li>`;

// //   document.querySelector(".cart-button").addEventListener("click", () => {
// //     cart.push(data);
// //     localStorage.setItem("cart", JSON.stringify(cart));
// //     // window.location.href = "./cart.html";

// //     console.log(localStorage.getItem("cart"));
// //   });
// // };

// const loadSingleProduct = async (data) => {
//   console.log(data);
//   const imageTag = document.createElement("img");
//   imageTag.src = data.image;
//   imageTag.classList.add("single-image");
//   image.append(imageTag);

//   const rightSection = document.querySelector(".single-right");

//   rightSection.innerHTML = `<li class='heading'>
//   <h4>${data.title}</h4></li>
//   <li class='description'>
//   <p>${data.description}</p></li>
//   <li class='add_product_button'>
//   <button class='btn cart-button btn-primary'>Add to Cart</button></li>`;

//   const cartButton = document.querySelector(".cart-button");
//   cartButton.addEventListener("click", () => {
//     // Check if the item is already in the cart
//     const isInCart = cart.some((item) => item.id === data.id);
//     if (!isInCart) {
//       cart.push(data);
//       localStorage.setItem("cart", JSON.stringify(cart));
//       console.log("Item added to cart:", data);
//     } else {
//       console.log("Item is already in the cart.");
//       // Handle message or UI indication that item is already in cart
//     }
//   });
// };
const image = document.querySelector(".single-left");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const getSingleClickedProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  image.innerHTML = `<h3>Loading...</h3>`;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();

  image.innerHTML = ``;

  loadSingleProduct(data);
};

getSingleClickedProduct();

const loadSingleProduct = async (data) => {
  console.log(data);
  const imageTag = document.createElement("img");
  imageTag.src = data.image;
  imageTag.classList.add("single-image");
  image.append(imageTag);

  const rightSection = document.querySelector(".single-right");

  rightSection.innerHTML = `<li class='heading'>
  <h4>${data.title}</h4></li>
  <li class='description'>
  <p>${data.description}</p></li> 
  <li class='add_product_button'>
  <button class='btn cart-button btn-primary'>Add to Cart</button></li>`;

  const cartButton = document.querySelector(".cart-button");
  cartButton.addEventListener("click", () => {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex((item) => item.id === data.id);
    if (existingItemIndex !== -1) {
      // If item already exists, increase its quantity and update the price
      cart[existingItemIndex].quantity++;
      cart[existingItemIndex].totalPrice =
        cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
      // If item doesn't exist, add it to the cart with quantity 1
      data.quantity = 1;
      data.totalPrice = data.price; // Initially, totalPrice is the price of one item
      cart.push(data);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart updated:", cart);
  });
};
