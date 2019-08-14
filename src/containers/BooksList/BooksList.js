import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import Loader from "../../components/Loader/Loader";
import Book from "../../components/Book/Book";

import {Paper} from "@material-ui/core";

import "./BooksList.css";

import {loadBooksList} from "../../actions/booksActions";

export class BooksList extends React.PureComponent {
  componentDidMount() {
    this.props.loadBooksList();
  }

  render() {
    const {books, loading, favorites, match} = this.props;
    const {type = null, genre = null} = match.params;
    return (
      loading ?
        <Loader/> :
        <Paper className="books-list">
          {
            books.map((book) => {
              return (
                !type ||
                (type === "genres" && book.genre === genre)) ||
              (type === "favorites" && favorites.includes(book.id)) ?
                <Book key={book.id} inFavorites={favorites.includes(book.id)} book={book}/> : ""
            })
          }
        </Paper>
    );
  }
}

BooksList.propTypes = {
  loadBooksList: PropTypes.func,
  match: PropTypes.object,
  books: PropTypes.array,
  favorites: PropTypes.array,
  loading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    books: state.books.items,
    favorites: state.books.favorites,
    loading: state.books.loading,
  }
}

function mapActionsToProps(dispatch) {
  return bindActionCreators({
    loadBooksList: (...args) => loadBooksList(...args),
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(BooksList);
