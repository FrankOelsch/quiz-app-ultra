import "./App.css";
import Header from "./components/Header";
import {useState, useEffect} from "react";
import Cards from "./pages/Cards";
import Edit from "./pages/Edit";
import {nanoid} from "nanoid";
import {Routes, Route, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Toast, ToastContainer} from "react-bootstrap";

const Questions = [
  {
    id: nanoid(),
    question: "Welche der 3 Nährstoffe - Kohlenhydrate, Eiweiße, Fette - ist nicht essentiell?",
    explanation: "Kohlenhydrate. Es gibt essentielle Fettsäuren, essentielle Aminosäuren, aber keine essentiellen Kohlenhydrate.",
    tags: "KH,Fette,Eiweiß",
    bookmarked: false,
    answers: [
      {value: "A", de: "Kohlenhydrate"},
      {value: "B", de: "Eiweiße"},
      {value: "C", de: "Fette"},
    ],
    correctly: "A",
  },
  {
    id: nanoid(),
    question: "Was bedeutet HTML?",
    explanation: "Hypertext Markup Language",
    tags: "html",
    bookmarked: true,
    answers: [
      {value: "A", de: "Hooked Markup Language"},
      {value: "B", de: "Hypertext Modular Language"},
      {value: "C", de: "Hypertext Markup Language"},
    ],
    correctly: "C",
  },
  {
    id: nanoid(),
    question: "Was bedeutet CSS?",
    explanation: "Cascading Style Sheets",
    tags: "css",
    bookmarked: false,
    answers: [
      {value: "A", de: "Cascading Smart Styles"},
      {value: "B", de: "Cascading Style Sheets"},
      {value: "C", de: "Commanded Style Sheets"},
    ],
    correctly: "B",
  },
];

const defaultQuestion = {
  id: 0,
  question: "",
  explanation: "",
  tags: "",
  bookmarked: false,
  answers: [
    {value: "A", de: ""},
    {value: "B", de: ""},
    {value: "C", de: ""},
  ],
  correctly: "",
}

function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error.message);
  }
}

function App() {
  const [cards, setCards] = useState(getFromLocalStorage("QuestionsMC") ?? Questions);
  const navigate = useNavigate();
  const [item, setItem] = useState(defaultQuestion);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setToLocalStorage("QuestionsMC", cards);
  }, [cards]);

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id));
    setShowToast(true);
  }

  function toggleBookmark(id) {
    console.log(id);
    setCards((cards) =>
      cards.map((card) => ({
        ...card,
        bookmarked: id === card.id ? !card.bookmarked : card.bookmarked,
      }))
    );
  }

  function newCard(data) {
    const values = data;
    console.log(values);

    const array = values.tags.split(",");
    const tagArray = array.map(tag => tag.trim());
    let tagstring = tagArray.join(",");

    setCards([
      {
        id: nanoid(),
        question: values.question,
        answers: item.answers.map(answer => {
          if (answer.value === "A") {
            return {
              ...answer, de: values.answerA,
            };
          } else if (answer.value === "B") {
            return {
              ...answer, de: values.answerB,
            };
          } else if (answer.value === "C") {
            return {
              ...answer, de: values.answerC,
            };
          } else {
            return answer;
          }
        }),
        tags: tagstring,
        correctly: values.correctly,
        isBookmarked: false,
      },
      ...cards,
    ]);

    setItem(defaultQuestion)
    navigate("/");
  }

  function editCard(data) {
    const values = data;

    console.log("values", values);

    setCards(
      cards.map((item) => {
        if (item.id === values.id) {
          return {
            ...item,
            question: values.question,
            answers: item.answers.map(answer => {
              if (answer.value === "A") {
                return {
                  ...answer, de: values.answerA,
                };
              } else if (answer.value === "B") {
                return {
                  ...answer, de: values.answerB,
                };
              } else if (answer.value === "C") {
                return {
                  ...answer, de: values.answerC,
                };
              } else {
                return answer;
              }
            }),
            tags: values.tags,
            correctly: values.correctly,
          };
        } else {
          return item;
        }
      })
    );

    setItem(defaultQuestion)
    navigate("/");
  }

  return (
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path="/">
            <Route index element={
              <Cards
                questions={cards}
                onDelete={deleteCard}
                onBookmark={toggleBookmark}
                setItem={setItem}
              />}
            />
            <Route path="/:cardID" element={
              <Edit
                item={item}
                setItem={setItem}
                onEdit={editCard}
                isNew={false}
              />}
            />
          </Route>

          <Route path="/bookmark" element={
            <Cards
              questions={cards.filter((card) => card.bookmarked === true)}
              onDelete={deleteCard}
              onBookmark={toggleBookmark}
              setItem={setItem}
            />}
          />

          <Route path="/bookmark/:cardID" element={
            <Edit
              item={item}
              setItem={setItem}
              onEdit={editCard}
              isNew={false}
            />}
          />

          <Route path="/new" element={
            <Edit
              item={defaultQuestion}
              setItem={setItem}
              onNew={newCard}
              isNew={true}
            />}
          />

          <Route path="*" element={<h1>Diese Seite existiert nicht</h1>}/>
        </Routes>

        <div style={{
          position: "fixed",
          top: 10,
          width: "80%",
          height: "60px",
          zIndex: 30,
        }}>
          <ToastContainer position="middle-start">
            <Toast onClose={() => setShowToast(false)}
                   show={showToast}
                   delay={5000}
                   autohide
                   animation
                   bg="success">
              <Toast.Header>
                <img
                  src=""
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Gelöscht</strong>
                <small>soeben</small>
              </Toast.Header>
              <Toast.Body>Datensatz wurde erfolgreich gelöscht.</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
