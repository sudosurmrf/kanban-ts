import type { Card } from "../types/board";

type CardViewProps = {
  card: Card;
  onEdit(card: Card): void;
}

const CardView: React.FC<CardViewProps> = ({ card, onEdit }) => {

  
  return (
    <>
    <div className="rounded-lg p-3 shadow">
      <div className="font-medium">{card.title}</div>
      {card.label && (<span className="text-xs">{card.label}</span>)}
      <button onClick={()=> onEdit(card)} className="mt-2 underline">Edit</button>
    </div>
    </>
  )
}

export default CardView;