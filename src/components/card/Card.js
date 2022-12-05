import "./Card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Card({
  id,
  question,
  answer,
  tags,
  bookmarked,
  onDelete,
  onBookmark,
}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function showDetails(id) {
    navigate( id );
  }

  return (
    <article className="card">
      <h2 className="card__question">{question}</h2>

      <button
        onClick={() => setShow(!show)}
        className="card__answerButton"
        data-js="answer-button"
      >
        {show ? "Hide Answer" : "Show Answer"}
      </button>

      <p className={`card__answer ${show ? "" : "hidden"}`} data-js="answer">
        {answer}
      </p>

      <button onClick={() => showDetails(id)} className="card__answerButton">
        Show Details
      </button>

      <button
        onClick={() => onDelete(id)}
        className="card__answerButton"
        data-js="delete-button"
      >
        Delete
      </button>

      <ul className="card__tagContainer">
        {tags.length > 0
          ? tags.map((e, index) => {
              return (
                <li key={index} className="card__tagContainer__tag">
                  {e}
                </li>
              );
            })
          : ""}
      </ul>
      <div className="card__bookmark">
        <svg height="40" width="40">
          <polygon
            onClick={() => onBookmark(id)}
            points="2,2 30,2 30,38 16,24 2,38"
            className={`card__bookmark-svg${bookmarked ? "-active" : ""}`}
            data-js="bookmark"
          />
        </svg>
      </div>
    </article>
  );
}
