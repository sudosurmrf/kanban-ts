import ColumnView from "./ColumnView";
import type { Board, Card, Column } from "../types/board";
import type { ID } from "../types/ids";
import type { Action } from "../state/actions";
import React, { useMemo } from "react";

type BoardViewProps = {
  board: Board;
  dispatch: React.Dispatch<Action>;
}

//this fn is just to make sure we don't have any undefined types
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const BoardView = ({board, dispatch}: BoardViewProps) => {

  const columnsWithCards = useMemo(() => {
   return board.columnOrder.map((colId: ID<"col">) => {
    const column: Column | undefined = board.columnById[colId];
    if(!column) return undefined;

    const cards: Card[] = column.cardIds.map((cardId: ID<"card">) => 
      board.cards[cardId]
    ).filter(isDefined)
    return {column, cards};
   })
   .filter(isDefined);
  }, [board.cards, board.columnOrder, board.columnById])


  return (
    <>
    <div className="flex gap-4 overflow-auto p-4">
      {columnsWithCards && (
        columnsWithCards.map(({ column, cards}) => (
          <ColumnView key={column.id} column={column} cards={cards} dispatch={dispatch} />
        ))
      )}
    </div>
    </>
  )
}

export default BoardView;