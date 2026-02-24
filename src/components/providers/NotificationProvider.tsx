import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { VibeToaster } from '../ui/VibeToaster';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
}

interface NotificationContextType {
  notify: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const location = useLocation();

  // Clear notifications on route change
  useEffect(() => {
    setNotifications([]);
  }, [location.pathname]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-dismiss after 1 second as requested
    setTimeout(() => {
      removeNotification(id);
    }, 1000);
  }, [removeNotification]);

  const success = (title: string, description?: string) => notify({ type: 'success', title, description });
  const error = (title: string, description?: string) => notify({ type: 'error', title, description });
  const info = (title: string, description?: string) => notify({ type: 'info', title, description });
  const warning = (title: string, description?: string) => notify({ type: 'warning', title, description });

  return (
    <NotificationContext.Provider value={{ notify, removeNotification, success, error, info, warning }}>
      {children}
      <VibeToaster notifications={notifications} removeNotification={removeNotification} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
