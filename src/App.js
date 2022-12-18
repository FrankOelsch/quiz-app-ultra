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
    question: "Welche der 3 Nährstoffe - Kohlenhydrate, Eiweisse, Fette - ist nicht essentiell?",
    answer: "Kohlenhydrate. Es gibt essentielle Fettsäuren, essentielle Aminosäuren, aber keine essentiellen Kohlenhydrate.",
    tags: "KH,Fette,Eiweiss",
    bookmarked: false,
  },
  {
    id: nanoid(),
    question: "Was bedeutet HTML?",
    answer: "Hypertext Markup Language.",
    tags: "html",
    bookmarked: true,
  },
  {
    id: nanoid(),
    question: "Was bedeutet CSS?",
    answer: "Cascading Style Sheets",
    tags: "css",
    bookmarked: false,
  },
];

const defaultQuestion = {
  id: 0,
  question: "",
  answer: "",
  tags: "",
  bookmarked: false,
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
  const [cards, setCards] = useState(getFromLocalStorage("Questions") ?? Questions);
  const navigate = useNavigate();
  const [item, setItem] = useState(defaultQuestion);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setToLocalStorage("Questions", cards);
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
        answer: values.answer,
        tags: tagstring,
        isBookmarked: false,
      },
      ...cards,
    ]);

    setItem(defaultQuestion)
    navigate("/");
  }

  function editCard(data) {
    const values = data;

    setCards(
      cards.map((item) => {
        if (item.id === values.id) {
          return { ...item,
            question: values.question,
            answer: values.answer,
            tags: values.tags };
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
              /> }
            />
            <Route path="/:cardID" element={
              <Edit
                item={item}
                setItem={setItem}
                onEdit={editCard}
                isNew={false}
              /> }
            />
          </Route>

          <Route path="/bookmark" element={
            <Cards
              questions={cards.filter((card) => card.bookmarked === true)}
              onDelete={deleteCard}
              onBookmark={toggleBookmark}
              setItem={setItem}
            /> }
          />

          <Route path="/bookmark/:cardID" element={
            <Edit
              item={item}
              setItem={setItem}
              onEdit={editCard}
              isNew={false}
            /> }
          />

          <Route path="/new" element={
            <Edit
              item={defaultQuestion}
              setItem={setItem}
              onNew={newCard}
              isNew={true}
            /> }
          />

          <Route path="*" element={<h1>Diese Seite existiert nicht</h1>}/>
        </Routes>

        <div style={{position: "fixed",
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
