module.exports = (sequelize, DataTypes) => {
    const orderDetail = sequelize.define("order_detail", {
        order_detail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.FLOAT,
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {         // User belongsTo Company 1:1
                model: 'orders',
                key: 'order_id'
            }
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {         // User belongsTo Company 1:1
                model: 'books',
                key: 'book_id'
            }
        }


    })
    return orderDetail
}