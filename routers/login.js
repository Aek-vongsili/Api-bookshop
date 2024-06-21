const express = require('express')
const { register, login, getDelivery_detail, addDelivery_detail, getUserData, updateUserData } = require('../controller/userController')
const passport = require('passport')
const router = express.Router()

// router.post("/login",(req,res=>{

// }))
router.post("/login", login)
router.post("/register", register)
router.put("/update", passport.authenticate('jwt', { session: false }), updateUserData)
router.get("/getuser_data", passport.authenticate('jwt', { session: false }), getUserData)
router.get("/getdeliveryDetail", passport.authenticate('jwt', { session: false }), getDelivery_detail)
router.post("/addDeliveryDetail", passport.authenticate('jwt', { session: false }), addDelivery_detail)

module.exports = router
