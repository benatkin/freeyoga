import React from 'react';
import PropTypes from 'prop-types';

import MenuIcon from 'material-ui-icons/Menu';
import AddBoxIcon from 'material-ui-icons/AddBox';
import ClockIcon from 'material-ui-icons/Schedule';
import LocationIcon from 'material-ui-icons/Map';
import PersonIcon from 'material-ui-icons/Person';

import Reboot from 'material-ui/Reboot';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
//import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import Link from 'next/link';

const styles = theme => ({
  root: {
  },
  content: {
    padding: '10px',
  },
  event: {
    padding: '10px',
    marginBottom: '10px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  property: {
    marginBottom: '5px',
  },
  propertyIcon: {
    marginBottom: '-6px',
  },
  drawer: {
    padding: '20px',
  },
  drawerMenuItem: {

  },
  dividerRight: {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing.unit * 0.5
    }
  },
  dividerLeft: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 0.5
    }
  },
});

class Index extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = drawerOpen => () => {
    this.setState({drawerOpen});
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Reboot />

        <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
            className={classes.drawer}
          >
            <Link href="/schedule">
              <Typography variant="Title" className={classes.drawerMenuItem}>Schedule</Typography>
            </Link>
            <Link href="/about">
              <Typography variant="Title" className={classes.drawerMenuItem}>About</Typography>
            </Link>
            <Button variant="raised" color="secondary">
              <AddBoxIcon className={classes.leftIcon} />
              Create Event
            </Button>
          </div>
        </Drawer>

        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Free Yoga
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container className={classes.content} spacing={0}>
          <Grid item xs={12} md={6} className={classes.dividerRight}>
            <img src="/static/images/photo1.png" style={{width: '100%'}} />
          </Grid>
          <Grid item xs={12} md={6} className={classes.dividerLeft}>
            <Paper className={classes.event}>
              <Typography className={classes.date} variant="body1">
                Wednesday, March 7, 2018
              </Typography>
              <Typography variant="title" style={{paddingBottom: '5px'}}>Free Yoga at SF's Best Coworking Space - The Vault</Typography>
              <Typography className={classes.property} variant="body1">
                <ClockIcon className={classes.propertyIcon} /> 12:00 PM
              </Typography>
              <Typography className={classes.property} variant="body1">
                <LocationIcon className={classes.propertyIcon} /> The Vault
              </Typography>
              <Typography className={classes.property} variant="body1">
                <PersonIcon className={classes.propertyIcon} /> Matthew
              </Typography>
              <Link href="https://www.meetup.com/Free-Yoga-SF/events/zqxxnnyxfbkb/">
                <Button variant="raised" color="secondary">
                  <AddBoxIcon className={classes.leftIcon} />
                  Attend
                </Button>
              </Link>
            </Paper>

            <Paper className={classes.event}>
              <Typography className={classes.date} variant="body1">
                Saturday, March 10, 2018
              </Typography>
              <Typography variant="title" style={{paddingBottom: '5px'}}>Gratitude in the Park - Donation Yoga Flow</Typography>
              <Typography className={classes.property} variant="body1">
                <ClockIcon className={classes.propertyIcon} /> 10:45 AM to 12:00 PM
              </Typography>
              <Typography className={classes.property} variant="body1">
                <LocationIcon className={classes.propertyIcon} /> Conservatory of Flowers
              </Typography>
              <Typography className={classes.property} variant="body1">
                <PersonIcon className={classes.propertyIcon} /> Rachel Jennine Goudey
              </Typography>
              <Link href="https://www.meetup.com/Free-Yoga-SF/events/zqxxnnyxfbkb/">
                <Button variant="raised" color="secondary">
                  <AddBoxIcon className={classes.leftIcon} />
                  Attend
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
