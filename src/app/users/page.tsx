// src/app/users/page.tsx
'use client';

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from 'next/navigation';
import DataTable from "@/app/components/ui/DataTable";
import {
  Plus,
  UserPlus,
  Download,
  Upload,
  Shield,
  ShieldCheck,
  ShieldX
} from 'lucide-react';

// Sample user data
const userData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-15',
    avatar: 'JD',
    department: 'Engineering',
    joinDate: '2023-06-15'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2024-01-14',
    avatar: 'SW',
    department: 'Marketing',
    joinDate: '2023-08-20'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2024-01-10',
    avatar: 'MJ',
    department: 'Sales',
    joinDate: '2023-09-12'
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-15',
    avatar: 'EB',
    department: 'Support',
    joinDate: '2023-11-05'
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2024-01-13',
    avatar: 'DL',
    department: 'Engineering',
    joinDate: '2023-07-18'
  }
];

const columns = [
  {
    key: 'name',
    label: 'User',
    sortable: true,
    render: (value: string, row: any) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
          {row.avatar}
        </div>
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.email}</div>
        </div>
      </div>
    )
  },
  {
    key: 'role',
    label: 'Role',
    sortable: true,
    render: (value: string) => {
      const roleColors = {
        Admin: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        Manager: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        User: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      };
      const roleIcons = {
        Admin: <ShieldX size={14} />,
        Manager: <ShieldCheck size={14} />,
        User: <Shield size={14} />
      };

      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[value as keyof typeof roleColors]}`}>
          {roleIcons[value as keyof typeof roleIcons]}
          {value}
        </span>
      );
    }
  },
  {
    key: 'department',
    label: 'Department',
    sortable: true
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value: string) => (
      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'Active'
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'lastLogin',
    label: 'Last Login',
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString()
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString()
  }
];

export default function UsersPage() {
  const router = useRouter();
  const [showAddUser, setShowAddUser] = useState(false);

  const handleEdit = (user: any) => {
    console.log('Edit user:', user);
    // Implement edit functionality
  };

  const handleDelete = (user: any) => {
    console.log('Delete user:', user);
    // Implement delete functionality
  };

  const handleView = (user: any) => {
    console.log('View user:', user);
    // Implement view functionality
  };

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your team members and their permissions</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Upload size={16} />
                Import
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Download size={16} />
                Export
              </button>
              <button
                onClick={() => router.push('/users/add')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus size={16} />
                Add User
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{userData.length}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {userData.filter(u => u.status === 'Active').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {userData.filter(u => u.role === 'Admin').length}
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <ShieldX className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New This Month</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">2</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <UserPlus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <DataTable
            data={userData}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            searchable={true}
            filterable={true}
            pagination={true}
            pageSize={10}
          />
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
