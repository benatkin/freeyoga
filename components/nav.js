import MenuIcon from 'material-ui-icons/Menu';
import AddBoxIcon from 'material-ui-icons/AddBox';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Link from 'next/link';

class Nav extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = drawerOpen => () => {
    this.setState({drawerOpen});
  }

  render() {
    const {classes} = this.props;
    return [
      (<Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
          className={classes.drawer}
        >
          <Link href="/">
            <Typography variant="Title" className={classes.drawerMenuItem}>Home</Typography>
          </Link>
          <Link href="/schedule">
            <Typography variant="Title" className={classes.drawerMenuItem}>Schedule</Typography>
          </Link>
          <Link href="/about">
            <Typography variant="Title" className={classes.drawerMenuItem}>About</Typography>
          </Link>
        </div>
      </Drawer>),
      (<AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="title" color="inherit" className={classes.siteTitle}>
              Free Yoga
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>)
    ];
  }
}

export default Nav;