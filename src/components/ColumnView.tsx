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

  return (
    <>
    <div className="flex flex-col gap-2">
      {orderedCards && (
        orderedCards.map((card) => (
          <div key={card.id} className="group relative">
            <CardView card={card} onEdit={editCard} />
            </div>
        ))
      )}
    </div>

    </>
  )

}

export default React.memo(ColumnView);