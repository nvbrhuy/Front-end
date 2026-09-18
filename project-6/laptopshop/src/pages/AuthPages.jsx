import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, Input, Row } from 'antd';

export function LoginPage({ onLogin, loading }) {
    const [form] = Form.useForm();

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_35%),linear-gradient(135deg,_#f8fbff,_#eef6ff)] px-4 py-10">
            <Card className="w-full max-w-5xl overflow-hidden border-0 shadow-2xl">
                <Row gutter={24} align="middle">
                    <Col xs={24} lg={12} className="p-2">
                        <div className="rounded-3xl bg-sky-600 p-8 text-white">
                            <h2 className="text-3xl font-semibold">Chào mừng trở lại</h2>
                            <p className="mt-3 text-sky-100">Đăng nhập để xem các mẫu laptop mới, quản lý giỏ hàng và theo dõi đơn hàng.</p>
                            <div className="mt-8 space-y-3 text-sm">
                                <div className="rounded-2xl border border-white/20 bg-white/10 p-3">✔ Phân quyền rõ ràng cho người dùng và quản trị</div>
                                <div className="rounded-2xl border border-white/20 bg-white/10 p-3">✔ Mua hàng nhanh và theo dõi trạng thái</div>
                                <div className="rounded-2xl border border-white/20 bg-white/10 p-3">✔ Quản lý sản phẩm, danh mục và doanh thu hiệu quả</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} lg={12} className="p-2">
                        <div className="p-2 lg:p-4">
                            <h3 className="text-2xl font-semibold text-slate-800">Đăng nhập</h3>
                            <p className="mt-2 text-sm text-slate-500">Sử dụng tài khoản từ database mẫu.</p>
                            <Form layout="vertical" form={form} onFinish={onLogin} className="mt-6">
                                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
                                    <Input placeholder="huy@gmail.com" />
                                </Form.Item>
                                <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                                    <Input.Password placeholder="123456" />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} className="w-full">Đăng nhập</Button>
                            </Form>
                            <div className="mt-4 text-sm text-slate-500">
                                Chưa có tài khoản? <Link to="/register" className="font-medium text-sky-600">Đăng ký ngay</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export function RegisterPage({ onRegister, loading }) {
    const [form] = Form.useForm();

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_35%),linear-gradient(135deg,_#f8fbff,_#eef6ff)] px-4 py-10">
            <Card className="w-full max-w-3xl border-0 shadow-2xl">
                <h3 className="text-2xl font-semibold text-slate-800">Tạo tài khoản mới</h3>
                <p className="mt-2 text-sm text-slate-500">Đăng ký để bắt đầu mua sắm và quản lý đơn hàng.</p>
                <Form form={form} layout="vertical" onFinish={onRegister} className="mt-6">
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true }]}> <Input /> </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}> <Input /> </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}> <Input.Password /> </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}> <Input /> </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">Đăng ký</Button>
                </Form>
                <div className="mt-4 text-sm text-slate-500">
                    Đã có tài khoản? <Link to="/login" className="font-medium text-sky-600">Đăng nhập</Link>
                </div>
            </Card>
        </div>
    );
}
