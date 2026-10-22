"use client";

import { useEffect } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import type { SectionName } from "@/lib/types";

// Highlights a navigation item on pages that are not sections of the home page.
export default function ActiveSection({ name }: { name: SectionName }) {
  const { setActiveSection } = useActiveSectionContext();

  useEffect(() => {
    setActiveSection(name);
  }, [name, setActiveSection]);

  return null;
}
