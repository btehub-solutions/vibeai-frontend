import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "AI Tools", href: "/dashboard/tools", icon: Sparkles },
  { name: "Announcements", href: "/dashboard/announcements", icon: Bell },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">VibeAI</span>
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
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-5 left-5 z-50 p-3 rounded-xl bg-card border border-white/[0.06]"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-white/[0.04] flex flex-col transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default DashboardSidebar;