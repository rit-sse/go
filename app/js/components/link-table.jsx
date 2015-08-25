'use strict';

import React from 'react';
import SSEStore from '../stores/sse';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import Pagination from './pagination';
import Modal from 'react-bootstrap/lib/Modal';

export default class LinkTable extends React.Component {

  constructor() {
    super();
    SSEStore.getLinks();
    this.state = { showModal: false };
    this.destroy = this.destroy.bind(this);
    this.showModal = this.showModal.bind(this);
    this.close = this.close.bind(this);
  }

  destroy() {
    SSEStore.destroyLink(this.state.index);
    this.close();
  }

  showModal(index) {
    this.setState({ index, showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className='result'>
        <Table bordered striped>
          <thead>
            <tr>
              <th className='short-url-col'>Short URL</th>
              <th className='full-url-col'>Full URL</th>
              <th className='action-column'></th>
            </tr>
          </thead>
          <tbody>
            {this.props.linkData.data.map((link, index) => {
              return (
                <tr key={link.shortLink}>
                  <td><a href={`/go/${link.shortLink}`}>{link.shortLink}</a></td>
                  <td><a href={link.longLink}>{link.longLink}</a></td>
                  <td className='action-column'>
                    <Button bsStyle='danger' bsSize='small' onClick={this.showModal.bind(this, index)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            <p>Are you sure?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>No</Button>
            <Button onClick={this.destroy} bsStyle='primary'>Yes</Button>
          </Modal.Footer>
        </Modal>

        <strong>{this.props.linkData.total} total shortlinks.</strong>
        <div className='text-center'>
          <Pagination linkData={this.props.linkData} />
        </div>
      </div>
    );
  }

}
