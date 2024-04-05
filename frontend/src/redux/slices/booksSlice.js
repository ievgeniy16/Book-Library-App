import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// пакет "axios" для отправки запросов на backend вместо fetch()
import axios from "axios";
import createBookWithID from "../../utils/createBookWithID";
import { setError } from "./errorSlice";

const initialState = [];

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      // чтобы не попасть в reducer ниже в функцию extraReducers
      throw error;
    }
  }
);

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
  // async function
  // 3.добавление книги через API backend
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithID(action.payload, "API"));
      }
    });
  },
});

// распаковываем объект actions
export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
