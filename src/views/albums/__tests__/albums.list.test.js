import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AlbumsList from '../list';

const mockState = [{
  collectionId: 328165532,
  artistName: 'Guided By Voices',
  collectionName: 'Suitcase - Failed Experiments and Trashed Aircraft',
  artistViewUrl: 'https://mock.artist.url',
  collectionViewUrl: 'https://mock.collection.url/suitcase',
  artworkUrl100: 'https://mock.album.art/100x100bb.png',
  copyright: '℗ 2000 Fading Captain Series',
  releaseDate: '2000-12-01T08:00:00Z',
}];

jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => mockState), // mockUseSelector,
    useDispatch: jest.fn(),
  };
});

describe('AlbumsList View', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match default snapshot', () => {
    const ShallowAlbumsList = shallow(<AlbumsList />);

    expect(toJson(ShallowAlbumsList)).toMatchSnapshot();
  });
});
