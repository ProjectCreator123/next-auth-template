// src/app/settings/page.tsx
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
export default function SettingsPage() {
  return (
    <AuthGuard>
      <LayoutWrapper>
        <div>
          <h1 className="text-2xl font-semibold mb-4">Settings</h1>
          <p>Configure your application settings here.</p>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
