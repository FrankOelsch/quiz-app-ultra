import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Navigation";
import {useState, useEffect} from "react";
import Cards from "./components/pages/Cards";
import Edit from "./components/pages/Edit";
import {nanoid} from "nanoid";
import {Routes, Route, useNavigate} from "react-router-dom";

const Questions = [
  {
    id: nanoid(),
    question: "Das ist Frage Nr1",
    answer: "Und hier kommt Antwort Nr1",
    tags: "html, css",
    bookmarked: false,
  },
  {
    id: nanoid(),
    question: "Das ist Frage Nr2",
    answer: "Und hier kommt Antwort Nr2",
    tags: "css, jsx, mongoDB, js",
    bookmarked: true,
  },
  {
    id: nanoid(),
    question: "Das ist Frage Nr3",
    answer: "Und hier kommt Antwort Nr3",
    tags: "javascript, css",
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
  const [item, setItem] = useState({
    id: 0,
    question: "question",
    answer: "answer",
    tags: "tag1, tag2",
    bookmarked: false,
  });

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

  function newCard(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const values = Object.fromEntries(data);
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

    event.target.reset(); // reset form
    navigate("/");
  }

  function editCard(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const values = Object.fromEntries(data);
    console.log(values);

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
              onBookmark={toggleBookmark}
            /> }
          />

          <Route path="/new" element={
            <Edit
              item={item}
              setItem={setItem}
              onNew={newCard}
              isNew={true}
            /> }
          />

          <Route path="*" element={<h1>Diese Seite existiert nicht</h1>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
