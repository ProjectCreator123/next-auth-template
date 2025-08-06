import { Home, Users, Settings } from 'lucide-react'
import Link from 'next/link'

const menu = [
  { name: 'Dashboard', icon: <Home size={18} />, href: '/dashboard' },
  { name: 'Users', icon: <Users size={18} />, href: '/users' },
  { name: 'Settings', icon: <Settings size={18} />, href: '/settings' },
]

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        {menu.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
