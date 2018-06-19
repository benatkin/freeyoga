import GooglePicker from 'react-google-picker'
import AddBoxIcon from 'material-ui-icons/AddBox'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

export default class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      id: null,
      name: null,
      accessToken: null
    }
  }

  fileSelected = ({action, docs}) => {
    if (action !== 'picked') {
      return
    }

    const {name, id} = docs[0]
    this.setState({id, name})
  }

  authenticated = accessToken => {
    this.setState({accessToken})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.id && this.state.accessToken &&
        (this.state.id !== prevState.id ||
         this.state.accessToken !== prevState.accessToken)) {
      this.save()
    }
  }

  async save() {
    const {name, id, accessToken} = this.state
    const res = await fetch('/api/sheets/chapters', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, id, access_token: accessToken}),
      credentials: 'include'
    })
  }

  render() {
    return (
      <div>
        <Typography>{ this.state.name }</Typography>
        <GooglePicker 
          clientId={this.props.clientId}
          developerKey={this.props.apiKey}
          scope={['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.install']}
          onChange={this.fileSelected}
          onAuthenticate={this.authenticated}
          multiselect={false}
          navHidden={true}
          authImmediate={false}
          viewId={'SPREADSHEETS'}
          createPicker={(google, authToken) => {
            const googleViewId = google.picker.ViewId['SPREADSHEETS']
            const view = new google.picker.View(googleViewId)

            if (!view) {
              throw new Error("Can't find view by viewId")
            }

            const picker = new window.google.picker.PickerBuilder()
              .addView(view)
              .setOAuthToken(authToken)
              .setDeveloperKey(this.props.apiKey)
              .setCallback(this.fileSelected)
              .setOrigin('https://staging.freeyogahq.com/admin')
              .enableFeature(google.picker.Feature.NAV_HIDDEN)
              .setAppId(this.props.appId)
              .build()
              .setVisible(true)
          }}
        >
          <Button variant="raised" color="secondary">
            <AddBoxIcon />
            Select File
          </Button>
        </GooglePicker>
      </div>
    )
  }
}