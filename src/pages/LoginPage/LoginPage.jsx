import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logIn } from '../../redux/auth/authOperations';
import { selectAuthIsLoading } from '../../redux/auth/authSelectors';
import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthIsLoading);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn({ email, password }))
      .unwrap()
      .then(() => toast.success('З поверненням! 👋'))
      .catch((err) => toast.error(err || 'Невірний email або пароль'));
  };

  return (
    <div className="auth-page">
      <div className="auth-decor auth-decor-1"></div>
      <div className="auth-decor auth-decor-2"></div>

      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="auth-header">
            <div className="auth-icon-wrap">
              <span>👋</span>
            </div>
            <h1 className="auth-title">З поверненням</h1>
            <p className="auth-subtitle">Увійдіть до свого акаунту</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="input-group">
              <label className="input-label" htmlFor="login-email">Email</label>
              <div className="input-wrap">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input
                  className="input-field"
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="login-password">Пароль</label>
              <div className="input-wrap">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  className="input-field"
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введіть пароль"
                  required
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button className="auth-submit" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="auth-btn-loader"></span>
              ) : (
                'Увійти'
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>або</span>
          </div>

          <p className="auth-switch">
            Не маєте акаунту?{' '}
            <Link to="/register" className="auth-switch-link">Зареєструватися</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
