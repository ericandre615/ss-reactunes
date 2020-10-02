export const getAlbumArtURL = (url = '') => size => {
  // Example
  // This could be flakey
  // The API call only seems to give size 60 and 100
  // https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b7/e2/aa/b7e2aa95-de1b-341e-9122-425d1792433d/source/100x100bb.jpg
  const regex = /[0-9]+x[0-9]+/;
  const sizedUrl = url.replace(regex, `${size}x${size}`);

  return sizedUrl;
};

export default getAlbumArtURL;
