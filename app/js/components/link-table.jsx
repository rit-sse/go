'use strict';

import React from 'react';
import SSEStore from '../stores/sse';
import Table from 'react-bootstrap/lib/Table';
import querystring from 'querystring';

export default class LinkTable extends React.Component {

  constructor() {
    super();
    const query = querystring.parse(location.search);
    const obj = {};
    if (!isNaN(query.perPage)) {
      obj.perPage = query.perPage;
    }

    if (!isNaN(query.page)) {
      obj.page = query.page;
    }
    SSEStore.getLinks(obj);
  }

  render() {
    return (
      <div className='result'>
        <Table bordered={ true } striped={ true } >
          <thead>
            <tr>
              <th className='short-url-col'>Short URL</th>
              <th className='full-url-col'>Full URL</th>
              <th className='clicks-col'>Clicks</th>
              <th className='action-column'></th>
            </tr>
          </thead>
          <tbody>
            { this.props.linkData.data.map(link => {
              return (
                <tr>
                  <td><a href={ `/go/${link.shortLink}` }>{ link.shortLink }</a></td>
                  <td><a href={ link.longLink }>{ link.longLink }</a></td>
                  <td className='right'>{ link.count }</td>
                  <td className='action-column'>
                    <button type='submit' className='btn btn-danger btn-small' data-confirm='Are you sure?'>Delete</button>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </Table>

        <strong>{ this.props.linkData.total } total shortlinks.</strong>
      </div>
    );
  }

}
