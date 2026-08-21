"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Simulated real-time notifications
const DEMO_NOTIFICATIONS: Omit<Notification, "id" | "timestamp" | "read">[] = [
  {
    title: "Issue Resolved",
    message: "Water supply issue in Prakasam District has been resolved.",
    type: "success",
    actionUrl: "/dashboard",
  },
  {
    title: "New High Priority Issue",
    message: "Road deterioration reported in Guntur District. Priority: HIGH",
    type: "warning",
    actionUrl: "/dashboard",
  },
  {
    title: "Team Assigned",
    message: "Engineering team assigned to electricity disruption in Kurnool.",
    type: "info",
    actionUrl: "/dashboard",
  },
  {
    title: "AI Analysis Complete",
    message: "12 new citizen signals analyzed. 3 flagged as critical.",
    type: "info",
    actionUrl: "/dashboard",
  },
  {
    title: "Escalation Alert",
    message: "Water shortage in Nellore escalated to District Collector.",
    type: "error",
    actionUrl: "/dashboard",
  },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev].slice(0, 50));

      // Show browser notification if permitted
      if ("Notification" in window && Notification.permission === "granted") {
        new window.Notification(notification.title, {
          body: notification.message,
          icon: "/icon-192.png",
        });
      }
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Simulate incoming notifications
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < DEMO_NOTIFICATIONS.length) {
        addNotification(DEMO_NOTIFICATIONS[index]);
        index++;
      }
    }, 8000); // New notification every 8 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
