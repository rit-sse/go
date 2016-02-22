import React from 'react';
import SSEStore from '../stores/sse';
import LogIn from './log-in';
import Notification from './notification';
import querystring from 'querystring';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Form from './form';
import LinkTable from './link-table';

export default class GoApp extends React.Component {
  constructor() {
    super();
    this.renderSignIn = this.renderSignIn.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderFormAndList = this.renderFormAndList.bind(this);
  }

  renderSignIn() {
    if (!this.props.loggedIn) {
      return <LogIn />;
    }

    return (
      <button id='sign-out' className='btn' onClick={SSEStore.signOut}>Sign Out</button>
    );
  }

  renderFormAndList() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Form />
          <br />
          <LinkTable linkData={this.props.linkData}/>
        </div>
      );
    }

    return <span />;
  }

  renderError() {
    const err = querystring.parse(location.search.replace('?', '')).error;
    if (err) {
      return <Notification type='danger' notice={{ message: `No Go Link found for ${err}` }} />;
    }
    return <span />;
  }

  render() {
    return (
      <div className='container'>
        <PageHeader>
          <div className='pull-right'>{this.renderSignIn()}</div>
          <span id='title'>Go</span>
        </PageHeader>
        {this.renderError()}
        <Notification type='success' notice={this.props.status} />
        <Notification type='danger' notice={this.props.err} />
        {this.renderFormAndList()}
      </div>
    );
  }
}
