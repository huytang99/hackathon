"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Inbox, Search } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/lib/store";
import type { Item, Status } from "@/lib/types";
import { STATUSES } from "@/lib/types";

/**
 * ARCHETYPE: LIST + DETAIL
 * Use for any topic about browsing, triaging or managing records.
 * Covers: search, filter, table, detail drawer, inline status change, empty state.
 */

const STATUS_VARIANT: Record<Status, "default" | "secondary" | "destructive" | "outline"> = {
  new: "outline",
  active: "default",
  blocked: "destructive",
  done: "secondary",
};

export default function RequestsPage() {
  const items = useStore((s) => s.items);
  const setStatus = useStore((s) => s.setStatus);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<Item | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesQuery =
        needle.length === 0 ||
        item.title.toLowerCase().includes(needle) ||
        item.owner.toLowerCase().includes(needle) ||
        item.tags.some((tag) => tag.includes(needle));
      return matchesStatus && matchesQuery;
    });
  }, [items, query, statusFilter]);

  function advance(item: Item, status: Status) {
    setStatus(item.id, status);
    setSelected({ ...item, status });
    toast.success(`${item.id} moved to ${status}`);
  }

  return (
    <>
      <PageHeader
        title="Request queue"
        description={`${items.length} requests across six depots and three back-office teams.`}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, owner or tag"
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as Status | "all")}
        >
          <SelectTrigger className="sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {visible.length === 0 ? (
        <div className="border-border flex flex-col items-center gap-3 border border-dashed px-6 py-16 text-center">
          <Inbox className="text-muted-foreground size-6" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Nothing matches that</p>
            <p className="text-muted-foreground text-sm">
              Try a different search, or clear the status filter.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery("");
              setStatusFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="border-border border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[42%]">Request</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Raised</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground font-mono text-xs">{item.id}</p>
                  </TableCell>
                  <TableCell className="text-sm">{item.owner}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {item.value.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right text-sm">
                    {format(new Date(item.createdAt), "d MMM")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle className="text-2xl leading-snug">{selected.title}</SheetTitle>
                <SheetDescription className="font-mono text-xs">{selected.id}</SheetDescription>
              </SheetHeader>

              <div className="space-y-6 px-4">
                <p className="text-sm leading-relaxed">{selected.description}</p>

                <Separator />

                <dl className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="space-y-0.5">
                    <dt className="text-muted-foreground text-xs">Owner</dt>
                    <dd>{selected.owner}</dd>
                  </div>
                  <div className="space-y-0.5">
                    <dt className="text-muted-foreground text-xs">Raised</dt>
                    <dd>{format(new Date(selected.createdAt), "d MMMM yyyy")}</dd>
                  </div>
                  <div className="space-y-0.5">
                    <dt className="text-muted-foreground text-xs">Value</dt>
                    <dd className="tabular-nums">{selected.value.toLocaleString()}</dd>
                  </div>
                  <div className="space-y-0.5">
                    <dt className="text-muted-foreground text-xs">Tags</dt>
                    <dd className="flex flex-wrap gap-1">
                      {selected.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                </dl>

                <Separator />

                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs">Move to</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.filter((status) => status !== selected.status).map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant="outline"
                        onClick={() => advance(selected, status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
