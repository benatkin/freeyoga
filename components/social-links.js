import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import FacebookIcon from 'mdi-material-ui/FacebookBox';
import InstagramIcon from 'mdi-material-ui/Instagram';
import EventbriteIcon from 'mdi-material-ui/Eventbrite';
import MeetupIcon from '../components/icons/meetup-icon';

const styles = theme => ({
  button: {
    minWidth: 50
  },
});

const SocialLinks = ({classes}) => (
  <Grid container spacing={0}>
    <Grid item xs={3} style={{textAlign: 'center'}}>
      <Button className={classes.button} href="https://www.facebook.com/freeyogamovement/"><FacebookIcon /></Button>
    </Grid>
    <Grid item xs={3} style={{textAlign: 'center'}}>
      <Button className={classes.button} href="https://www.instagram.com/freeyogasf/"><InstagramIcon /></Button>
    </Grid>
    <Grid item xs={3} style={{textAlign: 'center'}}>
      <Button className={classes.button} href="https://www.eventbrite.com/o/free-yoga-sf-16938350242"><EventbriteIcon /></Button>
    </Grid>
    <Grid item xs={3} style={{textAlign: 'center'}}>
      <Button className={classes.button} href="https://www.meetup.com/Free-Yoga-SF/"><MeetupIcon /></Button>
    </Grid>
  </Grid>
)

export default withStyles(styles)(SocialLinks);