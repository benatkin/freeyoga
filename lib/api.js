const express = require('express')
const router = express.Router()
const db = require('./db')
const moment = require('moment')
const fetch = require('isomorphic-unfetch')
const wrapAsync = require('./util').wrapAsync
const {google} = require('googleapis')
const Sheet = require('./models/sheet')
const ApiClient = require('./models/api-client')

const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).send({error: 'Must be logged in.'})
  } else {
    next()
  }
}

const adminEmails = process.env.ADMIN_EMAILS.split(',')

const saveEvents = async data => {
  try {
    await db('events').where({chapter: 'sf'}).update({
      data: JSON.stringify(data),
      updated_at: new Date()
    })
  } catch (err) {
    console.error(`Error saving event data: ${err.toString()}`)
  }
}

const getEvents = async () => {
  const fiveMinutesAgo = new Date(moment().subtract(5, 'minutes').valueOf())
  const event = await db('events').where({chapter: 'sf'})
                                  .where('updated_at', '>', fiveMinutesAgo)
                                  .first()
  let json
  if (event) {
    json = JSON.parse(event.data)
  } else {
    const eventUrl = process.env.MEETUP_SIGNED_URL
    const res = await fetch(eventUrl)
    json = await res.json()
    await saveEvents(json)
  }
  return json
}

router.get('/chapters', wrapAsync(async (req, res) => {
  const sheet = await Sheet.forName('chapters')
  const header = sheet.data.values[0]
  const rows = sheet.data.values.slice(1)
  const data = rows.filter(row => row && row.length).map(row => {
    const record = {}
    header.forEach((field, i) => {
      const value = (row[i] || '').trim()
      if (value.length && value !== '-') {
        record[field] = value
      }
    })
    return record
  })
  const chapters = data.filter(chapter => {
    return chapter.State === 'California' &&
           (chapter.Notes || '').match(/\bACTIVE\b/) &&
           'Meetup' in chapter
  })
  res.send(chapters)
}))

router.get('/events', (req, res) => {
  getEvents().then(json => {
    res.send(json)
  }).catch(err => {
    res.status(500).send({error: err.toString()})
  })
})

router.get('/users/me', (req, res) => {
  if (req.session.user && adminEmails.includes(req.session.user.email)) {
    const {name, email} = req.session.user
    res.send({
      name,
      email,
      googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      googleApiKey: process.env.GOOGLE_API_KEY,
      googleAppId: process.env.GOOGLE_APP_ID
    })
  } else {
    res.send({})
  }
})

router.patch('/sheets/chapters', requireAuth, wrapAsync(async (req, res) => {
  const sheet = await Sheet.forName('chapters')
  sheet.owner = req.session.user.email
  sheet.externalId = req.body.id
  await sheet.save()

  const apiClient = await ApiClient.forUser('google', req.session.user.email)
  apiClient.credentials = { access_token: req.body.access_token }
  await apiClient.save()

  sheet.data = await sheet.getData()
  await sheet.save()

  res.send({})
}))

router.get('/sheets/chapters/data', requireAuth, wrapAsync(async (req, res) => {
  const sheet = await Sheet.forName('chapters')
  const defaultRange = "'Event Aggregator'"
  const result = await sheet.getData('range' in req.query ? req.query.range : defaultRange)
  res.send(result)
}))

module.exports = router