"use client";

import { useLanguage } from "@/lib/LanguageContext";

import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  TrendingUp,
  Brain,
  Shield,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { issueIntelligence } from "@/data/mock-data";

const factorLabels: Record<string, string> = {
  citizenReports: "{t.issueIntel.citizenReports}",
  populationAffected: "Population Affected",
  urgency: "Urgency",
  healthRisk: "Health Risk",
  infrastructureDeficit: "Infrastructure Deficit",
  growthTrend: "{t.issueIntel.growthTrend}",
};

export default function IssueIntelligencePage() {
  const { t } = useLanguage();
  const data = issueIntelligence;

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/ai-conversation" className="hover:text-navy transition-colors">AI Conversation</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">Issue Intelligence</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-2">
                {data.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="w-4 h-4" />
                {data.location}
              </div>
            </div>
            <Link
              href="/citizen"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gov-blue text-white text-sm rounded-lg hover:bg-gov-blue/90 transition-colors"
            >
              {t.issueIntel.submitAnother}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Priority Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-border-gray p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-gold" />
                <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider">
                  {t.issueIntel.infrastructurePriority}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Score */}
                <div className="text-center p-6 bg-off-white rounded-xl">
                  <div className="text-5xl font-heading font-bold text-navy count-up">
                    {data.priorityScore}
                  </div>
                  <div className="text-xs font-mono text-muted mt-1">
                    {t.issueIntel.outOf100}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                    <AlertTriangle className="w-3 h-3" />
                    {t.issueIntel.highPriority}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-muted mb-1">{t.issueIntel.status}</div>
                    <div className="text-sm font-semibold text-red-600">{data.status}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">{t.issueIntel.urgency}</div>
                    <div className="text-sm font-semibold text-red-600">{data.urgency}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">{t.issueIntel.confidence}</div>
                    <div className="text-sm font-semibold text-civic-teal">{data.confidence}%</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-muted mb-1">{t.issueIntel.populationAffected}</div>
                    <div className="text-sm font-semibold text-navy">{data.estimatedPopulation}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">{t.issueIntel.healthRisk}</div>
                    <div className="text-sm font-semibold text-medium-priority">{data.healthRisk}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">{t.issueIntel.similarReports}</div>
                    <div className="text-sm font-semibold text-navy">{data.similarReports}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Issue Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: "Category", value: "Water Infrastructure", icon: AlertTriangle },
                { label: "{t.issueIntel.growthTrend}", value: data.growthTrend, icon: TrendingUp },
                { label: "Affected", value: data.estimatedPopulation, icon: Users },
                { label: "Reports", value: `${data.similarReports} signals`, icon: FileText },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl border border-border-gray p-4"
                >
                  <item.icon className="w-4 h-4 text-muted mb-2" />
                  <div className="text-[11px] text-muted mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-navy">{item.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Why This Issue Matters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-border-gray p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-4 h-4 text-gold" />
                <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider">
                  {t.issueIntel.whyPrioritized}
                </h2>
              </div>

              {/* Factor bars */}
              <div className="space-y-4 mb-6">
                {Object.entries(data.factors).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted">
                        {factorLabels[key] || key}
                      </span>
                      <span className="text-xs font-mono font-semibold text-navy">
                        {value}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-off-white rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        className={`h-full rounded-full ${
                          value >= 85
                            ? "bg-red-500"
                            : value >= 70
                            ? "bg-gold"
                            : "bg-civic-teal"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* {t.issueIntel.aiExplanation} */}
              <div className="p-4 bg-off-white rounded-lg border border-border-gray">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-gov-blue flex items-center justify-center">
                    <Brain className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-xs font-semibold text-navy">{t.issueIntel.aiExplanation}</span>
                </div>
                <p className="text-sm text-navy/80 leading-relaxed">
                  {data.explanation}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* {t.issueIntel.submissionStatus} */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl border border-border-gray p-5"
            >
              <h3 className="text-sm font-heading font-semibold text-navy mb-4">
                {t.issueIntel.submissionStatus}
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Signal Received", done: true },
                  { label: "AI Analysis Complete", done: true },
                  { label: "Priority Assigned", done: true },
                  { label: "Government Notified", done: false },
                  { label: "Action Planned", done: false },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-3">
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4 text-civic-teal flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-border-gray flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        step.done ? "text-navy" : "text-muted"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* {t.issueIntel.dataSources} */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl border border-border-gray p-5"
            >
              <h3 className="text-sm font-heading font-semibold text-navy mb-4">
                {t.issueIntel.dataSources}
              </h3>
              <div className="space-y-2">
                {[
                  "BCIN Citizen Signal Database",
                  "District Infrastructure Registry",
                  "Population Census Data",
                  "Health Department Records",
                  "Satellite Infrastructure Analysis",
                ].map((source) => (
                  <div
                    key={source}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-civic-teal" />
                    {source}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl border border-border-gray p-5"
            >
              <h3 className="text-sm font-heading font-semibold text-navy mb-4">
                {t.issueIntel.whatHappensNext}
              </h3>
              <div className="space-y-3 text-sm text-muted leading-relaxed">
                <p>
                  Your signal has been analyzed and prioritized. The AI has
                  identified this as a critical water infrastructure issue
                  affecting a significant population.
                </p>
                <p>
                  Government decision-makers will receive this intelligence
                  report along with recommended actions.
                </p>
                <p>
                  You will be notified when action is taken on this issue.
                </p>
              </div>
              <Link
                href="/citizen"
                className="mt-4 inline-flex items-center gap-2 text-sm text-gov-blue font-medium hover:underline"
              >
                {t.issueIntel.trackIssue}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
