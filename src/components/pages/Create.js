import "../navigation/Navigation.js";
import styled from "styled-components";

const maxLettersQ = 200;
const  maxLettersA = 300;

function handleProgressQu(event) {
  const questionMessage = document.querySelector(
    '[data-js="question-message-qu"]'
  );
  const progressBarQuest = document.querySelector(
    '[data-js="progress-bar-qu"]'
  );

  const n = maxLettersQ - +event.target.value.length;
  questionMessage.textContent = `Noch ${n} von ${maxLettersQ} Zeichen möglich.`;
  progressBarQuest.style.width = (n / maxLettersQ) * 100 + "%";
}

function handleProgressAn(event) {
  const answerMessage = document.querySelector(
    '[data-js="question-message-an"]'
  );
  const progressBarAnswer = document.querySelector(
    '[data-js="progress-bar-an"]'
  );

  const n = maxLettersA - +event.target.value.length;
  answerMessage.textContent = `Noch ${n} von ${maxLettersA} Zeichen möglich.`;
  progressBarAnswer.style.width = (n / maxLettersA) * 100 + "%";
}

export default function Create({onNew}) {
  return (
    <StyledForm onSubmit={(e) => onNew(e)} >
      <label htmlFor="question">
        Frage
      </label>
      <textarea
        onInput={(e) => handleProgressQu(e)}
        maxLength={maxLettersQ}
        data-js="question-input"
        name="question"
        id="question"
        placeholder="Was bedeutet HTML?"
        required
      ></textarea>
      <ProgressDiv data-js="progress-bar-qu"></ProgressDiv>
      <Message data-js="question-message-qu"></Message>

      <label htmlFor="answer">
        Antwort
      </label>
      <textarea
        onInput={(e) => handleProgressAn(e)}
        maxLength={maxLettersA}
        data-js="answer-input"
        name="answer"
        id="answer"
        placeholder="Hypertext Markup Language."
        required
      ></textarea>
      <ProgressDiv data-js="progress-bar-an"></ProgressDiv>
      <Message data-js="question-message-an"></Message>

      <label htmlFor="tags">
        Tags
      </label>
      <input
        type="text"
        name="tags"
        id="tags"
        placeholder="html css javascript"
        required
      ></input>

      <button data-js="new-button">
        Speichern
      </button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  label {
    font-family: "Abel", sans-serif;
    font-size: 20px;
    margin-top: 20px;
  }
  
  textarea,
  input {
    font-family: "Abel", sans-serif;
    font-size: 18px;
    outline: none;
    border: 2px solid gray;
    resize: none;
    width: 300px;
    padding: 0 3px;
  }
  
  textarea {
    height: 100px;
  }

  textarea:hover,
  input:hover {
    border: 2px solid blue;
  }

  button {
    font-family: "Merienda One", sans-serif;
    font-size: 16px;
    width: 140px;
    padding: 2px;
    margin: 20px;
    border: gray solid 2px;
    border-radius: 8px;
    background-color: aliceblue;
    cursor: pointer;
  }
  button:hover {
     border: 2px solid blue;
  }
`
const ProgressDiv = styled.div`
  bottom: 0;
  left: 0;
  height: 4px;
  width: 0;
  background-color: green;
  transition: width 0.05s ease;
`

const Message = styled.p`
  font-family: "Abel", sans-serif;
  font-size: 14px;
  text-align: right;
`