const mongoose = require('mongoose')

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
)

const Country = mongoose.model('Country', countrySchema, 'countries')

module.exports = Country
