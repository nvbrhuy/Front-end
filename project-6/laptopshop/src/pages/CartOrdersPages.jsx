import { Button, Card, Tag } from 'antd';
import { formatCurrency } from '../ulti/format';

export function CartPage({ cart, onUpdateCart, onCheckout, currentUser }) {
    const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-0 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-800">Giỏ hàng của bạn</h2>
                <div className="mt-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">Giỏ hàng đang trống.</div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.productId} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="font-semibold text-slate-800">{item.name}</p>
                                    <p className="text-sm text-slate-500">{formatCurrency(item.price)} / sản phẩm</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button onClick={() => onUpdateCart(item.productId, -1)}>-</Button>
                                    <span className="min-w-8 text-center font-medium">{item.quantity}</span>
                                    <Button onClick={() => onUpdateCart(item.productId, 1)}>+</Button>
                                    <Button danger onClick={() => onUpdateCart(item.productId, 0)}>Xóa</Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
            <Card className="border-0 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800">Tóm tắt đơn hàng</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between"><span>Tạm tính</span><span>{formatCurrency(totalAmount)}</span></div>
                    <div className="flex justify-between"><span>Phí vận chuyển</span><span>{formatCurrency(30000)}</span></div>
                    <div className="flex justify-between"><span>Giảm giá</span><span>{formatCurrency(0)}</span></div>
                    <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-800"><span>Tổng cộng</span><span>{formatCurrency(totalAmount + 30000)}</span></div>
                </div>
                <Button type="primary" size="large" className="mt-6 w-full" onClick={onCheckout} disabled={cart.length === 0}>Mua hàng ngay</Button>
                <p className="mt-3 text-sm text-slate-500">Đăng nhập với tài khoản {currentUser?.email || 'khách'}</p>
            </Card>
        </div>
    );
}

export function OrdersPage({ orders, currentUser }) {
    return (
        <Card className="border-0 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800">Đơn hàng của bạn</h2>
            <div className="mt-4 space-y-3">
                {orders.filter((order) => order.userId === currentUser?.id).length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">Bạn chưa có đơn hàng nào.</div>
                ) : (
                    orders.filter((order) => order.userId === currentUser?.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (
                        <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="font-semibold text-slate-800">{order.orderCode}</p>
                                    <p className="text-sm text-slate-500">Ngày tạo: {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Tag color="green">{order.paymentStatus}</Tag>
                                    <Tag color="blue">{order.orderStatus}</Tag>
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-slate-600">
                                <p>Tổng tiền: {formatCurrency(order.total)}</p>
                                <p>Sản phẩm: {order.items.length} mục</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}
