import React from 'react';
import Albums from '@components/albums/list';
import myFavorites from '@config/my-favorites';

export const AlbumList = () => (
  <div>
    <Albums albums={ myFavorites } artworkSize={ 600 } />
  </div>
);

export default AlbumList;
