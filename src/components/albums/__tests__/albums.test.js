import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AlbumList from '../list';
import AlbumCard from '../album-card';

const mockAlbums = [
  {
    collectionId: 280176511,
    artistName: 'Guided By Voices',
    collectionName: 'Propeller',
    artistViewUrl: 'https://mock.artist.url',
    collectionViewUrl: 'https://mock.collection.url/propeller',
    artworkUrl100: 'https://mock.album.art/source/100x100aa.jpg',
    copyright: '℗ 1992 Scat',
    releaseDate: '1992-02-14T08:00:00Z',
  },
  {
    collectionId: 328165532,
    artistName: 'Guided By Voices',
    collectionName: 'Suitcase - Failed Experiments and Trashed Aircraft',
    artistViewUrl: 'https://mock.artist.url',
    collectionViewUrl: 'https://mock.collection.url/suitcase',
    artworkUrl100: 'https://mock.album.art/100x100bb.png',
    copyright: '℗ 2000 Fading Captain Series',
    releaseDate: '2000-12-01T08:00:00Z',
  },
];

describe('Albums Components', () => {
  it('should match empty snapshot', () => {
    const ShallowAlbumList = shallow(<AlbumList />);

    expect(toJson(ShallowAlbumList)).toMatchSnapshot();
  });

  it('should match snapshot with list', () => {
    const ShallowAlbumList = shallow(
      <AlbumList albums={ mockAlbums } artworkSize={ 400 } />,
    );

    expect(toJson(ShallowAlbumList)).toMatchSnapshot();
  });

  it('should match single AlbumCard snapshot', () => {
    const ShallowAlbum = shallow(<AlbumCard album={ mockAlbums[0] } albumSize={ 600 } />);

    expect(toJson(ShallowAlbum)).toMatchSnapshot();
  });
});
