import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AlbumList from './list';
import Album from './album';

export const Albums = () => (
  <section id="albums">
    <Switch>
      <Route path="/albums/:albumId" component={ Album } />
      <Route exact path="/albums" component={ AlbumList } />
    </Switch>
  </section>
);

export default Albums;
