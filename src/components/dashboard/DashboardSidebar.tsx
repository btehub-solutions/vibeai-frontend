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
import { supabase } from "@/lib/supabase";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "AI Tools", href: "/dashboard/tools", icon: Sparkles },
  { name: "Announcements", href: "/dashboard/announcements", icon: Bell },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Consultation", href: "/dashboard/consultation", icon: MessageSquare },
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
      {/* Mobile Top Bar - Fixed Header for small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-card border border-white/10 text-foreground"
        >
          <Menu size={20} />
        </button>
        
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Placeholder to balance the flexbox (avatar is usually on the right in DashboardHeader) */}
        <div className="w-9" /> 
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - z-index increased to be above overlay */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-[60] w-72 bg-sidebar border-r border-white/[0.04] flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between lg:block p-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="VibeAI Logo" className="h-14 lg:h-20 w-auto object-contain" />
          </Link>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>
        <SidebarContent />
      </aside>
    </>
  );
};

export default DashboardSidebar;