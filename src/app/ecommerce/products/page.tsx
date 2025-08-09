// src/app/ecommerce/products/page.tsx
'use client';

import React, { useState } from 'react';
import LayoutWrapper from '@/app/components/layout/LayoutWrapper';
import AuthGuard from '@/app/components/AuthGuard';
import DataTable from '@/app/components/ui/DataTable';
import Button from '@/app/components/ui/Button';
import Card from '@/app/components/ui/Card';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  Star,
  ShoppingCart
} from 'lucide-react';

// Sample products data
const productsData = [
  {
    id: 1,
    name: 'Wireless Headphones',
    sku: 'WH-001',
    category: 'Electronics',
    price: 99.99,
    stock: 45,
    status: 'Active',
    rating: 4.5,
    sales: 234,
    image: '/api/placeholder/60/60'
  },
  {
    id: 2,
    name: 'Smart Watch',
    sku: 'SW-002',
    category: 'Electronics',
    price: 299.99,
    stock: 12,
    status: 'Active',
    rating: 4.8,
    sales: 156,
    image: '/api/placeholder/60/60'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    sku: 'LS-003',
    category: 'Accessories',
    price: 49.99,
    stock: 0,
    status: 'Out of Stock',
    rating: 4.2,
    sales: 89,
    image: '/api/placeholder/60/60'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    sku: 'BS-004',
    category: 'Electronics',
    price: 79.99,
    stock: 28,
    status: 'Active',
    rating: 4.6,
    sales: 312,
    image: '/api/placeholder/60/60'
  },
  {
    id: 5,
    name: 'Phone Case',
    sku: 'PC-005',
    category: 'Accessories',
    price: 19.99,
    stock: 156,
    status: 'Active',
    rating: 4.1,
    sales: 567,
    image: '/api/placeholder/60/60'
  }
];

const columns = [
  {
    key: 'name',
    label: 'Product',
    sortable: true,
    render: (value: string, row: any) => (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <Package size={20} className="text-gray-500" />
        </div>
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">SKU: {row.sku}</div>
        </div>
      </div>
    )
  },
  {
    key: 'category',
    label: 'Category',
    sortable: true
  },
  {
    key: 'price',
    label: 'Price',
    sortable: true,
    render: (value: number) => (
      <span className="font-medium text-gray-900 dark:text-white">
        ${value.toFixed(2)}
      </span>
    )
  },
  {
    key: 'stock',
    label: 'Stock',
    sortable: true,
    render: (value: number) => (
      <span className={`font-medium ${
        value === 0 ? 'text-red-600 dark:text-red-400' : 
        value < 20 ? 'text-yellow-600 dark:text-yellow-400' : 
        'text-green-600 dark:text-green-400'
      }`}>
        {value}
      </span>
    )
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
    key: 'rating',
    label: 'Rating',
    sortable: true,
    render: (value: number) => (
      <div className="flex items-center gap-1">
        <Star size={14} className="text-yellow-400 fill-current" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
      </div>
    )
  },
  {
    key: 'sales',
    label: 'Sales',
    sortable: true,
    render: (value: number) => (
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    )
  }
];

export default function ProductsPage() {
  const router = useRouter();
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleEdit = (product: any) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (product: any) => {
    console.log('Delete product:', product);
  };

  const handleView = (product: any) => {
    console.log('View product:', product);
  };

  const totalProducts = productsData.length;
  const activeProducts = productsData.filter(p => p.status === 'Active').length;
  const outOfStock = productsData.filter(p => p.stock === 0).length;
  const lowStock = productsData.filter(p => p.stock > 0 && p.stock < 20).length;

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <Button variant="outline">
                Import Products
              </Button>
              <Button
                icon={<Plus size={16} />}
                onClick={() => router.push('/ecommerce/products/add')}
              >
                Add Product
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{totalProducts}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Products</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{activeProducts}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{lowStock}</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{outOfStock}</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Product Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View detailed product performance</p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Bulk Price Update</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update prices for multiple products</p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Inventory Report</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Generate inventory reports</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Products Table */}
          <DataTable
            data={productsData}
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
