import "./App.css";
import Header from "./components/header/Header";
import Nav from "./components/navigation/Navigation";
import {useState, useEffect} from "react";
import Create from "./components/pages/Create";
import Cards from "./components/pages/Cards";
import Edit from "./components/pages/Edit";
import {nanoid} from "nanoid";
import {Routes, Route, useNavigate} from "react-router-dom";

const Questions = [
  {
    id: nanoid(),
    question: "Das ist Frage Nr1",
    answer: "Und hier kommt Antwort Nr1",
    tags: ["html", "css"],
    bookmarked: false,
  },
  {
    id: nanoid(),
    question: "Das ist Frage Nr2",
    answer: "Und hier kommt Antwort Nr2",
    tags: ["css", "jsx", "mongoDB", "js"],
    bookmarked: true,
  },
  {
    id: nanoid(),
    question: "Das ist Frage Nr3",
    answer: "Und hier kommt Antwort Nr3",
    tags: ["Javascript", "css"],
    bookmarked: false,
  },
];

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
  const [cards, setCards] = useState(getFromLocalStorage("DB") ?? Questions);
  const navigate = useNavigate();

  useEffect(() => {
    setToLocalStorage("DB", cards);
  }, [cards]);

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id));
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

  function appendCard(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const values = Object.fromEntries(data);
    console.log(values);

    const tagArray = values.tags.split(" ");

    setCards([
      {
        id: nanoid(),
        question: values.question,
        answer: values.answer,
        tags: tagArray,
        isBookmarked: false,
      },
      ...cards,
    ]);

    event.target.reset(); // reset form
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
              /> }
            />
            <Route path="/:cardID" element={
              <Edit
                questions={cards}
                onDelete={deleteCard}
                onBookmark={toggleBookmark}
              /> }
            />
          </Route>

          <Route path="/bookmark" element={
            <Cards
              questions={cards.filter((e) => e.bookmarked === true)}
              onBookmark={toggleBookmark}
            /> }
          />

          <Route path="/new" element={
            <Create
              onNew={appendCard}
            /> }
          />

          <Route path="*" element={<h1>Diese Seite existiert nicht</h1>}/>
        </Routes>
      </main>

      <Nav/>
    </div>
  );
}

export default App;
