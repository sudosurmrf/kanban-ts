import CardView from "./CardView";
import type { Column, Card } from "../types/board";
import type { ID } from "../types/ids";
import type { Action } from "../state/actions";
import React, { useMemo, useState } from "react";

type ColumnViewProps = {
  column: Column;
  cards: Card[];
  dispatch: React.Dispatch<Action>;
};
const ColumnView = ({ column, cards, dispatch }: ColumnViewProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [nameDraft, setNameDraft] = useState(column.name);

  const cardsById = useMemo(() => {
    const map = new Map<ID<"card">, Card>();
    for (const card of cards) map.set(card.id, card);
    return map;
  }, [cards]);

  const orderedCards = useMemo(() => {
    return column.cardIds
      .map((id) => cardsById.get(id))
      .filter((c): c is Card => Boolean(c));
  }, [column.cardIds, cardsById]);

  function addNewCard(title: string) {
    const t = title.trim();
    if (!t) return;
    dispatch({ type: "ADD_CARD", columnById: column.id, title: t });
  }

  function editCard(card: Card) {
    const next = window.prompt("Edit card title:", card.title);
    if (next == null) return;
    const t = next.trim();
    if (!t || t === card.title) return;
    dispatch({ type: "UPDATE_CARD", cardId: card.id, patch: { title: t } });
  }

  function moveCard(cardId: ID<"card">, direction: -1 | 1) {
    const index = column.cardIds.indexOf(cardId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= column.cardIds.length) return;
    dispatch({ type: "MOVE_CARD", cardId, from: column.id, to: column.id, index: nextIndex });
  }

  return (
    <section className="w-80 min-w-[18rem] rounded-2xl bg-white p-3 shadow-sm">
      <header className="mb-2 flex items-center justify-between gap-2">
        {isRenaming ? (
          <div className="flex w-full items-center gap-2">
            <input
              autoFocus
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const t = nameDraft.trim();
                  setIsRenaming(false);
                  if (t && t !== column.name) {
                    dispatch({ type: "RENAME_COLUMN", columnById: column.id, name: t });
                  } else {
                    setNameDraft(column.name);
                  }
                }
                if (e.key === "Escape") {
                  setIsRenaming(false);
                  setNameDraft(column.name);
                }
              }}
              className="w-full rounded-md border px-2 py-1"
              placeholder="Column name"
            />
            <button
              onClick={() => {
                const t = nameDraft.trim();
                setIsRenaming(false);
                if (t && t !== column.name) {
                  dispatch({ type: "RENAME_COLUMN", columnById: column.id, name: t });
                } else setNameDraft(column.name);
              }}
              className="rounded-md border px-2 py-1 text-sm"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <h2 className="truncate text-sm font-semibold">{column.name || "(untitled)"}</h2>
            <div className="flex items-center gap-1">
              <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs">{orderedCards.length}</span>
              <button
                onClick={() => setIsRenaming(true)}
                className="rounded-md px-2 py-1 text-xs underline"
                title="Rename column"
              >
                Rename
              </button>
            </div>
          </>
        )}
      </header>

      <div className="flex flex-col gap-2">
        {orderedCards.map((card) => (
          <div key={card.id} className="group relative">
            <CardView card={card} onEdit={editCard} />
            <div className="absolute right-2 top-2 hidden gap-1 group-hover:flex">
              <button className="rounded-md border px-1 text-xs" onClick={() => moveCard(card.id, -1)} title="Move up">
                ↑
              </button>
              <button className="rounded-md border px-1 text-xs" onClick={() => moveCard(card.id, 1)} title="Move down">
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-3">
        <button
          className="w-full rounded-md border px-2 py-1 text-sm"
          onClick={() => {
            const t = window.prompt("New card title?");
            if (t) addNewCard(t);
          }}
        >
          + Add card
        </button>
      </footer>
    </section>
  );
};

export default React.memo(ColumnView);