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

const ColumnView = ({ column, cards, dispatch}: ColumnViewProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [nameDraft, setNameDraft] = useState(column.name);

  const cardsById = useMemo(() => {
    const map = new Map<ID<"card">, Card>();
    for (const card of cards){
      map.set(card.id, card);
    };
    return map;
  }, [cards]);

  const orderedCards = useMemo(() => {
    return column.cardIds
    .map((id) => cardsById.get(id))
    .filter((c): c is Card => Boolean(c));
  }, [column.cardIds, cardsById]);

  const addNewCard = (title: string) => {
    if(!title) return;
    dispatch({ type: "ADD_CARD", columnById: column.id, title: title });
  } 

  const editCard = (card: Card) => {
    const next = window.prompt('Edit card title:', card.title);
    if(next === null) return;
    dispatch({ type: "UPDATE_CARD", cardId: card.id, patch: { title: next}});
  }

  const moveCard = (cardId: ID<"card">, direction: -1 | 1) => {
    const index = column.cardIds.indexOf(cardId);
    const nextIndex = index + direction;
    if(index < 0 || nextIndex < 0 || nextIndex >= column.cardIds.length) return;
    dispatch({ type: "MOVE_CARD", cardId, from: column.id, to: column.id, index: nextIndex});
  }

  return (
    <>
    <div className="flex flex-col gap-2">
      {orderedCards && (
        orderedCards.map((card) => (
          <div key={card.id} className="group relative">
            <CardView card={card} onEdit={editCard} />
            <div className="absolute right-2 top-2 hidden gap-1 group-hover: flex">
              <button onClick={()=>moveCard(card.id, -1)} title="Move Up">Move Up</button>
              <button onClick={() => moveCard(card.id, 1)} title="Move Down">Move Down</button>
            </div>
            </div>
        ))
      )}
    </div>

    </>
  )

}

export default React.memo(ColumnView);