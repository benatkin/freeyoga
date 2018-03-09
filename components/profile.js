import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export default ({classes, name, title, image, facebook, linkedin, twitter}) => (
  <Paper>
    <img className={classes.profileImage} src={`/static/images/team/${image}`} />
    <Typography variant="title" style={{paddingBottom: '5px'}}>{name}</Typography>
  </Paper>
)