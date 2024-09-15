import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <div className="flex w-24 flex-col items-center justify-center rounded border border-border p-1 text-foreground">
    <span>{title}</span>
    {children}
  </div>
);

export { Section };
