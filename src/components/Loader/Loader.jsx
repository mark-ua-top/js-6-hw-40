import PropTypes from 'prop-types';
import './Loader.css';

const Loader = ({ size = 'medium', text = '' }) => {
  return (
    <div className={`loader-container ${size}`}>
      <div className="loader-spinner"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
};

export default Loader;
