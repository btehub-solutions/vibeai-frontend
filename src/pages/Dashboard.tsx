import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
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
  { label: "In Progress", value: "3", icon: BookOpen, change: "+1 this week" },
  { label: "Hours Learned", value: "24", icon: Clock, change: "+5 this week" },
  { label: "Completed", value: "12", icon: Trophy, change: "+3 this week" },
  { label: "Day Streak", value: "7", icon: TrendingUp, change: "Keep going!" },
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

const upcomingMeetings = [
  { title: "AI Tools Workshop", date: "Feb 1", time: "3:00 PM" },
  { title: "Community Office Hours", date: "Feb 5", time: "4:00 PM" },
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <DashboardHeader
          title={`Welcome back, ${user?.email?.split('@')[0] || 'Member'}`}
          subtitle="Continue your AI learning journey"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="card-elevated p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <stat.icon size={20} className="text-accent" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-accent mt-3">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 card-elevated p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-foreground">
                Continue Learning
              </h2>
              <Link
                to="/dashboard/courses"
                className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1 font-medium"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {continueLearning.map((course) => (
                <div
                  key={course.title}
                  className="p-5 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                    <button className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                      <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {course.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Upcoming
                </h2>
                <Link
                  to="/dashboard/schedule"
                  className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.title}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Calendar size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {meeting.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {meeting.date} at {meeting.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access AI Tools */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Sparkles size={20} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    AI Tools
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Explore trending tools
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard/tools"
                className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm bg-secondary text-foreground hover:bg-secondary/80 transition-all"
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