import React from 'react';

import Nav from '../components/nav'

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRoot from '../lib/withRoot';
import globalStyles from '../lib/global-styles';

class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      name: null,
      email: null
    }
  }

  async componentDidMount() {
    this.fixUrl()
    try {
      const res = await fetch('/api/admin/user', {credentials: 'include'})
      const data = await res.json()
      this.setState({
        loading: false,
        name: res.ok ? data.name : null,
        email: res.ok ? data.email : null
      })
    } catch (err) {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { classes } = this.props;
    let loginStatus
    if (!this.state.loading) {
      if (this.state.name) {
        loginStatus = <span>Signed in as {this.state.name}. <a href="/auth/logout">Sign Out</a></span>
      } else {
        loginStatus = <a href="/auth/google">Sign in with Google</a>
      }
    }

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} chapterId={this.props.chapterId} />

        <Grid container className={classes.content} spacing={0}>
          <Grid item xs={12} className={classes.aboutText}>
            {loginStatus}
          </Grid>
        </Grid>
      </div>
    );
  }

  fixUrl() {
    if (window.location.href.endsWith('#')) {
      window.history.replaceState(
        {},
        document.title,
        window.location.href.replace(/#$/, '')
      )
    }
  }
}

export default withRoot(withStyles(globalStyles)(Admin));
