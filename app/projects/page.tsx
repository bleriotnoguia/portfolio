"use client";

import Project from "@/components/project";
import SectionHeading from "@/components/section-heading";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import React from "react";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0);
  return (
    <main className="flex flex-col items-center px-4">
      <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
        <SectionHeading>My projects</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectsData.map((project, index) => (
            <React.Fragment key={index}>
              <Project applyEvenTransformations={false} {...project} />
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}
