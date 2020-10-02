import React from 'react';
import getAlbumArtURL from '@utils/album-art';
import { displayDate } from '@utils/date-format';

export const AlbumCard = props => {
  const {
    album: {
      artistName,
      collectionName,
      releaseDate,
      artworkUrl100,
    },
    artworkSize = 100,
  } = props;

  const sizedAlbumArtURL = getAlbumArtURL(artworkUrl100)(artworkSize);

  return (
    <article className="album-card">
      <div className="img-mask">
        <img src={ sizedAlbumArtURL } alt={ `${artistName} ${collectionName} Album Cover` } />
      </div>
      <div className="album-info">
        <span className="album-name-mask">
          <h1 className="album-name">{ collectionName }</h1>
        </span>
        <h2 className="artist-name">{ artistName }</h2>
        <h3 className="release-date">{ displayDate(releaseDate) }</h3>
      </div>
    </article>
  );
};

export default AlbumCard;
