const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minlength: 3
  },
  favouriteGenre: {
    type: String,
    required: true
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('User', schema)