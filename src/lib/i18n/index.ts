import { en } from "./en";
import { hi } from "./hi";
import { te } from "./te";

export type TranslationKey = typeof en;

export const languages = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "hi", label: "हिन्दी", dir: "ltr" as const },
  { code: "te", label: "తెలుగు", dir: "ltr" as const },
] as const;

export const translations: Record<string, TranslationKey> = {
  en,
  hi,
  te,
};
