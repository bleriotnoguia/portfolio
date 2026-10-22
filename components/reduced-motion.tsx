"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

// Turns off transform and layout animations for people who ask for less motion.
export default function ReducedMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
