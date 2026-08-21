"use client";

import Link from "next/link";
import {
  Mic,
  Type,
  Camera,
  Video,
  MapPin,
  ArrowRight,
  ChevronRight,
  Shield,
  Brain,
  Building2,
  Droplets,
  GraduationCap,
  HeartPulse,
  Zap,
  BarChart3,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const { t } = useLanguage();

  const actionCards = [
    {
      icon: Mic,
      title: t.home.speakTitle,
      subtitle: t.home.speakSubtitle,
      href: "/report",
      color: "bg-gov-blue",
      accent: "text-gold",
    },
    {
      icon: Type,
      title: t.home.typeTitle,
      subtitle: t.home.typeSubtitle,
      href: "/report",
      color: "bg-deep-slate",
      accent: "text-civic-teal",
    },
    {
      icon: Camera,
      title: t.home.imageTitle,
      subtitle: t.home.imageSubtitle,
      href: "/report",
      color: "bg-gov-blue",
      accent: "text-gold",
    },
    {
      icon: Video,
      title: t.home.videoTitle,
      subtitle: t.home.videoSubtitle,
      href: "/report",
      color: "bg-deep-slate",
      accent: "text-civic-teal",
    },
  ];

  const trustSteps = [
    {
      num: "01",
      icon: Shield,
      title: t.home.step1Title,
      description: t.home.step1Desc,
    },
    {
      num: "02",
      icon: Brain,
      title: t.home.step2Title,
      description: t.home.step2Desc,
    },
    {
      num: "03",
      icon: Building2,
      title: t.home.step3Title,
      description: t.home.step3Desc,
    },
  ];

  const stats = [
    { label: t.home.statsSignals, value: "1.24M", icon: BarChart3 },
    { label: t.home.statsDistricts, value: "764", icon: MapPin },
    { label: t.home.statsIssues, value: "18.4K", icon: Zap },
    { label: t.home.statsLanguages, value: "3", icon: Globe },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(201,162,39,0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(15,118,110,0.2) 0%, transparent 50%)`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-gold ai-pulse" />
                <span className="text-xs text-gold font-mono tracking-wider uppercase">
                  {t.home.heroTag}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                {t.home.heroTitle1}{" "}
                <span className="text-gold">{t.home.heroTitle2}</span>{" "}
                {t.home.heroTitle3}
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                {t.home.heroDescription}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors"
                >
                  {t.home.getStarted}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  {t.home.viewDashboard}
                </Link>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-civic-teal" />
                <span>
                  {t.home.locationDetected}{" "}
                  <span className="text-white font-medium">
                    {t.home.locationValue}
                  </span>
                </span>
                <button className="text-gold hover:underline text-xs">
                  {t.home.changeLocation}
                </button>
              </div>
            </motion.div>

            {/* Right - Animated Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Central intelligence node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center z-10">
                  <Brain className="w-12 h-12 text-gold ai-pulse" />
                </div>

                {/* Orbiting signal nodes */}
                {[
                  { icon: Mic, delay: 0, x: -120, y: -80 },
                  { icon: Type, delay: 0.5, x: 120, y: -80 },
                  { icon: Camera, delay: 1, x: -120, y: 80 },
                  { icon: Video, delay: 1.5, x: 120, y: 80 },
                  { icon: Droplets, delay: 0.3, x: 0, y: -140 },
                  { icon: Zap, delay: 0.8, x: 0, y: 140 },
                  { icon: HeartPulse, delay: 1.2, x: -160, y: 0 },
                  { icon: GraduationCap, delay: 1.7, x: 160, y: 0 },
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: node.delay,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 2,
                    }}
                    className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-lg bg-navy border border-gov-blue flex items-center justify-center"
                    style={{
                      transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))`,
                    }}
                  >
                    <node.icon className="w-5 h-5 text-gray-300" />
                  </motion.div>
                ))}

                {/* Connection lines (decorative) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border border-gold/10" />
                  <div className="absolute w-48 h-48 rounded-full border border-gold/10" />
                  <div className="absolute w-80 h-80 rounded-full border border-gold/5" />
                </div>

                {/* Output indicators */}
                {[
                  { label: "Priority Score", value: "87", x: "100%", y: "20%" },
                  { label: "Confidence", value: "94%", x: "100%", y: "80%" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.3 }}
                    className="absolute bg-navy border border-gov-blue rounded-lg px-3 py-2"
                    style={{ left: item.x, top: item.y }}
                  >
                    <div className="text-[10px] text-muted">{item.label}</div>
                    <div className="text-sm font-mono font-bold text-gold">
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-4">
              {t.home.howToShare}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {t.home.howToShareSub}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {actionCards.map((card) => (
              <motion.div key={card.title} variants={fadeInUp}>
                <Link
                  href={card.href}
                  className="group block p-6 bg-off-white rounded-xl border border-border-gray hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
                  >
                    <card.icon className={`w-7 h-7 ${card.accent}`} />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-navy mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted mb-4">{card.subtitle}</p>
                  <div className="flex items-center gap-1 text-sm text-gov-blue font-medium group-hover:gap-2 transition-all">
                    {t.home.begin}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 sm:py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-4">
              {t.home.voiceToIntelTitle}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {t.home.voiceToIntelSub}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-border-gray" />

            {trustSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-white border-2 border-gold/30 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-gold" />
                </div>
                <div className="text-xs font-mono text-muted mb-2 tracking-wider">
                  STEP {step.num}
                </div>
                <h3 className="text-lg font-heading font-semibold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gov-blue/5 mb-3">
                  <stat.icon className="w-5 h-5 text-gov-blue" />
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-navy count-up">
                  {stat.value}
                </div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
              {t.home.ctaTitle}
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              {t.home.ctaSub}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors text-lg"
              >
                <Mic className="w-5 h-5" />
                {t.home.startSpeaking}
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {t.home.viewGovDashboard}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
