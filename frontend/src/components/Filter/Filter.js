import "./Filter.css";
// action creator
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
  setAuthorFilter,
  selectAuthorFilter,
  setOnlyFavoriteFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";
// useDispatch для отправки действие в redux store
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  // подписываемся на изменения input
  // const titleFilter = useSelector((state) => state.filter.title);
  const titleFilter = useSelector(selectTitleFilter);
  // подписываемся на изменение состояние поля
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };

  // обнуляем поле фильтрс
  const handleResetFilters = () => {
    // отправляем в redux store функцию которая зануляем ввод поля
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
            value={titleFilter}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author..."
            onChange={handleAuthorFilterChange}
            value={authorFilter}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilterChange}
            />
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
