import { Bell, Search } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div className="pl-14 lg:pl-0">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-72 pl-11 pr-4 py-3 rounded-xl border border-white/[0.06] bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-3 rounded-xl border border-white/[0.06] bg-card text-muted-foreground hover:text-foreground transition-all">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
        </button>

        {/* Avatar */}
        <button className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
          JD
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;