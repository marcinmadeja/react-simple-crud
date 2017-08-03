import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CommentsItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const comment = this.props.comment;
    const link = `/edit/${comment.key}/`;
    return (
      <tr>
        <td>{comment.email}</td>
        <td>{comment.name}</td>
        <td>{comment.body}</td>
        <td><Link className="comment-list__link" to={link}><i className="fa fa-pencil-square-o" /> edit</Link></td>
      </tr>
    );
  }
}

CommentsItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentsItem;
