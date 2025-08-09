// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import LayoutWrapper from '@/app/components/layout/LayoutWrapper';
import AuthGuard from '@/app/components/AuthGuard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download
} from 'lucide-react';

// Sample data for charts
const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400, users: 240 },
  { name: 'Feb', sales: 3000, revenue: 1398, users: 221 },
  { name: 'Mar', sales: 2000, revenue: 9800, users: 229 },
  { name: 'Apr', sales: 2780, revenue: 3908, users: 200 },
  { name: 'May', sales: 1890, revenue: 4800, users: 218 },
  { name: 'Jun', sales: 2390, revenue: 3800, users: 250 },
  { name: 'Jul', sales: 3490, revenue: 4300, users: 210 },
];

const pieData = [
  { name: 'Desktop', value: 400, color: '#0088FE' },
  { name: 'Mobile', value: 300, color: '#00C49F' },
  { name: 'Tablet', value: 200, color: '#FFBB28' },
  { name: 'Other', value: 100, color: '#FF8042' },
];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Created new project', time: '2 minutes ago', avatar: 'JD' },
  { id: 2, user: 'Sarah Wilson', action: 'Updated user profile', time: '5 minutes ago', avatar: 'SW' },
  { id: 3, user: 'Mike Johnson', action: 'Completed task #123', time: '10 minutes ago', avatar: 'MJ' },
  { id: 4, user: 'Emily Brown', action: 'Added new comment', time: '15 minutes ago', avatar: 'EB' },
];

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
}

const KPICard = ({ title, value, change, changeType, icon: Icon, color }: KPICardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        <div className="flex items-center mt-2">
          {changeType === 'positive' ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ml-1 ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here&apos;s what&apos;s happening with your business today.</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Calendar size={16} />
                Last 30 days
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Revenue"
              value="$45,231"
              change="+20.1%"
              changeType="positive"
              icon={DollarSign}
              color="bg-green-500"
            />
            <KPICard
              title="Total Users"
              value="2,420"
              change="+15.3%"
              changeType="positive"
              icon={Users}
              color="bg-blue-500"
            />
            <KPICard
              title="Total Orders"
              value="1,234"
              change="-3.2%"
              changeType="negative"
              icon={ShoppingCart}
              color="bg-purple-500"
            />
            <KPICard
              title="Page Views"
              value="98,543"
              change="+8.7%"
              changeType="positive"
              icon={Eye}
              color="bg-orange-500"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Sales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Area type="monotone" dataKey="sales" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Device Usage Pie Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Device Usage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Stats</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">3.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Server Uptime</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Top Performing Pages</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">/dashboard</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">/products</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">987</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">/analytics</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">654</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
