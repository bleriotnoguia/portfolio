"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import Link from "next/link";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projectsData.slice(0, 3).map((project, index) => (
          <React.Fragment key={index}>
            <Project applyEvenTransformations={true} {...project} />
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          scroll={false}
          href="/projects#top"
          className="bg-gray-800 text-white w-[12rem] mt-5 px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
        >
          View more (+12)
        </Link>
      </div>
    </section>
  );
}
