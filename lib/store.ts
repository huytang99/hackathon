"use client";

import { create } from "zustand";
import seedJson from "@/data/seed.json";
import type { ID, Item, NewItem, SeedData, Status, StoreState } from "@/lib/types";

/**
 * The single source of data for the whole app.
 *
 * Deliberately client-side. Server-held in-memory state resets on serverless
 * cold starts, which in practice means it resets in the middle of the demo.
 * A client store cannot do that.
 *
 * Components never import seed.json directly — they call useStore().
 */

const seed = seedJson as unknown as SeedData;

function nextId(prefix: string): ID {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useStore = create<StoreState>((set, get) => ({
  appName: seed.appName,
  appTagline: seed.appTagline,
  items: seed.items,
  metrics: seed.metrics,
  series: seed.series,

  addItem: (input: NewItem) => {
    const item: Item = { ...input, id: nextId("req"), createdAt: today() };
    set({ items: [item, ...get().items] });
    return item;
  },

  updateItem: (id: ID, patch: Partial<Item>) =>
    set({
      items: get().items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }),

  removeItem: (id: ID) => set({ items: get().items.filter((item) => item.id !== id) }),

  setStatus: (id: ID, status: Status) => get().updateItem(id, { status }),

  reset: () =>
    set({
      appName: seed.appName,
      appTagline: seed.appTagline,
      items: seed.items,
      metrics: seed.metrics,
      series: seed.series,
    }),
}));

/* Convenience selectors. Add more here rather than filtering inside components. */

export function useItem(id: ID): Item | undefined {
  return useStore((s) => s.items.find((item) => item.id === id));
}

export function useItemsByStatus(status: Status): Item[] {
  return useStore((s) => s.items.filter((item) => item.status === status));
}

/**
 * Need data to survive a refresh? Wrap the creator in zustand's persist
 * middleware — that is the whole change:
 *
 *   import { persist } from "zustand/middleware";
 *   export const useStore = create<StoreState>()(
 *     persist((set, get) => ({ ... }), { name: "app-store" })
 *   );
 *
 * Default is off on purpose: during a demo you want a refresh to return the
 * app to a known-good state, not to whatever the last person clicked.
 */
