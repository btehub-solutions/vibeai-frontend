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

  const handleDismiss = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    success("Announcement archived");
  };

  const handleMarkAllRead = () => {
     success("All notifications marked as read");
     // In a real app, this would update server state
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <DashboardHeader
          title="Announcements"
          subtitle="Stay updated with the latest news and updates"
          user={user}
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
                    className="card-elevated p-8 hover:border-accent/20 transition-all duration-300 relative group"
                    >
                    <button 
                        onClick={() => handleDismiss(announcement.id)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity p-2"
                        title="Dismiss"
                    >
                        <X size={16} />
                    </button>

                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                        <announcement.icon size={22} className="text-accent" />
                        </div>

                        <div className="flex-1 pr-8">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                            {announcement.type}
                            </span>
                            <span className="text-sm text-muted-foreground">
                            {announcement.date}
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                            {announcement.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
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