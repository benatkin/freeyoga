import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import ProfileSocialLinks from './profile-social-links';

export default ({classes, name, title, image, square, ...socialLinks}) => {
  const {facebook, instagram, linkedin, twitter, website} = socialLinks;
  const className = square ? classes.profileImageSquare : classes.profileImage;
  return (
    <Paper>
      <img className={className} src={`/static/images/team/${image}`} />
      <Typography variant="title">{name}</Typography>
      <Typography variant="subheading">{title}</Typography>
      <ProfileSocialLinks {...{facebook, instagram, linkedin, twitter, website}} />
    </Paper>
  );
}