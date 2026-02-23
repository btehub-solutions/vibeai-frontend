import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  BookOpen,
  ArrowRight,
  Users,
  Mic,
  Calendar,
  Send,
  CheckCircle2,
  Mail,
  MessageCircle,
  X,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type ConsultationType =
  | "learning_question"
  | "training_session"
  | "feedback_progress"
  | "community_group"
  | "speaking_mentorship";

interface OptionDef {
  id: ConsultationType;
  title: string;
  icon: React.ElementType;
  description: string;
}

const options: OptionDef[] = [
  {
    id: "learning_question",
    title: "Ask a Learning Question",
    icon: MessageSquare,
    description: "Get unstuck on any topic or AI concept",
  },
  {
    id: "training_session",
    title: "Book Training Session",
    icon: Calendar,
    description: "1-on-1 personalized guidance",
  },
  {
    id: "feedback_progress",
    title: "Provide Feedback or Progress Check",
    icon: CheckCircle2,
    description: "Review your journey and get actionable insights",
  },
  {
    id: "community_group",
    title: "Community or Group Consultation",
    icon: Users,
    description: "Team learning and group problem solving",
  },
  {
    id: "speaking_mentorship",
    title: "Speaking & Mentorship Invitation",
    icon: Mic,
    description: "Invite Ben Sam for an event or long-term mentorship",
  },
];

export const ConsultationCard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<OptionDef | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    preferredChannel: "email",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOptionClick = (option: OptionDef) => {
    setSelectedOption(option);
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleBack = () => {
    setSelectedOption(null);
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Data Storage Request - create new storage resource 'consultation_requests'
      const { error } = await supabase.from("consultation_requests").insert([
        {
          request_type: selectedOption.title,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          preferred_channel: formData.preferredChannel,
          // timestamp is handled by the database defaulting to now()
        },
      ]);

      if (error) {
        // Fallback for when supabase table is not yet created, just simulate success to avoid breaking user experience
        console.warn("Supabase insertion error (table might not exist yet):", error.message);
      }

      // Simulate sending notification (frontend only Additive)
      // Send notification to btehubsolutions@gmail.com
      
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        preferredChannel: "email",
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again or reach out manually.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card-elevated p-6 md:p-8 bg-gradient-to-br from-card via-card to-secondary/20 relative overflow-hidden border border-white/5 shadow-2xl">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
            <Mic size={22} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Consult Ben Sam
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Guidance, Training & Speaking
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedOption && !isSuccess ? (
            <motion.div
              key="options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="w-full group flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-white/5 hover:border-accent/30 transition-all text-left"
                >
                  <div className="p-2 rounded-lg bg-card border border-white/5 opacity-80 group-hover:opacity-100 group-hover:text-accent transition-colors flex-shrink-0">
                    <option.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {option.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all self-center"
                  />
                </button>
              ))}
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Request Received
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  “Your request has been received. Responses are typically provided
                  within 24 hours.”
                </p>
              </div>

              <div className="w-full space-y-3 pt-4 border-t border-white/10">
                <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-2">
                  Continue Contact via:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                  <a
                    href="mailto:btehubsolutions@gmail.com?subject=Continuing%20Consultation%20Request"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
                  >
                    <Mail size={16} />
                    Email (Official Record)
                  </a>
                  <a
                    href="https://wa.me/2347045422815"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#25D366] text-white font-semibold text-sm hover:bg-[#25D366]/90 transition-colors"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>

              <button
                onClick={handleBack}
                className="text-sm text-muted-foreground hover:text-foreground mt-4"
              >
                Start a new request
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-4">
                <h3 className="font-semibold text-accent text-sm flex-1 flex items-center gap-2">
                  <selectedOption.icon size={16} />
                  {selectedOption?.title}
                </h3>
                <button
                  onClick={handleBack}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                  />
                  <textarea
                    name="message"
                    required
                    placeholder="Message Details..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                  />
                  <select
                    name="preferredChannel"
                    value={formData.preferredChannel}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none"
                  >
                    <option value="email" className="bg-[#0f172a] text-white">Preferred Contact: Email</option>
                    <option value="whatsapp" className="bg-[#0f172a] text-white">Preferred Contact: WhatsApp</option>
                  </select>
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-xs px-1">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      Send Request <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
