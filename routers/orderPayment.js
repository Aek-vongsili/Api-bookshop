const express = require('express')
const passport = require('passport')
const { createOrderWithDetailsAndPayment ,getOrders,addExchangeRate} = require('../controller/ordersPayment')
const router = express.Router()

router.post("/order-payment", passport.authenticate('jwt', { session: false }), createOrderWithDetailsAndPayment)
router.post("/getOrders", passport.authenticate('jwt', { session: false }), getOrders)
router.post("/add-exchange-rate",addExchangeRate)

module.exports = router