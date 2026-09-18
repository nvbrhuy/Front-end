import { fetchApi } from "./fetchApi.js";
import { API } from "./constant.js";
import { params, productContainer } from "./variable.js";

export const drawProduct = () => {
    let api = `${API}?_page=${params.page}&_per_page=${params.perPage}`
    // nếu có search thì thêm query vào API
    
    if (params.q) {
        api += `&category=${params.q}`;
    }
    else if (params.category) {
        api += `&category=${params.category}`;
    }
    if (params.sort) {
        api += `&_sort=${params.sort}`;
    }
    console.log(api);
    fetchApi(api)
    .then(data => {
        const products = data.data || data;
        let htmls = products.map(item => {
            return `
                <div class="product__item">
                    <div class="product__image">
                        <img src="${item.thumbnail}" alt="${item.title}">
                        <div class="product__percent">${item.discountPercentage}%</div>
                    </div>
                    <div class="product__content">
                        <h3 class="product__title">${item.title}</h3>
                        <div class="product__meta">
                            <div class="product__price">${item.price}$</div>
                            <div class="product__stock">${item.stock} sản phẩm còn lại</div>
                        </div>
                    </div>
                </div>
            `;
        }).join(""); // nối các phần tử thành một chuỗi duy nhất

        productContainer.innerHTML = htmls;
    });
}