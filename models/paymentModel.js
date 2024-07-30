module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("payments", {
        payment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        total_price: {
            type: DataTypes.FLOAT
        },
        payment_picture: {
            type: DataTypes.STRING(150)
        },
        payment_type: {
            type: DataTypes.STRING(30)
        },
        payment_status: {
            type: DataTypes.STRING(10),
            defaultValue: "waiting"
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {         // User belongsTo Company 1:1
                model: 'orders',
                key: 'order_id'
            }
        },
        admin_id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            references: {
                model: 'admins',
                key: 'admin_id'
            }
        },


    })
    return Payment
}