"use client"
import React, { useState } from 'react';
import { ShoppingCart, Users, Package, Star, FolderTree, TrendingUp, TrendingDown, DollarSign, Eye } from 'lucide-react';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Mock data
  const stats = {
    orders: {
      total: 1247,
      change: 12.5,
      revenue: 45680,
      pending: 23,
      completed: 1198,
      cancelled: 26
    },
    users: {
      total: 8492,
      change: 8.2,
      active: 3421,
      new: 156,
      inactive: 5071
    },
    products: {
      total: 342,
      change: -2.4,
      inStock: 298,
      lowStock: 31,
      outOfStock: 13
    },
    reviews: {
      total: 2845,
      change: 15.7,
      avgRating: 4.3,
      pending: 47,
      approved: 2798
    },
    categories: {
      total: 24,
      change: 0,
      active: 22,
      inactive: 2
    }
  };

  const recentOrders = [
    { id: '#ORD-1247', customer: 'John Doe', amount: 234.50, status: 'completed' },
    { id: '#ORD-1246', customer: 'Jane Smith', amount: 156.00, status: 'pending' },
    { id: '#ORD-1245', customer: 'Bob Wilson', amount: 89.99, status: 'completed' },
    { id: '#ORD-1244', customer: 'Alice Brown', amount: 445.20, status: 'processing' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 234, revenue: 23400 },
    { name: 'Smart Watch', sales: 189, revenue: 37800 },
    { name: 'Laptop Stand', sales: 156, revenue: 7800 },
    { name: 'USB-C Cable', sales: 142, revenue: 2840 },
  ];

  const StatCard = ({ title, value, change, icon: Icon, subtitle, color }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green' : 'text-red'}`}>
          {change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  const MiniStatCard = ({ label, value, color }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-semibold ${color}`}>{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Time Range Filter */}
        <div className="flex gap-2 mb-6">
          {['today', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-light text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={stats.orders.total.toLocaleString()}
            change={stats.orders.change}
            icon={ShoppingCart}
            subtitle={`$${stats.orders.revenue.toLocaleString()} revenue`}
            color="bg-blue-light"
          />
          <StatCard
            title="Total Users"
            value={stats.users.total.toLocaleString()}
            change={stats.users.change}
            icon={Users}
            subtitle={`${stats.users.new} new this week`}
            color="bg-green-light"
          />
          <StatCard
            title="Products"
            value={stats.products.total}
            change={stats.products.change}
            icon={Package}
            subtitle={`${stats.products.lowStock} low stock`}
            color="bg-yellow"
          />
          <StatCard
            title="Reviews"
            value={stats.reviews.total.toLocaleString()}
            change={stats.reviews.change}
            icon={Star}
            subtitle={`${stats.reviews.avgRating} avg rating`}
            color="bg-orange"
          />
          <StatCard
            title="Categories"
            value={stats.categories.total}
            change={stats.categories.change}
            icon={FolderTree}
            subtitle={`${stats.categories.active} active`}
            color="bg-teal"
          />
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Orders Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Orders Breakdown</h3>
              <ShoppingCart className="w-5 h-5 text-blue" />
            </div>
            <MiniStatCard label="Completed" value={stats.orders.completed} color="text-green-light" />
            <MiniStatCard label="Pending" value={stats.orders.pending} color="text-yellow-light" />
            <MiniStatCard label="Cancelled" value={stats.orders.cancelled} color="text-red-light" />
          </div>

          {/* Users Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Users Status</h3>
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <MiniStatCard label="Active Users" value={stats.users.active} color="text-green-light" />
            <MiniStatCard label="New Users" value={stats.users.new} color="text-blue-light" />
            <MiniStatCard label="Inactive" value={stats.users.inactive} color="text-gray-6" />
          </div>

          {/* Products Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Inventory Status</h3>
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <MiniStatCard label="In Stock" value={stats.products.inStock} color="text-green-600" />
            <MiniStatCard label="Low Stock" value={stats.products.lowStock} color="text-yellow-600" />
            <MiniStatCard label="Out of Stock" value={stats.products.outOfStock} color="text-red-600" />
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.customer}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-900">
                        ${order.amount.toFixed(2)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Orders
              </button>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      ${product.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Products
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Review Analytics</h3>
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-gray-900">{stats.reviews.avgRating}</p>
              <p className="text-sm text-gray-500 mt-1">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-gray-900">{stats.reviews.total}</p>
              <p className="text-sm text-gray-500 mt-1">Total Reviews</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">{stats.reviews.pending}</p>
              <p className="text-sm text-gray-500 mt-1">Pending Review</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">{stats.reviews.approved}</p>
              <p className="text-sm text-gray-500 mt-1">Approved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;