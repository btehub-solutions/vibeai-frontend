import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Github } from "lucide-react";
import { motion } from "framer-motion";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof AuthError) return error.message;
    if (error instanceof Error) return error.message;
    return "An unknown error occurred";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      toast.success("Welcome back!", {
        description: "Successfully logged in.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed", {
        description: getErrorMessage(error) || "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Account created!", {
        description: "Please check your email to verify your account.",
      });
    } catch (error) {
      toast.error("Signup failed", {
        description: getErrorMessage(error) || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      // Note: The actual redirection happens automatically by Supabase
    } catch (error) {
      toast.error(`${provider} login failed`, {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-accent/20">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="backdrop-blur-xl bg-card/30 border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                  <img src={logo} alt="VibeAI Logo" className="h-32 w-auto object-contain mx-auto mb-6 hover:scale-105 transition-transform duration-300" />
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome to VibeAI</h1>
                <p className="text-muted-foreground mt-2 text-sm">Your gateway to advanced AI learning</p>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary/50 p-1 rounded-xl">
                  <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-0 space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pl-9 bg-secondary/30 border-white/10 focus:border-accent/50 transition-all hover:bg-secondary/50"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-accent hover:text-accent/80 transition-colors" onClick={(e) => { e.preventDefault(); toast.info("Password reset link sent to your email."); }}>Forgot password?</a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-9 bg-secondary/30 border-white/10 focus:border-accent/50 transition-all hover:bg-secondary/50"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-6 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                          Signing in...
                        </>
                      ) : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-0 space-y-4">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="fullname" 
                          type="text" 
                          placeholder="John Doe" 
                          className="pl-9 bg-secondary/30 border-white/10 focus:border-accent/50 transition-all hover:bg-secondary/50"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pl-9 bg-secondary/30 border-white/10 focus:border-accent/50 transition-all hover:bg-secondary/50"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signup-password" 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-9 bg-secondary/30 border-white/10 focus:border-accent/50 transition-all hover:bg-secondary/50"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-6 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                          Creating account...
                        </>
                      ) : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="p-4 bg-secondary/20 border-t border-white/5 text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our <a href="#" className="hover:text-accent underline underline-offset-2" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#" className="hover:text-accent underline underline-offset-2" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
