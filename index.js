const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const fs = require('fs');
const csv = require('csv-parser');
const cors = require("cors")
const bookRouter = require('./routers/books')
const register_Login = require('./routers/login')
const createOrder = require('./routers/orderPayment')
require("./auth/passport")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const corOptions = {
    origin:'*'
}
app.use(cors(corOptions))
app.use("/api/books",bookRouter)
app.use("/api/user",register_Login)
app.use("/api/orders",createOrder)
// const jsonData = fs.readFileSync('books_data.json', 'utf-8');
// const data = JSON.parse(jsonData);
// if (data) {
//     rankBooks(data)
// }
// function rankBooks(data) {
//     // Prepare the training data
//     const xData = data.map((book) => [book.price, book.rating, book.social_media_following, book.award]);
//     const yData = data.map((book) => (book.ratings));

//     // Convert data to tensors
//     const xTensor = tf.tensor2d(xData);
//     const yTensor = tf.tensor1d(yData);

//     // Create and train the neural network model
//     const model = tf.sequential();
//     model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [4] }));
//     model.add(tf.layers.dense({ units: 1 }));
    
//     model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });
//     const epochs = 400;
//     model.fit(xTensor, yTensor, { epochs }).then(() => {

//         // Make predictions for the entire dataset
//         const predictions = model.predict(xTensor).dataSync()
//         console.log(predictions)
//         // Combine predictions with book data
//         const rankedBooks = data.map((book, index) => ({
//             title: book.title,
//             price: book.price,
//             rating: book.rating,
//             ratings: book.ratings,
//             isBestSeller: book.bestSeller,
//             socialMedia: book.social_media_following,
//             predictedProbability: predictions[index],
//         }));

//         // Sort the books by predicted probability (higher probability means higher chance of being a best seller)
//         rankedBooks.sort((a, b) => b.predictedProbability - a.predictedProbability);

//         // Display the top 5 best-selling books
//         const top5BestSellers = rankedBooks.slice(0, 5);

//         console.log('Top 5 Best-Selling Books:');
//         console.log(top5BestSellers);
//         const modelSavePath = 'file://./saved_model';
//         model.save(modelSavePath)
//             .then(() => {
//                 console.log('Model saved successfully.');

//             })
//             .catch(err => {
//                 console.error('Error saving model:', err);
//             });
//     });

// }


app.listen(port, () => {
    console.log(`Your server is listen on ${port}`)
})



