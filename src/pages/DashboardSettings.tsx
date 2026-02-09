import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { Loader2, Save } from "lucide-react";

const DashboardSettings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user?.user_metadata?.full_name) {
        setFullName(user.user_metadata.full_name);
      }
    };
    getUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <DashboardHeader
          title="Settings"
          subtitle="Manage your account preferences"
          user={user}
        />

        <div className="max-w-xl mt-8 space-y-8">
          {/* Profile Section */}
          <div className="card-elevated p-8">
            <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  value={user?.email || ""} 
                  disabled 
                  className="bg-secondary/50" 
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed manually.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name" 
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleUpdateProfile} disabled={loading} className="w-full sm:w-auto">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Preferences Mock */}
          <div className="card-elevated p-8">
            <h3 className="text-xl font-semibold mb-6">Preferences</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <span>Email Notifications</span>
                    <div className="w-10 h-6 bg-accent rounded-full relative cursor-pointer opacity-80">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <span>Dark Mode</span>
                    <div className="w-10 h-6 bg-accent rounded-full relative cursor-pointer opacity-80">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSettings;
