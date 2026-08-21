"use client";

import { useLanguage } from "@/lib/LanguageContext";

import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Brain,
  Users,
  Globe,
  Lock,
  Eye,
  ArrowRight,
  Heart,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "{t.about.aiPowered}",
    description:
      "{t.about.aiPoweredDesc}",
  },
  {
    icon: Users,
    title: "{t.about.citizenFirst}",
    description:
      "{t.about.citizenFirstDesc}",
  },
  {
    icon: Shield,
    title: "{t.about.govGrade}",
    description:
      "{t.about.govGradeDesc}",
  },
  {
    icon: Eye,
    title: "{t.about.transparency}",
    description:
      "{t.about.transparencyDesc}",
  },
  {
    icon: Globe,
    title: "{t.about.multilingual}",
    description:
      "{t.about.multilingualDesc}",
  },
  {
    icon: Zap,
    title: "{t.about.realTime}",
    description:
      "{t.about.realTimeDesc}",
  },
];

const values = [
  {
    icon: Heart,
    title: "{t.about.publicService}",
    description: "{t.about.publicServiceDesc}",
  },
  {
    icon: Target,
    title: "{t.about.evidenceBased}",
    description: "{t.about.evidenceBasedDesc}",
  },
  {
    icon: Lock,
    title: "{t.about.privacyFirst}",
    description: "{t.about.privacyFirstDesc}",
  },
  {
    icon: Globe,
    title: "{t.about.inclusive}",
    description: "{t.about.inclusiveDesc}",
  },
];

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">About</span>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs text-gold font-mono tracking-wider uppercase">
              About BCIN
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-navy mb-4">
            {t.about.title}
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            An AI-powered Digital Public Infrastructure platform that converts
            citizen voices into structured infrastructure intelligence, helping
            governments understand, prioritize and act on public needs.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-navy rounded-2xl p-8 sm:p-12 mb-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              {t.about.mission}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              To create a transparent, intelligent bridge between citizens and
              their governments — where every voice is heard, every issue is
              understood, and infrastructure decisions are made with complete
              evidence and clarity.
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-navy text-center mb-8">
            {t.about.capabilities}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-border-gray p-6"
              >
                <feature.icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg font-heading font-semibold text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-navy text-center mb-8">
            {t.about.coreValues}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white rounded-xl border border-border-gray"
              >
                <value.icon className="w-8 h-8 text-gov-blue mx-auto mb-3" />
                <h3 className="text-sm font-heading font-semibold text-navy mb-1">
                  {value.title}
                </h3>
                <p className="text-xs text-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-xl font-heading font-bold text-navy mb-4">
            {t.about.experienceBcin}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/citizen"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors"
            >
              {t.about.citizenPortal}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-gray text-navy rounded-lg hover:bg-white transition-colors"
            >
              {t.about.govDashboard}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
