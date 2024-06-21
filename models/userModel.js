module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName:{
            type:DataTypes.STRING(50),
            allowNull: false
        },
        lastName:{
            type:DataTypes.STRING(50),
            allowNull: false
        },
        dob:{
            type:DataTypes.DATEONLY
        },
        email:{
            type:DataTypes.STRING(80)
        },
        userName:{
            type:DataTypes.STRING(20)
        },
        password:{
            type:DataTypes.STRING
        }
        

    })
    return User
}