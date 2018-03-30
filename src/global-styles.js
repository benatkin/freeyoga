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
    height: '100px',
    cursor: 'pointer'
  },
  appBarRoot: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: 'black',
    color: 'white',
    paddingLeft: '30px',
    paddingRight: '30px'
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
  },
  header: {
    backgroundImage: 'url(/static/images/bridge-yoga.jpg)',
    width: '100%',
    height: '85vh',
    backgroundSize: 'cover',
    color: 'white',
    fontFamily: "'Helvetica','Arial','sans-serif'"
  },
  headerContent: {
    textAlign: 'center',
    paddingTop: 100,
    paddingRight: 15,
    paddingBottom: 300
  },
  headerContentInner: {
    boxSizing: 'border-box'
  },
  homeHeading: {
    fontWeight: 700,
    fontSize: '75px',
    lineHeight: '75px',
    textTransform: 'uppercase',
    marginTop: 0,
    marginBottom: 0,
    fontFamily: "'Catamaran','Helvetica','Arial','sans-serif'",
    [theme.breakpoints.down('sm')]: {
      fontSize: '60px',
      lineHeight: '60px',
    }
  },
  smallHr: {
    margin: '30px auto',
    width: '30%',
    height: 0,
    borderTop: '1px solid #eee'
  },
  homeSubheading: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)'
  },
  cta: {
    marginTop: theme.spacing.unit * 7
  },
  signUpButton: {
    width: '100%'
  },
  aboutText: {
    fontFamily: "'Source Sans Pro','Helvetica','Arial','sans-serif'",
    fontSize: '120%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '20%',
      paddingRight: '20%'
    }
  }
});