const db = require('../db')

module.exports = class ApiClient {
  constructor(type, username) {
    this.type = type
    this.username = username
    this.id = null
    this.credentials = '{}'
  }

  async save() {
    const credentials = JSON.stringify(this.credentials)
    if (this.id) {
      await db('api_clients').where({id: this.id}).update({credentials})
    } else {
      const {type, username} = this
      const result = await db('api_clients').insert({type, username, credentials}, 'id')
      this.id = result[0]
    }
  }

  async delete() {
    if (this.id) {
      await db('api_clients').where({id: this.id}).delete()
    }
  }

  static async forUser(type, username) {
    let instance = new ApiClient(type, username)
    let result = await db('api_clients').where({type, username}).first()
    if (result) {
      instance.id = result.id
      instance.credentials = JSON.parse(result.credentials)
    }
    return instance
  }
}