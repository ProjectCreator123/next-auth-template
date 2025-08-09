"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Shield,
  ShieldCheck,
  ShieldX,
  Crown,
  User,
  Settings,
  Eye,
  Lock,
  Unlock,
  MoreVertical
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  color: string;
  icon: React.ReactNode;
  isDefault: boolean;
  createdAt: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export default function UserRolesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const roles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      permissions: ['all'],
      color: 'red',
      icon: <Crown className="w-5 h-5" />,
      isDefault: false,
      createdAt: '2023-01-01'
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access with most permissions',
      userCount: 5,
      permissions: ['user_management', 'content_management', 'analytics', 'settings'],
      color: 'purple',
      icon: <ShieldX className="w-5 h-5" />,
      isDefault: false,
      createdAt: '2023-01-01'
    },
    {
      id: '3',
      name: 'Manager',
      description: 'Team management and project oversight',
      userCount: 12,
      permissions: ['team_management', 'project_management', 'reports'],
      color: 'blue',
      icon: <ShieldCheck className="w-5 h-5" />,
      isDefault: false,
      createdAt: '2023-01-01'
    },
    {
      id: '4',
      name: 'Editor',
      description: 'Content creation and editing permissions',
      userCount: 25,
      permissions: ['content_create', 'content_edit', 'media_upload'],
      color: 'green',
      icon: <Edit className="w-5 h-5" />,
      isDefault: false,
      createdAt: '2023-01-01'
    },
    {
      id: '5',
      name: 'User',
      description: 'Basic user access with limited permissions',
      userCount: 156,
      permissions: ['profile_edit', 'basic_access'],
      color: 'gray',
      icon: <User className="w-5 h-5" />,
      isDefault: true,
      createdAt: '2023-01-01'
    }
  ];

  const permissions: Permission[] = [
    { id: 'user_management', name: 'User Management', description: 'Create, edit, and delete users', category: 'Users' },
    { id: 'role_management', name: 'Role Management', description: 'Manage user roles and permissions', category: 'Users' },
    { id: 'content_create', name: 'Create Content', description: 'Create new content', category: 'Content' },
    { id: 'content_edit', name: 'Edit Content', description: 'Edit existing content', category: 'Content' },
    { id: 'content_delete', name: 'Delete Content', description: 'Delete content', category: 'Content' },
    { id: 'analytics', name: 'Analytics', description: 'View analytics and reports', category: 'Analytics' },
    { id: 'settings', name: 'System Settings', description: 'Manage system settings', category: 'System' },
    { id: 'billing', name: 'Billing', description: 'Manage billing and payments', category: 'Finance' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Roles</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage user roles and permissions</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => router.push('/users/roles/add')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Create Role
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Roles</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{roles.length}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{totalUsers}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Custom Roles</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {roles.filter(r => !r.isDefault).length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Permissions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{permissions.length}</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Lock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <div key={role.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getColorClasses(role.color)}`}>
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                      {role.isDefault && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                      <Edit size={16} />
                    </button>
                    {!role.isDefault && (
                      <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{role.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Users size={16} />
                    <span>{role.userCount} users</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Lock size={16} />
                    <span>{role.permissions.length === 1 && role.permissions[0] === 'all' ? 'All' : role.permissions.length} permissions</span>
                  </div>
                </div>

                {/* Permissions Preview */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Permissions</h4>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((permission, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                      >
                        {permission === 'all' ? 'All Permissions' : permission.replace('_', ' ')}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{role.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Permissions Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(
                permissions.reduce((acc, permission) => {
                  if (!acc[permission.category]) {
                    acc[permission.category] = [];
                  }
                  acc[permission.category].push(permission);
                  return acc;
                }, {} as Record<string, Permission[]>)
              ).map(([category, categoryPermissions]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{category}</h4>
                  <div className="space-y-1">
                    {categoryPermissions.map((permission) => (
                      <div key={permission.id} className="text-sm">
                        <div className="font-medium text-gray-700 dark:text-gray-300">{permission.name}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">{permission.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
