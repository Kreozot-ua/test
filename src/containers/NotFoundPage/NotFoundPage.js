import React from 'react';
import {Link} from 'react-router-dom';

import './NotFoundPage.css';

import {
  Home,
} from '@material-ui/icons';

import {
  Paper,
  Button,
  Typography
} from '@material-ui/core';

const NotFoundPage = () => (
  <Paper className="page-404">
    <Typography className="title" variant="h4">Page not found</Typography>
    <Link className="link" to="/">
      <Button
        className="button"
        variant="contained"
        color="secondary"
      >
        <Home className="icon"/>
        Return to home page
      </Button>
    </Link>
  </Paper>
);

export default NotFoundPage;
