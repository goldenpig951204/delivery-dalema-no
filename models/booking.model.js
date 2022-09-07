const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
    {
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Slot'
        },
        date: {
            type: Date,
            default: new Date()
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        slotQty: {
            type: Number,
            default: 0
        },
        contactName: {
            type: String,
            default: ''
        },
        contactEmail: {
            type: String,
            default: ''
        },
        contactPhone: {
            type: String,
            default: ''
        },
        lines: {
            type: [{ orderReference: "",  attachment: "" }],
            default: []
        }
    },
    {
        timestamps: true,
    }
)

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
