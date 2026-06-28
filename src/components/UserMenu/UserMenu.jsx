import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../../redux/auth/authOperations';
import { selectUser, selectAuthIsLoading } from '../../redux/auth/authSelectors';
import './UserMenu.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthIsLoading);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="user-menu">
      <div className="user-info">
        <div className="user-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
        </div>
        <div className="user-details">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
      </div>
      <button
        className="logout-btn"
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? '...' : '🚪 Вийти'}
      </button>
    </div>
  );
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default UserMenu;
