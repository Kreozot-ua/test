import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";


import {
  Menu,
  MenuItem,
  Paper,
  Button,
} from "@material-ui/core";

import "./AuthorsList.css";

import {
  loadAuthorsList,
  expandAuthorMenu,
  closeAuthorMenu,
} from "../../actions/authorsActions";

export class AuthorsList extends React.PureComponent {
  componentDidMount() {
    this.props.loadAuthorsList();
  }

  render() {
    const {authors} = this.props;
    return (
      this.props.loading ?
        <Loader /> :
        <Paper className="authors-list">
          {
            Object.keys(authors).map((name) => (
              <div key={name} className="author">
                <Button
                  className="button"
                  variant="contained"
                  onClick={(e) => this.props.expandAuthorMenu(e, name)}
                >
                  {name}
                </Button>
                <Menu
                  anchorEl={authors[name].opened}
                  keepMounted
                  open={Boolean(authors[name].opened)}
                  onClose={() => this.props.closeAuthorMenu(name)}
                  className="authors-list-menu"
                >
                  <MenuItem disableGutters onClose={() => this.props.closeAuthorMenu(name)}>
                    <Link className="authors-list-menu-link" to={`/author-page/${name}`}>
                      {name} page
                    </Link>
                  </MenuItem>
                  {authors[name].books && authors[name].books.map((book) => (
                    <MenuItem disableGutters key={book.id} onClose={() => this.props.closeAuthorMenu(name)}>
                      <Link className="authors-list-menu-link" to={`/book-page/${book.id}`}>
                        {book.title}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ))
          }
        </Paper>
    );
  }
}

AuthorsList.propTypes = {
  loadAuthorsList: PropTypes.func,
  expandAuthorMenu: PropTypes.func,
  closeAuthorMenu: PropTypes.func,
  authors: PropTypes.object,
  loading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    authors: state.authors.items,
    loading: state.authors.loading,
  }
}

function mapActionsToProps(dispatch) {
  return bindActionCreators({
    loadAuthorsList: () => loadAuthorsList(),
    expandAuthorMenu: (...args) => expandAuthorMenu(...args),
    closeAuthorMenu: (...args) => closeAuthorMenu(...args),
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(AuthorsList);
