const db = require('../db')

const moment = require('moment')
const fetch = require('isomorphic-unfetch')

module.exports = class EventSource {
  constructor({chapter}) {
    this.chapter = chapter
  }

  async saveData(data) {
    try {
      await db('event_sources').where({chapter: 'sf'}).update({
        data: JSON.stringify(data),
        updated_at: new Date()
      })
    } catch (err) {
      console.error(`Error saving event data: ${err.toString()}`)
    }
  }
  
  async getData() {
    const fiveMinutesAgo = new Date(moment().subtract(5, 'minutes').valueOf())
    const event = await db('event_sources').where({chapter: this.chapter})
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

  static async forChapter(chapter) {
    return new EventSource({chapter})
  }
}