export const formatCurrency = (value) =>
    new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(value || 0);

export const buildRevenueData = (orders) => {
    const monthMap = new Map();
    orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const current = monthMap.get(key) || 0;
        monthMap.set(key, current + (order.total || 0));
    });

    return Array.from(monthMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => ({ month: key, revenue: value }));
};
