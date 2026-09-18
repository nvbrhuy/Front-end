import { fetchApi } from "./fetchApi.js";
import { API } from "./constant.js";
import { params } from "./variable.js";
import { drawProduct } from "./drawProduct.js";
fetchApi(API)
    .then(data => {
         // lấy danh sách category không trùng
        const uniqueCategories = [...new Set(data.map(item => item.category))];

        let htmls = uniqueCategories.map(category => {
            return `
                <div class="category__item" data-category="${category}">
                    <h3>${category}</h3>
                </div>
            `;
        }).join(""); // nối các phần tử thành một chuỗi duy nhất

        document.querySelector("#category").innerHTML = htmls;

        const listCategory = document.querySelectorAll(".category__item");
        listCategory.forEach(item => {
            item.addEventListener("click", () => {
                // params.category = item.dataset.category;
                params.category = item.getAttribute("data-category");
                // console.log(params);
                drawProduct();
            });
        });
    });