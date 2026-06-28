import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import './Navigation.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className="navigation">
      <NavLink to="/" className="nav-logo">
        <span className="logo-icon">📒</span>
        Контакти
      </NavLink>
      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Головна
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/contacts"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Мої контакти
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
