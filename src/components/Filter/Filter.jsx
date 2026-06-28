import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../../redux/filter/filterSlice';
import { selectFilter } from '../../redux/filter/filterSelectors';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="filter-wrap">
      <div className="filter-inner">
        <svg className="filter-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          className="filter-input"
          type="text"
          value={filter}
          onChange={handleChange}
          placeholder="Пошук за ім'ям..."
        />
        {filter && (
          <button
            className="filter-clear"
            type="button"
            onClick={() => dispatch(setFilter(''))}
            aria-label="Очистити"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
};

export default Filter;
