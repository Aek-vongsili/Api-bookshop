module.exports = (sequelize, DataTypes) => {
    const BookCategory = sequelize.define("book_category", {
        cat_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        catName: {
            type: DataTypes.STRING(30)
        }
    })
    return BookCategory
}