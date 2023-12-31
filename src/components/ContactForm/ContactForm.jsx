import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addContact } from '../../redux/phonebookReducer';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts); //підписуємось на state.phonebook.contacts з файлу selectors.js

  //хук useSelector(selector). Аргументом він приймає функцію, яка оголошує один параметр state - весь об'єкт стану Redux, який буде автоматично переданий функції хуком useSelector.
  //Ця функція називається селектором і повинна повернути тільки ту частину стану, яка необхідна компоненту.
  // const value = useSelector(state => state.some.value)

  const dispatch = useDispatch();

  const [name, setName] = useState(''); // використовуємо локальний стейт для роботи з інпутами
  const [number, setNumber] = useState('');

  const onChangeInput = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    const contactData = {
      name,
      number: number.replace(/[\s()-]+/g, ''),
      id: nanoid(),
    };

    const isDuplicateName = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isDuplicateName) {
      return Notiflix.Notify.failure(
        `${name} or ${number} is already in contacts!`
      );
    }

    dispatch(addContact(contactData)); // діспатчимо (спрямовуємо) екшн addContact в payload якого передаємо contactData для запису у стейт
    setName(''); // очищуємо стейт (поля інпутів)
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <div className={css.formGroup}>
        <label className={css.formLabel}>
          <p>Name</p>
        </label>

        <input
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChangeInput}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.formLabel}>
          <p>Phone number</p>
        </label>

        <input
          className={css.formInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onChangeInput}
        />
      </div>

      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};
