import React from 'react';
import { NavLink } from 'react-router-dom';
import AlbumCard from './album-card';

import './albums.css';

export const AlbumList = props => {
  const { albums, artworkSize } = props;
  const Albums = (albums || []).map((album) => (
    <li key={ album.collectionId } className="album-item">
      <NavLink to={ `/albums/${album.collectionId}` }>
        <AlbumCard album={ album } artworkSize={ artworkSize } />
      </NavLink>
    </li>
  ));

  return (
    <ul className="albums-list">
      { Albums }
    </ul>
  );
};

export default AlbumList;
