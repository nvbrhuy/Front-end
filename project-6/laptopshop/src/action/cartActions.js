export const buildCartPayload = (userId, nextCart) => ({
    userId,
    items: nextCart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
    })),
    totalQuantity: nextCart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: nextCart.reduce((sum, item) => sum + item.quantity * item.price, 0),
    updatedAt: new Date().toISOString(),
});

export const createProductPayload = (values, id) => ({
    ...values,
    id: id || Date.now(),
    slug: values.name?.toLowerCase().replace(/\s+/g, '-') || 'new-product',
    rating: 4.5,
    reviewCount: 0,
    oldPrice: values.price,
    discount: 0,
    sold: 0,
    thumbnail: values.thumbnail || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    images: [],
    specifications: {},
    description: values.description || 'Sản phẩm mới',
});

export const createCategoryPayload = (values, id) => ({
    ...values,
    id: id || Date.now(),
});
