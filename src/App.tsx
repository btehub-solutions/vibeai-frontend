import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./components/providers/NotificationProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import DashboardCourses from "./pages/DashboardCourses";
import DashboardCourseDetail from "./pages/DashboardCourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import DashboardTools from "./pages/DashboardTools";
import DashboardToolDetail from "./pages/DashboardToolDetail";
import DashboardAnnouncements from "./pages/DashboardAnnouncements";
import DashboardSchedule from "./pages/DashboardSchedule";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardConsultation from "./pages/DashboardConsultation";
import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <NotificationProvider>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            
            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/courses" element={<DashboardCourses />} />
              <Route path="/dashboard/courses/:courseId" element={<DashboardCourseDetail />} />
              <Route path="/dashboard/courses/:courseId/lessons/:lessonId" element={<LessonPlayer />} />
              <Route path="/dashboard/tools" element={<DashboardTools />} />
              <Route path="/dashboard/tools/:toolId" element={<DashboardToolDetail />} />
              <Route path="/dashboard/announcements" element={<DashboardAnnouncements />} />
              <Route path="/dashboard/schedule" element={<DashboardSchedule />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              <Route path="/dashboard/consultation" element={<DashboardConsultation />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
