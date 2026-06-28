import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import { selectFilteredContacts, selectContactsIsLoading } from '../../redux/contacts/contactsSelectors';
import { selectFilter } from '../../redux/filter/filterSelectors';
import './ContactList.css';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const filter = useSelector(selectFilter);

  if (isLoading && contacts.length === 0) {
    return null;
  }

  if (contacts.length === 0 && filter) {
    return (
      <div className="cl-empty">
        <div className="cl-empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <p className="cl-empty-title">Нічого не знайдено</p>
        <p className="cl-empty-hint">За запитом «{filter}» контактів не знайдено</p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="cl-empty">
        <div className="cl-empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
        </div>
        <p className="cl-empty-title">Поки порожньо</p>
        <p className="cl-empty-hint">Додайте свій перший контакт через форму зліва</p>
      </div>
    );
  }

  return (
    <ul className="cl-list">
      {contacts.map((contact, index) => (
        <ContactItem key={contact.id} contact={contact} index={index} />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default ContactList;
