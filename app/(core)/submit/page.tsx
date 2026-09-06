"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import type { Status } from "@/lib/types";
import { STATUSES } from "@/lib/types";

/**
 * ARCHETYPE: FORM WIZARD
 * Use for any topic about intake, applications, onboarding or configuration.
 * Covers: multi-step state, per-step zod validation, inline errors, a review
 * step, and a submit that writes to the store and navigates away.
 */

const STEPS = ["The request", "Ownership", "Review"] as const;

const StepOne = z.object({
  title: z.string().min(8, "Give it at least 8 characters so it is searchable."),
  description: z.string().min(20, "Twenty characters minimum — what actually breaks?"),
});

const StepTwo = z.object({
  owner: z.string().min(2, "Who is picking this up?"),
  value: z.coerce.number().min(1, "Estimate the annual cost, even roughly."),
  tags: z.string().min(2, "At least one tag."),
});

export default function SubmitPage() {
  const router = useRouter();
  const addItem = useStore((s) => s.addItem);

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    owner: "",
    value: "",
    tags: "",
    status: "new" as Status,
  });

  function set(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function next() {
    const schema = step === 0 ? StepOne : StepTwo;
    const result = schema.safeParse(form);

    if (!result.success) {
      const found: Record<string, string> = {};
      for (const issue of result.error.issues) {
        found[String(issue.path[0])] = issue.message;
      }
      setErrors(found);
      return;
    }

    setErrors({});
    setStep((current) => current + 1);
  }

  function submit() {
    const created = addItem({
      title: form.title,
      description: form.description,
      owner: form.owner,
      value: Number(form.value),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
      status: form.status,
    });

    toast.success(`${created.id} raised`, { description: "It is at the top of the queue." });
    router.push("/requests");
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title="Raise a request" description="Three steps, about a minute." />

      <div className="mb-8 space-y-3">
        <Progress value={((step + 1) / STEPS.length) * 100} className="h-1" />
        <div className="flex justify-between">
          {STEPS.map((label, index) => (
            <span
              key={label}
              className={
                index <= step
                  ? "text-foreground flex items-center gap-1.5 text-xs"
                  : "text-muted-foreground flex items-center gap-1.5 text-xs"
              }
            >
              {index < step ? <Check className="size-3" /> : null}
              {label}
            </span>
          ))}
        </div>
      </div>

      {step === 0 ? (
        <div className="space-y-5">
          <Field label="Title" error={errors.title}>
            <Input
              value={form.title}
              onChange={(event) => set("title", event.target.value)}
              placeholder="Night shift cannot reset their own passwords"
            />
          </Field>
          <Field label="What is happening?" error={errors.description}>
            <Textarea
              value={form.description}
              onChange={(event) => set("description", event.target.value)}
              rows={5}
              placeholder="Describe the impact, how often it happens, and any workaround in use."
            />
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-5">
          <Field label="Owner" error={errors.owner}>
            <Input
              value={form.owner}
              onChange={(event) => set("owner", event.target.value)}
              placeholder="Priya Raman"
            />
          </Field>
          <Field label="Estimated annual cost" error={errors.value}>
            <Input
              value={form.value}
              onChange={(event) => set("value", event.target.value)}
              inputMode="numeric"
              placeholder="12400"
            />
          </Field>
          <Field label="Tags" error={errors.tags}>
            <Input
              value={form.tags}
              onChange={(event) => set("tags", event.target.value)}
              placeholder="access, quick-win"
            />
          </Field>
          <Field label="Starting status">
            <Select value={form.status} onValueChange={(value) => set("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="border-border space-y-5 border p-5">
          <div className="space-y-1">
            <h2 className="text-xl leading-snug">{form.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{form.description}</p>
          </div>
          <Separator />
          <dl className="grid grid-cols-2 gap-y-4 text-sm">
            <Summary label="Owner" value={form.owner} />
            <Summary label="Annual cost" value={Number(form.value).toLocaleString()} />
            <Summary label="Status" value={form.status} />
            <div className="space-y-0.5">
              <dt className="text-muted-foreground text-xs">Tags</dt>
              <dd className="flex flex-wrap gap-1">
                {form.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}

      <div className="mt-8 flex justify-between">
        <Button
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep((current) => current - 1)}
        >
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={next}>Continue</Button>
        ) : (
          <Button onClick={submit}>Raise request</Button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-destructive text-xs">{error}</p> : null}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
