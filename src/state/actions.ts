import type { ID } from "../types/ids";
import type { Label } from "../types/board";

export type Action = 
| { type: "ADD_CARD"; columnById: ID<"col">; title: string}
| { type: "MOVE_CARD"; cardId: ID<"card">; from: ID<"col">; to: ID<"col">; index: number }
| { type: "UPDATE_CARD"; cardId: ID<"card">; patch: Partial<{ title:string; description: string; label: Label; points: number }> }
| { type: "ADD_COLUMN"; name: string }
| { type: "RENAME_COLUMN"; columnById: ID<"col">; name: string }
| { type: "DELETE_CARD"; cardId: ID<"card">; columnById: ID<"col">}
| { type: "MOVE_COLUMN"; columnById: ID<"col">; fromIndex: number; toIndex: number };

