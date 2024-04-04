import { createSlice } from "@reduxjs/toolkit";
// пакет "axios" для отправки запросов на backend вместо fetch()
import axios from "axios";
import createBookWithID from "../../utils/createBookWithID";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // reducer для добавление книги
    addBook: (state, action) => {
      //   return [...state, action.payload];
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      // // мутирует массив
      //   const index = state.findIndex((book) => book.id === action.payload);
      //   if (index !== -1) {
      //     state.splice(index, 1);
      //   }

      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });

      //   return state.map((book) =>
      //     book.id === action.payload
      //       ? { ...book, isFavorite: !book.isFavorite }
      //       : book
      //   );
    },
  },
});



// распаковываем объект actions
export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

// 3.добавление книги через API backend
export const thunkFunction = async (dispatch, getState) => {
  // console.log(getState()); // смотрим состояние объекта
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    // ? для того чтобы не было ошибок а был толко undefined
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithID(res.data, "API")));
    }
  } catch (error) {
    console.log("Error fetching random book", error);
  }
};

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
