import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './Header';
import Footer from './Footer';

import Comments from './Comments';
import CommentDetails from './CommentDetails';
import CreateComment from './CreateComment';

const NotFoundPage = () => {
  return (
    <div>Not found!</div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Header />

        <main className="main container">
          <div>
            <Switch>
              <Route exact path="/" component={Comments} />
              <Route path="/edit/:id" component={CommentDetails} />
              <Route path="/create/" component={CreateComment} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </main>

        <Footer />   
      </div>
    </Router> 
  );
};

export default App;
