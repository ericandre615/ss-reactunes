import { isFetchingReducers } from './request/reducers';
import errorsReducers from './errors/reducers';
import albumsReducers from './albums/reducers';

export default {
  isFetching: isFetchingReducers,
  errors: errorsReducers,
  albums: albumsReducers,
};
