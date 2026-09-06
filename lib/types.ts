/**
 * THE CONTRACT.
 *
 * This file is owned by Station A (the lead) and by nobody else. At ~T+8 on
 * contest day the lead replaces the placeholder `Item` below with the real
 * entities for the topic, adds any function signatures both stations need,
 * and pushes. From that moment both stations code against real types and
 * their generated code integrates without negotiation.
 *
 * Rules:
 *   - Every shared shape lives here. Nothing is redeclared elsewhere.
 *   - Only the lead edits this file. Everyone else reads it.
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
