"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  LogOut,
  Menu,
} from "lucide-react";
import Image from "next/image";

type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Products", icon: Package, href: "/admin/products" },
  { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { label: "Reviews", icon: Star, href: "/admin/reviews" },
  { label: "Users", icon: Users, href: "/admin/users" },
];

export default function SideNavigation() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className={`h-screen bg-blue text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* ---------- Logo ---------- */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          {!collapsed && (
            <span className="font-semibold text-lg">Admin Panel</span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;

          return (
            <button
              key={label}
              onClick={() => router.push(href)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition
                ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* ---------- User + Logout ---------- */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/avatar.png"
            alt="User"
            width={36}
            height={36}
            className="rounded-full"
          />

          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <button
                onClick={() => console.log("logout")}
                className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
