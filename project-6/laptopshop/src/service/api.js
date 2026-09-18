const API_BASE = 'http://localhost:3001';

async function request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, options);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
}

export const getUsers = () => request('/users');
export const getProducts = () => request('/products');
export const getCategories = () => request('/categories');
export const getBrands = () => request('/brands');
export const getOrders = () => request('/orders');

export const createUser = (user) =>
    request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });

export const updateUser = (id, changes) =>
    request(`/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
    });

export const getCartByUser = (userId) => request(`/carts?userId=${userId}`);

export const saveCart = (userId, payload) =>
    request(`/carts?userId=${userId}`).then(async (currentCarts) => {
        const data = {
            userId,
            ...payload,
        };

        if (currentCarts[0]) {
            return request(`/carts/${currentCarts[0].id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...currentCarts[0], ...data }),
            });
        }

        return request('/carts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    });

export const createOrder = (order) =>
    request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });

export const createProduct = (product) =>
    request('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });

export const updateProduct = (id, product) =>
    request(`/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });

export const deleteProduct = (id) => request(`/products/${id}`, { method: 'DELETE' });

export const createCategory = (category) =>
    request('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });

export const updateCategory = (id, category) =>
    request(`/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });

export const deleteCategory = (id) => request(`/categories/${id}`, { method: 'DELETE' });
