import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../components/nav'

import MenuIcon from 'material-ui-icons/Menu';
import AddBoxIcon from 'material-ui-icons/AddBox';

import Reboot from 'material-ui/Reboot';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import globalStyles from '../src/global-styles';
import Link from 'next/link';

import YogaEvent from '../components/yoga-event'

class Index extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} />

        <Grid container className={classes.content} spacing={0}>
          <Grid item xs={12} md={6} className={classes.dividerRight}>
            <img src="/static/images/photo1.png" style={{width: '100%'}} />
          </Grid>
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

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(globalStyles)(Index));
