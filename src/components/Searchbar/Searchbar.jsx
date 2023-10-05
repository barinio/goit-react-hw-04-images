import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

export const Searchbar = ({ getSearchData }) => {
  const [value, setValue] = useState('');
  const [duplicate, setDuplicate] = useState('');

  const onChangeInput = ({ target: { value } }) => {
    setValue(value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return toast.error(`Value cannot be empty`);
    }

    if (duplicate === value) {
      return toast.error(`Value cannot be the same`);
    }
    setDuplicate(value);
    getSearchData(value);
    setValue('');
  };
  return (
    <header className="searchbar">
      <form className="search-form" onSubmit={onSubmitForm}>
        <button type="submit" className="search-form-button">
          <span className="button-label">
            <AiOutlineSearch size="24" color="white" />
          </span>
        </button>

        <input
          className="search-form-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
};
