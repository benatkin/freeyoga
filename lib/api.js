const express = require('express')
const router = express.Router()
const db = require('./db')
const moment = require('moment')

const events = db('events')

const fetch = require('isomorphic-unfetch')

const saveEvents = async data => {
  await events.where({chapter: 'sf'}).update({data: JSON.stringify(data)})
}

const getEvents = async () => {
  const fiveMinutesAgo = new Date(moment().subtract(5, 'minutes').valueOf())
  const event = await events.where({chapter: 'sf'})
                            .where('updated_at', '>', fiveMinutesAgo)
                            .first()
  let json
  if (event) {
    json = JSON.parse(event.data)
  } else {
    const eventUrl = process.env.MEETUP_SIGNED_URL
    const res = await fetch(eventUrl)
    json = await res.json()
    saveEvents(json)
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

module.exports = router