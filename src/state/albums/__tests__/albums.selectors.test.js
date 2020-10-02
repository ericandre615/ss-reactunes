import { getAlbums, getAlbumById } from '../selectors';

describe('[albums] selectors', () => {
  describe('getAlbums', () => {
    it('should return [{}] if no state', () => {
      const albums = getAlbums({});

      expect(albums).toEqual([{}]);
    });

    it('should return a collection of albums if populated', () => {
      const state = {
        albums: [{ _id: 123, title: 'Album One' }, { _id: 321, title: 'Album Two' }],
      };
      const albums = getAlbums(state);

      expect(albums).toEqual(state.albums);
    });
  });

  describe('getAlbumById', () => {
    it('should get album details by the id', () => {
      const state = {
        albums: [{ collectionId: 12345, name: 'one' }, { collectionId: 54321, name: 'two' }],
      };
      const testId = 54321;
      const album = getAlbumById(testId)(state);
      const expectedAlbum = { collectionId: 54321, name: 'two' };

      expect(album).toEqual(expectedAlbum);
    });
  });
});
