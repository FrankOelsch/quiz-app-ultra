import Card from "../card/Card";
import { useParams, Outlet } from "react-router-dom";

export default function Cards({ questions, onDelete, onBookmark, setItem }) {
  const { cardID } = useParams();

  if (cardID) {
    return <Outlet />;
  } else {
    return (
      <>
        {questions.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={onDelete}
            onBookmark={onBookmark}
            setItem={setItem}
          />
        ))}
      </>
    );
  }
}
