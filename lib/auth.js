const crypto = require('crypto')
const urlLib = require('url')
const querystring = require('querystring')
const express = require('express')
const router = express.Router()
const {google} = require('googleapis')

const randomState = () => {
  return crypto.randomBytes(16).toString('hex')
}

class Auth {
  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_SECRET,
      `${process.env.BASE_URL}/auth/google/callback`
    )
  }

  getAuthorizeUrl(state) {
    const authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'online',
      scope: ['email'],
      state
    })
    return authorizeUrl
  }

  async getUser(url, state) {
    const parsedUrl = urlLib.parse(url)
    const qs = querystring.parse(parsedUrl.query)
    if (qs.state !== state) {
      throw new Error('invalid state OAuth parameter')
    }
    const tokenResponse = await this.oAuth2Client.getToken(qs.code)
    const tokens = tokenResponse.tokens
    this.oAuth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({
      version: 'v2',
      auth: this.oAuth2Client
    })

    const infoResponse = await oauth2.userinfo.get()
    const {name, email} = infoResponse.data
    return {name, email, tokens}
  }
}

router.get('/google', (req, res) => {
  const auth = new Auth()
  const state = randomState()
  req.session.state = state
  const url = auth.getAuthorizeUrl(state)
  res.redirect(url)
})

router.get('/google/callback', (req, res) => {
  const auth = new Auth()
  auth.getUser(req.url, req.session.state).then(user => {
    req.session.user = user
    res.redirect('/admin')
  }).catch(err => {
    res.status(500).send('Error signing in')
  })
})

router.get('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
})

module.exports = router