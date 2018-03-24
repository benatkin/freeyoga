import React from 'react';

import Nav from '../components/nav';

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import globalStyles from '../src/global-styles';
import Link from 'next/link';
import {Router} from '../routes';

import ChapterSelect from '../components/chapter-select';
import YogaEvent from '../components/yoga-event';

const eventData = require('../data/events');
const defaultChapterId = 'sf';

class Schedule extends React.Component {
  static async getInitialProps(ctx) {
    return ({chapterId: ctx.query.chapter || defaultChapterId});
  }

  handleChapterChange = chapterId => {
    if (chapterId !== this.props.chapterId) {
      Router.pushRoute('schedule', {chapter: chapterId === defaultChapterId ? null : chapterId})
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
              <Grid item key={i} xs={12} md={6} className={i % 2 == 0 ? classes.dividerRight : classes.dividerLeft}>
                <YogaEvent key={i}
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
