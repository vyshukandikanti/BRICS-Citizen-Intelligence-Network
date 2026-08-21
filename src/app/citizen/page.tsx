"use client";

import { useLanguage } from "@/lib/LanguageContext";

import Link from "next/link";
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowRight,
  MapPin,
  AlertTriangle,
  Brain,
  Shield,
  Users,
  FileText,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { timelineSteps } from "@/data/mock-data";

const recentIssues = [
  {
    id: 1,
    title: "Drinking Water Shortage",
    location: "Prakasam District",
    priority: 87,
    status: "Government Notified",
    submitted: "Jan 15, 2026",
    currentStep: 4,
  },
  {
    id: 2,
    title: "Road Deterioration on NH-16",
    location: "Guntur District",
    priority: 72,
    status: "Priority Updated",
    submitted: "Jan 22, 2026",
    currentStep: 3,
  },
  {
    id: 3,
    title: "Street Light Outage",
    location: "Nellore District",
    priority: 45,
    status: "Issue Understood",
    submitted: "Feb 1, 2026",
    currentStep: 1,
  },
];

const statusColors: Record<string, string> = {
  "Government Notified": "text-gold bg-gold/10",
  "Priority Updated": "text-civic-teal bg-civic-teal/10",
  "Issue Understood": "text-gov-blue bg-gov-blue/10",
};

export default function CitizenPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">Citizen Portal</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-1">
            {t.citizen.title}
          </h1>
          <p className="text-sm text-muted">
            {t.citizen.subtitle}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors"
          >
            {t.citizen.reportNew}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Issues */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider mb-4">
              {t.citizen.recentSubmissions}
            </h2>

            {recentIssues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-white rounded-xl border border-border-gray p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-heading font-semibold text-navy mb-1">
                      {issue.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {issue.location}
                      </span>
                      <span>Submitted {issue.submitted}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-heading font-bold text-navy">
                      {issue.priority}
                    </div>
                    <div className="text-[10px] text-muted">{t.citizen.priority}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-[10px] font-semibold px-2 py-1 rounded ${
                      statusColors[issue.status] || "text-muted bg-off-white"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>

                {/* Mini timeline */}
                <div className="flex items-center gap-1">
                  {timelineSteps.map((step, j) => (
                    <div
                      key={j}
                      className={`flex-1 h-1.5 rounded-full ${
                        j <= issue.currentStep ? "bg-civic-teal" : "bg-border-gray"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Detail */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-border-gray p-5 sticky top-24"
            >
              <div className="flex items-center gap-2 mb-5">
                <Shield className="w-4 h-4 text-gold" />
                <h2 className="text-sm font-heading font-semibold text-navy">
                  {t.citizen.issueProgress}
                </h2>
              </div>

              <div className="relative">
                {timelineSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 pb-6 last:pb-0 relative">
                    {/* Line */}
                    {i < timelineSteps.length - 1 && (
                      <div
                        className={`absolute left-[11px] top-6 w-0.5 h-full ${
                          step.completed ? "bg-civic-teal" : "bg-border-gray"
                        }`}
                      />
                    )}

                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      {step.completed ? (
                        <div className="w-6 h-6 rounded-full bg-civic-teal flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-border-gray bg-white flex items-center justify-center">
                          <Clock className="w-3 h-3 text-muted" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <div
                        className={`text-sm font-medium ${
                          step.completed ? "text-navy" : "text-muted"
                        }`}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-off-white rounded-lg">
                <p className="text-xs text-muted leading-relaxed">
                  Your issue contributed to this infrastructure priority. Every
                  citizen signal helps build a clearer picture of community needs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
