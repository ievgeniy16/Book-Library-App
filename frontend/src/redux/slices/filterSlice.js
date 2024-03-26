/*благодаря библиотеки immer(@reduxjs/toolkit) мы можем изменять объект state*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  onlyFavorite: false,
};

// createSlice содепжит в себе свойства actions, reducer
const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    // поиск по title
    setTitleFilter: (state, action) => {
      // тут формируем новый объект
      //   return { ...state, title: action.payload };
      // тут изменяем свойство существ. объекта
      state.title = action.payload;
    },
    // поиск по author
    setAuthorFilter: (state, action) => {
      // you can mutate state thanks to Immer library
      state.author = action.payload;
    },
    setOnlyFavoriteFilter: (state) => {
      state.onlyFavorite = !state.onlyFavorite;
    },
    // обнуляем значение всех фильтров
    resetFilters: () => {
      // state.title = ''; // либо так
      return initialState;
    },
  },
});

// console.log(filterSlice.actions);
// console.log(filterSlice.actions.setTitleFilter('test'));

// const setTitleFilter = filterSlice.actions.setTitleFilter
// или же деструкторизация
// export action creators
export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  resetFilters,
} = filterSlice.actions;

// подписываемся на state.filter.title чтобы смотреть изменнения
export const selectTitleFilter = (state) => state.filter.title;
// подписываемся на второе поле автора
export const selectAuthorFilter = (state) => state.filter.author;
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavorite;

// свoйсто reducer находится внутри файла filterSlice
export default filterSlice.reducer;
