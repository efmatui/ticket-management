import mongo from './mongodb'
import bodyParser from 'body-parser'
import express from 'express'
import moment from 'moment'

const app = express()
app.use(bodyParser.json())

app.get('/ticket', async (req, res, next) => {
    const response = await mongo.db('management').collection('ticket_management').find().toArray()
    const ticketOrders = await mongo.db('management').collection('ticket_order').find({
      createdAt: {
        $gte: new Date(moment.utc().startOf('day').toISOString()),
        $lt: new Date(moment.utc().endOf('day').toISOString())
      },
    }).toArray()
    if (ticketOrders) {
      let limitOrder:any = {'A': 0,'B': 0,'C': 0,'D': 0,}
      for (let ticketOrder of ticketOrders) {
        limitOrder[ticketOrder['type']] += ticketOrder.sold
      }
      for (let i=0; i< response.length; i++) {
        response[i]['status'] = limitOrder[response[i].type] < response[i].amountPerDay
      }
    }
    res.json(response)
})
app.get('/ticket/order', async (req, res, next) => {
  const query = await mongo.db('management').collection('ticket_order')
  let response
  if (req.query.type && req.query.startDate && req.query.endDate) {
    response = await query.find({
      type: req.query.type,
      updatedAt: {
        $gte: new Date(req.query.startDate as string),
        $lte: new Date(req.query.endDate as string)
      },
    }).toArray()
  } else if (req.query.type) {
    response = await query.find({
      type: req.query.type
    }).toArray()
  }
  else if (req.query.startDate && req.query.endDate) {
    response = await query.find({
      updatedAt: {
        $gte: new Date(req.query.startDate as string),
        $lte: new Date(req.query.endDate as string)
      },
    }).toArray()
  } else {
    response = await query.find().toArray()
  }
  res.json(response)
})

module.exports = app
