'use client';

import {
  Home,
  Users,
  Settings,
  BarChart3,
  Calendar,
  FileText,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  Folder,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  User
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  badge?: string | null;
  submenu?: {
    name: string;
    href: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: <Home size={18} />,
    href: '/dashboard',
    badge: null
  },
  {
    name: 'Analytics',
    icon: <BarChart3 size={18} />,
    href: '/analytics',
    badge: 'New'
  },
  {
    name: 'Users',
    icon: <Users size={18} />,
    href: '/users',
    badge: null,
    submenu: [
      { name: 'All Users', href: '/users' },
      { name: 'User Roles', href: '/users/roles' },
      { name: 'Permissions', href: '/users/permissions' }
    ]
  },
  {
    name: 'E-commerce',
    icon: <ShoppingCart size={18} />,
    href: '/ecommerce',
    badge: null,
    submenu: [
      { name: 'Products', href: '/ecommerce/products' },
      { name: 'Orders', href: '/ecommerce/orders' },
      { name: 'Customers', href: '/ecommerce/customers' }
    ]
  },
  {
    name: 'Calendar',
    icon: <Calendar size={18} />,
    href: '/calendar',
    badge: null
  },
  {
    name: 'Messages',
    icon: <MessageSquare size={18} />,
    href: '/messages',
    badge: '3'
  },
  {
    name: 'Files',
    icon: <Folder size={18} />,
    href: '/files',
    badge: null
  },
  {
    name: 'Invoices',
    icon: <FileText size={18} />,
    href: '/invoices',
    badge: null
  },
  {
    name: 'Payments',
    icon: <CreditCard size={18} />,
    href: '/payments',
    badge: null
  },
  {
    name: 'Profile',
    icon: <User size={18} />,
    href: '/profile',
    badge: null
  },
  {
    name: 'Settings',
    icon: <Settings size={18} />,
    href: '/settings',
    badge: null
  },
]

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen transition-all duration-300 relative`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className={`${isCollapsed ? 'hidden' : 'block'}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            AdminPro
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Dashboard v2.0
          </p>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 pb-24">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() => !isCollapsed && toggleExpanded(item.name)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
                    {item.icon}
                    {!isCollapsed && (
                      <>
                        <span className="font-medium">{item.name}</span>
                        {item.badge && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.badge === 'New'
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  {!isCollapsed && (
                    expandedItems.includes(item.name) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )
                  )}
                </button>

                {expandedItems.includes(item.name) && !isCollapsed && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block p-2 rounded-lg text-sm transition-colors ${
                          isActive(subItem.href)
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-3 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                title={isCollapsed ? item.name : ''}
              >
                {item.icon}
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                        item.badge === 'New'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          {!isCollapsed ? (
            <>
              <h3 className="font-semibold text-sm">Upgrade to Pro</h3>
              <p className="text-xs opacity-90 mt-1">Get access to all features</p>
              <button
                onClick={() => router.push('/upgrade')}
                className="mt-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs transition-colors w-full"
              >
                Upgrade Now
              </button>
            </>
          ) : (
            <div className="flex justify-center">
              <button
                className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
                title="Upgrade to Pro"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
