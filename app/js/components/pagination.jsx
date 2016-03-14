import React from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';
import SSEStore from '../stores/sse';

export default class Notification extends React.Component {

  constructor() {
    super();

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event, selectedEvent) {
    const page = selectedEvent.eventKey;
    const perPage = this.props.linkData.perPage;
    History.pushState({ page }, `Page ${page}`, `?page=${page}&perPage=${perPage}`);
    SSEStore.getLinks();
  }

  render() {
    return (
      <Pagination
        first
        last
        ellipsis
        items={Math.ceil(this.props.linkData.total/this.props.linkData.perPage)}
        maxButtons={5}
        activePage={parseInt(this.props.linkData.currentPage, 10)}
        onSelect={this.handleSelect} />
    );
  }
}
