import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import FacebookIcon from 'mdi-material-ui/Facebook';
import LinkedinIcon from 'mdi-material-ui/LinkedinBox';
import TwitterIcon from 'mdi-material-ui/Twitter';

const styles = theme => ({
  button: {
    minWidth: 50
  },
});

const ProfileSocialLinks = ({classes, facebook, linkedin, twitter}) => (
  <div>
    <Button className={classes.button} href={facebook}><FacebookIcon /></Button>
    <Button className={classes.button} href={linkedin}><LinkedinIcon /></Button>
    {twitter && (<Button className={classes.button} href={twitter}><TwitterIcon /></Button>)}
  </div>
)

export default withStyles(styles)(ProfileSocialLinks);