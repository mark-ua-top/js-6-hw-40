import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { deleteContact } from '../../redux/contacts/contactsOperations';
import './ContactItem.css';

const AVATAR_COLORS = [
  ['#7c3aed', '#6d28d9'],
  ['#ec4899', '#db2777'],
  ['#06b6d4', '#0891b2'],
  ['#f97316', '#ea580c'],
  ['#22c55e', '#16a34a'],
  ['#6366f1', '#4f46e5'],
  ['#e11d48', '#be123c'],
  ['#0ea5e9', '#0284c7'],
  ['#8b5cf6', '#7c3aed'],
  ['#14b8a6', '#0d9488'],
];

const ContactItem = ({ contact, index }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    dispatch(deleteContact(contact.id))
      .unwrap()
      .then(() => toast.success(`${contact.name} видалено`))
      .catch(() => {
        toast.error('Помилка видалення');
        setIsDeleting(false);
      });
  };

  const getInitials = (name) =>
    name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  const colorIdx = contact.name.charCodeAt(0) % AVATAR_COLORS.length;
  const [c1, c2] = AVATAR_COLORS[colorIdx];

  return (
    <li
      className={`ci-item ${isDeleting ? 'ci-deleting' : ''}`}
      style={{ '--ci-delay': `${index * 0.04}s` }}
    >
      <div className="ci-left">
        <div
          className="ci-avatar"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          {getInitials(contact.name)}
        </div>
        <div className="ci-info">
          <span className="ci-name">{contact.name}</span>
          <span className="ci-phone">{contact.number}</span>
        </div>
      </div>

      <button
        className="ci-delete"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Видалити ${contact.name}`}
      >
        {isDeleting ? (
          <span className="ci-delete-loader"></span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        )}
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number,
};

export default ContactItem;
