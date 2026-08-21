"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Camera,
  Send,
  ArrowRight,
  Brain,
  MapPin,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Globe,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";

interface Message {
  id: number;
  role: "ai" | "citizen";
  text: string;
  timestamp: string;
}

const aiResponses: Record<string, { text: string; analysis: Record<string, string> }> = {
  water: {
    text: "I understand you're reporting a water supply issue. This is a critical infrastructure concern. Let me analyze this for you. Can you tell me which district this is in?",
    analysis: { language: "Detected", intent: "Water Supply Issue", category: "Water Infrastructure", urgency: "High" },
  },
  road: {
    text: "I see you're reporting a road infrastructure problem. Road conditions directly affect public safety. Let me document this. Which area is this in?",
    analysis: { language: "Detected", intent: "Road Infrastructure Issue", category: "Road Infrastructure", urgency: "Medium" },
  },
  electricity: {
    text: "You're reporting an electricity disruption. Power outages affect homes, businesses, and essential services. I'll document this issue now.",
    analysis: { language: "Detected", intent: "Electricity Disruption", category: "Power Infrastructure", urgency: "High" },
  },
  default: {
    text: "Thank you for sharing this infrastructure concern. I'll analyze your report and identify the key details. Every citizen signal helps improve public services.",
    analysis: { language: "Detected", intent: "Infrastructure Report", category: "General", urgency: "Medium" },
  },
};

const analysisSteps = [
  { key: "signal", label: "Signal detected", delay: 500 },
  { key: "language", label: "Language identified", delay: 1000 },
  { key: "intent", label: "Intent classified", delay: 1500 },
  { key: "location", label: "Location mapped", delay: 2000 },
  { key: "priority", label: "Priority assigned", delay: 2500 },
];

export default function AIConversationPage() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<string[]>([]);
  const [understanding, setUnderstanding] = useState<Record<string, string>>({});
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [step, setStep] = useState<"chat" | "analyzing" | "complete">("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isListening,
    interimTranscript,
    isSupported: speechSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    lang: language,
    onResult: (text, isFinal) => {
      if (isFinal) {
        setInputText((prev) => (prev ? prev + " " + text : text));
      }
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  useEffect(() => {
    // Welcome message
    const timer = setTimeout(() => {
      setMessages([
        {
          id: 1,
          role: "ai",
          text: t.ai.welcomeMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 500);
    return () => clearTimeout(timer);
  }, [t.ai.welcomeMessage]);

  const getAiResponse = (userMessage: string): { text: string; analysis: Record<string, string> } => {
    const lower = userMessage.toLowerCase();
    if (lower.includes("water") || lower.includes("నీరు") || lower.includes("पानी")) return aiResponses.water;
    if (lower.includes("road") || lower.includes("pothole") || lower.includes("రోడ్") || lower.includes("सड़क")) return aiResponses.road;
    if (lower.includes("electric") || lower.includes("power") || lower.includes("light") || lower.includes("విద్యు") || lower.includes("बिजल")) return aiResponses.electricity;
    return aiResponses.default;
  };

  const runAnalysis = async (userMessage: string) => {
    setStep("analyzing");
    setAnalysisProgress([]);
    setAnalysisComplete(false);

    const response = getAiResponse(userMessage);

    // Simulate step-by-step analysis
    for (const analysisStep of analysisSteps) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setAnalysisProgress((prev) => [...prev, analysisStep.key]);
    }

    // Set understanding values progressively
    const analysisKeys = Object.entries(response.analysis);
    for (let i = 0; i < analysisKeys.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setUnderstanding((prev) => ({
        ...prev,
        [analysisKeys[i][0]]: analysisKeys[i][1],
      }));
    }

    // Add AI response message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "ai",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    setAnalysisComplete(true);
    setStep("complete");
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "citizen",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsAiTyping(true);

    // AI thinks for a moment
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsAiTyping(false);

    // Run the analysis
    await runAnalysis(userMsg.text);
  };

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/report" className="hover:text-navy transition-colors">Report</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">AI Analysis</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-border-gray overflow-hidden">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-border-gray bg-deep-slate">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h1 className="text-sm font-heading font-semibold text-white">
                      {t.ai.bcinAssistant}
                    </h1>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400 ai-pulse" />
                      <span className="text-xs text-gray-400">
                        {isListening ? t.ai.listening : t.ai.readyToAssist}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4 max-h-[450px] overflow-y-auto">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 ${msg.role === "citizen" ? "flex-row-reverse" : ""}`}
                    >
                      {msg.role === "ai" && (
                        <div className="w-8 h-8 rounded-lg bg-gov-blue flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-gold" />
                        </div>
                      )}
                      <div className={`rounded-xl px-4 py-3 max-w-md ${
                        msg.role === "citizen" ? "bg-gov-blue text-white ml-auto" : "bg-off-white text-navy"
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <span className={`text-[10px] mt-1 block ${
                          msg.role === "citizen" ? "text-gray-300" : "text-muted"
                        }`}>
                          {msg.timestamp}
                        </span>
                      </div>
                      {msg.role === "citizen" && (
                        <div className="w-8 h-8 rounded-lg bg-civic-teal flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white font-semibold">You</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* AI Typing indicator */}
                {isAiTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gov-blue flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-gold" />
                    </div>
                    <div className="bg-off-white rounded-xl px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-gold animate-pulse" />
                        <span className="text-xs text-muted">Analyzing your report...</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-6 py-4 border-t border-border-gray bg-off-white">
                {analysisComplete ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-civic-teal">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.ai.analysisComplete}</span>
                    </div>
                    <Link
                      href="/issue-intelligence"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors text-sm"
                    >
                      {t.ai.viewIntelligence}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => (isListening ? stopListening() : startListening())}
                      className={`p-3 rounded-xl transition-colors flex-shrink-0 ${
                        isListening ? "bg-red-500 text-white" : "bg-gov-blue text-white hover:bg-gov-blue/90"
                      }`}
                    >
                      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <button
                      className="p-3 rounded-xl bg-white border border-border-gray text-muted hover:text-navy transition-colors flex-shrink-0"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={isListening ? "Listening... speak now" : t.ai.typeResponse}
                        className="w-full px-4 py-3 bg-white border border-border-gray rounded-lg text-sm text-navy placeholder:text-muted focus:outline-none focus:border-gov-blue"
                        disabled={step === "analyzing"}
                      />
                      {isListening && interimTranscript && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gov-blue italic pointer-events-none">
                          {interimTranscript}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleSend}
                      disabled={!inputText.trim() || step === "analyzing"}
                      className="p-3 bg-gov-blue text-white rounded-lg hover:bg-gov-blue/90 transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Analysis Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-border-gray overflow-hidden sticky top-24">
              <div className="px-5 py-4 border-b border-border-gray bg-deep-slate">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-gold" />
                  <h2 className="text-sm font-heading font-semibold text-white">
                    {t.ai.aiUnderstanding}
                  </h2>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Understanding fields */}
                {["language", "intent", "category", "location", "urgency", "confidence"].map((key) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-border-gray/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted capitalize">{key}</span>
                    </div>
                    {understanding[key] ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-sm font-medium text-navy"
                      >
                        {understanding[key]}
                      </motion.span>
                    ) : (
                      <span className="text-sm text-muted/30">—</span>
                    )}
                  </div>
                ))}

                {/* Analysis progress */}
                <div className="mt-4 p-3 bg-off-white rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    {step === "analyzing" ? (
                      <div className="w-2 h-2 rounded-full bg-gold ai-pulse" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-civic-teal" />
                    )}
                    <span className="text-xs font-medium text-navy">
                      {step === "analyzing" ? t.ai.processing : step === "complete" ? "Analysis Complete" : "Ready"}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {analysisSteps.map((s, i) => (
                      <div key={s.key} className="flex items-center gap-2">
                        {analysisProgress.includes(s.key) ? (
                          <CheckCircle2 className="w-3 h-3 text-civic-teal flex-shrink-0" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-muted/30 flex-shrink-0" />
                        )}
                        <span className={`text-[11px] ${
                          analysisProgress.includes(s.key) ? "text-navy" : "text-muted"
                        }`}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence bar */}
                {understanding.confidence && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted">{t.ai.analysisConfidence}</span>
                      <span className="text-xs font-mono font-bold text-civic-teal">94%</span>
                    </div>
                    <div className="w-full h-2 bg-off-white rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "94%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-civic-teal rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Suggested prompts */}
                {!understanding.intent && messages.length <= 1 && (
                  <div className="mt-4">
                    <p className="text-[11px] text-muted mb-2">Try saying:</p>
                    <div className="space-y-2">
                      {[
                        "There is no water supply in our village for 5 days",
                        "The main road has big potholes causing accidents",
                        "Frequent power cuts affecting our hospital",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => setInputText(prompt)}
                          className="w-full text-left p-2.5 bg-off-white rounded-lg text-xs text-muted hover:text-navy hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all"
                        >
                          &ldquo;{prompt}&rdquo;
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
