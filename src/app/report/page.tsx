"use client";

import { useState } from "react";
import Link from "next/link";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { useImageAnalysis } from "@/lib/useImageAnalysis";
import { useLanguage } from "@/lib/LanguageContext";
import {
  ChevronRight,
  Droplets,
  Car,
  Zap,
  HeartPulse,
  GraduationCap,
  Trash2,
  HelpCircle,
  Camera,
  Video,
  Mic,
  MicOff,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "water", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", activeBg: "bg-blue-100", activeBorder: "border-blue-400" },
  { id: "roads", icon: Car, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", activeBg: "bg-orange-100", activeBorder: "border-orange-400" },
  { id: "electricity", icon: Zap, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", activeBg: "bg-yellow-100", activeBorder: "border-yellow-400" },
  { id: "healthcare", icon: HeartPulse, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", activeBg: "bg-red-100", activeBorder: "border-red-400" },
  { id: "education", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", activeBg: "bg-purple-100", activeBorder: "border-purple-400" },
  { id: "sanitation", icon: Trash2, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", activeBg: "bg-green-100", activeBorder: "border-green-400" },
  { id: "other", icon: HelpCircle, color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200", activeBg: "bg-gray-100", activeBorder: "border-gray-400" },
];

const categoryLabelMap: Record<string, string> = {
  water: "report.water",
  roads: "report.roads",
  electricity: "report.electricity",
  healthcare: "report.healthcare",
  education: "report.education",
  sanitation: "report.sanitation",
  other: "report.other",
};  const urgencyOptions = [
    { id: "low", labelKey: "low" as const, color: "border-civic-teal/40 bg-civic-teal/5 hover:bg-civic-teal/10", activeColor: "border-civic-teal bg-civic-teal/15 ring-1 ring-civic-teal/30" },
    { id: "medium", labelKey: "medium" as const, color: "border-gold/40 bg-gold/5 hover:bg-gold/10", activeColor: "border-gold bg-gold/15 ring-1 ring-gold/30" },
    { id: "high", labelKey: "high" as const, color: "border-red-300 bg-red-50 hover:bg-red-100", activeColor: "border-red-500 bg-red-100 ring-1 ring-red-300" },
  ];

const districts = [
  "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna",
  "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam",
  "Vizianagaram", "West Godavari", "YSR Kadapa",
];

export default function ReportPage() {
  const { t, language } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [urgency, setUrgency] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [videoAdded, setVideoAdded] = useState(false);
  const [voiceAdded, setVoiceAdded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    isListening,
    interimTranscript: voiceInterim,
    isSupported: speechSupported,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    lang: language,
    onResult: (text, isFinal) => {
      if (isFinal) {
        setDescription((prev) => (prev ? prev + " " + text : text));
        setVoiceAdded(true);
      }
    },
  });

  const {
    isAnalyzing: imageAnalyzing,
    result: imageResult,
    analyzeImage,
  } = useImageAnalysis();

  const isValid = selectedCategory && description.trim() && location.trim() && district && urgency;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-civic-teal/10 border-2 border-civic-teal/30 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-civic-teal" />
          </div>
          <h1 className="text-xl font-heading font-bold text-navy mb-2">
            {t.report.successTitle}
          </h1>
          <p className="text-sm text-muted mb-6">
            {t.report.successDesc}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/ai-conversation"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors"
            >
              {t.report.viewAnalysis}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedCategory("");
                setDescription("");
                setLocation("");
                setDistrict("");
                setUrgency("");
                setContactName("");
                setContactPhone("");
                setIsAnonymous(false);
                setPhotoAdded(false);
                setVideoAdded(false);
                setVoiceAdded(false);
              }}
              className="text-sm text-muted hover:text-navy transition-colors"
            >
              {t.report.submitAnother}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">Report Issue</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-1">
            {t.report.title}
          </h1>
          <p className="text-sm text-muted">{t.report.subtitle}</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Category Selection */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center">1</span>
              {t.report.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      isActive
                        ? `${cat.activeBg} ${cat.activeBorder}`
                        : `${cat.bg} ${cat.border} hover:shadow-md`
                    }`}
                  >
                    <cat.icon className={`w-6 h-6 mx-auto mb-2 ${cat.color}`} />
                    <span className={`text-xs font-medium ${isActive ? "text-navy" : "text-muted"}`}>
                      {t.report[categoryLabelMap[cat.id] as keyof typeof t.report] || cat.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Step 2: Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center">2</span>
              {t.report.description}
            </h2>
            <div className="bg-white rounded-xl border border-border-gray overflow-hidden">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.report.descriptionPlaceholder}
                rows={4}
                className="w-full p-4 text-sm text-navy placeholder:text-muted focus:outline-none resize-none"
              />
              <div className="px-4 py-3 border-t border-border-gray flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => (isListening ? stopListening() : startListening())}
                  className={`p-2.5 rounded-lg transition-colors ${
                    isListening ? "bg-red-500 text-white ai-pulse" : "bg-off-white text-muted hover:text-navy"
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <span className="text-[11px] text-muted flex-1">
                  {isListening
                    ? "🔴 Listening... Speak now in your language"
                    : speechSupported
                    ? t.report.voiceDesc
                    : "Voice not supported in this browser"}
                </span>
                {isListening && voiceInterim && (
                  <span className="text-xs text-gov-blue italic">{voiceInterim}</span>
                )}
                {speechError && (
                  <span className="text-xs text-red-500">{speechError}</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Step 3: Location */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
            <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center">3</span>
              {t.report.location}
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.report.locationPlaceholder}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-border-gray rounded-xl text-sm text-navy placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1.5">{t.report.district}</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-border-gray rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                >
                  <option value="">{t.report.districtPlaceholder}</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Urgency */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
            <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center">4</span>
              {t.report.urgency}
            </h2>
            <div className="space-y-3">
              {urgencyOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setUrgency(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    urgency === opt.id ? opt.activeColor : opt.color
                  }`}
                >
                  <span className="text-sm text-navy font-medium">
                    {t.report[opt.labelKey as keyof typeof t.report]}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 5: Media Attachments */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
            <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center">5</span>
              Attachments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Photo with AI Analysis */}
              <label className={`p-4 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer ${
                photoAdded
                  ? "border-gov-blue bg-gov-blue/5"
                  : imageAnalyzing
                  ? "border-gold bg-gold/5 animate-pulse"
                  : "border-border-gray hover:border-gov-blue/30 bg-white"
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPhotoAdded(true);
                      const result = await analyzeImage(file);
                      if (result) {
                        setSelectedCategory(
                          result.category.toLowerCase().includes("water") ? "water"
                          : result.category.toLowerCase().includes("road") ? "roads"
                          : result.category.toLowerCase().includes("electric") ? "electricity"
                          : result.category.toLowerCase().includes("health") ? "healthcare"
                          : "other"
                        );
                        if (description.length < 10) {
                          setDescription(result.description);
                        }
                      }
                    }
                  }}
                />
                <Camera className={`w-6 h-6 mx-auto mb-2 ${photoAdded ? "text-gov-blue" : "text-muted"}`} />
                <div className="text-xs font-medium text-navy">
                  {imageAnalyzing ? "AI Analyzing..." : t.report.photo}
                </div>
                <div className="text-[10px] text-muted mt-1">
                  {imageAnalyzing ? "Detecting issue type..." : t.report.photoDesc}
                </div>
                {imageResult && (
                  <div className="mt-2 p-2 bg-gov-blue/10 rounded text-[10px] text-gov-blue text-left">
                    <div className="font-bold">AI Detected: {imageResult.category}</div>
                    <div>Confidence: {imageResult.confidence}%</div>
                    <div className="flex gap-1 mt-1">
                      {imageResult.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-gov-blue/20 rounded text-[8px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </label>

              {/* Video */}
              <button
                type="button"
                onClick={() => setVideoAdded(!videoAdded)}
                className={`p-4 rounded-xl border-2 border-dashed transition-all text-center ${
                  videoAdded
                    ? "border-civic-teal bg-civic-teal/5"
                    : "border-border-gray hover:border-civic-teal/30 bg-white"
                }`}
              >
                <Video className={`w-6 h-6 mx-auto mb-2 ${videoAdded ? "text-civic-teal" : "text-muted"}`} />
                <div className="text-xs font-medium text-navy">{t.report.video}</div>
                <div className="text-[10px] text-muted mt-1">{t.report.videoDesc}</div>
              </button>

              {/* Voice */}
              <button
                type="button"
                onClick={() => setVoiceAdded(!voiceAdded)}
                className={`p-4 rounded-xl border-2 border-dashed transition-all text-center ${
                  voiceAdded
                    ? "border-gold bg-gold/5"
                    : "border-border-gray hover:border-gold/30 bg-white"
                }`}
              >
                <Mic className={`w-6 h-6 mx-auto mb-2 ${voiceAdded ? "text-gold" : "text-muted"}`} />
                <div className="text-xs font-medium text-navy">{t.report.voice}</div>
                <div className="text-[10px] text-muted mt-1">{t.report.voiceDesc}</div>
              </button>
            </div>
          </motion.div>

          {/* Step 6: Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
            <h2 className="text-sm font-heading font-semibold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center">6</span>
              Contact Information
            </h2>
            <div className="bg-white rounded-xl border border-border-gray p-5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-gold rounded border-border-gray focus:ring-gold"
                />
                <label htmlFor="anonymous" className="text-sm text-navy font-medium">
                  {t.report.anonymous}
                </label>
              </div>
              {!isAnonymous && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-navy mb-1.5">{t.report.contactName}</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 border border-border-gray rounded-xl text-sm text-navy placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy mb-1.5">{t.report.contactPhone}</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder={t.report.contactPhonePlaceholder}
                      className="w-full px-4 py-3 border border-border-gray rounded-xl text-sm text-navy placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Terms & Submit */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-8">
            <div className="flex items-start gap-2 mb-4 p-3 bg-off-white rounded-lg">
              <Shield className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted leading-relaxed">
                {t.report.terms}
              </p>
            </div>
            <button
              type="submit"
              disabled={!isValid || submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                  {t.report.submitting}
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  {t.report.submit}
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
