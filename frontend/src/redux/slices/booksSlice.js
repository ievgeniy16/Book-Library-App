import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// пакет "axios" для отправки запросов на backend вместо fetch()
import axios from "axios";
import createBookWithID from "../../utils/createBookWithID";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoadingAPI: false,
};

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      // чтобы не попасть в reducer ниже в функцию extraReducers
      // OPTION 1
      // throw error;

      // OPTION 2 отклоняем Promise предпочтительнее вариант 2
      return thunkAPI.rejectWithValue(error);
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
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      // // мутирует массив
      //   const index = state.findIndex((book) => book.id === action.payload);
      //   if (index !== -1) {
      //     state.splice(index, 1);
      //   }

      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
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
  // OPTION 1
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, "API"));
      }
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingAPI = false;
    });
  },

  // OPTION 2 почему-то выдает ошибку
  // extraReducers: {
  //   [fetchBook.pending]: (state) => {
  //     state.isLoadingAPI = true;
  //   },
  //   [fetchBook.fulfilled]: (state, action) => {
  //     state.isLoadingAPI = false;
  //     if (action.payload.title && action.payload.author) {
  //       state.books.push(createBookWithID(action.payload, "API"));
  //     }
  //   },
  //   [fetchBook.rejected]: (state) => {
  //     state.isLoadingAPI = false;
  //   },
  // },
});

// распаковываем объект actions
export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
// для подписки на изменения состояния isLoadingAPI
export const selectIsLoadingAPI = (state) => state.books.isLoadingAPI;

export default booksSlice.reducer;
