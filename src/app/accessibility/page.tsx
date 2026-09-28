import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accessibility", description: "AUREL accessibility commitment." };

export default function AccessibilityPage() {
  return (
    <div className="container-aurel py-16 md:py-24 max-w-3xl">
      <p className="text-eyebrow text-muted-foreground mb-5">Legal</p>
      <h1 className="font-serif text-editorial mb-8">Accessibility.</h1>
      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <p>AUREL is designed to WCAG 2.2 AA where practical. This demo implements:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Semantic HTML with proper heading structure</li>
          <li>Keyboard navigation for all interactive elements</li>
          <li>Visible focus states on all controls</li>
          <li>ARIA labels and roles for icons and dialogs</li>
          <li>Dialog focus trapping and Escape-to-close</li>
          <li>Reduced-motion support via prefers-reduced-motion</li>
          <li>Descriptive alt text on all imagery</li>
          <li>Adequate contrast across light and dark surfaces</li>
        </ul>
        <p>If you encounter an accessibility barrier on this site, please contact us via /contact. This is a demonstration project; remediation response times reflect the demo's nature.</p>
        <p className="text-xs font-mono uppercase tracking-wider pt-6 border-t border-border">
          AUREL fictional concept brand · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
