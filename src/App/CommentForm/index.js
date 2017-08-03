import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

import Validation from '../helpers/Validation';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    const comment = this.props.comment;
    const type = this.props.type; 
    this.state = { comment, type };
    
    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  createComment(e) {
    e.preventDefault();
    const comment = { 
      email: this.detailsEmail.value,
      name: this.detailsName.value,
      body: this.detailsBody.value,
    };

    // const validate = [
    //   {va}
    // ]

    if (Validation.isEmail(comment.email)) {
      this.props.createComment(comment);
      this.detailsEmail.value = '';
      this.detailsName.value = '';
      this.detailsBody.value = '';
    } else {
      alert('Dodaj email');
    }
  }

  updateComment(e) {
    e.preventDefault();
    const comment = { 
      email: this.detailsEmail.value,
      name: this.detailsName.value,
      body: this.detailsBody.value,
    };
    const form = e.target;

    const errorMsg = Validation.validateForm(form);

    if (Validation.isEmail(comment.email)) {
      this.props.updateComment(comment);
    } else {
      alert('Dodaj email');
    }
  }

  removeComment() {
    this.props.removeComment();
  }

  renderButtons() {
    const type = this.state.type;
    let actions;

    if (type === 'edit') {
      actions = (
        <footer className="comment-details__actions comment-details__group">
          <Link className="btn--cancel btn" to="/">Cancel</Link>
          <button className="btn--update btn">Update comment</button>
          <button className="btn--delete btn" onClick={this.removeComment}>Delete</button>
        </footer>
      );
    } else if (type === 'add') {
      actions = (
        <footer className="comment-details__actions comment-details__group">
          <Link className="btn--cancel btn" to="/">Cancel</Link>
          <button className="btn--update btn">Create comment</button>
        </footer>
      );     
    }

    return actions;
  }

  render() {
    const type = this.state.type;
    const comment = this.state.comment;
    const onSubmit = type === 'edit' ? this.updateComment : this.createComment;

    return (
      <div className="comment-form__content">
        <form className={`js-form--${type} comment-form`} onSubmit={onSubmit}>
          <div className="comment-form__group">
            <label className="comment-form__label">E-mail</label>
            <input 
              className="comment-form__input" 
              defaultValue={comment.email} 
              ref={(input) => { this.detailsEmail = input; }}
              type="text" 
              data-jvalid="required email"
            />
          </div>

          <div className="comment-form__group">
            <label className="comment-form__label">Name</label>
            <textarea 
              className="comment-form__input--textarea comment-form__input" 
              defaultValue={comment.name} 
              ref={(input) => { this.detailsName = input; }}
              type="text" 
              data-jvalid="required"
            />
          </div>
          
          <div className="comment-form__group">
            <label className="comment-form__label">Body</label>
            <textarea 
              className="comment-form__input--textarea comment-form__input" 
              defaultValue={comment.body} 
              ref={(input) => { this.detailsBody = input; }}
              type="text" 
              data-jvalid="required"
            />
          </div>

          {this.renderButtons()}
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  comment: PropTypes.object,
  type: PropTypes.string,
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  removeComment: PropTypes.func,
};

CommentForm.defaultProps = {
  comment: { email: '', name: '', body: '' },
  type: 'add',
  createComment: () => {},
  updateComment: () => {},
  removeComment: () => {},
};


export default CommentForm;
