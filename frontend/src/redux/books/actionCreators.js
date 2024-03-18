import * as a from "./actionTypes";

// create function
// неявный возврат объекта
export const addBook = (newBook) => ({
  type: a.ADD_BOOK,
  payload: newBook,
});

// явный возврат объекта
export const deleteBook = (id) => {
  return {
    type: a.DELETE_BOOK,
    payload: id,
  };
};

export const toggleFavorite = (id) => {
  return {
    type: a.TOGGLE_FAVORITE,
    payload: id,
  };
};
