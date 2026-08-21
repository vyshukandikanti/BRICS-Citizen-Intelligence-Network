"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(email, password);
    setLoading(false);

    if (success) {
      router.push("/dashboard");
    } else {
      setError(t.login.invalidCredentials);
    }
  };

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {t.login.backToHome}
          </Link>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-deep-slate px-8 py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-xl font-heading font-bold text-white mb-1">
              {t.login.title}
            </h1>
            <p className="text-sm text-gray-400">{t.login.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-navy mb-1.5"
              >
                {t.login.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.login.emailPlaceholder}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-border-gray rounded-lg text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-navy mb-1.5"
              >
                {t.login.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.passwordPlaceholder}
                  required
                  className="w-full pl-11 pr-12 py-3 border border-border-gray rounded-lg text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                  {t.login.signingIn}
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  {t.login.signIn}
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="px-8 pb-8">
            <div className="border border-border-gray rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-gov-blue" />
                <span className="text-sm font-semibold text-navy">
                  {t.login.demoCredentials}
                </span>
              </div>
              <p className="text-xs text-muted mb-3">{t.login.demoHint}</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    fillDemo(
                      t.login.adminEmail,
                      t.login.adminPassword
                    )
                  }
                  className="w-full text-left px-3 py-2 bg-off-white rounded-md hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all text-xs"
                >
                  <span className="font-mono text-gov-blue">
                    {t.login.adminEmail}
                  </span>
                  <span className="text-muted ml-2">
                    / {t.login.adminPassword}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    fillDemo(
                      t.login.officerEmail,
                      t.login.officerPassword
                    )
                  }
                  className="w-full text-left px-3 py-2 bg-off-white rounded-md hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all text-xs"
                >
                  <span className="font-mono text-gov-blue">
                    {t.login.officerEmail}
                  </span>
                  <span className="text-muted ml-2">
                    / {t.login.officerPassword}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3" />
            <span>{t.login.secureNotice}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
