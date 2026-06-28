import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import './Layout.css';

const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <p>
          Книга контактів · {new Date().getFullYear()} · Побудовано з React & Redux
        </p>
      </footer>
    </div>
  );
};

export default Layout;
