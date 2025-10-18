import BoardView from "./components/BoardView"
import { useReducer } from "react"
import type { Board, Card, Column } from "./types/board"
import { makeId, type ID } from "./types/ids"
import type { Action } from "./state/actions"


//fake data for now: 
const now = Date.now();

const seedCards: Record<ID<"card">, Card> = {
  card_setup: {
    id: "card_setup",
    title: "Project setup (Vite + TS + SWC)",
    description: "Scaffold app, strict TS flags.",
    label: "chore",
    points: 1,
    createdAt: now - 1000 * 60 * 60 * 24 * 3,
  },
  card_types: {
    id: "card_types",
    title: "Model domain types",
    description: "Board, Column, Card + IDs",
    label: "feature",
    points: 2,
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
  },
  card_ui: {
    id: "card_ui",
    title: "Build ColumnView + CardView",
    description: "Layout, counts, rename, add-card flow",
    label: "feature",
    points: 3,
    createdAt: now - 1000 * 60 * 60 * 24,
  },
  card_tests: {
    id: "card_tests",
    title: "Reducer tests (exhaustive switch)",
    description: "Vitest + RTL",
    label: "chore",
    points: 1,
    createdAt: now - 1000 * 60 * 60 * 8,
  },
};

const colBacklog: Column = {
  id: "col_backlog",
  name: "Backlog",
  cardIds: ["card_setup", "card_types"] as ID<"card">[],
};

const colInProgress: Column = {
  id: "col_inprogress",
  name: "In Progress",
  cardIds: ["card_ui"] as ID<"card">[],
};

const colDone: Column = {
  id: "col_done",
  name: "Done",
  cardIds: ["card_tests"] as ID<"card">[],
};

const SEED_BOARD: Board = {
  id: "board_demo",
  name: "Typed Kanban (Demo)",
  columnOrder: ["col_backlog", "col_inprogress", "col_done"],
  columnById: {
    col_backlog: colBacklog,
    col_inprogress: colInProgress,
    col_done: colDone,
  } as Record<ID<"col">, Column>,
  cards: seedCards,
};

//reducers that ill need:

function boardReducer(state: Board, action: Action): Board {
  
  switch (action.type){
    case "ADD_CARD": {
      const { columnById, title} = action;
      const column = state.columnById[columnById];
      if(!column) return state;

      const newId = makeId("card");
      const newCard: Card = {
        id: newId,
        title: title,
        createdAt: Date.now(),
      };
      return {
        ...state, cards: { ...state.cards, [newId]: newCard }, 
        columnById: { ...state.columnById, [columnById]: { ...column, cardIds: [...column.cardIds, newId]},
      }, 
      };
    }

    case "UPDATE_CARD": {
      const {cardId, patch} = action;
      const card = state.cards[cardId];
      if(!card) return state;
      return {
        ...state, cards: {...state.cards, [cardId]:{ ...card, ...patch } },
      };
    }
    case "DELETE_CARD": {
      const {cardId, columnById} = action;
    }
  }
}


const App: React.FC = () => {


  return (
    <>
    <BoardView dispatch={}/>
      
    </>
  )
}

export default App
