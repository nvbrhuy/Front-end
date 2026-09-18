export let params = {
    q: "", // cũng có thể dùng q thay vì search
    category: "",
    order: "",
    search: "",
    sort: "",
    page: 1,
    perPage: 10,
}

export const inputSearch = document.querySelector("#search");
export const buttonSearch = document.querySelector("#btnSearch");
export const filter = document.querySelector("#filter");
export const pagiPrev = document.querySelector("#pagination__prev");
export const pagiNext = document.querySelector("#pagination__next");
export const pagiNumber = document.querySelector("#pagination__number");
export const productContainer  = document.querySelector("#product");
