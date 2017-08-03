import React, { Component } from 'react';
import fire from '../firebase';

import './list.css';
import CommentsItem from './CommentsItem';
import CommentsListActions from './CommentsListActions';
import CommentsPagination from './CommentsPagination';
import CommentMenu from '../CommentMenu';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      sortValue: '',
      sortType: 'ASC',
      recordsLimit: 20,
      currentPage: 1,
      totalPages: 0,
      paginationNumbers: [],
    };

    this.setPagination();

    this.sort = this.sort.bind(this);
    this.changeRecordsLimit = this.changeRecordsLimit.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.getComments();  
  }

  getComments() {
    const messageRef = this.genereteQuery();

    let temp = [];
    messageRef.once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const comment = Object.assign({ key: childSnapshot.key }, childSnapshot.val());
          temp = [...temp, comment];
        });
      })
      .then(() => {
        this.setState({ comments: [...this.prepareArrayPagination(temp)] });
      });
  }

  setPagination() {
    const firebaseComments = fire.database().ref('comments');
    firebaseComments.once('value')
      .then(snapshot => {
        const allRecords = snapshot.numChildren();
        const limit = this.state.recordsLimit;
        const pages = Math.ceil(allRecords / limit);
        this.setState({ totalPages: pages, paginationNumbers: this.generatePaginationArray(pages) });
      });
  }

  prepareArrayPagination(temp) {
    const currentPage = this.state.currentPage;
    const limit = this.state.recordsLimit;
    const sortType = this.state.sortType;

    const startAt = (currentPage - 1) * limit;
    const endAt = (currentPage * limit);

    if (sortType === 'DESC') {
      temp.reverse();
    }

    temp = temp.slice(startAt, endAt);
    return temp;
  }

  generatePaginationArray(n) {
    return Array.from(Array(n).keys());
  }  

  genereteQuery() {
    const sortValue = this.state.sortValue;

    const firebaseComments = fire.database().ref('comments');
    let messageRef;
    
    if (!sortValue) {
      messageRef = firebaseComments.orderByKey();
    } else {
      messageRef = firebaseComments.orderByChild(sortValue);
    }

    return messageRef;
  }

  sort(e) {
    const sortValue = e.target.dataset.sortValue;
    const currentSortValue = this.state.sortValue;
    const sortType = sortValue === currentSortValue ? 'DESC' : 'ASC';
    this.setState({ sortValue, sortType }, this.getComments);
  }

  changeRecordsLimit(limit = 20) {
    limit = parseInt(limit, 10);
    this.setState({ recordsLimit: limit, currentPage: 1 }, this.changeLimitHandler);
  }

  changeLimitHandler() {
    this.getComments();
    this.setPagination();
  }

  changePage(newPage) {
    newPage = parseInt(newPage, 10);
    this.setState({ currentPage: newPage }, this.getComments);
  }

  renderComments() {
    return this.state.comments.map(comment => (
      <CommentsItem key={comment.key} comment={comment} />
    ));
  }

  render() {
    return (
      <div>
        <CommentMenu />

        <CommentsListActions changeRecordsLimit={this.changeRecordsLimit} />

        <table className="comment-list table">
          <thead>
            <tr>
              <th className="comment-list__th" data-sort-value="email" onClick={this.sort}>
                <i className="fa fa-sort" aria-hidden="true" /> E-mail
              </th>

              <th className="comment-list__th" data-sort-value="name" onClick={this.sort}>
                <i className="fa fa-sort" aria-hidden="true" /> Name
              </th>

              <th className="comment-list__th" data-sort-value="body" onClick={this.sort}>
                <i className="fa fa-sort" aria-hidden="true" /> Comment
              </th>
              
              <th>Actions</th>
            </tr>        
          </thead>

          <tbody>
            {this.renderComments()}
          </tbody>
        </table>

        <CommentsPagination 
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
          limit={this.state.recordsLimit}
          paginationNumbers={this.state.paginationNumbers}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default Comments;
