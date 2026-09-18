fetch("https://dummyjson.com/products")
.then(response => response.json())
    .then(data => {
        let htmls = "";
        data.products.forEach(item => {
            htmls += 
        `<div class = "product-item">
            <img src ="${item.thumbnail}" alt ="${item.title}"/>
            <h3>${item.title}</h3>
            <p>${item.price}$</p>
        </div>`;
        });
        const divProducts = document.querySelector("#products");
        divProducts.innerHTML = htmls;
    })