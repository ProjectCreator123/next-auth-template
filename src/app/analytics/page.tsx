// src/app/analytics/page.tsx
'use client';

import React, { useState } from 'react';
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
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Smartphone,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

// Sample data for advanced analytics
const trafficData = [
  { name: 'Mon', organic: 4000, paid: 2400, social: 1200, direct: 800 },
  { name: 'Tue', organic: 3000, paid: 1398, social: 1100, direct: 900 },
  { name: 'Wed', organic: 2000, paid: 9800, social: 1300, direct: 1100 },
  { name: 'Thu', organic: 2780, paid: 3908, social: 1000, direct: 700 },
  { name: 'Fri', organic: 1890, paid: 4800, social: 1400, direct: 1200 },
  { name: 'Sat', organic: 2390, paid: 3800, social: 1600, direct: 1000 },
  { name: 'Sun', organic: 3490, paid: 4300, social: 1200, direct: 800 },
];

const performanceData = [
  { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
  { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
  { subject: 'Security', A: 86, B: 130, fullMark: 150 },
  { subject: 'Usability', A: 99, B: 100, fullMark: 150 },
  { subject: 'Features', A: 85, B: 90, fullMark: 150 },
  { subject: 'Support', A: 65, B: 85, fullMark: 150 },
];

const conversionData = [
  { name: 'Landing Page', visitors: 10000, conversions: 320, rate: 3.2 },
  { name: 'Product Page', visitors: 8500, conversions: 255, rate: 3.0 },
  { name: 'Checkout', visitors: 6200, conversions: 186, rate: 3.0 },
  { name: 'Thank You', visitors: 5800, conversions: 174, rate: 3.0 },
];

const deviceData = [
  { name: 'Desktop', value: 45, color: '#0088FE' },
  { name: 'Mobile', value: 35, color: '#00C49F' },
  { name: 'Tablet', value: 15, color: '#FFBB28' },
  { name: 'Other', value: 5, color: '#FF8042' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Deep insights into your business performance</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Visitors</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">124,563</p>
                  <p className="text-sm text-green-600 mt-1">+12.5% from last week</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Page Views</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">456,789</p>
                  <p className="text-sm text-green-600 mt-1">+8.2% from last week</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bounce Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">32.4%</p>
                  <p className="text-sm text-red-600 mt-1">-2.1% from last week</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Session</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">4m 32s</p>
                  <p className="text-sm text-green-600 mt-1">+15.3% from last week</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Traffic Sources</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trafficData}>
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
                  <Area type="monotone" dataKey="organic" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="paid" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="social" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="direct" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Organic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Paid</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Social</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Direct</span>
                </div>
              </div>
            </div>

            {/* Performance Radar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <PolarRadiusAxis tick={{ fill: '#6B7280', fontSize: 10 }} />
                  <Radar name="Current" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Radar name="Target" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
