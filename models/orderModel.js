module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("orders", {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        order_del_status: {
            type: DataTypes.STRING(10),
            defaultValue: "waiting"
        },

        order_pay_status: {
            type: DataTypes.STRING(10),
            defaultValue: "waiting"
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {         // User belongsTo Company 1:1
                model: 'users',
                key: 'user_id'
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
        delivery_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'delivery_details',
                key: 'delivery_id'
            }
        },
        ex_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'exchange_rates',
                key: 'ex_id'
            }
        }


    })
    return Order
}