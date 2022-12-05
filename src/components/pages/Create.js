import "./Create.css";
import "../navigation/Navigation.js";

function handleProgressQu(event) {
  const questionMessage = document.querySelector(
    '[data-js="question-message-qu"]'
  );
  const progressBarQuest = document.querySelector(
    '[data-js="progress-bar-qu"]'
  );

  const n = 50 - +event.target.value.length;
  questionMessage.textContent = `Noch ${n} von 50 Zeichen möglich.`;
  progressBarQuest.style.width = (n / 50) * 100 + "%";
}
function handleProgressAn(event) {
  const answerMessage = document.querySelector(
    '[data-js="question-message-an"]'
  );
  const progressBarAnswer = document.querySelector(
    '[data-js="progress-bar-an"]'
  );

  const n = 50 - +event.target.value.length;
  answerMessage.textContent = `Noch ${n} von 50 Zeichen möglich.`;
  progressBarAnswer.style.width = (n / 50) * 100 + "%";
}

export default function Create({ onNew }) {
  return (
    <form onSubmit={(e) => onNew(e)} className="container">
      <label htmlFor="question" className="section-title">
        Your Question:
      </label>
      <textarea
        onInput={(e) => handleProgressQu(e)}
        maxLength="50"
        data-js="question-input"
        name="question"
        id="question"
      ></textarea>
      <div className="progress-bar" data-js="progress-bar-qu"></div>
      <p className="section-message" data-js="question-message-qu"></p>

      <label htmlFor="answer" className="section-title">
        Your Answer:
      </label>
      <textarea
        onInput={(e) => handleProgressAn(e)}
        maxLength="50"
        data-js="answer-input"
        name="answer"
        id="answer"
      ></textarea>
      <div className="progress-bar" data-js="progress-bar-an"></div>
      <p className="section-message" data-js="question-message-an"></p>

      <label htmlFor="tags" className="section-title">
        Tag:
      </label>
      <input type="text" name="tags" id="tags"></input>

      <button className="newButton" data-js="new-button">
        Speichern
      </button>
    </form>
  );
}
