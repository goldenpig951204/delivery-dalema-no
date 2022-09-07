const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
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

const Company = mongoose.model('Company', companySchema, 'companies')

module.exports = Company
