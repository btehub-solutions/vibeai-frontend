import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-foreground font-bold text-xl">V</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to access your AI learning journey</p>
            </div>

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(var(--accent))',
                      brandAccent: 'hsl(var(--accent))',
                      inputBackground: 'rgba(255, 255, 255, 0.05)',
                      inputText: 'white',
                      inputPlaceholder: 'rgba(255, 255, 255, 0.4)',
                      inputBorder: 'rgba(255, 255, 255, 0.1)',
                      inputBorderHover: 'rgba(255, 255, 255, 0.2)',
                      inputBorderFocus: 'hsl(var(--accent))',
                    },
                    radii: {
                      borderRadiusButton: '0.75rem',
                      inputBorderRadius: '0.75rem',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'font-medium',
                  label: 'text-sm text-muted-foreground',
                  input: 'bg-secondary/50',
                },
              }}
              providers={['google', 'github']}
              theme="dark"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
