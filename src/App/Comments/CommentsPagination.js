import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CommentsPagination.css';

class CommentsPagination extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  changePage(event) {
    this.props.changePage(event.target.value);
  }

  generatePagination() {
    const currentPage = this.props.currentPage;
    const paginationNumbers = this.props.paginationNumbers;

    if (this.props.totalPages <= 1) return '';

    const list = paginationNumbers.map(
      number => <option value={number + 1} key={number + 1}>{number + 1}</option>,
    );

    return (
      <select className="pagination__select select" value={currentPage} onChange={this.changePage}>
        {list}
      </select>
    );
  }

  render() {
    const currentPage = this.props.currentPage;
    const limit = this.props.limit;
    const start = ((currentPage - 1) * limit) + 1;
    const end = ((currentPage) * limit);

    return (
      <div className="pagination">
        <span className="pagination__label">Showing {start} to {end} comments</span>
        {this.generatePagination()}
      </div>
    );
  }  
}

CommentsPagination.propTypes = {
  changePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginationNumbers: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
};


export default CommentsPagination;
