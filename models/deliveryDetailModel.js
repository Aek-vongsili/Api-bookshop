module.exports = (sequelize, DataTypes) => {
    const DeliveryDetail = sequelize.define("delivery_detail", {
        delivery_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        del_village: {
            type: DataTypes.STRING(50),
        },
        del_district: {
            type: DataTypes.STRING(50),
        },
        del_province: {
            type: DataTypes.STRING(50),
        },
        del_phone: {
            type: DataTypes.STRING(15),
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {         // User belongsTo Company 1:1
                model: 'users',
                key: 'user_id'
            }
        },


    })
    return DeliveryDetail
}