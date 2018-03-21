import React from 'react';

import Nav from '../components/nav';

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import globalStyles from '../src/global-styles';
import Link from 'next/link';

import YogaEvent from '../components/yoga-event';

const eventData = require('../data/events');
const defaultChapterId = 'sf';

class Schedule extends React.Component {
  state = {
    anchorEl: null
  };

  static async getInitialProps(ctx) {
    return ({chapterId: ctx.query.chapter || defaultChapterId});
  }

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, chapterId) => {
    this.setState({ anchorEl: null });
    if (chapterId !== this.props.chapterId) {
      Router.pushRoute('schedule', {chapter: chapterId === defaultChapterId ? null : chapterId})
      componentCookie('freeyogachapter', chapterId)
    }
  };

  render() {
    const { classes, chapterId } = this.props;
    const chapter = eventData[chapterId]
    const events = chapter.events;

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} chapterId={chapterId} />

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
