import { Link } from "react-router-dom";
import { Sparkles, PlayCircle, MessageSquare, Calendar } from "lucide-react";

export function DashboardQuickActions() {
  const actions = [
    {
      icon: PlayCircle,
      title: "Resume Learning",
      desc: "Continue where you left off",
      to: "/dashboard/courses",
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "text-blue-400",
    },
    {
      icon: Sparkles,
      title: "Explore AI Tools",
      desc: "Discover new possibilities",
      to: "/dashboard/tools",
      color: "from-purple-500/20 to-pink-500/20",
      accent: "text-purple-400",
    },

    {
      icon: Calendar,
      title: "Schedule Session",
      desc: "Book time with a mentor",
      to: "/dashboard/consultation",
      color: "from-amber-500/20 to-orange-500/20",
      accent: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.to}
          className={`relative group overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-white/10 bg-gradient-to-br ${action.color} backdrop-blur-sm`}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          
          <div className="relative z-10 flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-4 min-w-0 w-full">
            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md ${action.accent} group-hover:scale-110 transition-transform flex-shrink-0`}>
              <action.icon size={20} className="sm:w-6 sm:h-6" />
            </div>
            
            <div className="min-w-0 flex-1 sm:w-full">
              <h3 className="text-white font-semibold text-sm sm:text-lg mb-0.5 sm:mb-1 group-hover:text-white transition-colors truncate">
                {action.title}
              </h3>
              <p className="text-white/60 text-[10px] sm:text-xs truncate sm:whitespace-normal">
                {action.desc}
              </p>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
        </Link>
      ))}
    </div>
  );
}
