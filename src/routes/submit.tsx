import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORMATS, GENRES, TOOLS } from "@/data/films";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a Film — Rotten Potatoes" },
      {
        name: "description",
        content:
          "Send your AI-generated short, trailer or experiment to our fictional curators. Demo submission form only, no uploads are processed.",
      },
      { property: "og:title", content: "Submit a Film — Rotten Potatoes" },
      {
        property: "og:description",
        content:
          "Send your AI-generated short, trailer or experiment to our fictional curators. Demo submission form only, no uploads are processed.",
      },
      { property: "og:url", content: `${SITE_URL}/submit` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Submit a Film — Rotten Potatoes" },
      {
        name: "twitter:description",
        content:
          "Send your AI-generated short, trailer or experiment to our fictional curators. Demo submission form only, no uploads are processed.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/submit` }],
  }),
  component: Submit,
});

function Submit() {
  const [sent, setSent] = useState(false);
  const [tools, setTools] = useState<string[]>([]);
  const [format, setFormat] = useState("");
  const [genre, setGenre] = useState("");
  const [disclosed, setDisclosed] = useState(false);

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="mx-auto size-14 text-gold" aria-hidden="true" />
        <h1 className="mt-6 text-4xl sm:text-5xl">In the queue</h1>
        <p className="mt-4 text-muted-foreground" aria-live="polite">
          Your fictional submission was received. A curator will pretend to watch it within ten
          working days. Nothing was uploaded or stored: this form is UI only.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="crispy">
            <Link to="/discover">Browse the vault</Link>
          </Button>
          <Button variant="rind" onClick={() => setSent(false)}>
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="eyebrow">For creators</p>
      <h1 className="mt-3 text-4xl sm:text-6xl">Submit a film</h1>
      <p className="mt-4 text-muted-foreground">
        Shorts, fake trailers, music videos and experiments under 50 minutes. Free to submit, no
        exclusivity, and we publish the score even when it stings.
      </p>

      <form
        className="mt-10 space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (!disclosed) {
            toast.error("Disclosure required", {
              description: "Confirm the disclosure statement before submitting.",
            });
            return;
          }
          setSent(true);
          toast.success("Submission received (demo)", {
            description: "No file was uploaded and no data was stored.",
          });
        }}
      >
        <fieldset className="space-y-5 rounded-lg border border-border/70 bg-card p-6">
          <legend className="px-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            The work
          </legend>
          <Field id="title" label="Title" required>
            <Input id="title" name="title" required placeholder="Root Cellar Lullaby" />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="format-select">Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format-select" className="mt-2">
                  <SelectValue placeholder="Choose a format" />
                </SelectTrigger>
                <SelectContent>
                  {FORMATS.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="genre-select">Primary genre</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger id="genre-select" className="mt-2">
                  <SelectValue placeholder="Choose a genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="runtime" label="Runtime (minutes)" required>
              <Input
                id="runtime"
                name="runtime"
                type="number"
                min={1}
                max={50}
                required
                placeholder="12"
              />
            </Field>
            <Field id="release" label="Release date" required>
              <Input id="release" name="release" type="date" required />
            </Field>
          </div>
          <Field id="logline" label="Logline" hint="One sentence. Make it count.">
            <Textarea id="logline" name="logline" rows={2} required maxLength={220} />
          </Field>
          <Field id="link" label="Screener link" hint="Any public or unlisted video URL.">
            <Input id="link" name="link" type="url" required placeholder="https://" />
          </Field>
        </fieldset>

        <fieldset className="space-y-5 rounded-lg border border-border/70 bg-card p-6">
          <legend className="px-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            The toolchain
          </legend>
          <p className="text-sm text-muted-foreground">
            Select every generative tool used. Fictional tool names for this demo.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {TOOLS.map((t) => (
              <div key={t} className="flex min-h-11 items-center gap-2 sm:min-h-0">
                <Checkbox
                  id={`t-${t}`}
                  checked={tools.includes(t)}
                  onCheckedChange={() =>
                    setTools((prev) =>
                      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
                    )
                  }
                />
                <Label htmlFor={`t-${t}`} className="cursor-pointer text-sm font-normal">
                  {t}
                </Label>
              </div>
            ))}
          </div>
          <Field id="pipeline" label="Pipeline notes" hint="Prompts, passes, manual work, grading.">
            <Textarea id="pipeline" name="pipeline" rows={4} />
          </Field>
        </fieldset>

        <fieldset className="space-y-5 rounded-lg border border-border/70 bg-card p-6">
          <legend className="px-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            You
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="creator" label="Creator or collective" required>
              <Input id="creator" name="creator" required />
            </Field>
            <Field id="email" label="Email" required>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" />
            </Field>
          </div>
          <div className="rounded-md border border-dashed border-border p-6 text-center">
            <Upload className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
            <p className="mt-2 text-sm text-muted-foreground">
              Poster upload is disabled in this demo. We generate placeholder art for you.
            </p>
          </div>
          <div className="flex min-h-11 items-start gap-3 sm:min-h-0">
            <Checkbox
              id="disclose"
              checked={disclosed}
              onCheckedChange={(v) => setDisclosed(v === true)}
              aria-describedby="disclose-desc"
            />
            <Label htmlFor="disclose" className="cursor-pointer text-sm font-normal leading-snug">
              I confirm the disclosure above is complete and that no likeness or voice of a real
              identifiable person is used without written permission.
            </Label>
          </div>
          <p id="disclose-desc" className="text-xs text-muted-foreground">
            Read the full{" "}
            <Link to="/about" className="text-gold underline">
              disclosure policy
            </Link>
            .
          </p>
        </fieldset>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" variant="crispy" size="lg">
            Send to the curators
          </Button>
          <p className="text-xs text-muted-foreground">
            Demo form: no backend, no uploads, no data stored.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </Label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
