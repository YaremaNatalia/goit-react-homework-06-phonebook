import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from '../../redux/phonebookReducer';
import { selectVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
  const filteredContacts = useSelector(selectVisibleContacts); //відображення відфільтрованих контактів

  const dispatch = useDispatch();

  const onRemoveContact = contactId => {
    dispatch(deleteContact(contactId)); //передаємо id в пейлоад екшн deleteContact, для видалення
  };

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <p className={css.contactName}>{name}:</p>
          <span className={css.contactNumber}>{number}</span>
          <button
            type="button"
            className={css.removeBtn}
            onClick={() => {
              onRemoveContact(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
