import "./BookList.css";
// с помошью хука useSelector() мы подписываемся на изменения состояния store
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

const BookList = () => {
  // все книги
  const books = useSelector((state) => state.books);
  // книги которые мы фильтрируем по title
  const titleFilter = useSelector(selectTitleFilter);
  // книги которые мы фильтрируем по author
  const authorFilter = useSelector(selectAuthorFilter);
  // если галочка стоит то будет true а так false
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;

    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>

              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsHandThumbsUpFill className="star-icon" />
                  ) : (
                    <BsHandThumbsUp className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
