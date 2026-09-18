import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from '../routes/ProtectedRoute';
import { LoginPage, RegisterPage } from '../pages/AuthPages';
import { HomePage, ProductDetailPage } from '../pages/ShopPages';
import { CartPage, OrdersPage } from '../pages/CartOrdersPages';
import AdminPage from '../pages/AdminPage';
import {
    createCategory,
    createOrder,
    createProduct,
    createUser,
    deleteCategory,
    deleteProduct,
    getBrands,
    getCartByUser,
    getCategories,
    getOrders,
    getProducts,
    getUsers,
    saveCart,
    updateCategory,
    updateProduct,
    updateUser,
} from '../service/api';
import { buildCartPayload, createCategoryPayload, createProductPayload } from '../action/cartActions';

export default function Allrouter() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentUser, setCurrentUser] = useState(() => {
        const stored = localStorage.getItem('laptop-user');
        return stored ? JSON.parse(stored) : null;
    });
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    const loadData = useCallback(async () => {
        try {
            const [usersData, productsData, categoriesData, brandsData, ordersData] = await Promise.all([
                getUsers(),
                getProducts(),
                getCategories(),
                getBrands(),
                getOrders(),
            ]);
            setUsers(usersData);
            setProducts(productsData);
            setCategories(categoriesData);
            setBrands(brandsData);
            setOrders(ordersData);
        } catch (error) {
            message.error('Không thể tải dữ liệu từ server');
        }
    }, []);

    const loadCart = useCallback(async () => {
        if (!currentUser) {
            setCart([]);
            return;
        }

        try {
            const data = await getCartByUser(currentUser.id);
            if (data[0] && Array.isArray(data[0].items)) {
                setCart(
                    data[0].items.map((item) => ({
                        ...item,
                        name: products.find((product) => product.id === item.productId)?.name || 'Sản phẩm',
                        price: item.price,
                    }))
                );
            } else {
                setCart([]);
            }
        } catch (error) {
            console.error(error);
        }
    }, [currentUser, products]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const usersData = await getUsers();
            const matched = usersData.find((user) => user.email === values.email && user.password === values.password);
            if (matched) {
                localStorage.setItem('laptop-user', JSON.stringify(matched));
                setCurrentUser(matched);
                message.success(`Xin chào ${matched.fullName}`);
                navigate('/');
            } else {
                message.error('Email hoặc mật khẩu không đúng');
            }
        } catch (error) {
            message.error('Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (values) => {
        setLoading(true);
        try {
            const usersData = await getUsers();
            const exists = usersData.some((user) => user.email === values.email);
            if (exists) {
                message.error('Email đã tồn tại');
                return;
            }

            const newUser = {
                id: Date.now(),
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                phone: values.phone,
                avatar: `https://i.pravatar.cc/150?img=${usersData.length + 1}`,
                role: 'user',
                status: 'active',
                createdAt: new Date().toISOString(),
            };

            const created = await createUser(newUser);
            setUsers((prev) => [...prev, created]);
            localStorage.setItem('laptop-user', JSON.stringify(created));
            setCurrentUser(created);
            message.success('Đăng ký thành công');
            navigate('/');
        } catch (error) {
            message.error('Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('laptop-user');
        setCurrentUser(null);
        navigate('/login');
    };

    const persistCart = async (nextCart) => {
        if (!currentUser) return;
        try {
            await saveCart(currentUser.id, buildCartPayload(currentUser.id, nextCart));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToCart = async (product) => {
        const nextCart = [...cart];
        const existing = nextCart.find((item) => item.productId === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            nextCart.push({ productId: product.id, quantity: 1, price: product.price, name: product.name });
        }
        setCart(nextCart);
        await persistCart(nextCart);
        message.success(`${product.name} đã được thêm vào giỏ`);
    };

    const handleUpdateCart = async (productId, delta) => {
        const currentItem = cart.find((item) => item.productId === productId);
        if (!currentItem) return;

        const nextCart = cart.filter((item) => item.productId !== productId);
        if (delta > 0) {
            nextCart.push({ ...currentItem, quantity: currentItem.quantity + delta });
        } else if (delta < 0 && currentItem.quantity > 1) {
            nextCart.push({ ...currentItem, quantity: currentItem.quantity - 1 });
        }

        setCart(nextCart);
        await persistCart(nextCart);
    };

    const handleCheckout = async () => {
        if (!currentUser) {
            message.error('Vui lòng đăng nhập trước khi mua hàng');
            return;
        }

        if (cart.length === 0) {
            message.error('Giỏ hàng trống');
            return;
        }

        const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const shippingFee = 30000;
        const newOrder = {
            id: Date.now(),
            userId: currentUser.id,
            orderCode: `LS${Date.now()}`,
            items: cart.map((item) => ({
                productId: item.productId,
                name: item.name,
                thumbnail: products.find((product) => product.id === item.productId)?.thumbnail || '',
                price: item.price,
                quantity: item.quantity,
                total: item.quantity * item.price,
            })),
            shippingAddress: {
                fullName: currentUser.fullName,
                phone: currentUser.phone,
                province: 'Đà Nẵng',
                district: 'Hải Châu',
                ward: 'Thanh Bình',
                address: 'Địa chỉ mới',
            },
            subtotal,
            shippingFee,
            discount: 0,
            total: subtotal + shippingFee,
            couponCode: null,
            paymentMethod: 'cod',
            paymentStatus: 'unpaid',
            orderStatus: 'processing',
            note: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const createdOrder = await createOrder(newOrder);
            setOrders((prev) => [createdOrder, ...prev]);
            setCart([]);
            await persistCart([]);
            message.success('Đặt hàng thành công');
            navigate('/orders');
        } catch (error) {
            message.error('Đặt hàng thất bại');
        }
    };

    const handleSaveProduct = async (values, id) => {
        const payload = createProductPayload(values, id);
        try {
            if (id) {
                await updateProduct(id, payload);
            } else {
                await createProduct(payload);
            }
            await loadData();
            message.success('Lưu sản phẩm thành công');
        } catch (error) {
            message.error('Lưu sản phẩm thất bại');
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            await loadData();
            message.success('Xóa sản phẩm thành công');
        } catch (error) {
            message.error('Xóa sản phẩm thất bại');
        }
    };

    const handleSaveCategory = async (values, id) => {
        const payload = createCategoryPayload(values, id);
        try {
            if (id) {
                await updateCategory(id, payload);
            } else {
                await createCategory(payload);
            }
            await loadData();
            message.success('Lưu danh mục thành công');
        } catch (error) {
            message.error('Lưu danh mục thất bại');
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            await loadData();
            message.success('Xóa danh mục thành công');
        } catch (error) {
            message.error('Xóa danh mục thất bại');
        }
    };

    const handleUpdateUser = async (id, changes) => {
        const currentUserRecord = users.find((user) => user.id === id);
        if (!currentUserRecord) return;
        try {
            await updateUser(id, changes);
            await loadData();
            message.success('Cập nhật người dùng thành công');
        } catch (error) {
            message.error('Cập nhật người dùng thất bại');
        }
    };

    return (
        <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} loading={loading} />} />
            <Route path="/register" element={<RegisterPage onRegister={handleRegister} loading={loading} />} />
            <Route path="/" element={<AppLayout currentUser={currentUser} onLogout={handleLogout}><HomePage products={products} categories={categories} brands={brands} currentUser={currentUser} onAddToCart={handleAddToCart} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} page={page} setPage={setPage} /></AppLayout>} />
            <Route path="/product/:id" element={<AppLayout currentUser={currentUser} onLogout={handleLogout}><ProductDetailPage products={products} categories={categories} brands={brands} onAddToCart={handleAddToCart} /></AppLayout>} />
            <Route path="/cart" element={<AppLayout currentUser={currentUser} onLogout={handleLogout}><CartPage cart={cart} onUpdateCart={handleUpdateCart} onCheckout={handleCheckout} currentUser={currentUser} /></AppLayout>} />
            <Route path="/orders" element={<ProtectedRoute currentUser={currentUser}><AppLayout currentUser={currentUser} onLogout={handleLogout}><OrdersPage orders={orders} currentUser={currentUser} /></AppLayout></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute currentUser={currentUser} role="admin"><AppLayout currentUser={currentUser} onLogout={handleLogout}><AdminPage products={products} categories={categories} users={users} orders={orders} onSaveProduct={handleSaveProduct} onDeleteProduct={handleDeleteProduct} onSaveCategory={handleSaveCategory} onDeleteCategory={handleDeleteCategory} onUpdateUser={handleUpdateUser} onRefresh={loadData} /></AppLayout></ProtectedRoute>} />
        </Routes>
    );
}
