export default (theme) => ({
  root: {
  },
  content: {
    padding: '10px',
  },
  event: {
    padding: '10px',
    marginBottom: theme.spacing.unit * 2
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
  profile: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2
  },
  profileImage: {
    width: '60%',
    border: '7px solid white',
    borderRadius: '50%'
  },
  drawer: {
    padding: '20px',
  },
  drawerMenuItem: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    fontSize: '120%',
    paddingBottom: theme.spacing.unit * 0.5
  },
  dividerRight: {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing.unit
    }
  },
  dividerLeft: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit
    }
  },
});