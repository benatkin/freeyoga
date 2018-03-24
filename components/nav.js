import MenuIcon from 'material-ui-icons/Menu';
import AddBoxIcon from 'material-ui-icons/AddBox';
import DropdownIcon from 'material-ui-icons/ArrowDropDown';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Link from 'next/link';
import {Link as RouteLink, Router} from '../routes';

import { Manager, Target, Popper } from 'react-popper';
import Portal from 'material-ui/Portal';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Collapse from 'material-ui/transitions/Collapse';
import Menu, {MenuItem} from 'material-ui/Menu';
import componentCookie from 'component-cookie';
import classNames from 'classnames';

import eventData from '../data/events';
import SocialLinks from './social-links';

class Nav extends React.Component {
  state = {
    drawerOpen: false,
    menuOpen: false
  };

  toggleDrawer = drawerOpen => () => {
    this.setState({drawerOpen})
  }

  handleDropdownClick = event => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleClose = () => {
    this.setState({ menuOpen: false })
  }

  handleMenuItemClick = (event, chapterId) => {
    this.setState({ menuOpen: false })
    componentCookie('freeyogachapter', chapterId)
    Router.pushRoute('schedule', {chapter: chapterId})
  }

  render() {
    const {drawerOpen, menuOpen} = this.state;
    const {classes} = this.props;
    return [
      (<Drawer key="drawer" open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
          className={classes.drawer}
        >
          <Link href="/">
            <Typography variant="title" className={classes.drawerMenuItem}>Home</Typography>
          </Link>
          <Typography variant="title" className={classes.drawerMenuItem}>
            Find a Chapter
          </Typography>
          {Object.keys(eventData).map((chapterId, index) => (
            <RouteLink
              route='schedule' 
              params={{chapter: chapterId}}
            >
              <Typography variant="title" className={classes.drawerSubMenuItem}>{eventData[chapterId].name}</Typography>
            </RouteLink>
          ))}
          <Link href="https://freeyoga.typeform.com/to/LN4eDE">
            <Typography variant="title" className={classes.drawerMenuItem}>Become a FY Ambassador</Typography>
          </Link>
          <Link href="/about">
            <Typography variant="title" className={classes.drawerMenuItem}>About</Typography>
          </Link>
          <SocialLinks />
        </div>
      </Drawer>),
      (<div className={classes.appBarRoot}>
        <AppBar className={classes.appBar} key="appBar" position="static">
          <Manager>
            <Toolbar>
              <div className={classes.logoWrapper}>
                <div className={classes.logoDiv}>
                  <Link href="/">
                    <img className={classes.logoImg} src="/static/images/logo-stacked.png" />
                  </Link>
                </div>
              </div>
              <Target>
                <Button
                  className={classes.topMenuItem}
                  onClick={this.handleDropdownClick}
                >
                  Find A Chapter <DropdownIcon />
                </Button>
              </Target>
              <Button className={classes.topMenuItem} href="https://freeyoga.typeform.com/to/LN4eDE">
                Become a FY Ambassador
              </Button>
              <Link href="/about">
                <Button className={classes.topMenuItem}>
                  About
                </Button>
              </Link>
              <IconButton className={classes.slideMenu} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
            <Portal>
              <Popper
                placement="bottom"
                eventsEnabled={menuOpen}
                className={classNames({ [classes.popperClose]: !menuOpen })}
              >
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Collapse
                    in={menuOpen}
                    id="menu-list-collapse"
                    style={{ transformOrigin: '0 0 0' }}
                  >
                    <Paper style={{ margin: 3 }}>
                      {Object.keys(eventData).map((chapterId, index) => (
                        <MenuItem
                          key={chapterId}
                          selected={index === this.state.selectedIndex}
                          onClick={event => this.handleMenuItemClick(event, chapterId)}
                        >
                          {eventData[chapterId].name}
                        </MenuItem>
                      ))}
                    </Paper>
                  </Collapse>
                </ClickAwayListener>
              </Popper>
            </Portal>
          </Manager>
        </AppBar>
      </div>)
    ];
  }
}

export default Nav;