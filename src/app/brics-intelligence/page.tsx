"use client";

import { useLanguage } from "@/lib/LanguageContext";

import Link from "next/link";
import {
  ChevronRight,
  Globe,
  Users,
  TrendingUp,
  AlertTriangle,
  Shield,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { bricsCountries } from "@/data/mock-data";

const riskColors: Record<string, string> = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-gold/10 text-gold border-gold/20",
  low: "bg-civic-teal/10 text-civic-teal border-civic-teal/20",
};

const riskDotColors: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-gold",
  low: "bg-civic-teal",
};

export default function BRICSIntelligencePage() {
  const { t } = useLanguage();
  const chartData = bricsCountries.map((c) => ({
    name: c.name.substring(0, 3),
    signals: parseFloat(c.signals.replace("M", "")) * 1000000,
    participation: c.participation,
  }));

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/dashboard" className="hover:text-navy transition-colors">Dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">BRICS Intelligence</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-1">
                {t.brics.title}
              </h1>
              <p className="text-sm text-muted">
                {t.brics.subtitle}
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gov-blue text-white text-sm rounded-lg hover:bg-gov-blue/90 transition-colors"
            >
              {t.brics.nationalView}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "{t.brics.totalSignals}", value: "25.5M", icon: BarChart3 },
            { label: "{t.brics.nations}", value: "11", icon: Globe },
            { label: "{t.brics.highPriorityZones}", value: "1,247", icon: AlertTriangle },
            { label: "{t.brics.avgParticipation}", value: "67%", icon: Users },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-border-gray p-4"
            >
              <kpi.icon className="w-5 h-5 text-gold mb-3" />
              <div className="text-xl font-heading font-bold text-navy">{kpi.value}</div>
              <div className="text-[11px] text-muted mt-1">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-border-gray p-5 mb-8"
        >
          <h2 className="text-sm font-heading font-semibold text-navy mb-4">
            {t.brics.signalVolume}
          </h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D9DEE5" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#667085" }} />
                <YAxis tick={{ fontSize: 12, fill: "#667085" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0B1F33",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F7F8FA",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="signals" fill="#123C69" radius={[4, 4, 0, 0]} name="Signals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bricsCountries.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="bg-white rounded-xl border border-border-gray p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gov-blue/5 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-gov-blue" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-semibold text-navy">
                      {country.name}
                    </h3>
                    <div className="text-xs text-muted">{country.signals} signals</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${
                    riskColors[country.risk]
                  }`}
                >
                  {country.risk.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[10px] text-muted mb-1">{t.brics.priorityInfra}</div>
                  <div className="text-xs font-medium text-navy">{country.priority}</div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted">{t.brics.citizenParticipation}</span>
                    <span className="text-[10px] font-mono font-bold text-navy">
                      {country.participation}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-off-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gov-blue rounded-full"
                      style={{ width: `${country.participation}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
