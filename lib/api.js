const express = require('express')
const router = express.Router()
const db = require('./db')
const moment = require('moment')
const fetch = require('isomorphic-unfetch')

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

router.get('/events', (req, res) => {
  getEvents().then(json => {
    res.send(json)
  }).catch(err => {
    res.status(500).send({error: err.toString()})
  })
})

router.get('/admin/user', (req, res) => {
  if (req.session.user && adminEmails.includes(req.session.user.email)) {
    const {name, email} = req.session.user
    res.send({name, email})
  } else {
    res.status(404).send({})
  }
})

module.exports = router