module.exports = (sequelize, DataTypes) => {
    const ExchangeRate = sequelize.define("exchange_rate", {
        ex_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        bath: {
            type: DataTypes.FLOAT
        },
        dollar: {
            type: DataTypes.FLOAT
        }


    })
    return ExchangeRate
}