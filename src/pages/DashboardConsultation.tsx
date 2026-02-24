import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ConsultationCard } from "@/components/dashboard/ConsultationCard";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const DashboardConsultation = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto h-screen w-full">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 space-y-6 md:space-y-8">
          <DashboardHeader
            title="Consultation"
            subtitle="Get guidance, request training, or book speaking engagements with Ben Sam."
            user={user}
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
