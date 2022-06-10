import { ChangeEvent, FormEvent, useState } from 'react';
import { cx } from 'styles';

import { SearchIcon } from 'assets/svgs';
import { GoogleIcon, YoutubeIcon } from 'assets/svgs/presets';

import styles from './searchBar.module.scss';

type TSearchSite = 'google' | 'youtube';

const GOOGLE = 'https://google.com/search?q=';
const YOUTUBE = 'https://www.youtube.com/results?search_query=';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState<TSearchSite>('google');

  const serachSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchUrl = searchType === 'google' ? GOOGLE : YOUTUBE;
    window.open(`${searchUrl}${searchInput}`, '_blank');
  };

  const typeButtonIcon = searchType === 'google' ? <GoogleIcon /> : <YoutubeIcon />;
  const placeholder = searchType === 'google' ? 'Search to Google...' : 'Serach to Youtube...';

  const toggleSearchType = () => {
    setSearchType(searchType === 'google' ? 'youtube' : 'google');
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <form className={styles.searchBar} onSubmit={serachSubmitHandler}>
      <button type='button' onClick={toggleSearchType}>
        {typeButtonIcon}
      </button>
      <input
        type='text'
        className={cx({ [styles.searchYoutube]: searchType === 'youtube' })}
        placeholder={placeholder}
        onChange={inputChangeHandler}
      />
      <button type='submit'>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
