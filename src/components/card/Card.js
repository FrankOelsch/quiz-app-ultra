import "./Card.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Card({
                               card,
                               onDelete,
                               onBookmark,
                               setItem,
                             }) {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function showDetails(id) {
    setItem(card);
    navigate(id);
  }

  return (
    <article className="card">
      <h2 className="card__question">{card.question}</h2>

      <button
        onClick={() => setShow(!show)}
        className="card__answerButton"
        data-js="answer-button"
      >
        {show ? "Hide Answer" : "Show Answer"}
      </button>

      <p className={`card__answer ${show ? "" : "hidden"}`} data-js="answer">
        {card.answer}
      </p>

      <button onClick={() => showDetails(card.id)} className="card__answerButton">
        Edit
      </button>

      <button
        onClick={() => onDelete(card.id)}
        className="card__answerButton"
        data-js="delete-button"
      >
        Delete
      </button>

      <ul className="card__tagContainer">
        {card.tags.length > 0
          ? card.tags.map((e, index) => {
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
            onClick={() => onBookmark(card.id)}
            points="2,2 30,2 30,38 16,24 2,38"
            className={`card__bookmark-svg${card.bookmarked ? "-active" : ""}`}
            data-js="bookmark"
          />
        </svg>
      </div>
    </article>
  );
}
