/**
 * SHARED TYPES ONLY.
 *
 * This file has one narrow job: stop two developers' Copilot sessions
 * inventing two different shapes for the same thing. It is NOT a model of the
 * whole domain, and it is NOT meant to be finished early.
 *
 * What belongs here: types that MORE THAN ONE feature touches. Usually the core
 * entity, its status union, and the store surface. Aim for under 25 lines.
 *
 * What does NOT belong here: anything a single feature owns. Those live in
 * `app/(feature)/<feature>/types.ts`. Domain models emerge while you code —
 * that is normal, and forcing them in here early is how you get it wrong.
 *
 * Rules:
 *   - Only the lead writes this file. Everyone else reads it and asks.
 *   - Amendments during the build are EXPECTED, several times. Someone says
 *     "I need a dueDate on Item", the lead adds it and pushes inside a minute.
 *     That is the normal path, not a failure of planning.
 *   - Keep it flat and boring. No generics, no unions of unions, no `unknown`.
 */

export type ID = string;

/** Always an ISO date string, e.g. "2026-09-06". Format with date-fns. */
export type ISODate = string;

/* -------------------------------------------------------------------------- */
/* Placeholder domain — REPLACE AT T+8                                        */
/* -------------------------------------------------------------------------- */

export type Status = "new" | "active" | "blocked" | "done";

export const STATUSES: Status[] = ["new", "active", "blocked", "done"];

export interface Item {
  id: ID;
  title: string;
  description: string;
  status: Status;
  owner: string;
  tags: string[];
  /** Whole currency units. Never floats for cents. */
  value: number;
  createdAt: ISODate;
}

/** Payload for creating an Item. Server-assigned fields omitted. */
export type NewItem = Omit<Item, "id" | "createdAt">;

/* -------------------------------------------------------------------------- */
/* Presentation shapes — used by the dashboard + chart archetypes             */
/* -------------------------------------------------------------------------- */

export interface Metric {
  id: ID;
  label: string;
  value: number;
  /** e.g. "%", "hrs", "$". Rendered verbatim after the value. */
  unit: string;
  /** Percentage change vs. previous period. Negative renders as a fall. */
  delta: number;
}

export interface SeriesPoint {
  label: string;
  value: number;
  secondary?: number;
}

/* -------------------------------------------------------------------------- */
/* Chat archetype                                                             */
/* -------------------------------------------------------------------------- */

export type Role = "user" | "assistant";

export interface Message {
  id: ID;
  role: Role;
  content: string;
  at: string;
}

/* -------------------------------------------------------------------------- */
/* Seed file shape — data/seed.json must always satisfy this                   */
/* -------------------------------------------------------------------------- */

export interface SeedData {
  /** Product name shown in the shell. Change this at T+10. */
  appName: string;
  appTagline: string;
  items: Item[];
  metrics: Metric[];
  series: SeriesPoint[];
}

/* -------------------------------------------------------------------------- */
/* Store surface — the only way components touch data                          */
/* -------------------------------------------------------------------------- */

export interface StoreState {
  appName: string;
  appTagline: string;
  items: Item[];
  metrics: Metric[];
  series: SeriesPoint[];

  addItem: (input: NewItem) => Item;
  updateItem: (id: ID, patch: Partial<Item>) => void;
  removeItem: (id: ID) => void;
  setStatus: (id: ID, status: Status) => void;
  reset: () => void;
}
