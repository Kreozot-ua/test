import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import BooksList from "../BooksList/BooksList";
import AuthorsList from "../AuthorsList/AuthorsList";
import BookPage from "../BookPage/BookPage";
import AuthorPage from "../AuthorPage/AuthorPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Header from "../../components/Header/Header";

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='site-wrapper'>
        <Header/>
        <div className='switch-wrapper'>
          <Switch>
            <Route exact path="/" component={BooksList}/>
            <Route path='/books-list/:type?/:genre?' component={BooksList}/>
            <Route path='/authors-list' component={AuthorsList}/>
            <Route path='/book-page/:id' component={BookPage}/>
            <Route path='/author-page/:name' component={AuthorPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
