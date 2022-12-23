import QCard from "../components/QCard";
import { useParams, Outlet } from "react-router-dom";
import Nav from "../components/Navigation";

export default function Cards({ questions, onDelete, onBookmark, setItem }) {
  const { cardID } = useParams();

  if (cardID) {
    return <Outlet />;
  } else {
    return (
      <>
        {questions.map((card) => (
          <QCard
            key={card.id}
            card={card}
            onDelete={onDelete}
            onBookmark={onBookmark}
            setItem={setItem}
          />
        ))}
        <Nav isEdit={false}/>
      </>
    );
  }
}
