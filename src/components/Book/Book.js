import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleFavoritesList } from '../../actions/booksActions';

import {
  Star,
  StarBorder
} from '@material-ui/icons';

import {
  Card,
  IconButton,
  Typography
} from '@material-ui/core';

import './Book.css';

const Book = (props) => (
  <Card className="book" title={props.book.title}>
      <Typography className="title" variant="h5">
        <Link to={`/book-page/${props.book.id}`} className="link">
          {props.book.title}
        </Link>
      </Typography>
    <div className="authors">{
      props.book.authors.map((author, index) => (
        <div key={author}>
          <Link className="link" to={`/author-page/${author}`}>{author}</Link>
          {index !== props.book.authors.length - 1 && ', '}
        </div>
      ))
    }</div>
    <IconButton
      className="button"
      aria-label="Add to favorites"
      onClick={() => props.handleFavoritesList(props.book.id)}
    >
      {props.inFavorites ? <Star className="star"/> : <StarBorder className="star -empty"/>}
    </IconButton>
  </Card>
);

function mapActionsToProps(dispatch) {
  return bindActionCreators({
    handleFavoritesList: (...args) => handleFavoritesList(...args)
  }, dispatch);
}

export default connect(
  null,
  mapActionsToProps
)(Book);
