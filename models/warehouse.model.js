const mongoose = require('mongoose')

const warehouseSchema = mongoose.Schema(
    {
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        },
        name: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
    }
)

const Warehouse = mongoose.model('Warehouse', warehouseSchema)

module.exports = Warehouse
