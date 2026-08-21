"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Users,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  MapPin,
  Brain,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Clock,
  MessageSquare,
  ChevronRight,
  Lock,
  Send,
  Download,
} from "lucide-react";
import { exportDashboardToPDF } from "@/lib/exportPDF";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  kpiData,
  priorityIssues,
  infrastructureCategories,
  predictiveRisks,
  chartData,
  mapData,
} from "@/data/mock-data";
import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";

const InfrastructureMap = dynamic(() => import("@/components/map/InfrastructureMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-off-white rounded-lg flex items-center justify-center">
      <div className="text-sm text-muted">Loading map...</div>
    </div>
  ),
});

const riskDotColors: Record<string, string> = {
  critical: "bg-red-600",
  high: "bg-red-500",
  medium: "bg-gold",
  low: "bg-civic-teal",
};

const riskTextColors: Record<string, string> = {
  critical: "text-red-600",
  high: "text-red-500",
  medium: "text-gold",
  low: "text-civic-teal",
};

const predictiveRiskColors: Record<string, string> = {
  HIGH: "bg-red-50 text-red-700 border-red-200",
  MEDIUM: "bg-gold/10 text-gold border-gold/20",
  LOW: "bg-civic-teal/10 text-civic-teal border-civic-teal/20",
};

const issueStatuses = ["pending", "assigned", "in-progress", "resolved"] as const;
type IssueStatus = (typeof issueStatuses)[number];

const statusColors: Record<IssueStatus, string> = {
  pending: "bg-gold/10 text-gold border-gold/20",
  assigned: "bg-gov-blue/10 text-gov-blue border-gov-blue/20",
  "in-progress": "bg-civic-teal/10 text-civic-teal border-civic-teal/20",
  resolved: "bg-green-50 text-green-700 border-green-200",
};

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mapFilter, setMapFilter] = useState("all");
  const [issueStatuses2, setIssueStatuses2] = useState<Record<string, IssueStatus>>({});
  const [internalNotes, setInternalNotes] = useState<Record<string, string>>({});
  const [showNoteInput, setShowNoteInput] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Lock className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-xl font-heading font-bold text-navy mb-2">
            Government Access Required
          </h1>
          <p className="text-sm text-muted mb-6">
            This dashboard is restricted to authenticated government officials.
            Please sign in with your official credentials.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Sign In to Government Portal
          </Link>
          <div className="mt-4">
            <Link
              href="/"
              className="text-sm text-muted hover:text-navy transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const getStatusLabel = (status: IssueStatus): string => {
    switch (status) {
      case "pending": return "Pending";
      case "assigned": return t.dashboard.assigned;
      case "in-progress": return t.dashboard.inProgress;
      case "resolved": return t.dashboard.resolved;
    }
  };

  const handleStatusChange = (issueId: number, newStatus: IssueStatus) => {
    setIssueStatuses2((prev) => ({ ...prev, [String(issueId)]: newStatus }));
  };

  const handleAddNote = (issueId: number) => {
    if (noteText.trim()) {
      setInternalNotes((prev) => ({
        ...prev,
        [String(issueId)]: `${user?.name}: ${noteText}`,
      }));
      setNoteText("");
      setShowNoteInput(null);
    }
  };

  const getIssueStatus = (issueId: number): IssueStatus => {
    return issueStatuses2[String(issueId)] || "pending";
  };

  const kpis = [
    { label: t.dashboard.citizenSignals, value: kpiData.citizenSignals, change: "+12.4%", up: true, icon: BarChart3, color: "text-gov-blue" },
    { label: t.dashboard.activeIssues, value: kpiData.activeIssues, change: "+3.2%", up: true, icon: AlertTriangle, color: "text-gold" },
    { label: t.dashboard.highPriority, value: kpiData.highPriority, change: "+8.1%", up: true, icon: TrendingUp, color: "text-high-priority" },
    { label: t.dashboard.populationAffected, value: kpiData.populationAffected, change: "+5.7%", up: true, icon: Users, color: "text-medium-priority" },
    { label: t.dashboard.resolutionProgress, value: kpiData.resolutionProgress, change: "+2.3%", up: true, icon: CheckCircle2, color: "text-civic-teal" },
  ];

  const catNames: Record<string, string> = {
    Water: t.dashboard.water,
    Roads: t.dashboard.roads,
    Electricity: t.dashboard.electricity,
    Healthcare: t.dashboard.healthcare,
    Education: t.dashboard.education,
  };

  const riskLabels: Record<string, string> = {
    low: t.dashboard.low,
    medium: t.dashboard.medium,
    high: t.dashboard.high,
    critical: t.dashboard.critical,
  };

  return (
    <div className="min-h-screen bg-off-white">
      <div id="dashboard-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Officer Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-deep-slate rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="text-xs text-gold font-mono tracking-wider uppercase">
                {t.dashboard.govExclusive}
              </div>
              <div className="text-sm text-white font-semibold">
                {t.dashboard.welcomeOfficer} {user?.name}
              </div>
              <div className="text-xs text-gray-400">
                {user?.department} • {user?.role}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{t.dashboard.lastLogin}: 2 min ago</span>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-1">
                {t.dashboard.intelCenter}
              </h1>
              <p className="text-sm text-muted">{t.dashboard.intelSub}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/policy-copilot" className="inline-flex items-center gap-2 px-4 py-2 bg-gov-blue text-white text-sm rounded-lg hover:bg-gov-blue/90 transition-colors">
                <Brain className="w-4 h-4" />
                {t.dashboard.policyCopilot}
              </Link>
              <Link href="/brics-intelligence" className="inline-flex items-center gap-2 px-4 py-2 border border-border-gray text-navy text-sm rounded-lg hover:bg-white transition-colors">
                {t.dashboard.bricsView}
              </Link>
              <button
                onClick={() => exportDashboardToPDF("dashboard-content")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-civic-teal text-white text-sm rounded-lg hover:bg-civic-teal/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl border border-border-gray p-4">
              <div className="flex items-center justify-between mb-3">
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                <div className={`flex items-center gap-0.5 text-xs ${kpi.up ? "text-green-600" : "text-red-500"}`}>
                  {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              <div className="text-xl font-heading font-bold text-navy count-up">{kpi.value}</div>
              <div className="text-[11px] text-muted mt-1">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Government-only Action KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gold/30 overflow-hidden mb-8"
        >
          <div className="px-5 py-3 border-b border-gold/20 bg-gold/5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-sm font-heading font-semibold text-navy">{t.dashboard.officerPanel}</span>
          </div>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gold/5 border border-gold/20">
              <div className="text-2xl font-heading font-bold text-navy">24</div>
              <div className="text-xs text-muted mt-1">{t.dashboard.pendingActions}</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-civic-teal/5 border border-civic-teal/20">
              <div className="text-2xl font-heading font-bold text-civic-teal">12</div>
              <div className="text-xs text-muted mt-1">{t.dashboard.resolvedToday}</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="text-2xl font-heading font-bold text-red-600">5</div>
              <div className="text-xs text-muted mt-1">{t.dashboard.escalatedIssues}</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gov-blue/5 border border-gov-blue/20">
              <div className="text-2xl font-heading font-bold text-gov-blue">2.4{t.dashboard.hours}</div>
              <div className="text-xs text-muted mt-1">{t.dashboard.avgResponseTime}</div>
            </div>
          </div>
        </motion.div>

        {/* Map and Priority Issues */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-white rounded-xl border border-border-gray overflow-hidden">
            <div className="px-5 py-4 border-b border-border-gray flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                <h2 className="text-sm font-heading font-semibold text-navy">{t.dashboard.riskMap}</h2>
              </div>
              <select value={mapFilter} onChange={(e) => setMapFilter(e.target.value)} className="text-xs border border-border-gray rounded-lg px-2 py-1.5 text-navy bg-off-white">
                <option value="all">{t.dashboard.allInfrastructure}</option>
                <option value="water">{t.dashboard.water}</option>
                <option value="roads">{t.dashboard.roads}</option>
                <option value="electricity">{t.dashboard.electricity}</option>
                <option value="healthcare">{t.dashboard.healthcare}</option>
              </select>
            </div>
            <div className="relative h-[400px] bg-off-white">
              <InfrastructureMap filter={mapFilter} />
              <div className="absolute bottom-4 right-4 bg-white rounded-lg border border-border-gray p-3 z-[1000]">
                <div className="text-[10px] font-semibold text-navy mb-2">{t.dashboard.riskLevel}</div>
                <div className="space-y-1.5">
                  {(["low", "medium", "high", "critical"] as const).map((level) => (
                    <div key={level} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${riskDotColors[level]}`} />
                      <span className="text-[10px] text-muted">{riskLabels[level]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Priority Issues Panel - with Gov Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl border border-border-gray overflow-hidden">
            <div className="px-5 py-4 border-b border-border-gray">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-gold" />
                <h2 className="text-sm font-heading font-semibold text-navy">{t.dashboard.highestPriority}</h2>
              </div>
            </div>
            <div className="divide-y divide-border-gray max-h-[500px] overflow-y-auto">
              {priorityIssues.map((issue, i) => {
                const currentStatus = getIssueStatus(issue.id);
                return (
                  <div key={String(issue.id)} className="px-5 py-4 hover:bg-off-white transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="text-lg font-heading font-bold text-navy w-8 text-right">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-navy truncate">{issue.title}</div>
                        <div className="text-xs text-muted mt-0.5 truncate">{issue.location}</div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-xs font-mono font-bold ${riskTextColors[issue.status.toLowerCase()]}`}>{issue.priority}</span>
                          <span className="text-xs text-muted">{issue.affected} {t.dashboard.affected}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${statusColors[currentStatus]}`}>
                            {getStatusLabel(currentStatus)}
                          </span>
                        </div>
                        {/* Internal Note */}
                        {internalNotes[String(issue.id)] && (
                          <div className="mt-2 p-2 bg-gold/5 border border-gold/20 rounded text-xs text-muted">
                            <MessageSquare className="w-3 h-3 inline mr-1" />
                            {internalNotes[String(issue.id)]}
                          </div>
                        )}
                        {/* Gov Action Buttons */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <button
                            onClick={() => handleStatusChange(issue.id, "assigned" as IssueStatus)}
                            className="text-[10px] px-2 py-1 bg-gov-blue text-white rounded hover:bg-gov-blue/90 transition-colors"
                          >
                            {t.dashboard.assign}
                          </button>
                          <button
                            onClick={() => handleStatusChange(issue.id, "in-progress" as IssueStatus)}
                            className="text-[10px] px-2 py-1 bg-civic-teal text-white rounded hover:bg-civic-teal/90 transition-colors"
                          >
                            {t.dashboard.escalate}
                          </button>
                          <button
                            onClick={() => handleStatusChange(issue.id, "resolved" as IssueStatus)}
                            className="text-[10px] px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            {t.dashboard.markResolved}
                          </button>
                          <button
                            onClick={() => setShowNoteInput(showNoteInput === String(issue.id) ? null : String(issue.id))}
                            className="text-[10px] px-2 py-1 bg-off-white text-navy border border-border-gray rounded hover:bg-white transition-colors"
                          >
                            {t.dashboard.addNote}
                          </button>
                        </div>
                        {/* Note Input */}
                        {showNoteInput === String(issue.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-2 flex gap-2"
                          >
                            <input
                              type="text"
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder={t.dashboard.internalNotePlaceholder}
                              className="flex-1 text-xs px-3 py-1.5 border border-border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-gold/30"
                              onKeyDown={(e) => e.key === "Enter" && handleAddNote(issue.id)}
                            />
                            <button
                              onClick={() => handleAddNote(issue.id)}
                              className="px-2 py-1 bg-gold text-navy rounded-lg hover:bg-gold/90 transition-colors"
                            >
                              <Send className="w-3 h-3" />
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Infrastructure Analytics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-xl border border-border-gray overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-border-gray flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gold" />
              <h2 className="text-sm font-heading font-semibold text-navy">{t.dashboard.infraAnalytics}</h2>
            </div>
            <div className="flex items-center gap-1 bg-off-white rounded-lg p-1">
              {["all", "water", "roads", "electricity", "healthcare", "education"].map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-xs rounded-md transition-colors capitalize ${selectedCategory === cat ? "bg-white text-navy font-medium shadow-sm" : "text-muted hover:text-navy"}`}>
                  {cat === "all" ? "All" : (catNames[cat.charAt(0).toUpperCase() + cat.slice(1)] || cat)}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {infrastructureCategories.map((cat) => (
                <div key={cat.name} className={`p-3 rounded-lg border transition-colors cursor-pointer ${selectedCategory === cat.name.toLowerCase() || selectedCategory === "all" ? "border-gold/30 bg-gold/5" : "border-border-gray hover:border-gold/20"}`} onClick={() => setSelectedCategory(cat.name.toLowerCase())}>
                  <div className="text-xs font-semibold text-navy mb-1">{catNames[cat.name] || cat.name}</div>
                  <div className="text-lg font-heading font-bold text-navy">{cat.issues.toLocaleString()}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-[10px] font-mono ${cat.risk === "high" ? "text-red-500" : cat.risk === "medium" ? "text-gold" : "text-civic-teal"}`}>{cat.risk.toUpperCase()} RISK</span>
                    <span className="text-[10px] text-muted">{cat.trend}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.water}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9DEE5" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#667085" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#667085" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#0B1F33", border: "none", borderRadius: "8px", color: "#F7F8FA", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area type="monotone" dataKey="reports" stackId="1" stroke="#123C69" fill="#123C69" fillOpacity={0.1} name={t.dashboard.reports} />
                  <Area type="monotone" dataKey="resolved" stackId="2" stroke="#0F766E" fill="#0F766E" fillOpacity={0.1} name={t.dashboard.resolved} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Predictive Risk */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-gold" />
            <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider">{t.dashboard.futureRisk}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {predictiveRisks.map((risk) => (
              <div key={risk.category} className="bg-white rounded-xl border border-border-gray p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-heading font-semibold text-navy">{risk.category}</h3>
                  <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${predictiveRiskColors[risk.risk]}`}>{risk.risk}</span>
                </div>
                <div className="text-xs text-muted mb-3">{risk.timeframe}</div>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted">{t.dashboard.confidence}</span>
                    <span className="text-[10px] font-mono font-bold text-navy">{risk.confidence}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-off-white rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${risk.confidence >= 85 ? "bg-red-500" : risk.confidence >= 70 ? "bg-gold" : "bg-civic-teal"}`} style={{ width: `${risk.confidence}%` }} />
                  </div>
                </div>
                <div className="space-y-1">
                  {risk.factors.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-[10px] text-muted">
                      <div className="w-1 h-1 rounded-full bg-muted" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
