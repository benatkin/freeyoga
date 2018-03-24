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
  profileImageSquare: {
    border: '25px solid white',
    width: '60%'
  },
  siteTitle: {
    cursor: 'pointer'
  },
  drawer: {
    padding: '20px',
    width: '75vw',
    [theme.breakpoints.up('md')]: {
      width: '33vw',
    }
  },
  drawerMenuItem: {
    cursor: 'pointer',
    fontSize: '120%',
    paddingBottom: theme.spacing.unit * 0.5
  },
  drawerSubMenuItem: {
    color: 'black',
    cursor: 'pointer',
    fontSize: '100%',
    paddingBottom: theme.spacing.unit * 0.5,
    paddingLeft: 20
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
  slideMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  logoWrapper: {
    flex: 1
  },
  logoDiv: {
    backgroundColor: 'white',
    display: 'inline-block'
  },
  logoImg: {
    height: '80px',
    cursor: 'pointer'
  },
  appBarRoot: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: 'black',
    color: 'white'
  },
  topMenuItem: {
    color: 'white',
    fontSize: '14px',
    textTransform: 'none',
    '&:hover': {
      color: '#ccc'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  popperClose: {
    pointerEvents: 'none',
  }
});