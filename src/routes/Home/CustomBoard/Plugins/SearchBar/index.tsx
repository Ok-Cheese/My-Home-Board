import { ChangeEvent, FormEvent, useState } from 'react';
import { cx } from 'styles';

import { SearchIcon } from 'assets/svgs';
import { GoogleIcon, YoutubeIcon } from 'assets/svgs/presets';

import Button from 'components/Button';

import styles from './searchBar.module.scss';
import IconButton from 'components/IconButton';

type TSearchSite = 'google' | 'youtube';

const iconSize = { height: '100%' };

const GOOGLE = 'https://google.com/search?q=';
const YOUTUBE = 'https://www.youtube.com/results?search_query=';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState<TSearchSite>('google');

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

  const typeButtonIcon = searchType === 'google' ? <GoogleIcon /> : <YoutubeIcon />;
  const placeholder = searchType === 'google' ? 'Search to Google...' : 'Serach to Youtube...';

  return (
    <form className={styles.searchBar} onSubmit={serachSubmitHandler}>
      <IconButton type='button' size='vertical' onClick={toggleSearchType}>
        {typeButtonIcon}
      </IconButton>
      <input
        type='text'
        className={cx({ [styles.searchYoutube]: searchType === 'youtube' })}
        placeholder={placeholder}
        value={searchInput}
        onChange={inputChangeHandler}
      />
      <IconButton type='submit' size='vertical'>
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBar;
