import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fire from '../firebase';
import './style.css';
import CommentMenu from '../CommentMenu';
import CommentForm from '../CommentForm';

class CommentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: false,
      key: 0,
    };

    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    const ref = fire.database().ref('comments').child(id);
    ref.on('value', snapshop => {
      this.setState({ comment: snapshop.val(), key: id });
    });
  }

  updateComment(updateObject) {
    const key = this.state.key;
    fire.database().ref('comments').child(key).update(updateObject);
  }

  removeComment() {
    const key = this.state.key;
    fire.database().ref('comments').child(key).remove();
  }

  renderDetails() {
    const comment = this.state.comment;

    if (!comment) {
      return <div>&nbsp;</div>;
    }

    return (
      <div>
        <CommentForm 
          type="edit" 
          comment={comment} 
          updateComment={this.updateComment} 
          removeComment={this.removeComment}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="comment-details page__content">
        <CommentMenu id={this.props.match.params.id} />
        <h2 className="comment-details__title">Edit Comments</h2>
        {this.renderDetails()}
      </div>
    );
  }
}

CommentDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CommentDetails;
