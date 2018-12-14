const knex = require('../db/index.js')


class Theatre {
  constructor({
    id,
    name,
    address
  } = {}) {
    this._id = id
    this._name = name
    this._address = address
    this._removed = false
    this._valid = null
  }

  static all() {
    return knex('theatres').select('*')
      .then(result => {
        return result.map(ele => new Theatre(ele))
      })
  }

  get id() {
    return this._id
  }

  set id(val) {
    throw new Error('wrong id value')
  }

  get name() {

  }

  set name(val) {
    this._name = val
  }
  get address() {

  }

  set address(val) {
    this._address = val
  }
  static find(id) {
    return knex('theatres')
      .where({
        id
      })
      .then(result => {
        // console.log(result) why when I console log here does is come up for every test
        if (!result[0]) {
          throw new Error('Cannot find result by id')
        }
        return new Theatre(result[0])
      })
  }



  save() {
    if (!this._address || !this._name) {
      return Promise.reject(new Error('values are missing on creation'))
    }
    const selfID = this._id
    if (!selfID) {
      return knex('theatres')
        .insert({
          name: this._name,
          address: this._address
        })
        .returning('*')
        .then(result => {
          return this
        })
    } else {
      return knex('theatres')
        .where({
          id: selfID
        })
        .update({
          name: this._name,
          address: this._address
        })
        .then(result => {
          return this
        })
    }

  }

  get removed() {
    return this._removed
  }

  set removed(value) {
    throw new Error('Cannot manually remove')
  }


  destroy() {
    return knex('theatres')
    .where({id: this._id})
    .delete('*')
    .then(result => {
      this._removed = true
      return this
    })
  }


  get valid () {
    if (!this._address || !this._name) {
      this._valid = false
      return false
    }    
    return true
  }

  set valid(value){
      throw new Error('Error cannot update this way.')
  }


}

module.exports = Theatre