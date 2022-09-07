const mongoose = require('mongoose')

const slotSchema = mongoose.Schema(
    {
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse'
        },
        fromDate: {
            type: Date,
            default: new Date()
        },
        toDate: {
            type: Date,
            default: new Date()
        },
        fromTime: {
            type: { hour: Number, minute: Number },
            default: { hour: 0, minute: 0 }
        },
        toTime: {
            type: { hour: Number, minute: Number },
            default: { hour: 0, minute: 0 }
        },
        loadUnit: {
            type: String,
            default: 'pallet'
        },
        capacity: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
)

const Slot = mongoose.model('Slot', slotSchema)

module.exports = Slot
