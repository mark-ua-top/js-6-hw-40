import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { logOut } from '../../redux/auth/authOperations';
import { selectUser, selectAuthIsLoading } from '../../redux/auth/authSelectors';
import { exportData, importData } from '../../services/localStorageAPI';
import './UserMenu.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthIsLoading);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Дані експортовано!');
      setShowMenu(false);
    } catch (error) {
      toast.error('Помилка експорту');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        importData(data);
        toast.success('Дані імпортовано! Перезавантажте сторінку.');
        setShowMenu(false);
      } catch (error) {
        toast.error('Невірний формат файлу');
      }
    };
    input.click();
  };

  return (
    <div className="user-menu">
      <div className="user-info">
        <div className="user-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : '?'}
        </div>
        <div className="user-details">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
      </div>

      <div className="user-actions">
        <div className="dropdown-container">
          <button
            className="sync-btn"
            onClick={() => setShowMenu(!showMenu)}
            title="Синхронізація"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9"/>
            </svg>
          </button>
          
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={handleExport} className="dropdown-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Експорт даних
              </button>
              <button onClick={handleImport} className="dropdown-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Імпорт даних
              </button>
              <div className="dropdown-divider"></div>
              <p className="dropdown-hint">
                Експортуйте дані на одному пристрої та імпортуйте на іншому для синхронізації
              </p>
            </div>
          )}
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? '...' : 'Вийти'}
        </button>
      </div>
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
