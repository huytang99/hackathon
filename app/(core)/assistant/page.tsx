"use client";

import { useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ask } from "@/lib/ai";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";

/**
 * ARCHETYPE: CHAT
 * Use for any conversational or AI-assisted topic.
 * Covers: message thread, streaming-free request/response, suggested prompts,
 * loading skeleton, and graceful degradation when the model is unavailable.
 *
 * Note it never renders an error. If the model call fails, lib/ai-fallback.ts
 * supplies a plausible answer and we mark it quietly. During a demo that is
 * always the right trade.
 */

const SUGGESTIONS = [
  { label: "Summarise the backlog", task: "summarise" },
  { label: "What should we fix first?", task: "triage" },
  { label: "Draft a reply to the requester", task: "draft" },
];

export default function AssistantPage() {
  const items = useStore((s) => s.items);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const counter = useRef(0);

  async function send(text: string, task?: string) {
    const trimmed = text.trim();
    if (trimmed.length === 0 || pending) return;

    counter.current += 1;
    const question: Message = {
      id: `m${counter.current}`,
      role: "user",
      content: trimmed,
      at: new Date().toISOString(),
    };

    setMessages((current) => [...current, question]);
    setDraft("");
    setPending(true);

    const context = items
      .slice(0, 20)
      .map((item) => `- [${item.status}] ${item.title} (owner ${item.owner})`)
      .join("\n");

    const { text: answer, source } = await ask(`${trimmed}\n\nCurrent requests:\n${context}`, {
      task,
    });

    counter.current += 1;
    setMessages((current) => [
      ...current,
      {
        id: `m${counter.current}`,
        role: "assistant",
        content: answer,
        at: source,
      },
    ]);
    setPending(false);
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col">
      <PageHeader title="Assistant" description="Ask about the queue in plain language." />

      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10 text-center">
          <div className="bg-accent text-accent-foreground flex size-11 items-center justify-center rounded-full">
            <Sparkles className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Nothing asked yet</p>
            <p className="text-muted-foreground text-sm">
              It can see all {items.length} open requests.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <Button
                key={suggestion.task}
                variant="outline"
                size="sm"
                onClick={() => send(suggestion.label, suggestion.task)}
              >
                {suggestion.label}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-5 pb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] space-y-2 px-4 py-2.5 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-lg"
                    : "border-border bg-card rounded-lg border",
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.role === "assistant" && message.at === "fallback" ? (
                  <Badge variant="outline" className="text-[10px]">
                    offline answer
                  </Badge>
                ) : null}
              </div>
            </div>
          ))}

          {pending ? (
            <div className="border-border bg-card max-w-[85%] space-y-2 rounded-lg border px-4 py-3">
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-44" />
              <Skeleton className="h-3 w-48" />
            </div>
          ) : null}
        </div>
      )}

      <div className="border-border bg-card sticky bottom-6 flex items-end gap-2 border p-2">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send(draft);
            }
          }}
          placeholder="Ask anything about the queue"
          rows={1}
          className="min-h-10 resize-none border-0 shadow-none focus-visible:ring-0"
        />
        <Button
          size="icon"
          aria-label="Send"
          disabled={pending || draft.trim().length === 0}
          onClick={() => void send(draft)}
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>
    </div>
  );
}
