/*благодаря библиотеки immer(@reduxjs/toolkit) мы можем изменять объект state*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

// createSlice содепжит в себе свойства actions, reducer
const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // тут формируем новый объект
      //   return { ...state, title: action.payload };
      // тут изменяем свойство существ. объекта
      state.title = action.payload;
    },
    // обнуляем значение всех фильтров
    resetFilters: (state) => {
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
export const { setTitleFilter, resetFilters } = filterSlice.actions;

// подписываемся на state.filter.title чтобы смотреть изменнения
export const selectTitleFilter = (state) => state.filter.title;

// свoйсто reducer находится внутри файла filterSlice
export default filterSlice.reducer;
