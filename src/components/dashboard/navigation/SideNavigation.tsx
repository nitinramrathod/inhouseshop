"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { signOut } from 'next-auth/react'

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  Tag,
  AppWindow,
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
  { label: "Categories", icon: Tag, href: "/admin/categories" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Website", icon: AppWindow, href: "/" },
];

import { useSession } from "next-auth/react"
export default function SideNavigation() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession()

  return (
    <aside
      className={`h-full bg-blue-light text-white flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"
        }`}
    >
      {/* ---------- Logo ---------- */}
      <div className="flex items-center justify-between py-4 px-4 h-16 border-b border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Image src="/images/logo/admin-logo.png" alt="Logo" width={32} height={32} />
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-slate-300 hover:text-white ${collapsed ? "w-full flex justify-center" : ""}`}
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
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition ${collapsed ? "justify-center" : ""}
                ${isActive
                  ? "bg-blue-800 text-white"
                  : "text-slate-100 hover:bg-blue-800 hover:text-white"
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
            src="/images/logo/avatar.png"
            alt="User"
            width={36}
            height={36}
            className="rounded-full"
          />

          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">{session?.user?.name || "Admin User"}</p>
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: '/signin', // where user goes after logout
                  })
                }
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
