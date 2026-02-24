import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ConsultationCard } from "@/components/dashboard/ConsultationCard";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const DashboardConsultation = () => {
  const { user, loading } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
      <main className="flex-1 overflow-x-hidden overflow-y-auto h-screen w-full min-w-0">
        <div className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-10 space-y-4 sm:space-y-8">
          <DashboardHeader
            title="Smarter Guidance"
            subtitle="Request training or guidance"
            user={user}
            onMenuClick={() => setIsMobileOpen(true)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto"
          >
            <ConsultationCard />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardConsultation;
