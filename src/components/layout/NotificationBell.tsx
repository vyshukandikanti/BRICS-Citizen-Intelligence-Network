"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  X,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/lib/NotificationContext";

const typeIcons: Record<string, typeof Bell> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const typeColors: Record<string, string> = {
  success: "text-civic-teal",
  warning: "text-gold",
  info: "text-gov-blue",
  error: "text-red-500",
};

const typeBg: Record<string, string> = {
  success: "bg-civic-teal/10",
  warning: "bg-gold/10",
  info: "bg-gov-blue/10",
  error: "bg-red-50",
};

export default function NotificationBell() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-80 max-h-[420px] bg-white rounded-xl shadow-2xl border border-border-gray overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border-gray flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-navy" />
                <span className="text-sm font-heading font-semibold text-navy">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] text-gov-blue hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[320px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notif) => {
                  const Icon = typeIcons[notif.type] || Info;
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`px-4 py-3 border-b border-border-gray/50 hover:bg-off-white transition-colors ${
                        !notif.read ? "bg-gold/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeBg[notif.type]}`}
                        >
                          <Icon className={`w-4 h-4 ${typeColors[notif.type]}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-navy">
                              {notif.title}
                            </span>
                            {!notif.read && (
                              <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-muted mt-0.5 leading-relaxed">
                            {notif.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] text-muted">
                              {formatTime(notif.timestamp)}
                            </span>
                            {notif.actionUrl && (
                              <Link
                                href={notif.actionUrl}
                                onClick={() => {
                                  markAsRead(notif.id);
                                  setIsOpen(false);
                                }}
                                className="text-[10px] text-gov-blue hover:underline"
                              >
                                View →
                              </Link>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => clearNotification(notif.id)}
                          className="text-muted hover:text-navy p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2 border-t border-border-gray text-center">
                <button
                  onClick={() => {
                    markAllAsRead();
                    setIsOpen(false);
                  }}
                  className="text-[11px] text-gov-blue hover:underline"
                >
                  View all & mark as read
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
