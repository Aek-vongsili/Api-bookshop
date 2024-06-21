const express = require('express')
const { addBook, addMultipleBook, getAllBook, getBookById, rankingBooks ,getBookByCategory,addBookCategory} = require('../controller/bookController')
const router = express.Router()



// ADD BOOK
router.post('/addbook',addBook)
//ADD MULTIPLE BOOK
router.post('/addmultiplebook',addMultipleBook)
router.post('/addcategory',addBookCategory)
// LIST BOOK
router.get('/listbooks',getAllBook)
router.post('/bookCategory',getBookByCategory)
//GET BOOK BY ID
router.get('/book/:id',getBookById)
//TOP 5 BOOK SELLER
router.get("/ranking",rankingBooks)
module.exports = router