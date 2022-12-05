import Card from "../card/Card";
import { useParams, Outlet } from "react-router-dom";

export default function Cards({ questions, onDelete, onBookmark }) {
  const { cardID } = useParams();

  if (cardID) {
    return <Outlet />;
  } else {
    return (
      <>
        {questions.map((question) => (
          <Card
            key={question.id}
            id={question.id}
            question={question.question}
            answer={question.answer}
            tags={question.tags}
            bookmarked={question.bookmarked}
            onDelete={onDelete}
            onBookmark={onBookmark}
          />
        ))}
      </>
    );
  }
}
