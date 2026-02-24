import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Bell,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "AI Tools", href: "/dashboard/tools", icon: Sparkles },
  { name: "Announcements", href: "/dashboard/announcements", icon: Bell },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Consultation", href: "/dashboard/consultation", icon: MessageSquare },
];

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ isMobileOpen, setIsMobileOpen }: DashboardSidebarProps) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="VibeAI Logo" className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
              isActive(item.href)
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-1">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition-all duration-200"
        >
          <Settings size={18} />
          Settings
        </Link>
        <button 
          onClick={async () => await supabase.auth.signOut()}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition-all duration-200"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle removed from here - moved to Header */}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-white/[0.04] flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default DashboardSidebar;