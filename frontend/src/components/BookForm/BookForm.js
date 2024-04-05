import { useState } from "react";
import "./BookForm.css";
// для отправки объекта в store -> redux
import { useDispatch } from "react-redux";
// import { addBook } from "../../redux/books/actionCreators";
// меняем путь нового redux slice для функции
import {
  addBook,
  thunkFunction,
  fetchBook,
} from "../../redux/slices/booksSlice";
// import { v4 as uuidv4 } from "uuid";
import booksData from "../../data/books.json";
import createBookWithID from "../../utils/createBookWithID";
import { setError } from "../../redux/slices/errorSlice";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // hook useDispatch()
  const dispatch = useDispatch();

  // 1.добавление книги случайным образом
  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    // const randomBookWithID = {
    //   ...randomBook,
    //   id: uuidv4(),
    //   isFavorite: false,
    // };

    // то же самое что и сверху
    const randomBookWithID = createBookWithID(randomBook, "random");

    // send redux store
    dispatch(addBook(randomBookWithID));
  };

  // если форма большая, то имеет смысл хранить данные в одном объекте
  // const [formData, setFormData] = useState("");

  // 2.добавление книги вручную
  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && author) {
      const book = createBookWithID({ title, author }, "manual");
      dispatch(addBook(book));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill title and author!"));
    }
  };

  // 3.добавление книги через API backend
  const handleAddRandomBookAPI = () => {
    // отправляем функцию в redux store
    // dispatch(thunkFunction);
    dispatch(fetchBook('http://localhost:4000/random-book'));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button onClick={handleAddRandomBook}>Add Random</button>
        <button type="button" onClick={handleAddRandomBookAPI}>
          Add Random API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
