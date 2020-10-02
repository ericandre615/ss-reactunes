import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FavoritesList from './list';

export const Favorites = () => (
  <section id="albums">
    <Switch>
      <Route exact path="/favorites" component={ FavoritesList } />
    </Switch>
  </section>
);

export default Favorites;
