"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    platform: [
      { label: t.footer.aboutBcin, href: "/about" },
      { label: t.footer.citizenPortal, href: "/citizen" },
      { label: t.footer.govDashboard, href: "/dashboard" },
      { label: t.footer.policyCopilot, href: "/policy-copilot" },
    ],
    support: [
      { label: t.footer.accessibility, href: "#" },
      { label: t.footer.privacyPolicy, href: "#" },
      { label: t.footer.dataPolicy, href: "#" },
      { label: t.footer.citizenSupport, href: "#" },
    ],
    resources: [
      { label: t.footer.apiDocs, href: "#" },
      { label: t.footer.devPortal, href: "#" },
      { label: t.footer.researchPapers, href: "#" },
      { label: t.footer.openData, href: "#" },
    ],
  };

  return (
    <footer className="bg-navy border-t border-deep-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white font-heading">
                  BCIN
                </div>
                <div className="text-[10px] text-muted">
                  BRICS Citizen Intelligence Network
                </div>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Digital Public Infrastructure converting citizen voices into
              structured intelligence for government decision-making.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-md">
              <div className="w-2 h-2 rounded-full bg-gold ai-pulse" />
              <span className="text-xs text-gold font-mono">
                {t.header.demoPrototype}
              </span>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-heading">
              {t.footer.platform}
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-heading">
              {t.footer.supportPolicy}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-heading">
              {t.footer.resources}
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-deep-slate flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted max-w-2xl">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted font-mono">
              v0.1.0-demo
            </span>
            <span className="text-xs text-muted">|</span>
            <span className="text-xs text-muted">
              {t.footer.wcag}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
