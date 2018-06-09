import React from 'react';

import Nav from '../components/nav';
import SocialLinks from '../components/social-links';

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import withRoot from '../lib/withRoot';
import globalStyles from '../lib/global-styles';
import Link from 'next/link';
import {Link as RouteLink, Router} from '../routes';
import fetch from 'isomorphic-unfetch';

import ChapterSelect from '../components/chapter-select';

import YogaEvent from '../components/yoga-event';

const eventData = require('../data/events');
const defaultChapterId = 'sf';

import getConfig from 'next/config';
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

class Index extends React.Component {
  static async getInitialProps({req, query}) {
    const protocol = req ? (req.headers['x-forwarded-proto'] || 'http') : 'http';
    const serverBaseUrl = req ? `${protocol}://${req.headers.host}` : '';
    const apiBaseUrl = serverRuntimeConfig.apiBaseUrl
      ? `${serverBaseUrl}/api`
      : publicRuntimeConfig.apiBaseUrl;
    console.log({apiBaseUrl})
    const res = await fetch(`${apiBaseUrl}/events`)
    const json = await res.json()
    console.log({length: json.length, error: json.error})
    return ({
      chapterId: query.chapter || defaultChapterId,
      events: json
    })
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
    const events = this.props.events.map(e => {
      return {
        date: e.local_date,
        title: e.name,
        time: e.local_time,
        location: e.venue.name,
        instructor: e.group.who,
        url: e.link
      }
    });

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} chapterId={this.props.chapterId} />
        
        <header className={classes.header}>
          <div className={classes.headerContent}>
            <div className={classes.headerContentInner}>
              <h1 className={classes.homeHeading}>Free Yoga</h1>
              <hr className={classes.smallHr} />
              <p className={classes.homeSubheading}><em>Accessible classes for everyone</em></p>
              <Button
                className={classes.cta}
                variant="raised"
                color="secondary"
                size="large"
                onClick={ () => Router.pushRoute('schedule', {chapter: 'sf'}) }
              >
                Join Us
              </Button>
            </div>
          </div>
        </header>

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
