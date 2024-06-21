module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admins", {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        admin_fistName: {
            type: DataTypes.STRING(30)
        },
        admin_lastName: {
            type: DataTypes.STRING(30)
        },
        gender: {
            type: DataTypes.STRING(10)
        },
        Image: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING(15)
        },
        email: {
            type: DataTypes.STRING(50)
        },
        password: {
            type: DataTypes.STRING
        },
        
    })
    return Admin
}