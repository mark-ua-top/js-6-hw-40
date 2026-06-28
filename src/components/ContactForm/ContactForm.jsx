import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { addContact } from '../../redux/contacts/contactsOperations';
import { selectContacts, selectContactsIsLoading } from '../../redux/contacts/contactsSelectors';
import './ContactForm.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedName = name.toLowerCase().trim();
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === normalizedName
    );

    if (isDuplicate) {
      toast.error(`${name} вже є у контактах!`);
      return;
    }

    dispatch(addContact({ name: name.trim(), number: number.trim() }))
      .unwrap()
      .then(() => {
        toast.success(`${name} додано!`);
        setName('');
        setNumber('');
      })
      .catch(() => toast.error('Не вдалося додати контакт'));
  };

  return (
    <form className="cf-form" onSubmit={handleSubmit}>
      <div className="cf-header">
        <div className="cf-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
        </div>
        <h3 className="cf-title">Новий контакт</h3>
      </div>
      
      <div className="cf-fields">
        <div className="cf-input-group">
          <label className="cf-label" htmlFor="cf-name">Ім'я</label>
          <div className="cf-input-wrap">
            <svg className="cf-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input
              className="cf-input"
              type="text"
              id="cf-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введіть ім'я"
              required
            />
          </div>
        </div>

        <div className="cf-input-group">
          <label className="cf-label" htmlFor="cf-number">Телефон</label>
          <div className="cf-input-wrap">
            <svg className="cf-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <input
              className="cf-input"
              type="tel"
              id="cf-number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="+380 XX XXX XX XX"
              required
            />
          </div>
        </div>
      </div>

      <button className="cf-submit" type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="cf-loader"></span>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Додати контакт
          </>
        )}
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default ContactForm;
