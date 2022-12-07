import "../components/Navigation.js";
import styled from "styled-components";
import Nav from "../components/Navigation";

const maxLettersQ = 200;
const maxLettersA = 300;

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

export default function Create({item, setItem, onEdit, onNew, isNew}) {

  function handleChange(e) {
    console.log(e.target.name);
    switch (e.target.name) {
      case "question":
        setItem({...item, question: e.target.value});
        break;
      case "answer":
        setItem({...item, answer: e.target.value});
        break;
      case "tags":
        setItem({...item, tags: e.target.value});
        break;
    }
  }

  return (
    <>
      <StyledForm onSubmit={(e) => {
        isNew ? onNew(e) : onEdit(e)
      }}>
        <input
          type="hidden"
          value={item.id}
          name="id"
        />

        <label htmlFor="question">
          Frage
        </label>
        <textarea
          value={item.question}
          onChange={handleChange}
          onInput={(e) => handleProgressQu(e)}
          maxLength={maxLettersQ}
          name="question"
          id="question"
          placeholder="Frage"
          required
        ></textarea>
        <ProgressDiv data-js="progress-bar-qu"></ProgressDiv>
        <Message data-js="question-message-qu"></Message>

        <label htmlFor="answer">
          Antwort
        </label>
        <textarea
          value={item.answer}
          onChange={handleChange}
          onInput={(e) => handleProgressAn(e)}
          maxLength={maxLettersA}
          name="answer"
          id="answer"
          placeholder="Antwort"
          required
        ></textarea>
        <ProgressDiv data-js="progress-bar-an"></ProgressDiv>
        <Message data-js="question-message-an"></Message>

        <label htmlFor="tags">
          Tags
        </label>
        <input
          value={item.tags}
          onChange={handleChange}
          type="text"
          name="tags"
          id="tags"
          placeholder="Tags"
          required
        ></input>

        <button data-js="new-button">
          Speichern
        </button>
      </StyledForm>
      <Nav isEdit={!isNew}/>
    </>
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