import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const CommentMenu = () => {
  return (
    <nav className="commentMenu">
      <ul className="commentMenu__list">
        <li className="commentMenu__item">
          <Link className="commentMenu__link" to="/"><i className="fa fa-list" aria-hidden="true" />Comments List</Link>
        </li>

        <li className="commentMenu__item">
          <Link className="commentMenu__link" to="/create/"><i className="fa fa-plus" aria-hidden="true" />Create Comment</Link>
        </li>
      </ul>
    </nav>
  );
};

export default CommentMenu;
