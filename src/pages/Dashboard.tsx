import { useState } from "react";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  ArrowRight,
  Sparkles,
  Calendar,
  Loader2,
  Award,
  Flame,
  Target,
  CheckCircle2,
  Activity,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardData } from "@/hooks/useDashboardData";
import { LearningActivityChart } from "@/components/dashboard/LearningActivityChart";
import { DashboardQuickActions } from "@/components/dashboard/DashboardQuickActions";
import { IntelligencePanel } from "@/components/dashboard/IntelligencePanel";
import { ConsultationCard } from "@/components/dashboard/ConsultationCard";

// Helper function to format time ago
const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

const Dashboard = () => {
  const { loading, user, stats, learningPath, recentActivity, achievements } =
    useDashboardData();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const statCards = [
    {
      label: "In Progress",
      value: stats.inProgress.toString(),
      icon: BookOpen,
      change: "Active Courses",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Hours Learned",
      value: stats.hoursLearned.toString(),
      icon: Clock,
      change: "Total Time",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Completed",
      value: stats.completed.toString(),
      icon: Trophy,
      change: "Certificates",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Day Streak",
      value: stats.streak.toString(),
      icon: Flame,
      change: "Keep going!",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:flex overflow-hidden">
      <DashboardSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <main className="flex-1 overflow-x-hidden overflow-y-auto w-full lg:h-screen min-w-0 bg-background/50">
        <div className="max-w-7xl mx-auto px-3 py-6 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 min-w-0 overflow-hidden">
          <DashboardHeader
            title={`Welcome, ${
              user?.user_metadata?.full_name?.split(" ")[0] ||
              user?.email?.split("@")[0] ||
              "Member"
            }`}
            subtitle="Ready to level up your AI skills?"
            user={user}
            onMenuClick={() => setIsMobileOpen(true)}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 sm:space-y-8"
          >
            {/* Quick Actions */}
            <motion.div variants={item}>
              <DashboardQuickActions />
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={item}
              className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 min-w-0 w-full overflow-hidden"
            >
              {statCards.map((stat, idx) => (
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  key={stat.label}
                  className="card-elevated p-3 sm:p-6 transition-all duration-300 border-t border-white/5 min-w-0 overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${stat.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <stat.icon size={16} className={stat.color} />
                    </div>
                    {idx === 3 && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                    )}
                  </div>
                  <p className="text-lg sm:text-3xl font-bold text-foreground mb-0.5 tracking-tight truncate">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-sm text-muted-foreground truncate">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 min-w-0 w-full overflow-hidden">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6 min-w-0">
                {/* Activity Chart */}
                <motion.div variants={item} className="h-[280px] sm:h-[350px] md:h-[400px]">
                  <LearningActivityChart />
                </motion.div>

                {/* Continue Learning */}
                <motion.div variants={item} className="card-elevated p-3 sm:p-8">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Zap size={18} className="text-accent" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                        Continue Learning
                      </h2>
                    </div>
                    <Link
                      to="/dashboard/courses"
                      className="text-xs sm:text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1 font-medium group"
                    >
                      View All
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {learningPath.length > 0 ? (
                      learningPath.slice(0, 3).map((course) => (
                        <Link
                          key={course.courseId}
                          to={`/dashboard/courses/${course.courseId}`}
                          className="relative block p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-secondary/30 hover:bg-secondary/60 border border-white/5 hover:border-accent/20 transition-all group overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          
                          <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 relative z-10 min-w-0">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1 group-hover:text-accent transition-colors truncate">
                                {course.title}
                              </h3>
                              <p className="text-[11px] sm:text-sm text-muted-foreground truncate">
                                Next: {course.nextLesson}
                              </p>
                            </div>
                            <button className="flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all shadow-lg shadow-accent/5">
                              <Play size={14} fill="currentColor" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                            <div className="flex-1 h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full transition-all relative"
                                style={{ width: `${course.progress}%` }}
                              >
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                              </div>
                            </div>
                            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                              {course.progress}%
                            </span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-8 sm:py-12 text-muted-foreground bg-secondary/20 rounded-xl sm:rounded-2xl border border-dashed border-white/10">
                        <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-30" />
                        <p className="text-sm">No active courses found.</p>
                        <Link
                          to="/dashboard/courses"
                          className="text-accent hover:underline mt-1 sm:2 inline-block text-sm"
                        >
                          Start learning today
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar — Intelligence Panel */}
              <div className="space-y-6 min-w-0">
                {/* AI-Powered Intelligence Panel */}
                <motion.div variants={item}>
                  <IntelligencePanel />
                </motion.div>

                {/* Consultation Card */}
                <motion.div variants={item}>
                  <ConsultationCard />
                </motion.div>

                {/* Progress Summary */}
                <motion.div variants={item} className="card-elevated p-3 sm:p-6 bg-gradient-to-b from-card to-secondary/30">
                  <h2 className="text-lg font-semibold text-foreground mb-4 sm:mb-6">
                    Weekly Goal
                  </h2>
                  <div className="relative pt-1 sm:pt-2 flex justify-center mb-6 sm:mb-8">
                    <div className="relative w-28 h-28 sm:w-40 sm:h-40">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="transparent"
                          stroke="hsl(var(--muted))"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="transparent"
                          stroke="hsl(var(--accent))"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * stats.completionRate / 100)}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl sm:text-4xl font-bold text-foreground">
                          {stats.completionRate}%
                        </span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Goal</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-xl bg-secondary/50 border border-white/5">
                      <p className="text-2xl font-bold text-foreground">
                        {stats.totalCourses}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Courses
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-secondary/50 border border-white/5">
                      <p className="text-2xl font-bold text-accent">
                        {stats.completed}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Finished
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={item} className="card-elevated p-3 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <Activity size={18} className="text-accent" />
                    <h2 className="text-lg font-semibold text-foreground">
                      Recent Activity
                    </h2>
                  </div>

                  <div className="space-y-6 relative">
                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-white/10 to-transparent" />
                    
                    {recentActivity.length > 0 ? (
                      recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4"
                        >
                          <div className="relative z-10 w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/50">
                            {activity.type === "course_completed" && (
                              <Trophy size={14} className="text-yellow-400" />
                            )}
                            {activity.type === "lesson_completed" && (
                              <CheckCircle2 size={14} className="text-emerald-400" />
                            )}
                            {activity.type === "course_started" && (
                              <BookOpen size={14} className="text-blue-400" />
                            )}
                            {activity.type === "achievement" && (
                              <Award size={14} className="text-purple-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                            <p className="font-medium text-foreground text-sm leading-tight truncate">
                              {activity.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {timeAgo(activity.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">No recent activity</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
