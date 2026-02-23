import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, let's scroll to that element
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // slightly delay to ensure rendering finished
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }

    // Default: instant scroll to top
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    // Also reset scroll for any dashboard containers that React reuses <body>
    const scrollableElements = document.querySelectorAll('main, .overflow-auto, .overflow-y-auto, .h-screen');
    scrollableElements.forEach((el) => {
       if (el instanceof HTMLElement) {
           el.style.scrollBehavior = 'auto';
           el.scrollTop = 0;
           el.style.scrollBehavior = '';
       }
    });

    // Re-enable smooth scroll if set by CSS
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 10);

  }, [pathname, hash]);

  return null;
}
