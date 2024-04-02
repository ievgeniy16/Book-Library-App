import "./BookList.css";
// с помошью хука useSelector() мы подписываемся на изменения состояния store
import { useSelector, useDispatch } from "react-redux";
// import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
// меняем путь нового redux slice для функции
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from "../../redux/slices/booksSlice";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

const BookList = () => {
  // все книги
  // const books = useSelector((state) => state.books);
  // после того как мы измении тип redux мы просто вставим гтовую функцию
  const books = useSelector(selectBooks);
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

  // делаем подсвечивание поиска по имени или авторра
  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }

      return substring;
    });
  };

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
                {/* {++i}. {book.title} by 
                <strong>{book.author}</strong> */}
                {++i}. {highlightMatch(book.title, titleFilter)} by{" "}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>{" "}
                {"  "} ({book.source})
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
