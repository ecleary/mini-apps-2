import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';
import { Event } from './Event.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      offset: 0,
      itemsPerPage: 10,
    };
    this.getData = this.getData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  getData() {
    const { offset, itemsPerPage } = this.state;
    $.ajax({
      url: `/events?_page=${offset}&_limit=${itemsPerPage}`,
      method: 'GET',
      success: (data, textStatus, jqXhr) => {
        const headers = jqXhr.getAllResponseHeaders();
        const xTotalCount = Number(headers.slice(headers.indexOf('x-total-count') + 15));
        this.setState({
          data: data,
          pageCount: Math.ceil(xTotalCount / itemsPerPage),
        });
      },
      error: console.error,
    });
  }

  componentDidMount() {
    this.getData();
  }

  handlePageChange({ selected }) {
    const { itemsPerPage } = this.state;
    this.setState({
      offset: selected,
    }, this.getData);
  }

  render() {
    const { data, pageCount } = this.state;
    const events = data.map((eventData) => {
      return <Event key={JSON.stringify(eventData)} eventData={eventData} />;
    });

    return (
      <div>
        {events}
        <div className="doc-level-pagination-container">
          <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange}
            containerClassName={'__1__ pagination-container'}
            disabledClassName={'__2__ disabled-prev-next-container'}
            previousClassName={'__3__ enabled-previous-container'}
            previousLinkClassName={'__4__ previous-link'}
            activeClassName={'__5__ selected-page-container'}
            pageLinkClassName={'__6__ all-pages-link'}
            pageClassName={'__7__ unselected-pages-container'}
            breakClassName={'__8__ break-container'}
            breakLinkClassName={'__9__ break-link'}
            nextClassName={'__10__ enabled-next-container'}
            nextLinkClassName={'__11__ next-link'}
          />
        </div>
      </div>
    );
  }
}
