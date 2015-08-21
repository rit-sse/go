'use strict';

import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';

export default class Notification extends React.Component {

  render() {
    if (this.props.notice) {
      return  (
        <Alert bsStyle={ this.props.type }>
          { this.props.notice.message }
        </Alert>
      );
    }
    return <span />;
  }
}
