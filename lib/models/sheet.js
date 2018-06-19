const db = require('../db')
const ApiClient = require('./api-client')
const {google} = require('googleapis')

module.exports = class Sheet {
  constructor({id, name, owner, externalId}) {
    this.id = id || null
    this.name = name
    this.owner = owner
    this.externalId = externalId
    this.cache = {}
  }

  async save() {
    const fields = {
      owner: this.owner,
      external_id: this.externalId
    }
    if (this.id) {
      await db('sheets').where({id: this.id}).update(fields)
    } else {
      const {type, username} = this
      const result = await db('sheets').insert({name: this.name, ...fields}, 'id')
      this.id = result[0]
    }
  }

  async delete() {
    if (this.id) {
      await db('sheets').where({id: this.id}).delete()
    }
  }

  static async forName(name) {
    let result = await db('sheets').where({name}).first()
    if (result) {
      return new Sheet({
        id: result.id,
        name: result.name,
        owner: result.owner,
        externalId: result.external_id
      })
    } else {
      return new Sheet({name})
    }
  }

  async getApiClient() {
    if (this.cache.apiClient) {
      return this.cache.apiClient
    }
    return await ApiClient.forUser('google', this.owner)
  }

  async getData() {
    const apiClient = await this.getApiClient()
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_SECRET,
      `${process.env.BASE_URL}/auth/google/callback`
    )
    auth.setCredentials(apiClient.credentials)
    const sheets = google.sheets({version: 'v4', auth})
    console.log({auth, externalId: this.externalId})
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: this.externalId,
      range: 'A1:B2'
    })
    return result.data.values
  }
}