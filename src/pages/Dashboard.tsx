import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  ArrowRight,
  Sparkles,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Courses In Progress",
    value: "3",
    icon: BookOpen,
    change: "+1 this week",
  },
  {
    label: "Hours Learned",
    value: "24",
    icon: Clock,
    change: "+5 this week",
  },
  {
    label: "Completed Modules",
    value: "12",
    icon: Trophy,
    change: "+3 this week",
  },
  {
    label: "Current Streak",
    value: "7 days",
    icon: TrendingUp,
    change: "Keep going!",
  },
];

const continueLearning = [
  {
    title: "Introduction to Large Language Models",
    progress: 65,
    nextLesson: "Understanding Transformers",
    duration: "15 min",
  },
  {
    title: "Prompt Engineering Fundamentals",
    progress: 40,
    nextLesson: "Chain of Thought Prompting",
    duration: "20 min",
  },
  {
    title: "AI for Business Applications",
    progress: 20,
    nextLesson: "Customer Service Automation",
    duration: "25 min",
  },
];

const announcements = [
  {
    title: "New Course: Advanced RAG Systems",
    date: "Jan 28, 2025",
    type: "New Content",
  },
  {
    title: "Live Q&A Session This Friday",
    date: "Jan 30, 2025",
    type: "Event",
  },
];

const upcomingMeetings = [
  {
    title: "AI Tools Workshop",
    date: "Feb 1, 2025",
    time: "3:00 PM WAT",
    link: "#",
  },
  {
    title: "Community Office Hours",
    date: "Feb 5, 2025",
    time: "4:00 PM WAT",
    link: "#",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader
          title="Welcome back, John"
          subtitle="Continue your AI learning journey"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon size={18} className="text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-primary mt-2">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Continue Learning
              </h2>
              <Link
                to="/dashboard/courses"
                className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {continueLearning.map((course) => (
                <div
                  key={course.title}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                    <button className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Play size={16} fill="currentColor" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {course.progress}%
                    </span>
                    <span className="text-xs text-muted-foreground border-l border-white/10 pl-3">
                      {course.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Announcements */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Announcements
                </h2>
                <Link
                  to="/dashboard/announcements"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {announcements.map((item) => (
                  <div
                    key={item.title}
                    className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                  >
                    <span className="inline-block text-xs font-medium text-primary mb-1">
                      {item.type}
                    </span>
                    <p className="text-sm text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Meetings */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Upcoming
                </h2>
                <Link
                  to="/dashboard/schedule"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <a
                    key={meeting.title}
                    href={meeting.link}
                    className="block p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Calendar size={14} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          {meeting.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {meeting.date} at {meeting.time}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Access AI Tools */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles size={18} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    AI Tools
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Explore trending tools
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard/tools"
                className="btn-secondary w-full justify-center text-sm"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;