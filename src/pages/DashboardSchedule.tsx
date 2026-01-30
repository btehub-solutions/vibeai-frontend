import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Calendar, Clock, ExternalLink, Video } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "AI Tools Workshop",
    description:
      "Hands-on session exploring the latest AI tools and how to integrate them into your workflow.",
    date: "February 1, 2025",
    time: "3:00 PM WAT",
    duration: "90 minutes",
    type: "Workshop",
    link: "https://zoom.us/j/example1",
  },
  {
    id: 2,
    title: "Community Office Hours",
    description:
      "Open Q&A session with our instructors. Bring your questions about AI, courses, or career advice.",
    date: "February 5, 2025",
    time: "4:00 PM WAT",
    duration: "60 minutes",
    type: "Q&A",
    link: "https://zoom.us/j/example2",
  },
  {
    id: 3,
    title: "Prompt Engineering Masterclass",
    description:
      "Deep dive into advanced prompting techniques for ChatGPT, Claude, and other LLMs.",
    date: "February 8, 2025",
    time: "2:00 PM WAT",
    duration: "2 hours",
    type: "Workshop",
    link: "https://zoom.us/j/example3",
  },
  {
    id: 4,
    title: "Monthly Community Meetup",
    description:
      "Connect with fellow learners, share your progress, and network in our monthly virtual meetup.",
    date: "February 15, 2025",
    time: "5:00 PM WAT",
    duration: "90 minutes",
    type: "Networking",
    link: "https://zoom.us/j/example4",
  },
  {
    id: 5,
    title: "Guest Speaker: AI in Nigerian Tech",
    description:
      "Special guest session featuring leaders in Nigeria's growing AI ecosystem.",
    date: "February 20, 2025",
    time: "3:00 PM WAT",
    duration: "75 minutes",
    type: "Guest Speaker",
    link: "https://zoom.us/j/example5",
  },
];

const pastEvents = [
  {
    id: 101,
    title: "Introduction to LLMs Workshop",
    date: "January 20, 2025",
    type: "Workshop",
    recording: "https://youtube.com/example1",
  },
  {
    id: 102,
    title: "Community Office Hours",
    date: "January 15, 2025",
    type: "Q&A",
    recording: "https://youtube.com/example2",
  },
];

const DashboardSchedule = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader
          title="Schedule"
          subtitle="Upcoming programs, workshops, and meetings"
        />

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Upcoming Events
          </h2>
          <div className="grid gap-4 max-w-4xl">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Date Card */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-secondary flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-muted-foreground uppercase">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {event.duration}
                      </span>
                    </div>
                  </div>

                  {/* Join Button */}
                  <div className="flex-shrink-0">
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90"
                    >
                      Join Event
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Past Events
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="glass-card p-5 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground mb-2">
                      {event.type}
                    </span>
                    <h3 className="font-medium text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <a
                    href={event.recording}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <Video size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSchedule;