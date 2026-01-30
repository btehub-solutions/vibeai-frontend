import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Bell, Calendar, BookOpen, Sparkles } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "New Course: Advanced RAG Systems",
    description:
      "We've just launched our comprehensive course on Retrieval-Augmented Generation. Learn how to build AI systems that combine the power of LLMs with your own data sources.",
    date: "January 28, 2025",
    type: "New Content",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Live Q&A Session This Friday",
    description:
      "Join us for a live Q&A session where you can ask anything about AI, our courses, or your learning journey. Friday at 4:00 PM WAT.",
    date: "January 30, 2025",
    type: "Event",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Platform Update: Enhanced AI Tools Library",
    description:
      "We've expanded our AI Tools library with 15 new tools including the latest releases from major AI companies. Check it out in your dashboard.",
    date: "January 25, 2025",
    type: "Update",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Community Milestone: 2,500 Active Learners",
    description:
      "We're thrilled to announce that our community has grown to 2,500 active learners! Thank you for being part of this journey.",
    date: "January 22, 2025",
    type: "Announcement",
    icon: Bell,
  },
  {
    id: 5,
    title: "New Feature: Progress Tracking Dashboard",
    description:
      "Track your learning progress with our new dashboard. See your completed modules, time spent learning, and maintain your learning streak.",
    date: "January 18, 2025",
    type: "Update",
    icon: Sparkles,
  },
  {
    id: 6,
    title: "Upcoming Workshop: Prompt Engineering Masterclass",
    description:
      "Join our intensive workshop on advanced prompt engineering techniques. Limited spots available. Register through your Schedule tab.",
    date: "January 15, 2025",
    type: "Event",
    icon: Calendar,
  },
];

const DashboardAnnouncements = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader
          title="Announcements"
          subtitle="Stay updated with the latest news and updates"
        />

        {/* Announcements List */}
        <div className="space-y-4 max-w-3xl">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <announcement.icon size={20} className="text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                      {announcement.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {announcement.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {announcement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardAnnouncements;