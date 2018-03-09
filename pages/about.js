import React from 'react';

import Nav from '../components/nav'

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import globalStyles from '../src/global-styles';
import Link from 'next/link';

import Profile from '../components/profile';

const profiles = require('../data/profiles');

class Schedule extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} />

        <Grid container className={classes.content} spacing={0}>
          {
            profiles.map((profile, i) => (
              <Grid item xs={6} md={4} className={classes.profile}>
                <Profile
                  classes={classes}
                  {...profile}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(globalStyles)(Schedule));
