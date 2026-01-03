'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiSearch, FiEye, FiDollarSign, FiPackage, FiClock } from 'react-icons/fi';

interface Order {
    _id: string;
    orderReference: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    puppyDetails: {
        name: string;
        breed: string;
    };
    totalAmount: number;
    depositAmount: number;
    depositPaid: boolean;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    awaiting_deposit: 'bg-orange-100 text-orange-800',
    deposit_received: 'bg-green-100 text-green-800',
    awaiting_balance: 'bg-orange-100 text-orange-800',
    paid: 'bg-green-100 text-green-800',
    ready_for_pickup: 'bg-purple-100 text-purple-800',
    in_transit: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        revenue: 0,
        awaitingPayment: 0,
    });

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const fetchOrders = async () => {
        try {
            const params = new URLSearchParams();
            if (statusFilter !== 'all') params.append('status', statusFilter);

            const response = await fetch(`/api/admin/orders?${params}`);
            const data = await response.json();

            if (data.success) {
                setOrders(data.data);
                calculateStats(data.data);
            } else {
                toast.error('Failed to load orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (ordersData: Order[]) => {
        const total = ordersData.length;
        const pending = ordersData.filter(o => o.status === 'new' || o.status === 'pending').length;
        const revenue = ordersData
            .filter(o => o.depositPaid || o.status === 'paid' || o.status === 'completed')
            .reduce((sum, o) => sum + o.totalAmount, 0);
        const awaitingPayment = ordersData.filter(
            o => o.status === 'awaiting_deposit' || o.status === 'awaiting_balance'
        ).length;

        setStats({ total, pending, revenue, awaitingPayment });
    };

    const filteredOrders = orders.filter(order => {
        const searchLower = searchTerm.toLowerCase();
        return (
            order.orderReference.toLowerCase().includes(searchLower) ||
            order.customerName.toLowerCase().includes(searchLower) ||
            order.customerEmail.toLowerCase().includes(searchLower)
        );
    });

    const formatStatus = (status: string) => {
        return status.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading orders...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-brown mb-2">Orders</h1>
                <p className="text-gray-600">Manage puppy reservations and orders</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                            <p className="text-3xl font-bold text-brown">{stats.total}</p>
                        </div>
                        <FiPackage className="text-gold" size={32} />
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <FiClock className="text-yellow-600" size={32} />
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Revenue</p>
                            <p className="text-3xl font-bold text-green-600">${stats.revenue.toLocaleString()}</p>
                        </div>
                        <FiDollarSign className="text-green-600" size={32} />
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Awaiting Payment</p>
                            <p className="text-3xl font-bold text-orange-600">{stats.awaitingPayment}</p>
                        </div>
                        <FiDollarSign className="text-orange-600" size={32} />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by reference, customer name, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="awaiting_deposit">Awaiting Deposit</option>
                        <option value="deposit_received">Deposit Received</option>
                        <option value="awaiting_balance">Awaiting Balance</option>
                        <option value="paid">Paid</option>
                        <option value="ready_for_pickup">Ready for Pickup</option>
                        <option value="in_transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <FiPackage size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>No orders found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reference</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Puppy</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-semibold text-brown">{order.orderReference}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{order.customerName}</p>
                                                <p className="text-sm text-gray-500">{order.customerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-900">{order.puppyDetails.breed}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">${order.totalAmount.toLocaleString()}</p>
                                                {order.depositPaid && (
                                                    <p className="text-xs text-green-600">Deposit Paid</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                                                {formatStatus(order.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/orders/${order._id}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold/80 transition"
                                            >
                                                <FiEye size={16} />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
