import reduceReducers from 'reduce-reducers';
import { createRequestReducer } from '@state/request/reducers';
import { ALBUMS } from '@state/constants';

const initialAlbumsState = [];

export const fetchAlbums = createRequestReducer(
  ALBUMS,
  initialAlbumsState,
);

export default reduceReducers(fetchAlbums);
