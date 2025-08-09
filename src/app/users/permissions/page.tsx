"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Shield,
  Eye,
  Settings,
  Users,
  FileText,
  Database,
  CreditCard,
  BarChart3,
  MessageSquare,
  Calendar,
  Folder,
  MoreVertical,
  Check,
  X
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action: string;
  isSystemPermission: boolean;
  rolesCount: number;
  usersCount: number;
  createdAt: string;
}

interface PermissionCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  permissions: Permission[];
}

export default function UserPermissionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const permissions: Permission[] = [
    {
      id: '1',
      name: 'View Users',
      description: 'View user profiles and basic information',
      category: 'User Management',
      resource: 'users',
      action: 'read',
      isSystemPermission: true,
      rolesCount: 3,
      usersCount: 45,
      createdAt: '2023-01-01'
    },
    {
      id: '2',
      name: 'Create Users',
      description: 'Create new user accounts',
      category: 'User Management',
      resource: 'users',
      action: 'create',
      isSystemPermission: true,
      rolesCount: 2,
      usersCount: 12,
      createdAt: '2023-01-01'
    },
    {
      id: '3',
      name: 'Edit Users',
      description: 'Modify user profiles and settings',
      category: 'User Management',
      resource: 'users',
      action: 'update',
      isSystemPermission: true,
      rolesCount: 2,
      usersCount: 12,
      createdAt: '2023-01-01'
    },
    {
      id: '4',
      name: 'Delete Users',
      description: 'Remove user accounts from the system',
      category: 'User Management',
      resource: 'users',
      action: 'delete',
      isSystemPermission: true,
      rolesCount: 1,
      usersCount: 3,
      createdAt: '2023-01-01'
    },
    {
      id: '5',
      name: 'View Content',
      description: 'Access and view content items',
      category: 'Content Management',
      resource: 'content',
      action: 'read',
      isSystemPermission: true,
      rolesCount: 4,
      usersCount: 78,
      createdAt: '2023-01-01'
    },
    {
      id: '6',
      name: 'Create Content',
      description: 'Create new content items',
      category: 'Content Management',
      resource: 'content',
      action: 'create',
      isSystemPermission: true,
      rolesCount: 3,
      usersCount: 34,
      createdAt: '2023-01-01'
    },
    {
      id: '7',
      name: 'Edit Content',
      description: 'Modify existing content items',
      category: 'Content Management',
      resource: 'content',
      action: 'update',
      isSystemPermission: true,
      rolesCount: 3,
      usersCount: 34,
      createdAt: '2023-01-01'
    },
    {
      id: '8',
      name: 'Delete Content',
      description: 'Remove content items from the system',
      category: 'Content Management',
      resource: 'content',
      action: 'delete',
      isSystemPermission: true,
      rolesCount: 2,
      usersCount: 15,
      createdAt: '2023-01-01'
    },
    {
      id: '9',
      name: 'View Analytics',
      description: 'Access analytics and reporting data',
      category: 'Analytics',
      resource: 'analytics',
      action: 'read',
      isSystemPermission: true,
      rolesCount: 3,
      usersCount: 25,
      createdAt: '2023-01-01'
    },
    {
      id: '10',
      name: 'Manage Settings',
      description: 'Configure system settings and preferences',
      category: 'System',
      resource: 'settings',
      action: 'update',
      isSystemPermission: true,
      rolesCount: 2,
      usersCount: 8,
      createdAt: '2023-01-01'
    },
    {
      id: '11',
      name: 'View Billing',
      description: 'Access billing and payment information',
      category: 'Finance',
      resource: 'billing',
      action: 'read',
      isSystemPermission: true,
      rolesCount: 2,
      usersCount: 12,
      createdAt: '2023-01-01'
    },
    {
      id: '12',
      name: 'Manage Billing',
      description: 'Modify billing settings and process payments',
      category: 'Finance',
      resource: 'billing',
      action: 'update',
      isSystemPermission: true,
      rolesCount: 1,
      usersCount: 3,
      createdAt: '2023-01-01'
    }
  ];

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'User Management': <Users className="w-5 h-5" />,
      'Content Management': <FileText className="w-5 h-5" />,
      'Analytics': <BarChart3 className="w-5 h-5" />,
      'System': <Settings className="w-5 h-5" />,
      'Finance': <CreditCard className="w-5 h-5" />,
      'Communication': <MessageSquare className="w-5 h-5" />,
      'Calendar': <Calendar className="w-5 h-5" />,
      'Files': <Folder className="w-5 h-5" />
    };
    return iconMap[category] || <Shield className="w-5 h-5" />;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'User Management': 'blue',
      'Content Management': 'green',
      'Analytics': 'purple',
      'System': 'red',
      'Finance': 'yellow',
      'Communication': 'indigo',
      'Calendar': 'pink',
      'Files': 'gray'
    };
    return colorMap[category] || 'gray';
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'read':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'create':
        return <Plus className="w-4 h-4 text-green-500" />;
      case 'update':
        return <Edit className="w-4 h-4 text-yellow-500" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || permission.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(permissions.map(p => p.category))];
  const totalPermissions = permissions.length;
  const systemPermissions = permissions.filter(p => p.isSystemPermission).length;
  const customPermissions = permissions.filter(p => !p.isSystemPermission).length;

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Permissions</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage system permissions and access controls</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => router.push('/users/permissions/add')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Create Permission
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Permissions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{totalPermissions}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Permissions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{systemPermissions}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Custom Permissions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{customPermissions}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Unlock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{categories.length}</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Database className="w-6 h-6 text-orange-600 dark:text-orange-400" />
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
                  placeholder="Search permissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Permissions Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Permission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {permission.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {permission.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(permission.category)}
                          <span className="text-sm text-gray-900 dark:text-white">
                            {permission.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {permission.resource}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getActionIcon(permission.action)}
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {permission.action}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div>{permission.rolesCount} roles</div>
                          <div className="text-gray-500 dark:text-gray-400">{permission.usersCount} users</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          permission.isSystemPermission
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {permission.isSystemPermission ? 'System' : 'Custom'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            <Eye size={16} />
                          </button>
                          {!permission.isSystemPermission && (
                            <>
                              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <Edit size={16} />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
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
