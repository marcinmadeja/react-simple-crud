import React, { Component } from 'react';
import fire from '../firebase';
import CommentForm from '../CommentForm';
import CommentMenu from '../CommentMenu';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.createComment = this.createComment.bind(this);
  }

  createComment(comment) {
    console.log(comment);
    fire.database().ref('comments').push(comment);
  }

  render() {
    return (
      <div className="page__content">
        <CommentMenu />
        <h2 className="page__title">Create comment</h2>
        <CommentForm createComment={this.createComment} />
      </div>
    );
  }
}

export default CreateComment;
