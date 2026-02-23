import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useUser } from "@/hooks/useUser";
import { Clock, ExternalLink, Video, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const upcomingEvents = [
  { id: 1, title: "AI Tools Workshop", description: "Hands-on session exploring the latest AI tools and how to integrate them into your workflow.", date: "February 1, 2026", time: "3:00 PM WAT", duration: "90 min", type: "Workshop" },
  { id: 2, title: "Community Office Hours", description: "Open Q&A session with our instructors. Bring your questions about AI, courses, or career advice.", date: "February 5, 2026", time: "4:00 PM WAT", duration: "60 min", type: "Q&A" },
  { id: 3, title: "Prompt Engineering Masterclass", description: "Deep dive into advanced prompting techniques for ChatGPT, Claude, and other LLMs.", date: "February 8, 2026", time: "2:00 PM WAT", duration: "2 hours", type: "Workshop" },
  { id: 4, title: "Monthly Community Meetup", description: "Connect with fellow learners, share your progress, and network in our monthly virtual meetup.", date: "February 15, 2026", time: "5:00 PM WAT", duration: "90 min", type: "Networking" },
];

const pastEvents = [
  { id: 101, title: "Introduction to LLMs Workshop", date: "January 20, 2026", type: "Workshop", recording: "#" },
  { id: 102, title: "Community Office Hours", date: "January 15, 2026", type: "Q&A", recording: "#" },
];

const DashboardSchedule = () => {
  const { user } = useUser();
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);

  const handleRegister = (id: number, title: string) => {
    setRegisteredEvents([...registeredEvents, id]);
    toast.success("Successfully registered!", {
        description: `You are now signed up for ${title}. We'll send you a reminder.`
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <DashboardHeader
          title="Schedule"
          subtitle="Upcoming programs, workshops, and meetings"
          user={user}
        />

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-8 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Upcoming Events
          </h2>
          <div className="grid gap-5 max-w-5xl">
            {upcomingEvents.map((event) => {
              const isRegistered = registeredEvents.includes(event.id);

              return (
                <div
                    key={event.id}
                    className="card-elevated p-8 hover:border-accent/20 transition-all duration-300"
                >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Date Card */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-secondary flex flex-col items-center justify-center text-center">
                        <span className="text-xs text-muted-foreground uppercase font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-3xl font-bold text-foreground">
                        {new Date(event.date).getDate()}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                            {event.type}
                        </span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                        {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {event.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                        <span>{event.time}</span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {event.duration}
                        </span>
                        </div>
                    </div>

                    {/* Join/Register Button */}
                    <div className="flex-shrink-0">
                        {isRegistered ? (
                             <Button disabled variant="secondary" className="gap-2">
                                <CheckCircle size={14} className="text-green-500" />
                                Registered
                             </Button>
                        ) : (
                            <Button 
                                onClick={() => handleRegister(event.id, event.title)}
                                className="gap-2"
                            >
                                Register Now
                                <ExternalLink size={14} />
                            </Button>
                        )}
                    </div>
                    </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-8">
            Past Events
          </h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="card-elevated p-6 hover:border-accent/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground mb-3">
                      {event.type}
                    </span>
                    <h3 className="font-semibold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <a
                    href={event.recording}
                    className="flex-shrink-0 p-3 rounded-xl bg-secondary text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all"
                    onClick={(e) => {
                      if (event.recording === "#") {
                        e.preventDefault();
                        toast.info("Recording will be available soon");
                      }
                    }}
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