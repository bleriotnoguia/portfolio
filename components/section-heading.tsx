import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
};

export default function SectionHeading({
  children,
  intro,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="h-section text-[clamp(2.25rem,1.4rem+3vw,3.75rem)]">
          {children}
        </h2>
        {intro && (
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
      {aside}
    </div>
  );
}
