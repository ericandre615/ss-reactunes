import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAlbums } from '@state/albums/actions';
import debounce from '@utils/debounce';

import './header.css';

const GBV = 'Guided By Voices';

const debouncedFetch = dispatch => (fn, wait) => {
  const debounced = debounce(dispatch, wait);

  return e => {
    e.persist();
    e.preventDefault();
    const { target: { value } } = e;
    const term = `${GBV} ${value}`;

    return debounced(fetchAlbums(term)());
  };
};

export const Header = () => {
  const dispatch = useDispatch();
  const debouncedFetchDispatch = debouncedFetch(dispatch);

  return (
    <header role="banner">
      <h1><NavLink to="/">GBV</NavLink></h1>
      <nav role="navigation" id="main-nav">
        <ul role="menubar">
          <li role="menuitem"><NavLink to="/albums">Albums</NavLink></li>
          <li role="menuitem"><NavLink to="/favorites">Favorites</NavLink></li>
        </ul>
        <input
          type="text"
          id="api-search"
          onChange={ debouncedFetchDispatch(fetchAlbums, 600) }
          placeholder="Search Albums"
        />
      </nav>
    </header>
  );
};

export default Header;
