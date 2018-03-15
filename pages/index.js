import React from 'react';

import Nav from '../components/nav';
import SocialLinks from '../components/social-links';

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText} from 'material-ui/List'
import Menu, {MenuItem} from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import globalStyles from '../src/global-styles';
import Link from 'next/link';

import YogaEvent from '../components/yoga-event';

const allEvents = require('../data/events');

const options = [
  'San Francisco',
  'Sacramento'
];

class Index extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 0,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };



  render() {
    const { classes } = this.props;
    const events = allEvents.filter(event => event.featured);

    return (
      <div className={classes.root}>
        <Reboot />

        <Nav classes={classes} />
        
        <Grid container className={classes.content} spacing={0}>
          <Grid item xs={12} md={6} className={classes.dividerRight}>
            <img src="/static/images/photo2.jpg" style={{width: '100%'}} />
          </Grid>
          <Grid item xs={12} md={6} className={classes.dividerLeft}>
            <List component="nav">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Current City"
                onClick={this.handleClickListItem}
              >
                <ListItemText
                  primary={`Chapter: ${options[this.state.selectedIndex]}`}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
            {
              events.map(event => (
                <YogaEvent
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
            <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Ffreeyogamovement%2F&width=140&layout=button_count&action=like&size=large&show_faces=true&share=true&height=46&appId" width="140" height="46" style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameborder="0" allowTransparency="true"></iframe>
            <Typography variant="caption">&copy; 2018 <a style={{color: 'inherit'}} href="https://www.facebook.com/freeyogamovement/">Free Yoga Movement</a></Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(globalStyles)(Index));
