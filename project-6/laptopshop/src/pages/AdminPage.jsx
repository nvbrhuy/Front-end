import { useMemo, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Modal, Space, Statistic, Table, Tabs, Tag } from 'antd';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency, buildRevenueData } from '../ulti/format';

export default function AdminPage({ products, categories, users, orders, onSaveProduct, onDeleteProduct, onSaveCategory, onDeleteCategory, onUpdateUser, onRefresh }) {
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [productForm] = Form.useForm();
    const [categoryForm] = Form.useForm();

    const revenueData = useMemo(() => buildRevenueData(orders), [orders]);

    const productColumns = [
        { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
        { title: 'Danh mục', dataIndex: 'categoryId', key: 'categoryId', render: (value) => categories.find((item) => item.id === value)?.name || value },
        { title: 'Giá', dataIndex: 'price', key: 'price', render: (value) => formatCurrency(value) },
        { title: 'Tồn kho', dataIndex: 'stock', key: 'stock' },
        {
            title: 'Hành động', key: 'actions', render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => { setEditingProduct(record); productForm.setFieldsValue(record); setProductModalOpen(true); }}>Sửa</Button>
                    <Button size="small" danger onClick={() => onDeleteProduct(record.id)}>Xóa</Button>
                </Space>
            )
        },
    ];

    const categoryColumns = [
        { title: 'Tên danh mục', dataIndex: 'name', key: 'name' },
        { title: 'Slug', dataIndex: 'slug', key: 'slug' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Hành động', key: 'actions', render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => { setEditingCategory(record); categoryForm.setFieldsValue(record); setCategoryModalOpen(true); }}>Sửa</Button>
                    <Button size="small" danger onClick={() => onDeleteCategory(record.id)}>Xóa</Button>
                </Space>
            )
        },
    ];

    const userColumns = [
        { title: 'Tên', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Vai trò', dataIndex: 'role', key: 'role', render: (role) => <Tag color={role === 'admin' ? 'blue' : 'green'}>{role}</Tag> },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag> },
        {
            title: 'Hành động', key: 'actions', render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => onUpdateUser(record.id, { role: record.role === 'admin' ? 'user' : 'admin' })}>Đổi vai trò</Button>
                    <Button size="small" onClick={() => onUpdateUser(record.id, { status: record.status === 'active' ? 'inactive' : 'active' })}>Đổi trạng thái</Button>
                </Space>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-0 shadow-sm">
                    <Statistic title="Doanh thu tháng này" value={orders.reduce((sum, order) => sum + order.total, 0)} formatter={(value) => formatCurrency(value)} />
                </Card>
                <Card className="border-0 shadow-sm">
                    <Statistic title="Sản phẩm" value={products.length} />
                </Card>
                <Card className="border-0 shadow-sm">
                    <Statistic title="Người dùng" value={users.length} />
                </Card>
            </div>

            <Card className="border-0 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-800">Biểu đồ doanh thu theo tháng</h3>
                    <Button onClick={onRefresh}>Tải lại dữ liệu</Button>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fill="url(#revenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Tabs defaultActiveKey="products" items={[
                {
                    key: 'products',
                    label: 'Quản lý sản phẩm',
                    children: (
                        <div className="space-y-3">
                            <div className="flex justify-end">
                                <Button type="primary" onClick={() => { setEditingProduct(null); productForm.resetFields(); setProductModalOpen(true); }}>Thêm sản phẩm</Button>
                            </div>
                            <Table dataSource={products} columns={productColumns} rowKey="id" />
                        </div>
                    ),
                },
                {
                    key: 'categories',
                    label: 'Quản lý danh mục',
                    children: (
                        <div className="space-y-3">
                            <div className="flex justify-end">
                                <Button type="primary" onClick={() => { setEditingCategory(null); categoryForm.resetFields(); setCategoryModalOpen(true); }}>Thêm danh mục</Button>
                            </div>
                            <Table dataSource={categories} columns={categoryColumns} rowKey="id" />
                        </div>
                    ),
                },
                {
                    key: 'users',
                    label: 'Quản lý người dùng',
                    children: <Table dataSource={users} columns={userColumns} rowKey="id" />,
                },
            ]} />

            <Modal open={productModalOpen} title={editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'} onCancel={() => setProductModalOpen(false)} onOk={() => productForm.validateFields().then((values) => { onSaveProduct(values, editingProduct?.id); setProductModalOpen(false); productForm.resetFields(); })}>
                <Form form={productForm} layout="vertical">
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}> <Input /> </Form.Item>
                    <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}> <InputNumber style={{ width: '100%' }} /> </Form.Item>
                    <Form.Item name="brandId" label="Thương hiệu" rules={[{ required: true }]}> <InputNumber style={{ width: '100%' }} /> </Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true }]}> <InputNumber min={0} style={{ width: '100%' }} /> </Form.Item>
                    <Form.Item name="stock" label="Tồn kho" rules={[{ required: true }]}> <InputNumber min={0} style={{ width: '100%' }} /> </Form.Item>
                    <Form.Item name="description" label="Mô tả"> <Input.TextArea rows={3} /> </Form.Item>
                    <Form.Item name="thumbnail" label="Ảnh"> <Input /> </Form.Item>
                </Form>
            </Modal>

            <Modal open={categoryModalOpen} title={editingCategory ? 'Cập nhật danh mục' : 'Thêm danh mục'} onCancel={() => setCategoryModalOpen(false)} onOk={() => categoryForm.validateFields().then((values) => { onSaveCategory(values, editingCategory?.id); setCategoryModalOpen(false); categoryForm.resetFields(); })}>
                <Form form={categoryForm} layout="vertical">
                    <Form.Item name="name" label="Tên danh mục" rules={[{ required: true }]}> <Input /> </Form.Item>
                    <Form.Item name="slug" label="Slug" rules={[{ required: true }]}> <Input /> </Form.Item>
                    <Form.Item name="description" label="Mô tả"> <Input.TextArea rows={3} /> </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
