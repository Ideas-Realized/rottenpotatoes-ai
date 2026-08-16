import { cn } from "@/lib/utils";
import { scoreTier } from "@/data/films";

const toneClass = {
  gold: "text-gold border-gold/50 bg-gold/10",
  ember: "text-ember border-ember/50 bg-ember/10",
  rot: "text-rot border-rot/60 bg-rot/15",
};

export function SpudScore({
  score,
  size = "md",
  label = "Spud Score",
  className,
}: {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}) {
  const tier = scoreTier(score);
  const sizes = {
    sm: "text-sm px-2 py-0.5 gap-1.5",
    md: "text-base px-2.5 py-1 gap-2",
    lg: "text-3xl px-4 py-2 gap-3",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border font-display tabular-nums",
        toneClass[tier.tone],
        sizes[size],
        className,
      )}
      title={`${label}: ${score} of 100 — ${tier.label} (fictional)`}
    >
      <SpudGlyph className={size === "lg" ? "size-7" : "size-4"} />
      {score}
      <span className="sr-only">
        {" "}
        out of 100 {label}, rated {tier.label}
      </span>
    </span>
  );
}

export function SpudGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.6c3.9 0 8 3.1 8 8.4 0 6.1-4.2 10.4-8 10.4S4 17.1 4 11c0-5.3 4.1-8.4 8-8.4Z" />
      <circle cx="9.4" cy="10" r="1.05" fill="oklch(0.16 0.008 60)" />
      <circle cx="14.6" cy="9.2" r="1.05" fill="oklch(0.16 0.008 60)" />
      <circle cx="12.2" cy="14.6" r="1.05" fill="oklch(0.16 0.008 60)" />
    </svg>
  );
}

export function ScoreMeter({
  label,
  value,
  hint,
  headingLevel = "h4",
}: {
  label: string;
  value: number;
  hint?: string;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <Heading className="font-sans text-sm font-medium normal-case tracking-normal text-foreground">
          {label}
        </Heading>
        <span className="font-mono text-sm tabular-nums text-gold">{value}</span>
      </div>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} score`}
      >
        <div
          className="h-full rounded-full bg-[image:var(--gradient-gold)]"
          style={{ width: `${value}%` }}
        />
      </div>
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
