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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.to}
          className={`relative group overflow-hidden rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-white/10 bg-gradient-to-br ${action.color} backdrop-blur-sm`}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-md ${action.accent} group-hover:scale-110 transition-transform`}>
              <action.icon size={24} />
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-white transition-colors">
                {action.title}
              </h3>
              <p className="text-white/60 text-xs">
                {action.desc}
              </p>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
        </Link>
      ))}
    </div>
  );
}
