"use client";

import { useTheme } from "@/context/theme-context";
import { useI18n } from "@/context/i18n-context";
import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? t.nav.switchToDark : t.nav.switchToLight}
      className="grid h-10 w-10 place-items-center rounded-full text-ink/80 transition-colors hover:bg-sunken hover:text-ink"
    >
      {theme === "light" ? (
        <FiMoon className="h-[1.1rem] w-[1.1rem]" />
      ) : (
        <FiSun className="h-[1.1rem] w-[1.1rem]" />
      )}
    </button>
  );
}
