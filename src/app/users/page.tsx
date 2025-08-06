// src/app/users/page.tsx
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
export default function UsersPage() {
  return (
    <AuthGuard>
      <LayoutWrapper>
        <div>
          <h1 className="text-2xl font-semibold mb-4">Users</h1>
          <p>Manage users here.</p>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
