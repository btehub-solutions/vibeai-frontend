import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "How It Works", href: "/#how-it-works" },
      { name: "AI Tools", href: "/dashboard/tools" },
      { name: "Pricing", href: "/#pricing" },
    ],
    Company: [
      { name: "About", href: "/#why" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
    Support: [
      { name: "Help Center", href: "/chat" },
      { name: "Contact", href: "#contact" },
    ],
    Legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-white/[0.06]">
      <div className="container-main py-12 md:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 md:mb-6">
              <img src={logo} alt="VibeAI Logo" className="h-20 md:h-24 w-auto object-contain hover:opacity-80 transition-opacity" />
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Learn AI in Vibe Mode.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs md:text-sm font-semibold text-foreground mb-4 md:mb-6">
                {category}
              </h4>
              <ul className="space-y-3 md:space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      onClick={(e) => {
                        if (link.href === "#" || link.href === "#contact") {
                          e.preventDefault();
                          if (link.href === "#contact") {
                            toast.info("Contact form opening soon!");
                          } else {
                            toast.info(`${link.name} page will be available soon`);
                          }
                        }
                      }}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
          <p className="text-xs md:text-sm text-muted-foreground">
            2025 VibeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
