import React from 'react';
import { Route } from 'react-router';

export const PropsRoute = ({ component: Component, condition, ...props }) => {
  if (condition === false) {
    return null;
  }

  return (
    <Route
      { ...props }
      render={ renderProps => (<Component { ...renderProps } { ...props } />) }
    />
  );
};

export default PropsRoute;
