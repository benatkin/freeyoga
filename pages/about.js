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
          <Grid item xs={12}>
            <p>
              Our mission is to encourage our communities to move, breathe and
              connect by practicing yoga. We do this for free because we feel that
              this promotes wellness in our community and the world.
            </p>

            <p>
              What started off as a dinner conversation between a group of yoga
              teachers turned into a online gathering of over 200 members in the
              first week. While this movement started in San Francisco, we have
              since expanded to cities such as Berkeley and Sacramento, and have
              grown to 2,000 members.
            </p>

            <p>
              The Free Yoga Movement is breaking down barriers for people to do
              yoga. As yoga practitioners, we recognize that for many people, a
              common barrier to beginning a yoga practice may be financial. By
              growing and supporting other Free Yoga communities, we can create a
              culture of Open Arms with a network of chapters around the country
              and the world supported by corporations, significantly amplifying
              the impact of accessible yoga classes for all.
            </p>
          </Grid>
        </Grid>

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
