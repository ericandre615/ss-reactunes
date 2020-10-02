import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import { push } from 'connected-react-router';
import { createRequestAction } from '@state/request/actions';
import { ALBUMS } from '@state/constants';
import { itunesURL } from '@config';

const onSuccessRedirect = url => (data, dispatch) => dispatch(push(url));

export const fetchAlbums = term => createRequestAction({
  fetchKey: ALBUMS,
  onSuccess: onSuccessRedirect('/albums'),
  apiMethod: () => {
    const encodedTerm = encodeURIComponent(term);

    return axios({
      method: 'get',
      adapter: jsonpAdapter,
      url: `${itunesURL}search?term=${encodedTerm}&entity=album`,
    }).then(({ data }) => data.results);
  },
});
