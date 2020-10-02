import getAlbumArtURL from '../album-art';

/* eslint-disable max-len */

describe('getAlbumArtURL', () => {
  it('should replace the iTunes API URL with a different size', () => {
    const testURL = 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b7/e2/aa/b7e2aa95-de1b-341e-9122-425d1792433d/source/100x100bb.jpg';
    const getAlbumArt = getAlbumArtURL(testURL);
    const size600AlbumArt = getAlbumArt(600);
    const expectedURL = 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b7/e2/aa/b7e2aa95-de1b-341e-9122-425d1792433d/source/600x600bb.jpg';

    expect(size600AlbumArt).toEqual(expectedURL);
  });

  it('should work with any size base iTunes API URL', () => {
    const testURL = 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b7/e2/aa/b7e2aa95-de1b-341e-9122-425d1792433d/source/60x60bb.jpg';
    const getAlbumArt = getAlbumArtURL(testURL);
    const size200AlbumArt = getAlbumArt(200);
    const expectedURL = 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b7/e2/aa/b7e2aa95-de1b-341e-9122-425d1792433d/source/200x200bb.jpg';

    expect(size200AlbumArt).toEqual(expectedURL);
  });

  it('should work if the url changes, but still uses a 00x00 format for size', () => {
    const testURL = 'https://www.itunes.com/image/thumb/Music/v2/source?800x800aaa.webp';
    const getAlbumArt = getAlbumArtURL(testURL);
    const size400AlbumArt = getAlbumArt(400);
    const expectedURL = 'https://www.itunes.com/image/thumb/Music/v2/source?400x400aaa.webp';

    expect(size400AlbumArt).toEqual(expectedURL);
  });

  it('should hand back an empty string if url is undefined', () => {
    const testURL = undefined;
    const getAlbumArt = getAlbumArtURL(testURL);
    const size400AlbumArt = getAlbumArt(400);
    const expectedURL = '';

    expect(size400AlbumArt).toEqual(expectedURL);
  });
});
