'use strict';

import React from 'react';
import SSEStore from '../stores/sse';
import LogIn from './log-in';

export default class GoApp extends React.Component {
  constructor() {
    super();
    this.renderSignIn = this.renderSignIn.bind(this);
  }

  renderSignIn() {
    if (!this.props.loggedIn) {
      return <LogIn />;
    }

    return (
      <button id='sign-out' className='btn' onClick={SSEStore.signOut}>Sign Out</button>
    );
  }

  render() {
    return (
      <div className='container'>
        <h1>
          <div className='pull-right'>{ this.renderSignIn() }</div>
          <span id='title'>Go</span>
        </h1>
      </div>
    );
  }
}
