import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import SSEStore from '../stores/sse';

export default class Form extends React.Component {

  constructor() {
    super();

    this.create = this.create.bind(this);
  }

  create() {
    const obj = {
      longLink: React.findDOMNode(this.refs.long).value,
      shortLink: React.findDOMNode(this.refs.short).value,
    };
    SSEStore.createLink(obj);
  }

  render() {
    return  (
      <div>
        <Row>
          <Col md={8}  className='form-group'>
            <label htmlFor='url' className='control-label'>URL to shorten</label>
            <input id='url' type='text' className='col-md-8 big form-control'ref='long' placeholder='http://example.com'/>
          </Col>

          <Col md={4}  className='form-group'>
            <label htmlFor='vanityname' className='control-label'>Vanity Link Name</label>
            <input id='vanityname' type='text' className='col-md-4 big form-control'ref='short' placeholder='foo'/>
          </Col>
        </Row>
        <Row>
          <Col md={2} mdOffset={10} className='right'>
            <Button className='big-button' bsStyle='primary' onClick={this.create}>Shorten</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
