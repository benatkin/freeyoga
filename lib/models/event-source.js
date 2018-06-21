const db = require('../db')

const moment = require('moment')
const fetch = require('isomorphic-unfetch')

module.exports = class EventSource {
  constructor({chapter, data, requestedAt, createdAt, updatedAt}) {
    this.chapter = chapter
    this.data = data
    this.requestedAt = requestedAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  async save(data) {
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
    if (!this.updatedAt || this.updatedAt < fiveMinutesAgo) {
      if (!this.requestedAt || this.requestedAt < fiveMinutesAgo) {
        try {
          const eventUrl = process.env.MEETUP_SIGNED_URL
          this.requestedAt = new Date()
          const res = await fetch(eventUrl)
          this.data = await res.json()
          this.updatedAt = new Date()
        } catch (err) {
          console.error(`Error loading events for ${this.chapter}: ${err}`)
        } finally {
          await this.save()
        }
      } else {
        console.log(`Event for ${this.chapter} out of date, but recently requested.\n` +
                    `  Retrying later.`)
      }
    }
    return this.data
  }

  static async forChapter(chapter) {
    let result = await db('event_sources').where({chapter}).first()
    if (result) {
      return new EventSource({
        chapter: result.chapter,
        data: result.data,
        requestedAt: result.requested_at,
        createdAt: result.created_at,
        updatedAt: result.updated_at
      })
    } else {
      return new EventSource({chapter})
    }
  }
}