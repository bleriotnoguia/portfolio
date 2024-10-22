"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About", 0.5);
  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        After graduating with a degree in{" "}
        <span className="font-medium">Computer science</span>, I decided to
        pursue my passion for programming. I took online courses and learned{" "}
        <span className="font-medium">full-stack web development</span>.{" "}
        <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem. My core stack
        is{" "}
        <span className="font-medium">
          React (Next.js), Node.js (AdonisJS), and MySQL
        </span>
        . I am also familiar with Laravel and No-Code ecosystem. I am always
        looking to learn new technologies.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy reading
        books and watching videos about{" "}
        <span className="font-medium">spirituality</span>. I also enjoy sharing
        what I learn with others.
      </p>
    </motion.section>
  );
}
