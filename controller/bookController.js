const db = require("../models");
const fs = require("fs");

const path = require("path");
const Book = db.books;
const BookCategory = db.book_categories;

//add Books

const addBook = async (req, res) => {
  let data = {
    book_id: req.body.id,
    url: req.body.url,
    title: req.body.title,
    author: req.body.author,
    ImageURL: req.body.ImageURL,
    rating: req.body.rating,
    ratings: req.body.ratings,
    price: req.body.price,
    social_media_following: req.body.social_media_following,
    award: req.body.award,
    instock: req.body.instock,
  };
  try {
    const books = await Book.create(data);
    res.status(200).json(books);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
// const getRandomCatId = () => Math.floor(Math.random() * 10) + 1;
const addMultipleBook = async (req, res) => {
  let arr = req.body;
  let data = arr.map((i) => ({
    book_id: i.id,
    url: i.url,
    title: i.title,
    author: i.author,
    ImageURL: i.ImageURL,
    rating: i.rating,
    ratings: i.ratings,
    price: i.price,
    social_media_following: i.social_media_following,
    award: i.award,
    instock: 10,
    cat_id: i.cat_id,
  }));
  try {
    const books = await Book.bulkCreate(data);
    res.status(200).json(books);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
const addBookCategory = async (req, res) => {
  let arr = req.body;
  let data = arr.map((i) => ({
    catName: i.value,
  }));
  try {
    const rs = BookCategory.bulkCreate(data);
    res.status(200).json(rs);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await BookCategory.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getBookByCategory = async (req, res) => {
  try {
    let { id } = req.params;
    const result = await BookCategory.findOne({
      where: { cat_id: id },
      include: [
        {
          model: Book,
          as: "books",
        },
      ],
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
const getAllBook = async (req, res) => {
  try {
    const result = await Book.findAll({});
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

const getBookById = async (req, res) => {
  let { id } = req.params;
  // console.log(id)
  try {
    const result = await Book.findOne({ where: { book_id: id } });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

const rankingBooks = async (req, res) => {
  try {
    const result = await Book.findAll({});
    const booksAsObjects = result.map((book) => book.toJSON());
    // console.log(booksAsObjects);
    const modelSavePath = "file://./saved_model/model.json";
    tf.loadLayersModel(modelSavePath).then((loadModel) => {
      // const jsonData = fs.readFileSync('books_data.json', 'utf-8');
      // const data = JSON.parse(jsonData);
      const xData = booksAsObjects.map((book) => [
        book.price,
        book.rating,
        book.social_media_following,
        book.award,
      ]);
      const predictions = loadModel.predict(tf.tensor2d(xData)).dataSync();
      const rankedBooks = booksAsObjects.map((book, index) => ({
        ...book,
        predictedProbability: predictions[index],
      }));

      // Sort the books by predicted probability (higher probability means higher chance of being a best seller)
      rankedBooks.sort(
        (a, b) => b.predictedProbability - a.predictedProbability
      );
      // Display the top 5 best-selling books
      const top5BestSellers = rankedBooks.slice(0, 5);

      // console.log('Top 5 Best-Selling Books:');
      // console.log(top5BestSellers);
      res.status(200).json(top5BestSellers);
    });
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

module.exports = {
  addBook,
  addMultipleBook,
  getAllBook,
  getBookById,
  rankingBooks,
  getBookByCategory,
  addBookCategory,
  getAllCategory,
};
