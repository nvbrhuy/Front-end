import { drawProduct } from "./drawProduct.js";
import { params, inputSearch, buttonSearch, pagiPrev, pagiNext, pagiNumber } from "./variable.js";
drawProduct();

//Search
filter.addEventListener("change", (e) => {
    console.log(e.target.value);
    switch(e.target.value) {
        case "default":
            params.sort = "";
            params.order = "";
            break;
        case "asc":
            params.sort = "price";
            params.order = "asc";
            break;
        case "desc":
            params.sort = "-price";
            params.order = "desc";
            break;
        case "discount":
            params.sort = "-discountPercentage";
            params.order = "";
            break;
    }
    drawProduct();
});

const search = () => {
    params.q = inputSearch.value.trim();    // lấy giá trị search và gán vào params.q
    drawProduct();
}

inputSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        search();
    }
});

buttonSearch.addEventListener("click", () => {
    search();
});
//End-Search

//pagination
pagiPrev.addEventListener("click", () => {
    if (params.page > 1) {
        params.page--;
        pagiNumber.innerText = params.page;
        drawProduct();
    }
});

pagiNext.addEventListener("click", () => {
    params.page++;
    pagiNumber.innerText = params.page;
    drawProduct();
});


//End-pagination