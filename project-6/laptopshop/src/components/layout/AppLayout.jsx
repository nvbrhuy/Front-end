import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Space } from 'antd';

export default function AppLayout({ currentUser, onLogout, children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { path: '/', label: 'Trang chủ' },
        { path: '/orders', label: 'Đơn hàng' },
        { path: '/cart', label: 'Giỏ hàng' },
    ];

    if (currentUser?.role === 'admin') {
        navItems.push({ path: '/admin', label: 'Quản trị' });
    }

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_45%,_#fdfefe_100%)] text-slate-800">
            <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-lg font-bold text-white shadow-lg shadow-sky-100">
                            B
                        </div>
                        <div className="leading-tight">
                            <p className="text-[1rem] font-semibold text-slate-900">BlueStore Laptop</p>
                            <p className="text-sm text-slate-500">Laptop cao cấp, hiện đại và giá tốt</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/90 p-1 md:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive(item.path)
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'text-slate-600 hover:bg-white hover:text-sky-600'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Badge count={0} offset={[6, 0]}>
                            <Button
                                onClick={() => navigate('/cart')}
                                className="rounded-full border-slate-200 px-4 text-slate-700 shadow-sm hover:border-sky-300 hover:text-sky-600"
                            >
                                Giỏ hàng
                            </Button>
                        </Badge>

                        {currentUser ? (
                            <Space size="middle" className="hidden sm:flex">
                                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 shadow-sm">
                                    <Avatar src={currentUser.avatar} size="large" />
                                    <span className="hidden text-sm font-medium text-slate-700 lg:inline">
                                        {currentUser.fullName}
                                    </span>
                                </div>
                                <Button
                                    onClick={onLogout}
                                    className="rounded-full border-slate-200 text-slate-700 shadow-sm hover:border-rose-300 hover:text-rose-600"
                                >
                                    Đăng xuất
                                </Button>
                            </Space>
                        ) : (
                            <Link to="/login">
                                <Button type="primary" className="rounded-full bg-slate-900 px-5 shadow-sm hover:bg-slate-800">
                                    Đăng nhập
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:px-6 lg:py-8">
                <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-700 p-6 text-white shadow-[0_25px_60px_-20px_rgba(15,23,42,0.35)] lg:p-8">
                    <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
                        <div className="max-w-2xl">
                            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                                Mua sắm laptop thông minh, nhanh và an tâm
                            </p>
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Khám phá laptop mới nhất với thiết kế hiện đại và hiệu năng vượt trội.
                            </h1>
                            <p className="mt-3 text-sm text-slate-200 sm:text-base">
                                Tận hưởng ưu đãi hấp dẫn, bảo hành rõ ràng và hỗ trợ kỹ thuật tận tâm.
                            </p>
                        </div>

                        <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm backdrop-blur md:grid-cols-2">
                            <div className="rounded-xl bg-white/10 p-3">
                                <p className="text-2xl font-semibold text-white">24/7</p>
                                <p className="text-slate-200">Hỗ trợ khách hàng</p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-3">
                                <p className="text-2xl font-semibold text-white">2 năm</p>
                                <p className="text-slate-200">Bảo hành ưu việt</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.12)] backdrop-blur sm:p-6 lg:p-8">
                    {children}
                </section>
            </main>

            <footer className="border-t border-slate-200 bg-slate-950 py-8 text-slate-300">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm lg:grid-cols-3 lg:px-6">
                    <div>
                        <p className="text-lg font-semibold text-white">BlueStore Laptop</p>
                        <p className="mt-2 leading-6 text-slate-400">
                            Cửa hàng laptop hiện đại, tối ưu trải nghiệm mua sắm và bảo hành rõ ràng.
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Liên kết nhanh</p>
                        <ul className="mt-3 space-y-2">
                            <li><Link to="/" className="transition hover:text-sky-400">Trang chủ</Link></li>
                            <li><Link to="/orders" className="transition hover:text-sky-400">Đơn hàng</Link></li>
                            <li><Link to="/cart" className="transition hover:text-sky-400">Giỏ hàng</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Liên hệ</p>
                        <ul className="mt-3 space-y-2">
                            <li>📞 1900 0000</li>
                            <li>📧 support@bluestore.vn</li>
                            <li>📍 123 Nguyễn Văn A, TP.HCM</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
