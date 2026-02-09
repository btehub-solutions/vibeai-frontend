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
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

const upcomingMeetings = [
  { title: "AI Tools Workshop", date: "Feb 1", time: "3:00 PM" },
  { title: "Community Office Hours", date: "Feb 5", time: "4:00 PM" },
];

// Helper function to format time ago
const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

const Dashboard = () => {
  const { loading, user, stats, learningPath, recentActivity, achievements } = useDashboardData();

  const statCards = [
    { label: "In Progress", value: stats.inProgress.toString(), icon: BookOpen, change: "Active Courses" },
    { label: "Hours Learned", value: stats.hoursLearned.toString(), icon: Clock, change: "Total Time" },
    { label: "Completed", value: stats.completed.toString(), icon: Trophy, change: "Certificates" },
    { label: "Day Streak", value: stats.streak.toString(), icon: TrendingUp, change: "Keep going!" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <DashboardHeader
          title={`Welcome back, ${user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Member'}`}
          subtitle="Continue your AI learning journey"
          user={user}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => (
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
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <div className="card-elevated p-8">
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
                {learningPath.length > 0 ? (
                  learningPath.slice(0, 3).map((course) => (
                    <Link
                      key={course.courseId}
                      to={`/dashboard/courses/${course.courseId}`}
                      className="block p-5 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all group cursor-pointer"
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
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No active courses found.</p>
                    <Link to="/dashboard/courses" className="text-accent hover:underline mt-2 inline-block">
                      Start learning today
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-elevated p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Activity size={18} className="text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  Recent Activity
                </h2>
              </div>

              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        {activity.type === 'course_completed' && <Trophy size={16} className="text-accent" />}
                        {activity.type === 'lesson_completed' && <CheckCircle2 size={16} className="text-accent" />}
                        {activity.type === 'course_started' && <BookOpen size={16} className="text-accent" />}
                        {activity.type === 'achievement' && <Award size={16} className="text-accent" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {activity.description}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {timeAgo(activity.timestamp)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="card-elevated p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Trophy size={18} className="text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  Achievements
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      achievement.achieved
                        ? 'bg-accent/5 border-accent/30'
                        : 'bg-secondary/30 border-secondary'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          achievement.achieved
                            ? 'bg-accent/20 text-accent'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {achievement.icon === 'award' && <Award size={18} />}
                        {achievement.icon === 'trophy' && <Trophy size={18} />}
                        {achievement.icon === 'clock' && <Clock size={18} />}
                        {achievement.icon === 'flame' && <Flame size={18} />}
                        {achievement.icon === 'target' && <Target size={18} />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    {!achievement.achieved && achievement.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium text-foreground">
                            {Math.round(achievement.progress)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent/50 rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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

            {/* Learning Stats Summary */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Your Progress
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                    <span className="text-sm font-semibold text-foreground">
                      {stats.completionRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
                    <p className="text-xs text-muted-foreground mt-1">Total Courses</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-accent">{stats.completed}</p>
                    <p className="text-xs text-muted-foreground mt-1">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;