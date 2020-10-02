import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import getAlbumArtURL from '@utils/album-art';
import { getAlbumById } from '@state/albums/selectors';

import './album.css';

export const Album = props => {
  const { match: { params: { albumId } } } = props;
  const album = useSelector(getAlbumById(albumId), shallowEqual);
  const {
    artistName,
    collectionName,
    copyright,
    artistViewUrl,
    collectionViewUrl,
    artworkUrl100,
  } = album || {};

  const sizedAlbumArtURL = getAlbumArtURL(artworkUrl100)(600);

  if (!album) {
    return (<p className="warning">Album Not Found</p>);
  }

  return (
    <article id={ `album-${albumId}` } className="album-details">
      <div className="img-mask">
        <img src={ sizedAlbumArtURL } alt={ `${artistName} ${collectionName} Album Cover` } />
      </div>
      <div className="main-info">
        <h1>{ collectionName }</h1>
        <h2><a href={ artistViewUrl }>{ artistName }</a></h2>
        <h3>{ copyright }</h3>
        <a href={ collectionViewUrl } className="btn purchase-btn">Get it on iTunes</a>
      </div>
    </article>
  );
};

export default Album;
