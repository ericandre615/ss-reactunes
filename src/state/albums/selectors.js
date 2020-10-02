export const getAlbums = state => state.albums || [{}];
export const getAlbumById = albumId => state => (state.albums || [])
  .find(({ collectionId }) => collectionId == albumId); // eslint-disable-line eqeqeq

export default {
  getAlbums,
  getAlbumById,
};
