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

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a Film — Rotten Potatoes" },
      {
        name: "description",
        content:
          "Send your AI-generated short, trailer, music video or experiment to our fictional curators. Demo submission form, no uploads processed.",
      },
      { property: "og:title", content: "Submit a Film — Rotten Potatoes" },
      {
        property: "og:description",
        content: "A creator submission form for AI-generated video. Demo UI only.",
      },
    ],
  }),
  component: Submit;
});

function Submit() {
  return null;
}
