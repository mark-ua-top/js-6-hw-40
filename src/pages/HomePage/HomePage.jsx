import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import './HomePage.css';

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="home-page">
      {/* Decorative blobs */}
      <div className="home-blob home-blob-1"></div>
      <div className="home-blob home-blob-2"></div>
      <div className="home-blob home-blob-3"></div>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Безкоштовний менеджер контактів
          </div>

          <h1 className="hero-title">
            Ваші контакти —
            <span className="hero-gradient-text"> завжди під рукою</span>
          </h1>

          <p className="hero-subtitle">
            Зберігайте, організовуйте та шукайте контакти з будь-якого пристрою. 
            Простий і елегантний інтерфейс для повсякденного використання.
          </p>
          
          {!isLoggedIn && (
            <div className="hero-actions">
              <Link to="/register" className="btn-hero-primary">
                Розпочати безкоштовно
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/login" className="btn-hero-secondary">
                Увійти в акаунт
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div className="hero-actions">
              <Link to="/contacts" className="btn-hero-primary">
                Перейти до контактів
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          )}
        </div>

        <div className="hero-visual">
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="phone-header">
                <span className="phone-title">Контакти</span>
                <span className="phone-count">3</span>
              </div>
              <div className="phone-search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <span>Пошук...</span>
              </div>
              <div className="phone-contacts">
                <div className="phone-contact" style={{'--delay': '0.1s'}}>
                  <div className="pc-avatar" style={{background: 'linear-gradient(135deg, #7c3aed, #6d28d9)'}}>ОК</div>
                  <div className="pc-info">
                    <span className="pc-name">Олександр Коваленко</span>
                    <span className="pc-phone">+380 50 123 4567</span>
                  </div>
                </div>
                <div className="phone-contact" style={{'--delay': '0.2s'}}>
                  <div className="pc-avatar" style={{background: 'linear-gradient(135deg, #ec4899, #db2777)'}}>МП</div>
                  <div className="pc-info">
                    <span className="pc-name">Марія Петренко</span>
                    <span className="pc-phone">+380 67 890 1234</span>
                  </div>
                </div>
                <div className="phone-contact" style={{'--delay': '0.3s'}}>
                  <div className="pc-avatar" style={{background: 'linear-gradient(135deg, #06b6d4, #0891b2)'}}>ДС</div>
                  <div className="pc-info">
                    <span className="pc-name">Дмитро Сидоренко</span>
                    <span className="pc-phone">+380 63 456 7890</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-glow"></div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card" style={{'--delay': '0s'}}>
            <div className="feature-icon-wrap">
              <div className="feature-icon">⚡</div>
            </div>
            <h3>Миттєвий доступ</h3>
            <p>Знаходьте потрібний контакт за лічені секунди завдяки розумному пошуку</p>
          </div>
          <div className="feature-card" style={{'--delay': '0.1s'}}>
            <div className="feature-icon-wrap">
              <div className="feature-icon">🔐</div>
            </div>
            <h3>Повна безпека</h3>
            <p>JWT-авторизація та зашифроване з'єднання для захисту ваших даних</p>
          </div>
          <div className="feature-card" style={{'--delay': '0.2s'}}>
            <div className="feature-icon-wrap">
              <div className="feature-icon">☁️</div>
            </div>
            <h3>Хмарне сховище</h3>
            <p>Контакти синхронізуються автоматично і доступні з будь-якого пристрою</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
