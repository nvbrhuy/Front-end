import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Input, Pagination, Select, Tag } from 'antd';
import { formatCurrency } from '../ulti/format';

const PAGE_SIZE = 6;

export function HomePage({ products, categories, brands, currentUser, onAddToCart, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, page, setPage }) {
    const filteredProducts = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return products.filter((product) => {
            const matchCategory = selectedCategory === 'all' || product.categoryId === Number(selectedCategory);
            const matchSearch =
                product.name.toLowerCase().includes(term) ||
                (categories.find((category) => category.id === product.categoryId)?.name || '').toLowerCase().includes(term);
            return matchCategory && matchSearch;
        });
    }, [products, categories, searchTerm, selectedCategory]);

    const pagedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="space-y-6">
            <section className="overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-r from-sky-600 to-cyan-500 p-6 text-white shadow-xl lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.3em] text-sky-100">BlueStore Laptop</p>
                        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Mua laptop chất lượng cao, thật hiện đại</h1>
                        <p className="mt-3 text-sky-100">Khám phá các dòng laptop gaming, văn phòng, đồ họa và cao cấp với thiết kế tối giản, hiệu năng đỉnh cao.</p>
                    </div>
                    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                        <p className="text-sm text-sky-100">Chào {currentUser?.fullName || 'khách'}</p>
                        <p className="text-2xl font-semibold">{products.length} sản phẩm đang có</p>
                    </div>
                </div>
            </section>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <Input.Search placeholder="Tìm laptop theo tên hoặc danh mục" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} className="max-w-xl" />
                    <Select value={selectedCategory} onChange={(value) => { setSelectedCategory(value); setPage(1); }} className="min-w-[220px]">
                        <Select.Option value="all">Tất cả danh mục</Select.Option>
                        {categories.map((category) => (
                            <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Button key={category.id} size="small" onClick={() => { setSelectedCategory(category.id); setPage(1); }}>{category.name}</Button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {pagedProducts.map((product) => {
                    const category = categories.find((item) => item.id === product.categoryId);
                    const brand = brands.find((item) => item.id === product.brandId);
                    return (
                        <Card key={product.id} hoverable cover={<img alt={product.name} src={product.thumbnail} className="h-48 w-full object-cover" />} className="overflow-hidden rounded-3xl border-slate-200 shadow-sm">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Tag color="blue">{category?.name || 'Laptop'}</Tag>
                                    <Tag color="gold">{brand?.name || 'Thương hiệu'}</Tag>
                                </div>
                                <Link to={`/product/${product.id}`} className="block text-lg font-semibold text-slate-800 hover:text-sky-600">{product.name}</Link>
                                <p className="text-sm text-slate-500 line-clamp-3">{product.description}</p>
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <span>⭐ {product.rating} ({product.reviewCount})</span>
                                    <span>Còn {product.stock} sản phẩm</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xl font-semibold text-sky-600">{formatCurrency(product.price)}</p>
                                        {product.oldPrice > product.price ? <p className="text-sm text-slate-400 line-through">{formatCurrency(product.oldPrice)}</p> : null}
                                    </div>
                                    <Button type="primary" onClick={() => onAddToCart(product)}>Thêm vào giỏ</Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <Pagination current={page} pageSize={PAGE_SIZE} total={filteredProducts.length} onChange={(nextPage) => setPage(nextPage)} />
            </div>
        </div>
    );
}

export function ProductDetailPage({ products, categories, brands, onAddToCart }) {
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id));

    if (!product) {
        return <div className="rounded-3xl bg-white p-8 text-center text-slate-500">Sản phẩm không tồn tại.</div>;
    }

    const category = categories.find((item) => item.id === product.categoryId);
    const brand = brands.find((item) => item.id === product.brandId);

    return (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="overflow-hidden border-0 shadow-sm">
                <img src={product.thumbnail} alt={product.name} className="h-80 w-full rounded-2xl object-cover" />
                <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Tag color="blue">{category?.name}</Tag>
                        <Tag color="gold">{brand?.name}</Tag>
                        <Tag color="green">Còn {product.stock} sản phẩm</Tag>
                    </div>
                    <h2 className="text-3xl font-semibold text-slate-800">{product.name}</h2>
                    <p className="text-slate-600">{product.description}</p>
                    <div className="grid gap-3 md:grid-cols-2">
                        {Object.entries(product.specifications || {}).map(([key, value]) => (
                            <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                <p className="text-sm capitalize text-slate-500">{key}</p>
                                <p className="font-medium text-slate-700">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
            <Card className="border-0 shadow-sm">
                <p className="text-sm text-sky-600">Đang bán</p>
                <p className="mt-2 text-4xl font-semibold text-slate-800">{formatCurrency(product.price)}</p>
                <p className="mt-2 text-sm text-slate-400 line-through">{formatCurrency(product.oldPrice)}</p>
                <div className="mt-6 space-y-3 text-sm text-slate-500">
                    <div className="rounded-2xl border border-slate-200 p-3">⭐ Đánh giá {product.rating} / 5 từ {product.reviewCount} người dùng</div>
                    <div className="rounded-2xl border border-slate-200 p-3">🚚 Giao hàng toàn quốc trong 24 giờ</div>
                    <div className="rounded-2xl border border-slate-200 p-3">🛡️ Bảo hành chính hãng 12 tháng</div>
                </div>
                <Button type="primary" size="large" className="mt-6 w-full" onClick={() => onAddToCart(product)}>Thêm vào giỏ hàng</Button>
                <Link to="/" className="mt-3 inline-flex text-sky-600">← Quay lại cửa hàng</Link>
            </Card>
        </div>
    );
}
