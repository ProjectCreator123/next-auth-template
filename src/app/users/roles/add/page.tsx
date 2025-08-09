"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Shield,
  Users,
  Lock,
  Check,
  X
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export default function AddRolePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'blue',
    isDefault: false,
    permissions: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const colors = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
    { value: 'green', label: 'Green', class: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' },
    { value: 'red', label: 'Red', class: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' }
  ];

  const permissions: Permission[] = [
    // User Management
    { id: 'users.view', name: 'View Users', description: 'View user profiles and information', category: 'User Management' },
    { id: 'users.create', name: 'Create Users', description: 'Create new user accounts', category: 'User Management' },
    { id: 'users.edit', name: 'Edit Users', description: 'Modify user profiles and settings', category: 'User Management' },
    { id: 'users.delete', name: 'Delete Users', description: 'Remove user accounts', category: 'User Management' },
    
    // Content Management
    { id: 'content.view', name: 'View Content', description: 'Access and view content items', category: 'Content Management' },
    { id: 'content.create', name: 'Create Content', description: 'Create new content items', category: 'Content Management' },
    { id: 'content.edit', name: 'Edit Content', description: 'Modify existing content', category: 'Content Management' },
    { id: 'content.delete', name: 'Delete Content', description: 'Remove content items', category: 'Content Management' },
    
    // Analytics
    { id: 'analytics.view', name: 'View Analytics', description: 'Access analytics and reporting data', category: 'Analytics' },
    { id: 'analytics.export', name: 'Export Analytics', description: 'Export analytics data', category: 'Analytics' },
    
    // System
    { id: 'system.settings', name: 'System Settings', description: 'Configure system settings', category: 'System' },
    { id: 'system.backup', name: 'System Backup', description: 'Create and manage backups', category: 'System' },
    
    // Finance
    { id: 'finance.view', name: 'View Finance', description: 'Access financial data', category: 'Finance' },
    { id: 'finance.manage', name: 'Manage Finance', description: 'Manage billing and payments', category: 'Finance' },
    
    // E-commerce
    { id: 'products.view', name: 'View Products', description: 'View product catalog', category: 'E-commerce' },
    { id: 'products.manage', name: 'Manage Products', description: 'Create and edit products', category: 'E-commerce' },
    { id: 'orders.view', name: 'View Orders', description: 'View customer orders', category: 'E-commerce' },
    { id: 'orders.manage', name: 'Manage Orders', description: 'Process and manage orders', category: 'E-commerce' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId)
    }));
  };

  const selectAllPermissions = (category: string) => {
    const categoryPermissions = permissions.filter(p => p.category === category).map(p => p.id);
    const allSelected = categoryPermissions.every(id => formData.permissions.includes(id));
    
    if (allSelected) {
      // Deselect all in category
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(id => !categoryPermissions.includes(id))
      }));
    } else {
      // Select all in category
      setFormData(prev => ({
        ...prev,
        permissions: [...new Set([...prev.permissions, ...categoryPermissions])]
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Role name is required';
    if (!formData.description.trim()) newErrors.description = 'Role description is required';
    if (formData.permissions.length === 0) newErrors.permissions = 'At least one permission must be selected';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Role submitted:', formData);
      router.push('/users/roles');
    }
  };

  const handleCancel = () => {
    router.push('/users/roles');
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Role</h1>
              <p className="text-gray-600 dark:text-gray-400">Define a new user role with specific permissions</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Shield size={20} />
                Role Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter role name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {colors.map(color => (
                      <option key={color.value} value={color.value}>{color.label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Describe the role and its responsibilities"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isDefault" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Set as default role for new users
                    </label>
                  </div>
                </div>
              </div>

              {/* Role Preview */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</h3>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${colors.find(c => c.value === formData.color)?.class}`}>
                    {formData.name || 'Role Name'}
                  </div>
                  {formData.isDefault && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {formData.description || 'Role description will appear here'}
                </p>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Lock size={20} />
                Permissions
              </h2>

              {errors.permissions && <p className="text-red-500 text-sm mb-4">{errors.permissions}</p>}

              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => {
                  const allSelected = categoryPermissions.every(p => formData.permissions.includes(p.id));
                  const someSelected = categoryPermissions.some(p => formData.permissions.includes(p.id));

                  return (
                    <div key={category} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">{category}</h3>
                        <button
                          type="button"
                          onClick={() => selectAllPermissions(category)}
                          className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                            allSelected
                              ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {allSelected ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPermissions.map(permission => (
                          <div key={permission.id} className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id={permission.id}
                              checked={formData.permissions.includes(permission.id)}
                              onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1"
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={permission.id}
                                className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                              >
                                {permission.name}
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Permissions Summary */}
              {formData.permissions.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">
                    Selected Permissions ({formData.permissions.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.permissions.map(permissionId => {
                      const permission = permissions.find(p => p.id === permissionId);
                      return permission ? (
                        <span
                          key={permissionId}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 rounded text-xs"
                        >
                          {permission.name}
                          <button
                            type="button"
                            onClick={() => handlePermissionChange(permissionId, false)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={16} />
                Create Role
              </button>
            </div>
          </form>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
