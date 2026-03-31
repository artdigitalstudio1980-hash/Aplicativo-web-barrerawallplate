'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard, Package, BarChart3, ShoppingCart, FileText,
  Users, Warehouse, ClipboardList, QrCode, UserCog, Shield,
  ChevronLeft, ChevronRight, LogOut, TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', roles: ['ADMIN', 'VENDEDOR'] },
  { href: '/admin/products', icon: Package, label: 'Products', roles: ['ADMIN'] },
  { href: '/admin/inventory', icon: Warehouse, label: 'Inventory', roles: ['ADMIN', 'VENDEDOR'] },
  { href: '/admin/sales', icon: ShoppingCart, label: 'Sales', roles: ['ADMIN', 'VENDEDOR'] },
  { href: '/admin/consignments', icon: ClipboardList, label: 'Consignments', roles: ['ADMIN', 'VENDEDOR'] },
  { href: '/admin/invoices', icon: FileText, label: 'Invoices', roles: ['ADMIN', 'VENDEDOR'] },
  { href: '/admin/barcodes', icon: QrCode, label: 'Barcodes', roles: ['ADMIN'] },
  { href: '/admin/clients', icon: Users, label: 'Clients', roles: ['ADMIN', 'VENDEDOR'] },
  { href: '/admin/warehouses', icon: Warehouse, label: 'Warehouses', roles: ['ADMIN'] },
  { href: '/admin/reports', icon: TrendingUp, label: 'Reports', roles: ['ADMIN'] },
  { href: '/admin/users', icon: UserCog, label: 'Users', roles: ['ADMIN'] },
  { href: '/admin/audit', icon: Shield, label: 'Audit Log', roles: ['ADMIN'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const filteredItems = navItems.filter(item =>
    user?.role && item.roles.includes(user.role)
  );

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-[#0A0A0F] border-r border-white/[0.06] flex flex-col z-50 overflow-hidden"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06] shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-white font-black text-sm">B</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 text-white font-bold text-sm tracking-tight whitespace-nowrap"
            >
              Barrera ERP
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white/[0.08] text-white shadow-lg shadow-violet-500/5'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              <item.icon size={18} className={`shrink-0 ${isActive ? 'text-violet-400' : 'text-white/30 group-hover:text-white/60'}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-3 space-y-2 shrink-0">
        {/* User Info */}
        <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <p className="text-white text-xs font-semibold truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-white/30 text-[10px] font-medium">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[13px] font-medium text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-1.5 rounded-lg text-white/20 hover:text-white/50 hover:bg-white/[0.04] transition-all"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </motion.aside>
  );
}
