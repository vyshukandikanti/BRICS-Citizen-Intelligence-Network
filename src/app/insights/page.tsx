"use client";

import { useLanguage } from "@/lib/LanguageContext";

import Link from "next/link";
import {
  ChevronRight,
  TrendingUp,
  BarChart3,
  Droplets,
  Zap,
  HeartPulse,
  GraduationCap,
  MapPin,
  ArrowRight,
  Users,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { infrastructureCategories, chartData } from "@/data/mock-data";

const pieColors = ["#123C69", "#C9A227", "#0F766E", "#667085", "#DC2626"];

const pieData = infrastructureCategories.map((c) => ({
  name: c.name,
  value: c.issues,
}));

const insights = [
  {
    title: "Water Infrastructure Risk Rising",
    description:
      "Citizen signals about water shortages have increased 18% month-over-month. Prakasam and Guntur districts show the highest concentration.",
    trend: "+18%",
    category: "Water",
    icon: Droplets,
  },
  {
    title: "Road Quality Concerns Concentrated Along NH-16",
    description:
      "Multiple citizen reports cluster along National Highway 16 segments, indicating systematic deterioration in specific stretches.",
    trend: "+8%",
    category: "Roads",
    icon: TrendingUp,
  },
  {
    title: "Healthcare Access Gap in Rural Areas",
    description:
      "Rural districts report 3x more healthcare access issues compared to urban centers, with equipment availability as the primary concern.",
    trend: "+5%",
    category: "Healthcare",
    icon: HeartPulse,
  },
  {
    title: "School Infrastructure Improving",
    description:
      "Education infrastructure signals show a 12% decrease, indicating positive impact from recent government investments in school buildings.",
    trend: "-12%",
    category: "Education",
    icon: GraduationCap,
  },
];

export default function InsightsPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">Insights</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-1">
            {t.insights.title}
          </h1>
          <p className="text-sm text-muted">
            Trends, patterns and emerging infrastructure needs from citizen
            signals.
          </p>
        </motion.div>

        {/* Trending Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-border-gray p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gov-blue/5 flex items-center justify-center flex-shrink-0">
                  <insight.icon className="w-5 h-5 text-gov-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-heading font-semibold text-navy truncate">
                      {insight.title}
                    </h3>
                    <span
                      className={`text-xs font-mono font-bold ${
                        insight.trend.startsWith("-")
                          ? "text-civic-teal"
                          : "text-red-500"
                      }`}
                    >
                      {insight.trend}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-border-gray p-5"
          >
            <h2 className="text-sm font-heading font-semibold text-navy mb-4">
              {t.insights.signalTrends}
            </h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.water}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9DEE5" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#667085" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#667085" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1F33",
                      border: "none",
                      borderRadius: "8px",
                      color: "#F7F8FA",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#123C69"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#123C69" }}
                    name="Reports"
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#0F766E"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#0F766E" }}
                    name="Resolved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Distribution Pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-border-gray p-5"
          >
            <h2 className="text-sm font-heading font-semibold text-navy mb-4">
              {t.insights.issueDistribution}
            </h2>
            <div className="h-[250px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                    style={{ fontSize: "10px" }}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1F33",
                      border: "none",
                      borderRadius: "8px",
                      color: "#F7F8FA",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Top Categories Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-border-gray p-5"
        >
          <h2 className="text-sm font-heading font-semibold text-navy mb-4">
            {t.insights.categorySummary}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-gray">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted">
                    Category
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted">
                    Issues
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted">
                    Affected
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted">
                    Unresolved
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted">
                    Trend
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted">
                    Risk
                  </th>
                </tr>
              </thead>
              <tbody>
                {infrastructureCategories.map((cat) => (
                  <tr
                    key={cat.name}
                    className="border-b border-border-gray/50 last:border-0 hover:bg-off-white transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-navy">{cat.name}</td>
                    <td className="py-3 px-4 text-right font-mono text-navy">
                      {cat.issues.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-muted">{cat.affected}</td>
                    <td className="py-3 px-4 text-right text-muted">
                      {cat.unresolved.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-mono text-xs ${
                          cat.trend.startsWith("+") ? "text-red-500" : "text-civic-teal"
                        }`}
                      >
                        {cat.trend}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-1 rounded ${
                          cat.risk === "high"
                            ? "bg-red-50 text-red-600"
                            : cat.risk === "medium"
                            ? "bg-gold/10 text-gold"
                            : "bg-civic-teal/10 text-civic-teal"
                        }`}
                      >
                        {cat.risk.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
