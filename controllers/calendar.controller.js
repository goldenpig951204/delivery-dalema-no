const warehouseModel = require('../models/warehouse.model')
const countryModel = require('../models/country.model')
const companyModel = require('../models/company.model')
const slotModel = require('../models/slot.model')
const bookingModel = require('../models/booking.model')
const mongoose = require('mongoose')
async function list(req, res) {
    const { warehouse, startDate, endDate, company, page, perPage } = req.query

    if (warehouse) {
        let slots = await slotModel.find({ warehouse, fromDate: { $lte: endDate }, toDate: { $gte: startDate }})
        let slotBookings = await bookingModel.find({ date: { $gte: startDate, $lte: endDate }}).select('slot slotQty date')

        let companyQuery = { $match: { 'company.0._id':  company ? mongoose.Types.ObjectId(company) : ( req.user.userType == 'user' ? { $in: req.user.company } : {$ne: ""})}}


        let list = await bookingModel.aggregate([
            { $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) }}},
            { $lookup: { from: 'slots', localField: 'slot', foreignField: '_id', as: 'slot'}},
            { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user'}},
            { $lookup: { from: 'companies', localField: 'company', foreignField: '_id', as: 'company'}},
            { $match: { 'slot.0.warehouse': mongoose.Types.ObjectId(warehouse) }},
            companyQuery,
            {
                $project: {
                    date: 1,
                    slotQty: 1,
                    contactName: 1,
                    contactEmail: 1,
                    contactPhone: 1,
                    lines: 1,
                    slot: { $arrayElemAt: [ "$slot", 0 ] },
                    user: { $arrayElemAt: [ "$user", 0 ] },
                    company: { $arrayElemAt: [ "$company", 0 ] },
                }
            }
        ])
        
        let total = await bookingModel
            .find({ date: { $gte: startDate, $lte: endDate }})
            .populate({ path: 'slot', match: { warehouse }})
            .count()

        res.json({ result: 1, data: { slots, slotBookings, list, total, startDate }})
    }
    else {
        res.json({ result: 0 })
    }
}

async function warehouses(req, res) {
    let warehouses = await warehouseModel.find({ country: req.params.country })
    res.json({ result: 1, data: { warehouses }})
}

async function countries(req, res) {
    let countries = await countryModel.find()
    let companies = await companyModel.find()
    res.json({ result: 1, data: { countries, companies }})
}

async function booking(req, res) {
    const { slot, date, slotQty, company, contactName, contactEmail, contactPhone, lineCnt } = req.body

    if (!company) {
        res.json({ result: 0, msg: 'Company is required'})
        return
    }

    let bookingSlot = await slotModel.findById(slot)

    let sumQty = 0
    let bookings = await bookingModel.aggregate([
        { $match: { date: new Date(date), slot: mongoose.Types.ObjectId(slot) }},
        { $group: { _id: null, qty: { $sum: "$slotQty" } } }
    ])

    if (bookings.length) sumQty = bookings[0].qty

    if (bookingSlot.capacity - sumQty >= slotQty) {
        let booking = new bookingModel()
    
        booking.user = req.user._id
        booking.slot = slot
        booking.date = date
        booking.company = company
        booking.slotQty = slotQty
        booking.contactName = contactName
        booking.contactEmail = contactEmail
        booking.contactPhone = contactPhone
    
        let promises = []
        
        for (let i = 0; i < lineCnt; i++) {
            promises.push(new Promise((resolve, reject) => {
                if (req.files) {
                    let file = req.files['attachment_' + i]
                    if (file) {
                        let filename = Date.now() + '_' + file.name
                        file.mv(__dirname + '/../upload/' + filename, (err) => {
                            if (err) {
                                reject(err)
                            }
                            else {
                                resolve(filename)
                            }
                        })
                    }
                    else {
                        resolve('')
                    }
                }
                else {
                    resolve('')
                }
            }))
        }
    
        let attachments = await Promise.all(promises)
    
        let lines = []
        for (let i = 0; i < lineCnt; i++) {
            lines.push({ orderReference: req.body['orderReference_' + i], attachment: attachments[i] })
        }
    
        booking.lines = lines
        await booking.save()
        
        res.json({ result: 1 })
    }
    else {
        res.json({ result: 0, msg: 'No available space', confirm: 1 })
    }
}

async function download(req, res) {
    res.download(__dirname + '/../upload/' + req.params.attachment, req.params.attachment)
}

async function deleteById(req, res) {
    await bookingModel.deleteOne({ _id: req.params.bookingId })
    res.json({ result: 1 })
}

async function move(req, res) {
    const { slot, date } = req.body

    let booking = await bookingModel.findById(req.params.bookingId)
    if (booking) {
        if (booking.slot == slot && booking.date == date) {
            res.json({ result: 0 })
        }
        else {
            let bookingSlot = await slotModel.findById(slot)

            let sumQty = 0
            let bookings = await bookingModel.aggregate([
                { $match: { date: new Date(date), slot: mongoose.Types.ObjectId(slot) }},
                { $group: { _id: null, qty: { $sum: "$slotQty" } } }
            ])

            if (bookings.length) sumQty = bookings[0].qty
            if (bookingSlot.capacity - sumQty >= booking.slotQty) {
                booking.slot = slot
                booking.date = date
                await booking.save()
                res.json({ result: 1 })
            }
            else {
                res.json({ result: 0, msg: 'No available space', confirm: 1 })
            }
        }
    }
}

module.exports = {
    list,
    warehouses,
    countries,
    booking,
    download,
    deleteById,
    move
}