"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Accessibility,
  HelpCircle,
  LogIn,
  Menu,
  X,
  Shield,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { languages } from "@/lib/i18n";
import NotificationBell from "@/components/layout/NotificationBell";

export default function Header() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: t.header.citizen, href: "/citizen" },
    { label: t.header.intelligence, href: "/dashboard" },
    { label: t.header.dashboard, href: "/dashboard" },
    { label: t.header.insights, href: "/insights" },
    { label: t.header.about, href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-deep-slate">
      {/* Top bar */}
      <div className="bg-deep-slate/50 border-b border-gov-blue/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-7">
          <span className="text-[11px] text-muted font-mono tracking-wider uppercase">
            {t.header.digitalPublicInfrastructure}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-muted font-mono">
              {t.header.demoPrototype}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-white font-heading tracking-tight leading-tight">
                BCIN
              </div>
              <div className="text-[10px] text-muted leading-tight">
                BRICS Citizen Intelligence Network
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                aria-label={t.header.language}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden md:inline">
                  {languages.find((l) => l.code === language)?.label || "English"}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div
                  className={`absolute right-0 top-full mt-1 w-56 max-h-[400px] overflow-y-auto bg-white rounded-lg shadow-xl border border-border-gray py-1 z-50`}
                  dir={dir}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-off-white transition-colors flex items-center justify-between ${
                        language === lang.code
                          ? "text-gov-blue font-semibold bg-off-white"
                          : "text-navy"
                      }`}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NotificationBell />
            <button
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              aria-label={t.header.accessibility}
            >
              <Accessibility className="w-4 h-4" />
            </button>

            <button
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              aria-label={t.header.help}
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  <span className="hidden md:inline">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm text-navy bg-gold hover:bg-gold/90 rounded-lg transition-colors font-semibold"
              >
                <LogIn className="w-4 h-4" />
                {t.header.governmentLogin}
              </Link>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-deep-slate border-t border-gov-blue/30">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile language selector */}
            <div className="pt-3 border-t border-gov-blue/30">
              <div className="px-4 py-2 text-xs text-muted font-semibold uppercase tracking-wider">
                {t.header.language}
              </div>
              <div className="flex flex-wrap gap-1.5 px-4 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileOpen(false);
                    }}
                    className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                      language === lang.code
                        ? "bg-gold text-navy font-semibold"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300">
                    <Shield className="w-4 h-4 text-gold" />
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted">({user?.department})</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-navy bg-gold hover:bg-gold/90 rounded-lg transition-colors font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-navy bg-gold hover:bg-gold/90 rounded-lg transition-colors font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  {t.header.governmentLogin}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
