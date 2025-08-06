// src/app/components/layout/LayoutWrapper.tsx
'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
