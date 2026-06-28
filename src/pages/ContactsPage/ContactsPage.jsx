import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/contactsOperations';
import { selectContactsIsLoading, selectContactsError, selectContacts } from '../../redux/contacts/contactsSelectors';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import Filter from '../../components/Filter/Filter';
import Loader from '../../components/Loader/Loader';
import './ContactsPage.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="contacts-page">
      <div className="cp-decor cp-decor-1"></div>
      <div className="cp-decor cp-decor-2"></div>

      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Мої контакти</h1>
          <p className="page-subtitle">
            {contacts.length > 0 
              ? `${contacts.length} ${getWord(contacts.length)}`
              : 'Почніть додавати контакти'
            }
          </p>
        </div>
        {contacts.length > 0 && (
          <div className="page-stats">
            <div className="stat-badge">
              <span className="stat-number">{contacts.length}</span>
              <span className="stat-label">всього</span>
            </div>
          </div>
        )}
      </div>

      <div className="contacts-layout">
        <aside className="contacts-sidebar">
          <ContactForm />
        </aside>

        <main className="contacts-main">
          {contacts.length > 1 && <Filter />}
          
          {isLoading && contacts.length === 0 && (
            <Loader text="Завантаження контактів..." />
          )}
          
          {error && (
            <div className="error-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p>{error}</p>
            </div>
          )}
          
          <ContactList />
          
          {isLoading && contacts.length > 0 && (
            <div className="inline-loader">
              <Loader size="small" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

function getWord(n) {
  if (n === 1) return 'контакт';
  if (n >= 2 && n <= 4) return 'контакти';
  return 'контактів';
}

export default ContactsPage;
