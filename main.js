const productsContainer = document.querySelector(".products-container");

const fetchData = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  handleData(data);
};

fetchData(`https://fakestoreapi.com/products`);

function handleData(data) {
  console.log(data);
  loadProducts(data);
}

function loadProducts(products) {
  productsContainer.innerHTML = products
    .map((value, index) => {
      let title =
        value.title.length > 10 ? value.title.slice(0, 20) : value.title;
      let shortString =
        value.description.length > 50
          ? value.description.slice(0, 50)
          : value.description;
      return `
      <div data-id=${value.id} class="card product-card text-center d-flex flex-column justify-content-center align-items-center p-1">
      <img class="card-img-top product-image" src=${value.image} alt="Card image cap">
      <h5 class="card-title">${title}...</h5>   
      <button class='btn btn-primary '>Add to Cart</button>
    </div>`;
    })
    .join("");

  showSingleProduct(document.querySelectorAll(".product-card"));
}

// function showSingleProduct(productCards) {
//   console.log(productCards);

//   productCards.forEach((value) => {
//     value.addEventListener("click", (e) => {
//       const clickedProduct = value.getAttribute("data-id");
//       window.location.href = `./single.html`;
//     });
//   });
// }

function showSingleProduct(productCards) {
  productCards.forEach((productCard) => {
    productCard.addEventListener("click", () => {
      const clickedProductId = productCard.getAttribute("data-id");
      window.location.href = `./single.html?id=${clickedProductId}`;
    });
  });
}
