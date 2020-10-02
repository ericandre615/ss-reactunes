import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Albums from '@components/albums/list';
import { getAlbums } from '@state/albums/selectors';
import { fetchAlbums } from '@state/albums/actions';

export const AlbumList = () => {
  const albums = useSelector(getAlbums, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!albums.length) {
      dispatch(fetchAlbums('Guided By Voices')());
    }
  }, [dispatch, albums]);

  return (
    <div>
      <Albums albums={ albums } artworkSize={ 600 } />
    </div>
  );
};

export default AlbumList;
