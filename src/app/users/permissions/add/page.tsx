"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Lock,
  Shield,
  Database,
  Eye,
  Edit,
  Plus,
  Trash2,
  Settings
} from 'lucide-react';

export default function AddPermissionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    resource: '',
    action: '',
    isSystemPermission: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: 'user_management', label: 'User Management' },
    { value: 'content_management', label: 'Content Management' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'system', label: 'System' },
    { value: 'finance', label: 'Finance' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'communication', label: 'Communication' },
    { value: 'files', label: 'Files' }
  ];

  const actions = [
    { value: 'read', label: 'Read', icon: <Eye size={16} />, description: 'View and access resources' },
    { value: 'create', label: 'Create', icon: <Plus size={16} />, description: 'Create new resources' },
    { value: 'update', label: 'Update', icon: <Edit size={16} />, description: 'Modify existing resources' },
    { value: 'delete', label: 'Delete', icon: <Trash2 size={16} />, description: 'Remove resources' },
    { value: 'manage', label: 'Manage', icon: <Settings size={16} />, description: 'Full management access' }
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

  const generatePermissionName = () => {
    if (formData.resource && formData.action) {
      const actionLabel = actions.find(a => a.value === formData.action)?.label || formData.action;
      return `${actionLabel} ${formData.resource.charAt(0).toUpperCase() + formData.resource.slice(1)}`;
    }
    return '';
  };

  const generatePermissionKey = () => {
    if (formData.resource && formData.action) {
      return `${formData.resource}.${formData.action}`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Permission name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.resource.trim()) newErrors.resource = 'Resource is required';
    if (!formData.action) newErrors.action = 'Action is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const permissionData = {
        ...formData,
        key: generatePermissionKey()
      };
      console.log('Permission submitted:', permissionData);
      router.push('/users/permissions');
    }
  };

  const handleCancel = () => {
    router.push('/users/permissions');
  };

  const handleAutoGenerate = () => {
    const generatedName = generatePermissionName();
    if (generatedName) {
      setFormData(prev => ({ ...prev, name: generatedName }));
    }
  };

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Permission</h1>
              <p className="text-gray-600 dark:text-gray-400">Define a new system permission</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Lock size={20} />
                Permission Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Permission Name *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Enter permission name"
                    />
                    <button
                      type="button"
                      onClick={handleAutoGenerate}
                      disabled={!formData.resource || !formData.action}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Auto-generate name from resource and action"
                    >
                      Auto
                    </button>
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resource *
                  </label>
                  <input
                    type="text"
                    name="resource"
                    value={formData.resource}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.resource ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="e.g., users, posts, orders"
                  />
                  {errors.resource && <p className="text-red-500 text-sm mt-1">{errors.resource}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    The resource this permission applies to (lowercase, plural)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Action *
                  </label>
                  <select
                    name="action"
                    value={formData.action}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.action ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select action</option>
                    {actions.map(action => (
                      <option key={action.value} value={action.value}>{action.label}</option>
                    ))}
                  </select>
                  {errors.action && <p className="text-red-500 text-sm mt-1">{errors.action}</p>}
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
                    placeholder="Describe what this permission allows users to do"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isSystemPermission"
                      name="isSystemPermission"
                      checked={formData.isSystemPermission}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isSystemPermission" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      System Permission
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    System permissions cannot be deleted and are managed by the system
                  </p>
                </div>
              </div>
            </div>

            {/* Action Details */}
            {formData.action && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Shield size={20} />
                  Action Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Selected Action</h3>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        {actions.find(a => a.value === formData.action)?.icon}
                        <div>
                          <div className="font-medium text-blue-900 dark:text-blue-400">
                            {actions.find(a => a.value === formData.action)?.label}
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            {actions.find(a => a.value === formData.action)?.description}
                          </div>
                        </div>
                      </div>
                    </div>

                    {generatePermissionKey() && (
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Permission Key</h3>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                            {generatePermissionKey()}
                          </code>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          This key will be used in the code to check permissions
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Usage Examples</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {formData.action === 'read' && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p>• View {formData.resource || 'resource'} list</p>
                          <p>• Access {formData.resource || 'resource'} details</p>
                          <p>• Export {formData.resource || 'resource'} data</p>
                        </div>
                      )}
                      {formData.action === 'create' && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p>• Add new {formData.resource || 'resource'}</p>
                          <p>• Duplicate existing {formData.resource || 'resource'}</p>
                          <p>• Import {formData.resource || 'resource'} data</p>
                        </div>
                      )}
                      {formData.action === 'update' && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p>• Edit {formData.resource || 'resource'} details</p>
                          <p>• Update {formData.resource || 'resource'} status</p>
                          <p>• Modify {formData.resource || 'resource'} settings</p>
                        </div>
                      )}
                      {formData.action === 'delete' && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p>• Remove {formData.resource || 'resource'}</p>
                          <p>• Archive {formData.resource || 'resource'}</p>
                          <p>• Bulk delete {formData.resource || 'resource'}</p>
                        </div>
                      )}
                      {formData.action === 'manage' && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p>• Full access to {formData.resource || 'resource'}</p>
                          <p>• Configure {formData.resource || 'resource'} settings</p>
                          <p>• Manage {formData.resource || 'resource'} permissions</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Database size={20} />
                Permission Preview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Permission Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Name:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formData.name || 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Category:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {categories.find(c => c.value === formData.category)?.label || 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Resource:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formData.resource || 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Action:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {actions.find(a => a.value === formData.action)?.label || 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Type:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        formData.isSystemPermission
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {formData.isSystemPermission ? 'System' : 'Custom'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Description</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    {formData.description || 'No description provided'}
                  </p>
                </div>
              </div>
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
                Create Permission
              </button>
            </div>
          </form>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
