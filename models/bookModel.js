module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING(100)
        },
        author: {
            type: DataTypes.STRING(100)
        },
        ImageURL: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.FLOAT
        },
        ratings: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.FLOAT
        },
        social_media_following: {
            type: DataTypes.INTEGER
        },
        award: {
            type: DataTypes.INTEGER
        },
        instock:{
            type: DataTypes.INTEGER
        },
        cat_id:{
            type: DataTypes.INTEGER,
            references: {         // User belongsTo Company 1:1
                model: 'book_categories',
                key: 'cat_id'
            }
        }

    })
    return Book
}