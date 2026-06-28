import { NavLink } from 'react-router-dom';
import './AuthNav.css';

const AuthNav = () => {
  return (
    <div className="auth-nav">
      <NavLink
        to="/register"
        className={({ isActive }) => `auth-link register ${isActive ? 'active' : ''}`}
      >
        📝 Реєстрація
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => `auth-link login ${isActive ? 'active' : ''}`}
      >
        🔑 Увійти
      </NavLink>
    </div>
  );
};

export default AuthNav;
