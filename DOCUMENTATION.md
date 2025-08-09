# AdminPro Dashboard - Complete Documentation

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Components Guide](#components-guide)
4. [Customization](#customization)
5. [Theme System](#theme-system)
6. [Data Management](#data-management)
7. [Authentication](#authentication)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation Steps

1. **Extract the template files**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start development server**
   ```bash
   npm run dev
   ```
4. **Open browser** to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx   # Button component
│   │   │   ├── Card.tsx     # Card component
│   │   │   ├── Input.tsx    # Input component
│   │   │   ├── Modal.tsx    # Modal component
│   │   │   ├── Toast.tsx    # Toast notifications
│   │   │   └── DataTable.tsx # Advanced data table
│   │   └── layout/          # Layout components
│   │       ├── Sidebar.tsx  # Navigation sidebar
│   │       ├── Topbar.tsx   # Top navigation
│   │       └── LayoutWrapper.tsx
│   ├── context/             # React contexts
│   │   ├── AuthContext.tsx  # Authentication
│   │   └── ThemeContext.tsx # Theme management
│   ├── dashboard/           # Dashboard pages
│   ├── analytics/           # Analytics pages
│   ├── users/              # User management
│   ├── ecommerce/          # E-commerce pages
│   ├── calendar/           # Calendar component
│   ├── settings/           # Settings pages
│   └── globals.css         # Global styles
```

## 🎨 Components Guide

### Button Component
```tsx
import Button from '@/app/components/ui/Button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// With icons
<Button icon={<Plus size={16} />}>Add Item</Button>

// Loading state
<Button loading>Processing...</Button>
```

### Card Component
```tsx
import Card from '@/app/components/ui/Card';

<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Header>
  <Card.Content>
    Card content goes here
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### Input Component
```tsx
import Input from '@/app/components/ui/Input';

<Input 
  label="Email"
  type="email"
  placeholder="Enter your email"
  leftIcon={<Mail size={18} />}
  error="This field is required"
/>
```

### DataTable Component
```tsx
import DataTable from '@/app/components/ui/DataTable';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { 
    key: 'status', 
    label: 'Status', 
    render: (value) => <Badge>{value}</Badge> 
  }
];

<DataTable
  data={users}
  columns={columns}
  searchable={true}
  filterable={true}
  pagination={true}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### Toast Notifications
```tsx
import { useToastActions } from '@/app/components/ui/Toast';

const toast = useToastActions();

// Success toast
toast.success('Operation completed!');

// Error toast
toast.error('Something went wrong');

// With action
toast.info('New update available', 'Click to update', {
  action: {
    label: 'Update',
    onClick: () => handleUpdate()
  }
});
```

## 🎨 Customization

### Colors
Edit `src/app/globals.css` to customize colors:

```css
:root {
  --primary: 59 130 246;      /* Blue */
  --secondary: 107 114 128;   /* Gray */
  --success: 34 197 94;       /* Green */
  --warning: 245 158 11;      /* Yellow */
  --danger: 239 68 68;        /* Red */
}
```

### Typography
Customize fonts in `src/app/layout.tsx`:

```tsx
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });
```

### Layout
Modify sidebar navigation in `src/app/components/layout/Sidebar.tsx`:

```tsx
const menuItems = [
  { name: 'Dashboard', icon: <Home />, href: '/dashboard' },
  { name: 'Analytics', icon: <BarChart3 />, href: '/analytics' },
  // Add your custom menu items
];
```

## 🌙 Theme System

The template includes a complete dark/light theme system:

### Using Theme Context
```tsx
import { useTheme } from '@/app/context/ThemeContext';

const { theme, setTheme, isDark } = useTheme();

// Set theme
setTheme('dark');   // 'light', 'dark', or 'system'
```

### Theme-aware Components
```tsx
// Use Tailwind's dark: prefix
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

## 📊 Data Management

### Sample Data Structure
```tsx
// User data example
const userData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'JD'
  }
];
```

### API Integration
Replace sample data with real API calls:

```tsx
// Example API integration
const fetchUsers = async () => {
  const response = await fetch('/api/users');
  return response.json();
};

// Use in component
useEffect(() => {
  fetchUsers().then(setUsers);
}, []);
```

## 🔐 Authentication

### Auth Context
The template includes a basic auth context:

```tsx
import { useAuth } from '@/app/context/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();
```

### Protected Routes
Wrap pages with AuthGuard:

```tsx
import AuthGuard from '@/app/components/AuthGuard';

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <YourPageContent />
    </AuthGuard>
  );
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `out` folder to Netlify

### Custom Server
1. Build: `npm run build`
2. Start: `npm start`
3. Configure reverse proxy (nginx/Apache)

### Environment Variables
Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_APP_NAME=AdminPro
```

## 🔧 Troubleshooting

### Common Issues

**1. Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**2. TypeScript errors**
```bash
# Check types
npm run type-check
```

**3. Build errors**
```bash
# Clean build
npm run clean
npm run build
```

**4. Styling issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Verify dark mode classes

### Performance Tips

1. **Optimize Images**: Use Next.js Image component
2. **Code Splitting**: Use dynamic imports for large components
3. **Bundle Analysis**: Use `@next/bundle-analyzer`

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📞 Support

For additional support:
- 📧 Email: support@adminpro.com
- 📚 Documentation: [Link to full docs]
- 💬 Discord: [Community link]
- 🐛 Issues: [GitHub issues]

---

**Happy coding! 🚀**
