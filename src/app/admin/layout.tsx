'use client';

import { Sidebar } from '@/components/admin/Sidebar';
import { AuthProvider } from '@/lib/auth-context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#06060A] text-white">
        <Sidebar />
        <main className="ml-[260px] min-h-screen transition-all duration-300">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
