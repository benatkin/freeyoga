import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import FacebookIcon from 'mdi-material-ui/Facebook';
import InstagramIcon from 'mdi-material-ui/Instagram';
import LinkedinIcon from 'mdi-material-ui/LinkedinBox';
import TwitterIcon from 'mdi-material-ui/Twitter';
import WebsiteIcon from 'mdi-material-ui/Earth';

const styles = theme => ({
  button: {
    minWidth: 50
  },
});

const ProfileSocialLinks = ({classes, facebook, instagram, linkedin, twitter, website}) => (
  <div>
    {facebook && (<Button className={classes.button} href={facebook}><FacebookIcon /></Button>)}
    {instagram && (<Button className={classes.button} href={instagram}><InstagramIcon /></Button>)}
    {linkedin && (<Button className={classes.button} href={linkedin}><LinkedinIcon /></Button>)}
    {twitter && (<Button className={classes.button} href={twitter}><TwitterIcon /></Button>)}
    {website && (<Button className={classes.button} href={website}><WebsiteIcon /></Button>)}
  </div>
)

export default withStyles(styles)(ProfileSocialLinks);