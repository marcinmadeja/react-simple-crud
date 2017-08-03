import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CommentsListActions.css';

class CommentsListActions extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const limit = e.target.value;
    this.props.changeRecordsLimit(limit);
  }

  render() {
    return (
      <div className="list-actions">
        show
        <select className="list-actions__select select" onChange={this.handleChange}>
          <option>20</option>
          <option>40</option>
          <option>60</option>
          <option>100</option>
        </select>
        entries
      </div>
    );
  }
}

CommentsListActions.propTypes = {
  changeRecordsLimit: PropTypes.func.isRequired,
};

export default CommentsListActions;
