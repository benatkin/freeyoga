export default (theme) => ({
  root: {
  },
  content: {
    padding: '10px',
  },
  event: {
    padding: '10px',
    marginBottom: '10px',
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
      paddingRight: theme.spacing.unit * 0.5
    }
  },
  dividerLeft: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 0.5
    }
  },
});