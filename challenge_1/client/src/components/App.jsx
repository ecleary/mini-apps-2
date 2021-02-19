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
      inputSearchText: '',
      submittedSearchText: '',
    };
    this.getData = this.getData.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
    this.handleClearInput = this.handleClearInput.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  getData() {
    const { offset, itemsPerPage, submittedSearchText } = this.state;
    $.ajax({
      url: submittedSearchText === ''
        ? `/events?_page=${offset + 1}&_limit=${itemsPerPage}`
        : `/events?_page=${offset + 1}&_limit=${itemsPerPage}&q=${submittedSearchText}`,
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

  handleInputText({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmitText(event) {
    event.preventDefault();
    const { inputSearchText } = this.state;
    if (inputSearchText !== '') {
      this.setState({
        submittedSearchText: inputSearchText,
      }, this.getData);
    }
  }

  handleClearInput() {
    const { submittedSearchText } = this.state;
    this.setState({
      inputSearchText: '',
    });
    if (submittedSearchText !== '') {
      this.setState({
        submittedSearchText: '',
      }, this.getData);
    }
  }

  handlePageChange({ selected }) {
    const { itemsPerPage } = this.state;
    this.setState({
      offset: selected,
    }, this.getData);
  }

  render() {
    const { data, pageCount, inputSearchText } = this.state;
    const events = data.map((eventData) => {
      return <Event key={JSON.stringify(eventData)} eventData={eventData} />;
    });

    return (
      <div>
        <div className="form-container">
          <form onSubmit={this.handleSubmitText} onReset={this.handleClearInput} >
            <label>
              Search events:
              <input
                type="text"
                placeholder="Enter search term"
                name="inputSearchText"
                value={inputSearchText}
                onChange={this.handleInputText}
                className="search-input-field"
              />
              <input type="submit" value="Search" />
              <div className="reset-button-container">
                {inputSearchText === ''
                  ? null
                  : <input type="reset" value="×" className="reset-button" />}
              </div>
            </label>
          </form>
        </div>
        {events}
        <div className="doc-level-pagination-container">
          <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'···'}
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
