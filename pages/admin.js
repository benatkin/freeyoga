import React from 'react';

import Nav from '../components/nav'

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Importer from '../components/admin/importer'
import { withStyles } from 'material-ui/styles';
import withRoot from '../lib/withRoot';
import globalStyles from '../lib/global-styles';

class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      name: null,
      email: null,
      googleClientId: null,
      googleApiKey: null,
      googleAppId: null,
      error: null
    }
  }

  async componentDidMount() {
    this.fixUrl()
    this.setState({
      loading: false
    })
    await this.loadUser()
  }

  async loadUser() {
    try {
      const res = await fetch('/api/users/me', {credentials: 'include'})
      if (!res.ok) {
        this.setState({error: 'Error signing in.'})
        return
      }
      const {name, email, googleClientId, googleApiKey, googleAppId} = await res.json()
      this.setState({name, email, googleClientId, googleApiKey, googleAppId})
    } catch (err) {
      this.setState({error: 'Error signing in.'})
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
            <Typography>{loginStatus}</Typography>
            {this.state.name &&
              <Importer 
                clientId={this.state.googleClientId}
                apiKey={this.state.googleApiKey}
                appId={this.state.googleAppId}
              />}
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
