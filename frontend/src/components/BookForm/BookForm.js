import { useState } from "react";
import "./BookForm.css";
// для отправки объекта в store -> redux
import { useDispatch } from "react-redux";
// import { addBook } from "../../redux/books/actionCreators";
// меняем путь нового redux slice для функции
import { addBook } from "../../redux/slices/booksSlice";
// import { v4 as uuidv4 } from "uuid";
import booksData from "../../data/books.json";
import createBookWithID from "../../utils/createBookWithID";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // hook useDispatch()
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    // const randomBookWithID = {
    //   ...randomBook,
    //   id: uuidv4(),
    //   isFavorite: false,
    // };

    // то же самое что и сверху
    const randomBookWithID = createBookWithID(randomBook);

    // send redux store
    dispatch(addBook(randomBookWithID));
  };

  // если форма большая, то имеет смысл хранить данные в одном объекте
  // const [formData, setFormData] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && author) {
      // const book = {
      //   title: title,
      //   author: author,
      //   id: uuidv4(),
      //   isFavorite: false,
      // };

      // то же самое что и сверху
      const book = createBookWithID({ title, author });

      dispatch(addBook(book));
      setTitle("");
      setAuthor("");
    }
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
      </form>
    </div>
  );
};

export default BookForm;
