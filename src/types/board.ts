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
  cardIds: ID<"card">[];
}

export interface Board {
  id: ID<"board">;
  name: string;
  columnOrder: ID<"col">[]; //will be faster for custom ordering 
  columnById: Record<ID<"col">, Column>; //will be better later on for lookup
  cards: Record<ID<"card">, Card>;
}

