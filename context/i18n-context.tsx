"use client";

import React, { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";

type I18nContextType = {
  locale: Locale;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextType | null>(null);

export default function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, t: dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (context === null) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
