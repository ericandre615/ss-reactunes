import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '@components/layout';
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import NotFound from '@components/routes/not-found';
import Index from '@views';
import Albums from '@views/albums';
import Favorites from '@views/favorites';

const Routes = () => (
  <Layout>
    <Route path="*" component={ Header } />
    <Switch>
      <Route exact path="/" component={ Index } />
      <Route path="/albums" component={ Albums } />
      <Route path="/favorites" component={ Favorites } />
      <Route exact component={ NotFound } />
    </Switch>
    <Route path="*" component={ Footer } />
  </Layout>
);

export default Routes;
