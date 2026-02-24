import React, { useState } from "react";
import { Bell, Search, X, Menu } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  user?: User | null;
  onMenuClick?: () => void;
}

// Helper function to get user initials
const getUserInitials = (user: User | null | undefined): string => {
  if (!user) return "U";
  
  // Try to get from full_name in user_metadata
  const fullName = user.user_metadata?.full_name;
  if (fullName && typeof fullName === 'string') {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    if (names.length === 1 && names[0].length > 0) {
      return names[0][0].toUpperCase();
    }
  }
  
  // Fallback to email
  if (user.email) {
    return user.email[0].toUpperCase();
  }
  
  return "U";
};

const DashboardHeader = ({ title, subtitle, user, onMenuClick }: DashboardHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: "New course available", message: "Check out Advanced Prompt Engineering", time: "2h ago", unread: true },
    { id: 2, title: "Achievement unlocked", message: "You've completed your first course!", time: "1d ago", unread: true },
    { id: 3, title: "Weekly progress", message: "You're on a 3-day streak!", time: "2d ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-10">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl bg-card border border-white/[0.06] text-foreground hover:bg-white/[0.03] transition-all"
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground mt-0.5 text-xs md:text-base lg:text-lg line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search courses, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 pl-11 pr-4 py-3 rounded-xl border border-white/[0.06] bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
            />
          </form>
        </div>

        {/* Mobile Search Toggle */}
        <button 
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden p-3 rounded-xl border border-white/[0.06] bg-card text-muted-foreground hover:text-foreground transition-all"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3 rounded-xl border border-white/[0.06] bg-card text-muted-foreground hover:text-foreground transition-all"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-card border border-white/[0.06] rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-white/[0.06] hover:bg-secondary/50 transition-colors cursor-pointer ${
                          notification.unread ? 'bg-accent/5' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-foreground text-sm mb-1">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>
                          {notification.unread && (
                            <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-white/[0.06] text-center">
                  <button className="text-sm text-accent hover:text-accent/80 transition-colors font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Avatar */}
        <button className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm hover:bg-accent/90 transition-colors">
          {getUserInitials(user)}
        </button>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden w-full">
          <form onSubmit={handleSearch} className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search courses, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/[0.06] bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;