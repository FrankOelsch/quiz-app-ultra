import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Button, ButtonGroup, Modal, ToggleButton, Card, Badge} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QCard({
                                card,
                                onDelete,
                                onBookmark,
                                setItem,
                              }) {

  const [showAnswer, setShowAnswer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [radioValue, setRadioValue] = useState('x');

  const navigate = useNavigate();

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOnEdit(id) {
    setItem(card);
    navigate(id);
  }

  function handleOnDelete() {
    handleShowModal();
  }

  function handleDelete() {
    onDelete(card.id);
    setShowModal(false);
  }

  const radios = [
    {name: 'Antwort A: Kohlenhydrate Kohlenhydrate Kohlenhydrate Kohlenhydrate', value: 'a', correctly: false},
    {name: 'Antwort B: Eiweiße', value: 'b', correctly: true},
    {name: 'Antwort C: Fette', value: 'c', correctly: false},
  ];

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Diese Frage/Antwort löschen?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Wenn du auf 'Frage/Antwort Löschen' klickst, wird diese gelöscht. Dies kann nicht rückgängig gemacht werden.
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleCloseModal}>
            Abbrechen
          </Button>
          <Button size="sm" variant="danger" onClick={handleDelete}>Frage/Antwort Löschen</Button>
        </Modal.Footer>
      </Modal>

      <Card bg="light" border="primary" style={{width: "100%"}}>
        <Card.Header style={{paddingRight: "40px", textAlign: "left"}}>
          {card.question}

          <div style={{
            position: "absolute",
            cursor: "pointer",
            top: "-8px",
            right: "2px"
          }}>
            <svg height="40" width="40">
              <polygon
                onClick={() => onBookmark(card.id)}
                points="2,2 30,2 30,38 16,24 2,38"
                className={`card__bookmark-svg${card.bookmarked ? "-active" : ""}`}
                style={{fill: card.bookmarked ? "#6610f2" : "lightgray"}}
              />
            </svg>
          </div>
        </Card.Header>

        <Card.Body>

          {/*<p className={`card__answer ${showAnswer ? "" : "hidden"}`} data-js="answer">*/}
          {/*  {card.answer}*/}
          {/*</p>*/}

          <ButtonGroup vertical style={{width: "100%", marginBottom: "14px"}}>
            {card.answers.map((answer, idx) => (
              <ToggleButton
                style={{textAlign: "left"}}
                key={idx}
                id={`${card.id}-${idx}`}
                type="radio"
                size="sm"
                // variant={showAnswer ? (radioValue === radio.value ? (radio.correctly ? 'outline-success' : 'outline-danger') : 'outline-primary') : 'outline-primary'}
                variant={showAnswer ? (answer.correctly ? 'outline-success' : 'outline-danger') : 'outline-primary'}
                name={card.id}
                value={answer.value}
                checked={radioValue === answer.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {answer.de}
              </ToggleButton>
            ))}
          </ButtonGroup>

          <ButtonContainer>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAnswer(!showAnswer)}
              >
              {showAnswer ? "Verstecke Antwort" : "Zeige Antwort"}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOnEdit(card.id)}
            >
              Ändern
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOnDelete(card.id)}
            >
              Löschen
            </Button>
          </ButtonContainer>

        </Card.Body>

        <Card.Footer>
          <TagContainer>
          {card.tags.length > 0
            ? card.tags.split(",").map((tag, index) => {
              return (
                <Badge bg="info" key={index} className="card__tagContainer__tag">
                  {`#${tag}`}
                </Badge>
              );
            })
            : ""}
          </TagContainer>
        </Card.Footer>
      </Card>
    </>
  );
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

const TagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`

const StyledArticle = styled.article`
  position: relative;
  background-color: rgba(100, 148, 237, 0.3);
  border: gray solid 1px;
  border-radius: 8px;
  box-shadow: black 1px 2px 5px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 20px;

  .card__question {
    font-family: "Arial", sans-serif;
    font-size: 18px;
    width: 90%;
    text-align: center;
    margin: 0;
  }

  .card__answer {
    font-family: "Arial", sans-serif;
    font-size: 16px;
    width: 90%;
    text-align: center;
    border: solid 1px gray;
    padding: 4px;
    display: inline-block;
    margin: 0;
  }

  .hidden {
    display: none;
  }

  .card__answerButton,
  .card__editButton,
  .card__deleteButton {
    font-family: "Merienda One", sans-serif;
    font-size: 14px;
    min-width: 90px;
    padding: 2px;
    border: gray solid 2px;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    box-shadow: black 1px 1px 4px;
  }

  .card__answerButton {
    background-color: steelblue;
    min-width: 150px;
  }

  .card__editButton {
    background-color: steelblue;
    margin-right: 10px;
  }

  .card__deleteButton {
    background-color: blueviolet;
    margin-left: 10px;
  }

  .card__answerButton:hover,
  .card__editButton:hover,
  .card__deleteButton:hover {
    border: black solid 2px;
  }

  .card__tagContainer {
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
    width: 90%;
    min-height: 26px;
    padding: 0;
    margin: 0;
  }

  .card__tagContainer__tag {
    font-family: "Merienda One", sans-serif;
    font-size: 14px;
    font-weight: normal;
    border-radius: 5px;
    padding: 3px 10px;
    color: black;
    background-color: #7acccc;
    list-style-type: none;
    display: inline;
    cursor: default;
  }

  .card__bookmark {
    position: absolute;
    cursor: pointer;
    top: -6px;
    right: 8px;
  }

  .card__bookmark-svg {
    position: absolute;
    top: -300px;
    fill: transparent;
    stroke: darkcyan;
    stroke-width: 3;
  }

  .card__bookmark-svg-active {
    fill: darkcyan;
    stroke: darkcyan;
    stroke-width: 3;
  }
`