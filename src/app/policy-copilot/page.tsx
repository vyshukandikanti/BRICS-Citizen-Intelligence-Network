"use client";

import { useLanguage } from "@/lib/LanguageContext";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Brain,
  Search,
  BarChart3,
  Shield,
  FileText,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { policyCopilotQuestions, policyCopilotAnswer } from "@/data/mock-data";

const suggestedQuestions = policyCopilotQuestions;

export default function PolicyCopilotPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = (q?: string) => {
    const question = q || query;
    if (!question.trim()) return;
    setQuery(question);
    setIsLoading(true);
    setShowAnswer(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowAnswer(true);
    }, 2000);
  };

  const answer = policyCopilotAnswer;

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/dashboard" className="hover:text-navy transition-colors">Dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">Policy Copilot</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-4">
            <Brain className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs text-gold font-mono tracking-wider uppercase">
              {t.policy.aiPolicyIntel}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-3">
            {t.policy.title}
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Ask questions about citizen needs, infrastructure risk and public
            investment. Get evidence-based answers.
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              placeholder="{t.policy.askCopilot}"
              className="w-full pl-12 pr-24 py-4 bg-white border border-border-gray rounded-xl text-navy placeholder:text-muted focus:outline-none focus:border-gov-blue focus:ring-2 focus:ring-gov-blue/10 text-sm"
            />
            <button
              onClick={() => handleAsk()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gov-blue text-white text-sm font-medium rounded-lg hover:bg-gov-blue/90 transition-colors"
            >
              Ask
            </button>
          </div>
        </motion.div>

        {/* Suggested Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="text-xs text-muted mb-3 font-medium">{t.policy.suggestedQuestions}</div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleAsk(q)}
                className="px-3 py-2 text-xs bg-white border border-border-gray rounded-lg text-navy hover:border-gold/30 hover:bg-gold/5 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <div className="bg-white rounded-xl border border-border-gray p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gov-blue/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-gov-blue ai-pulse" />
                </div>
                <p className="text-sm text-muted">{t.policy.analyzing}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer */}
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-xl border border-border-gray overflow-hidden">
                {/* Question */}
                <div className="px-6 py-4 border-b border-border-gray bg-off-white">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted" />
                    <span className="text-sm font-medium text-navy">{answer.question}</span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Answer */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded bg-gov-blue flex items-center justify-center">
                        <Brain className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <h3 className="text-sm font-heading font-semibold text-navy">{t.policy.answer}</h3>
                    </div>
                    <p className="text-sm text-navy/80 leading-relaxed pl-8">
                      {answer.answer}
                    </p>
                  </div>

                  {/* Evidence */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded bg-civic-teal/10 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5 text-civic-teal" />
                      </div>
                      <h3 className="text-sm font-heading font-semibold text-navy">{t.policy.evidence}</h3>
                    </div>
                    <div className="pl-8 space-y-2">
                      {answer.evidence.map((e, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-civic-teal mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-navy/80">{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Factors */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded bg-gold/10 flex items-center justify-center">
                        <BarChart3 className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <h3 className="text-sm font-heading font-semibold text-navy">{t.policy.keyFactors}</h3>
                    </div>
                    <div className="pl-8 space-y-3">
                      {answer.keyFactors.map((f) => (
                        <div key={f.factor}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted">{f.factor}</span>
                            <span className="text-xs font-mono font-bold text-navy">
                              {f.weight}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-off-white rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${f.weight * 4}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                f.weight >= 22
                                  ? "bg-gold"
                                  : f.weight >= 18
                                  ? "bg-gov-blue"
                                  : "bg-civic-teal"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded bg-gov-blue/10 flex items-center justify-center">
                        <Lightbulb className="w-3.5 h-3.5 text-gov-blue" />
                      </div>
                      <h3 className="text-sm font-heading font-semibold text-navy">
                        {t.policy.recommendedAction}
                      </h3>
                    </div>
                    <div className="pl-8">
                      <p className="text-sm text-navy/80 leading-relaxed">
                        {answer.recommendation}
                      </p>
                    </div>
                  </div>

                  {/* Confidence & Sources */}
                  <div className="flex flex-wrap gap-6 pt-4 border-t border-border-gray">
                    <div>
                      <div className="text-xs text-muted mb-1">{t.policy.confidence}</div>
                      <div className="text-lg font-heading font-bold text-civic-teal">
                        {answer.confidence}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted mb-1">{t.policy.dataSources}</div>
                      <div className="flex items-center gap-2">
                        {answer.dataSources.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1 text-[10px] text-muted bg-off-white px-2 py-1 rounded"
                          >
                            <Database className="w-2.5 h-2.5" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
