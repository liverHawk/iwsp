import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  accent?: boolean;
}

export default function SectionLabel({
  children,
  accent = false,
}: SectionLabelProps) {
  return (
    <p className={`section-label ${accent ? "accent" : ""}`}>{children}</p>
  );
}
