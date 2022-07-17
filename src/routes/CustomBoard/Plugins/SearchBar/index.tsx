import { ChangeEvent, FormEvent, useState } from 'react';
import { cx } from 'styles';

import { SearchIcon } from 'assets/svgs';
import { GoogleIcon, YoutubeIcon } from 'assets/svgs/presets';

import Icon from 'components/Icon';

import styles from './searchBar.module.scss';

type TSearchSite = 'google' | 'youtube';

const GOOGLE = 'https://google.com/search?q=';
const YOUTUBE = 'https://www.youtube.com/results?search_query=';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState<TSearchSite>('google');

  const typeButtonIcon = searchType === 'google' ? <GoogleIcon /> : <YoutubeIcon />;
  const placeholder = searchType === 'google' ? 'Search to Google...' : 'Serach to Youtube...';

  const serachSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput.trim() === '') return;

    const searchUrl = searchType === 'google' ? GOOGLE : YOUTUBE;
    window.open(`${searchUrl}${searchInput}`, '_blank');

    setSearchInput('');
  };

  const toggleSearchType = () => {
    setSearchType(searchType === 'google' ? 'youtube' : 'google');
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <form className={styles.searchBar} onSubmit={serachSubmitHandler}>
      <Icon type='button' size='auto' onClick={toggleSearchType}>
        {typeButtonIcon}
      </Icon>
      <fieldset className={styles.fieldset}>
        <legend hidden>search input</legend>
        <input
          type='text'
          className={cx({ [styles.youtube]: searchType === 'youtube' })}
          placeholder={placeholder}
          value={searchInput}
          onChange={inputChangeHandler}
        />
      </fieldset>
      <Icon size='auto' type='submit'>
        <SearchIcon />
      </Icon>
    </form>
  );
};

export default SearchBar;
