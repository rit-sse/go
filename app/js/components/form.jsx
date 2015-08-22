'use strict';

import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';

export default class Form extends React.Component {

  render() {
    return  (
      <div>
        <Row>
          <Col md={ 8 } >
            <Input
              type='text'
              className='col-md-8 big'
              label='URL to shorten'
              ref='URL'
              id='url'
              placeholder='http://example.com'
            />
          </Col>

          <Col md={ 4 } >
            <Input
              type='text'
              label='Vanity Link Name'
              className='col-md-4 big'
              ref='vanity'
              id='vanityname'
              placeholder='foo'
              value='tree'
            / >
          </Col>
        </Row>
        <Row>
          <Col md={ 2 } mdOffset={ 10 } className='right'>
            <Button className='big-button' bsStyle='primary'>Shorten</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
