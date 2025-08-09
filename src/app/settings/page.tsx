// src/app/settings/page.tsx
'use client';

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import { useToastActions } from '@/app/components/ui/Toast';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToastActions();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon size={18} />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <Card>
                  <Card.Header>
                    <Card.Title>Profile Information</Card.Title>
                    <Card.Description>Update your personal information and profile details</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-6">
                      {/* Avatar */}
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          JD
                        </div>
                        <div>
                          <Button variant="outline" icon={<Camera size={16} />}>
                            Change Avatar
                          </Button>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            JPG, GIF or PNG. 1MB max.
                          </p>
                        </div>
                      </div>

                      {/* Form */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="First Name"
                          defaultValue="John"
                          leftIcon={<User size={18} />}
                        />
                        <Input
                          label="Last Name"
                          defaultValue="Doe"
                          leftIcon={<User size={18} />}
                        />
                        <Input
                          label="Email"
                          type="email"
                          defaultValue="john@example.com"
                          leftIcon={<Mail size={18} />}
                        />
                        <Input
                          label="Phone"
                          defaultValue="+1 (555) 123-4567"
                          leftIcon={<Phone size={18} />}
                        />
                        <div className="md:col-span-2">
                          <Input
                            label="Address"
                            defaultValue="123 Main St, City, State 12345"
                            leftIcon={<MapPin size={18} />}
                          />
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                  <Card.Footer>
                    <Button onClick={handleSave} icon={<Save size={16} />}>
                      Save Changes
                    </Button>
                  </Card.Footer>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card>
                  <Card.Header>
                    <Card.Title>Notification Preferences</Card.Title>
                    <Card.Description>Choose how you want to be notified</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-6">
                      {[
                        { title: 'Email Notifications', description: 'Receive notifications via email' },
                        { title: 'Push Notifications', description: 'Receive push notifications in your browser' },
                        { title: 'SMS Notifications', description: 'Receive notifications via SMS' },
                        { title: 'Marketing Emails', description: 'Receive marketing and promotional emails' },
                        { title: 'Security Alerts', description: 'Receive security-related notifications' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                  <Card.Footer>
                    <Button onClick={handleSave} icon={<Save size={16} />}>
                      Save Preferences
                    </Button>
                  </Card.Footer>
                </Card>
              )}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
