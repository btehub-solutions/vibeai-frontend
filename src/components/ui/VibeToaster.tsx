import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from '@/components/providers/NotificationProvider';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

interface VibeToasterProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const VibeToaster: React.FC<VibeToasterProps> = ({ notifications, removeNotification }) => {
  return (
    <div 
      aria-live="polite" 
      className="fixed z-[9999] pointer-events-none flex flex-col gap-3 p-4 
        top-0 right-0 md:top-6 md:right-6 
        bottom-0 left-0 md:bottom-auto md:left-auto items-center md:items-end justify-end md:justify-start"
    >
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <VibeToast 
            key={notification.id} 
            notification={notification} 
            onClose={() => removeNotification(notification.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const VibeToast: React.FC<{ notification: Notification; onClose: () => void }> = ({ notification, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-primary" />,
    error: <AlertCircle className="w-5 h-5 text-destructive" />,
    info: <Info className="w-5 h-5 text-accent" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  };

  const borders = {
    success: 'border-primary/20',
    error: 'border-destructive/20',
    info: 'border-accent/20',
    warning: 'border-yellow-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20, x: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      layout
      className={`
        pointer-events-auto
        group relative w-full max-w-[320px] 
        glass-frosted border ${borders[notification.type]}
        p-4 pr-10 shadow-2xl
      `}
    >
      <div className="flex gap-3 items-start">
        <div className="mt-0.5 flex-shrink-0">
          {icons[notification.type]}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground leading-tight truncate">
            {notification.title}
          </h4>
          {notification.description && (
            <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
              {notification.description}
            </p>
          )}
        </div>
      </div>
      
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/5"
      >
        <X size={14} className="text-muted-foreground" />
      </button>

      {/* Subtle progress indicator for the 1s auto-dismiss */}
      <motion.div 
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-0.5 bg-foreground/10 origin-left w-full`}
      />
    </motion.div>
  );
};
