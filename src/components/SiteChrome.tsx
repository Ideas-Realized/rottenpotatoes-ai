import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SpudGlyph } from "@/components/SpudScore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "Methodology" },
  { to: "/submit", label: "Submit" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="Rotten Potatoes home">
          <SpudGlyph className="size-7 text-gold" />
          <span className="font-display text-xl leading-none tracking-wide">
            Rotten<span className="text-gold">Potatoes</span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-gold" }}
              className="rounded-sm px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="crispy" size="sm" className="ml-2">
            <Link to="/discover">Browse Films</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 font-mono text-xs uppercase tracking-widest md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="size-4" aria-hidden="true" /> Menu
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border/70 px-4 pb-4 pt-2 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-gold" }}
              className="py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section
      aria-labelledby="newsletter-heading"
      className={cn(
        "relative overflow-hidden rounded-lg border border-gold/30 bg-surface p-6 sm:p-10",
        className,
      )}
    >
      <div className="halftone absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative max-w-2xl">
        <p className="eyebrow">The Weekly Peel</p>
        <h2 id="newsletter-heading" className="mt-3 text-3xl sm:text-4xl">
          Five generated films, one honest verdict, every Friday.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          No hype cycles. No press-release reprints. Just what our fictional curators actually
          finished watching.
        </p>
        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
            toast.success("You're on the list (demo)", {
              description: "This form is UI only. Nothing was sent anywhere.",
            });
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 sm:max-w-xs"
          />
          <Button type="submit" variant="crispy" size="lg">
            Get the Peel
          </Button>
        </form>
        <p aria-live="polite" className="mt-3 min-h-5 font-mono text-xs text-gold">
          {done ? "Subscribed — demo only, no email was stored." : ""}
        </p>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <SpudGlyph className="size-6 text-gold" />
            <span className="font-display text-lg">Rotten Potatoes</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A fictional discovery and review destination for AI-generated video. Every film,
            creator, score, review and tool named on this site is invented for demonstration
            purposes.
          </p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-gold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/discover" className="hover:text-foreground">
                Discover
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-foreground">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                Methodology
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-gold">Creators</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/submit" className="hover:text-foreground">
                Submit a Film
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                Disclosure Policy
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                Code of Conduct
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        Fictional demo · Not affiliated with any real review publication
      </div>
    </footer>
  );
}
