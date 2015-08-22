'use strict';

import React from 'react';
import AltContainer from 'alt/AltContainer';
import GoApp from './components/app';
import SSEStore from './stores/sse';


window.onload = () =>  {
  gapi.load('auth2', () => {
    React.render(
      <AltContainer
        store={SSEStore}
        component={GoApp}
      />, document.getElementById('app'));
  });
};
