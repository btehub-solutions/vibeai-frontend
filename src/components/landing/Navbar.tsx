import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

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

  const navLinks = [
    { name: "Why VibeAI", href: "/#why" },
    { name: "Learning", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-white/[0.08] shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Shopify style with icon */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">VibeAI</span>
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
            <Link
              to="/dashboard"
              className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-2"
            >
              Log in
            </Link>
            <Link to="/dashboard" className="btn-primary text-[15px] px-6 py-3">
              Start for free
            </Link>
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
          <div className="md:hidden py-8 border-t border-white/[0.06] bg-background/95 backdrop-blur-xl">
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
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Log in
                </Link>
                <Link to="/dashboard" className="btn-primary text-center">
                  Start for free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;