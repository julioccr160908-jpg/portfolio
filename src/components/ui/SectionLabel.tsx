// ============================================================================
// Section Label Badge
// Reusable badge component for section headers
// ============================================================================

interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
      <span className="text-sm uppercase tracking-wider text-[#A1A1AA]">
        {label}
      </span>
    </div>
  );
}
