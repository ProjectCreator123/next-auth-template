// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import LayoutWrapper from '@/app/components/layout/LayoutWrapper';
import AuthGuard from '@/app/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
          <p>This is your SaaS Admin Dashboard.</p>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
