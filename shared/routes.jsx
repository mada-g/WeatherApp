import React from 'react';
import {Route} from 'react-router';

import {AppX} from './components/App.jsx';


export default function(baseURL){
  return (
    <Route component={AppX} path={baseURL} >
    </Route>
  );
};
