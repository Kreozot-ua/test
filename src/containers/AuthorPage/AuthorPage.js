import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Paper,
  Typography
} from '@material-ui/core';

import './AuthorPage.css';

import { loadAuthorByName } from '../../actions/authorsActions';

export class AuthorPage extends React.PureComponent {
  componentDidMount() {
    const { name } = this.props.match.params;
    this.props.loadAuthorByName(name);
  }

  render() {
    const { author } = this.props;
    return (
      <Paper className="author-page">
        <Typography className="title" variant="h4" title={author.name}>{author.name}</Typography>
        <p className="bio">{author.bio}</p>
        <div className="books">
          <Typography variant="h6">Author books: </Typography>
          {author.books && author.books.map((book) => (
            <Link key={book.id} className="link" to={`/book-page/${book.id}`}>{book.title}</Link>
          ))}
        </div>
      </Paper>
    );
  }
}

AuthorPage.propTypes = {
  loadAuthorByName: PropTypes.func,
  author: PropTypes.object,
  match: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    author: state.authors.current
  }
}

function mapActionsToProps(dispatch) {
  return bindActionCreators({
    loadAuthorByName: (...args) => loadAuthorByName(...args)
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AuthorPage);
