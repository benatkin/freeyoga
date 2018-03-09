import React from 'react';

import Nav from '../components/nav'

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import globalStyles from '../src/global-styles';
import Link from 'next/link';

import YogaEvent from '../components/yoga-event'

class Schedule extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} />

        <Grid container className={classes.content} spacing={0}>
          <Grid item xs={12} md={6} className={classes.dividerLeft}>
            <YogaEvent
              classes={classes} 
              date="Saturday, March 10, 2018"
              title="Gratitude in the Park - Donation Yoga Flow"
              time="10:45 AM to 12:00 PM"
              location="Conservatory of Flowers"
              instructor="Rachel Jennine Goudey"
              url="https://www.meetup.com/Free-Yoga-SF/events/bmdskpyxfbnb/"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(globalStyles)(Schedule));
