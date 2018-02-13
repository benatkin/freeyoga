import {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import Link from 'next/link'
import Head from '../components/head'
import Reboot from 'material-ui/Reboot'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Button from 'material-ui/Button'

const styles = {
  content: {
    padding: '10px'
  }
}

class Home extends Component {
  render() {
    const {classes} = this.props
    return (
      <div>
        <Head title="Home" />
        <Reboot />

        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Free Yoga
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.content}>
          <Button variant="raised" color="primary">
            Hello World
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home)