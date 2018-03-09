import React from 'react';

import Nav from '../components/nav'

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import globalStyles from '../src/global-styles';
import Link from 'next/link';

import YogaEvent from '../components/yoga-event';

const allEvents = require('../data/events');

class Schedule extends React.Component {
  render() {
    const { classes } = this.props;
    const events = allEvents;

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} />

        <Grid container className={classes.content} spacing={0}>
          {
            events.map((event, i) => (
              <Grid item xs={12} md={6} className={i % 2 == 0 ? classes.dividerRight : classes.dividerLeft}>
                <YogaEvent
                  classes={classes}
                  {...event}
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
