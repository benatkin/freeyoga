import React from 'react';

import Nav from '../components/nav';
import SocialLinks from '../components/social-links';

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import globalStyles from '../src/global-styles';
import Link from 'next/link';
import {Link as RouteLink, Router} from '../routes';
import {Parallax} from 'react-parallax';

import ChapterSelect from '../components/chapter-select';
import YogaEvent from '../components/yoga-event';

const eventData = require('../data/events');
const defaultChapterId = 'sf';

class Index extends React.Component {
  static async getInitialProps(ctx) {
    return ({chapterId: ctx.query.chapter || defaultChapterId})
  }

  handleChapterChange = chapterId => {
    if (chapterId !== this.props.chapterId) {
      if (chapterId === defaultChapterId) {
        Router.push('/')
      } else {
        Router.pushRoute('index', {chapter: chapterId})
      }
    }
  };

  render() {
    const { classes, chapterId } = this.props;
    const chapter = eventData[chapterId];
    const events = chapter.events.filter(event => event.featured);

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} chapterId={this.props.chapterId} />

        
        
        <Parallax bgImage="/static/images/bridge-yoga.jpg" strength={500}>
          <div className={classes.headerContent}>
            <div className={classes.headerContentInner}>
              <h1 className={classes.homeHeading}>Free Yoga</h1>
              <hr className={classes.smallHr} />
              <p className={classes.homeSubheading}><em>Accessible classes for everyone</em></p>
              <Button
                classes={{root: classes.cta}}
                variant="raised"
                color="secondary"
                size="large"
                onClick={ () => Router.pushRoute('schedule', {chapter: 'sf'}) }
              >
                Join Us
              </Button>
            </div>
          </div>
        </Parallax>

        <Grid container className={classes.content} spacing={0}>
          <Grid item xs={12} md={6} className={classes.dividerRight}>
            <img src="/static/images/photo2.jpg" style={{width: '100%'}} />
          </Grid>
          <Grid item xs={12} md={6} className={classes.dividerLeft}>
            {
              events.map((event, i) => (
                <YogaEvent
                  key={i}
                  classes={classes}
                  {...event}
                />
              ))
            }
          </Grid>
          <Grid item xs={12}>
            <SocialLinks />
          </Grid>
          <Grid item xs={12}>
            <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Ffreeyogamovement%2F&width=140&layout=button_count&action=like&size=large&show_faces=true&share=true&height=46&appId" width="140" height="46" style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder="0" allowtransparency="true"></iframe>
            <Typography variant="caption">&copy; 2018 <a style={{color: 'inherit'}} href="https://www.facebook.com/freeyogamovement/">Free Yoga Movement</a></Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(globalStyles)(Index));
