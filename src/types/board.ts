import type { ID } from "./ids";

export type Label = "bug" | "feature" | "chore";

export interface Card {
  id: ID<"card">;
  title: string;
  description?: string;
  label?: Label;
  points?: number;
  createdAt: number;
}

export interface Column {
  id: ID<"col">;
  name: string;
  cardIds: ReadonlyArray<ID<"card">>;
}

export interface Board {
  id: ID<"board">;
  name: string;
  columnOrder: ReadonlyArray<ID<"col">>; 
  columnById: Record<ID<"col">, Column>; 
  cards: Record<ID<"card">, Card>;
}

