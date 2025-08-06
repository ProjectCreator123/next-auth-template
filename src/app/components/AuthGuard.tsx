"use client";

import { useAuth } from "@/app/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = ["/login", "/register", "/forgot-password"];

  useEffect(() => {
    if (!user && !publicPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [user, pathname]);

  return <>{children}</>;
}
