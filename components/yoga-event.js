import ClockIcon from 'material-ui-icons/Schedule';
import LocationIcon from 'material-ui-icons/Map';
import PersonIcon from 'material-ui-icons/Person';
import AddBoxIcon from 'material-ui-icons/AddBox';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

export default ({classes, date, title, time, location, instructor, url}) => (
  <Paper className={classes.event}>
    <Typography className={classes.date} variant="body1">
      {date}
    </Typography>
    <Typography variant="title" style={{paddingBottom: '5px'}}>{title}</Typography>
    <Typography className={classes.property} variant="body1">
      <ClockIcon className={classes.propertyIcon} /> {time}
    </Typography>
    <Typography className={classes.property} variant="body1">
      <LocationIcon className={classes.propertyIcon} /> {location}
    </Typography>
    {instructor && (<Typography className={classes.property} variant="body1">
      <PersonIcon className={classes.propertyIcon} /> {instructor}
    </Typography>)}
    <Button variant="raised" color="secondary" href={url}>
      <AddBoxIcon className={classes.leftIcon} />
      Attend
    </Button>
  </Paper>
)