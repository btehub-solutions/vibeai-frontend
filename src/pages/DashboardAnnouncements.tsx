import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Bell, Calendar, BookOpen, Sparkles, X, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useUser } from "@/hooks/useUser";

const initialAnnouncements = [
  { id: 1, title: "New Course: Advanced RAG Systems", description: "We've just launched our comprehensive course on Retrieval-Augmented Generation. Learn how to build AI systems that combine the power of LLMs with your own data sources.", date: "Today", type: "New Content", icon: BookOpen },
  { id: 2, title: "Live Q&A Session This Friday", description: "Join us for a live Q&A session where you can ask anything about AI, our courses, or your learning journey. Friday at 4:00 PM WAT.", date: "Feb 9, 2026", type: "Event", icon: Calendar },
  { id: 3, title: "Platform Update: Enhanced AI Tools Library", description: "We've expanded our AI Tools library with 15 new tools including the latest releases from major AI companies.", date: "Feb 5, 2026", type: "Update", icon: Sparkles },
  { id: 4, title: "Community Milestone: 2,500 Active Learners", description: "We're thrilled to announce that our community has grown to 2,500 active learners! Thank you for being part of this journey.", date: "Jan 22, 2026", type: "Announcement", icon: Bell },
];

const DashboardAnnouncements = () => {
  const { user } = useUser();
  const { success } = useNotification();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleDismiss = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    success("Announcement archived");
  };

  const handleMarkAllRead = () => {
     success("All notifications marked as read");
     // In a real app, this would update server state
  };

  return (
    <div className="min-h-screen bg-background lg:flex overflow-hidden">
      <DashboardSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <main className="flex-1 p-3 sm:p-6 lg:p-10 overflow-x-hidden overflow-y-auto w-full min-w-0">
        <DashboardHeader
          title="Announcements"
          subtitle="Stay updated with news"
          user={user}
          onMenuClick={() => setIsMobileOpen(true)}
        />

        <div className="max-w-4xl mx-auto">
            <div className="flex justify-end mb-6">
                <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                    <Check className="mr-2 h-4 w-4" />
                    Mark all as read
                </Button>
            </div>

            {/* Announcements List */}
            <div className="space-y-5">
            {announcements.length > 0 ? (
                announcements.map((announcement) => (
                    <div
                    key={announcement.id}
                    className="card-elevated p-5 md:p-8 hover:border-accent/20 transition-all duration-300 relative group"
                    >
                    <button 
                        onClick={() => handleDismiss(announcement.id)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2"
                        title="Dismiss"
                    >
                        <X size={16} />
                    </button>

                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center">
                        <announcement.icon size={20} className="text-accent" />
                        </div>

                        <div className="flex-1 pr-0 md:pr-8">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium bg-secondary text-muted-foreground">
                            {announcement.type}
                            </span>
                            <span className="text-xs md:text-sm text-muted-foreground">
                            {announcement.date}
                            </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                            {announcement.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {announcement.description}
                        </p>
                        </div>
                    </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No new announcements.</p>
                </div>
            )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAnnouncements;