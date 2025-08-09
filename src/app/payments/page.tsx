"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Filter,
  Download,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical
} from 'lucide-react';

interface Payment {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  date: string;
  description: string;
  method: 'credit_card' | 'bank_transfer' | 'paypal' | 'stripe';
  reference: string;
  client?: string;
  vendor?: string;
}

export default function PaymentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const payments: Payment[] = [
    {
      id: '1',
      type: 'incoming',
      amount: 2500.00,
      status: 'completed',
      date: '2024-01-15T10:30:00',
      description: 'Payment for Invoice INV-2024-001',
      method: 'stripe',
      reference: 'pi_1234567890',
      client: 'Acme Corporation'
    },
    {
      id: '2',
      type: 'outgoing',
      amount: 850.00,
      status: 'completed',
      date: '2024-01-14T14:20:00',
      description: 'Software subscription payment',
      method: 'credit_card',
      reference: 'sub_9876543210',
      vendor: 'SaaS Provider Inc.'
    },
    {
      id: '3',
      type: 'incoming',
      amount: 1800.00,
      status: 'pending',
      date: '2024-01-13T09:15:00',
      description: 'Payment for Invoice INV-2024-002',
      method: 'bank_transfer',
      reference: 'bt_1122334455',
      client: 'Tech Solutions Inc.'
    },
    {
      id: '4',
      type: 'outgoing',
      amount: 320.00,
      status: 'failed',
      date: '2024-01-12T16:45:00',
      description: 'Office supplies purchase',
      method: 'credit_card',
      reference: 'cc_5566778899',
      vendor: 'Office Depot'
    },
    {
      id: '5',
      type: 'incoming',
      amount: 3200.00,
      status: 'completed',
      date: '2024-01-11T11:00:00',
      description: 'Payment for Invoice INV-2024-003',
      method: 'paypal',
      reference: 'pp_9988776655',
      client: 'Digital Marketing Co.'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard className="w-4 h-4" />;
      case 'bank_transfer':
        return <DollarSign className="w-4 h-4" />;
      case 'paypal':
        return <DollarSign className="w-4 h-4" />;
      case 'stripe':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (payment.client && payment.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (payment.vendor && payment.vendor.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalIncoming = payments.filter(p => p.type === 'incoming' && p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const totalOutgoing = payments.filter(p => p.type === 'outgoing' && p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage all your payments</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Download size={16} />
                Export
              </button>
              <button
                onClick={() => router.push('/payments/add')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                New Payment
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Incoming</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    ${totalIncoming.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Outgoing</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    ${totalOutgoing.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{pendingPayments}</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{failedPayments}</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            payment.type === 'incoming'
                              ? 'bg-green-100 dark:bg-green-900/20'
                              : 'bg-red-100 dark:bg-red-900/20'
                          }`}>
                            {payment.type === 'incoming' ? (
                              <ArrowDownLeft className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {payment.description}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {payment.client || payment.vendor} • {payment.reference}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          payment.type === 'incoming' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {payment.type === 'incoming' ? '+' : '-'}${payment.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(payment.method)}
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {payment.method.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
