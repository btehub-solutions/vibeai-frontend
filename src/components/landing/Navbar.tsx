import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
const navLinks = [
    { name: "Why VibeAI", href: "/#why" },
    { name: "Learning", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-white/[0.08] shadow-sm"
          : "bg-transparent py-2"
      }`}
    >
      <div className="container-main">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-20 md:h-24" : "h-24 md:h-28"}`}>
          <Link to="/" className="flex items-center gap-2.5 py-1">
            <img src={logo} alt="VibeAI Logo" className="h-20 md:h-24 w-auto object-contain hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Desktop Navigation - Shopify minimal style */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA - Shopify exact style */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="btn-primary text-[15px] px-6 py-3"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-2"
                >
                  Log in
                </Link>
                <Link to="/login" className="btn-primary text-[15px] px-6 py-3">
                  Start for free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/[0.06] bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 flex flex-col gap-4 border-t border-white/[0.06]">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="btn-primary text-center"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Log in
                    </Link>
                    <Link to="/login" className="btn-primary text-center">
                      Start for free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;