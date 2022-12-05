import Card from "../card/Card";
import { useParams } from "react-router-dom";

export default function Edit({ questions, onDelete, onBookmark }) {
  const { cardID } = useParams();

  return (
    <>
      {questions
        .filter((card) => card.id === cardID)
        .map((card) => (
          <Card
            key={card.id}
            id={card.id}
            question={card.question}
            answer={card.answer}
            tags={card.tags}
            bookmarked={card.bookmarked}
            onDelete={onDelete}
            onBookmark={onBookmark}
          />
        ))}
    </>
  );
}
