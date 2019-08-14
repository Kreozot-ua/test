import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import "./BookPage.css";

import {
  Star,
  StarBorder,
} from "@material-ui/icons";

import {
  Typography,
  Paper,
  IconButton,
  Button,
} from "@material-ui/core";

import {
  loadBookById,
  handleFavoritesList,
} from "../../actions/booksActions";


export class BookPage extends React.PureComponent {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.loadBookById(id);
  }

  render() {
    const {id, title, authors, description, genre} = this.props.current;
    return (
      this.props.loading ?
        <Loader/> :
        <Paper className="book-page">
          <Typography className="title" variant="h4" title={title}>{title}</Typography>
          <div className="authors">{
            authors && authors.map((author, index) => (
              <Typography variant="h6" key={author}>
                <Link className="author" to={`/author-page/${author}`}>{author}</Link>
                {index !== authors.length - 1 && ", "}
              </Typography>
            ))
          }</div>
          <Link to={`/books-list/genres/${genre}`} className="genre-link">
            <Button
              variant="contained"
              color="primary"
            >
              Search by this genre ({genre})
            </Button>
          </Link>
          <IconButton
            aria-label="Add to favorites"
            onClick={() => this.props.handleFavoritesList(id)}
          >
            {this.props.favorites.includes(id) ? <Star className="star"/> : <StarBorder className="star -empty"/>}
          </IconButton>
          <p className="description">{description}</p>
        </Paper>
    );
  }
}

BookPage.propTypes = {
  loadBookById: PropTypes.func,
  handleFavoritesList: PropTypes.func,
  match: PropTypes.object,
  current: PropTypes.object,
  favorites: PropTypes.array,
  loading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    current: state.books.current,
    favorites: state.books.favorites,
    loading: state.books.loading,
  }
}

function mapActionsToProps(dispatch) {
  return bindActionCreators({
    loadBookById: (...args) => loadBookById(...args),
    handleFavoritesList: (...args) => handleFavoritesList(...args),
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(BookPage);
