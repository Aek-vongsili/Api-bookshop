const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require('path');
const certPath = path.resolve(__dirname, '../cert/lead-amount-6740-ssl-public-cert.cert');

console.log(certPath)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectModule :require('mysql2'),
  port: 3306,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(certPath),
    },
    connectTimeout: 120000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected Database");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.books = require("./bookModel")(sequelize, DataTypes);
db.users = require("./userModel")(sequelize, DataTypes);
db.admins = require("./adminModel")(sequelize, DataTypes);
db.delivery_details = require("./deliveryDetailModel")(sequelize, DataTypes);
db.orders = require("./orderModel")(sequelize, DataTypes);
db.payments = require("./paymentModel")(sequelize, DataTypes);
db.order_detail = require("./orderDetailModel")(sequelize, DataTypes);
db.exchange_rates = require("./exchangeRateModel")(sequelize, DataTypes);
db.book_categories = require("./bookCategory")(sequelize, DataTypes);

// relation between user and delivery Detail
db.users.hasMany(db.delivery_details, {
  foreignKey: "user_id",
  as: "delivery_detail",
});
db.delivery_details.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});
// relation between Book and order Detail
db.books.hasMany(db.order_detail, {
  foreignKey: "book_id",
  as: "order_detail",
});
db.order_detail.belongsTo(db.books, {
  foreignKey: "book_id",
  as: "book",
});
//Relation between order and order detail
db.orders.hasMany(db.order_detail, {
  foreignKey: "order_id",
  as: "order_detail",
});
db.order_detail.belongsTo(db.orders, {
  foreignKey: "order_id",
  as: "order",
});
//relation between payments and orders
db.orders.hasOne(db.payments, {
  foreignKey: "order_id",
  as: "payments",
});
db.payments.belongsTo(db.orders, {
  foreignKey: "order_id",
  as: "orders",
});
//relation between user and orders
db.users.hasMany(db.orders, {
  foreignKey: "user_id",
  as: "order",
});
db.orders.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

//relation between delivery_detail and orders
db.delivery_details.hasOne(db.orders, {
  foreignKey: "delivery_id",
  as: "orders",
});
db.orders.belongsTo(db.delivery_details, {
  foreignKey: "delivery_id",
  as: "delivery_detail",
});
//relation between exchange_rate and orders
db.exchange_rates.hasMany(db.orders, {
  foreignKey: "ex_id",
  as: "orders",
});
db.orders.belongsTo(db.exchange_rates, {
  foreignKey: "ex_id",
  as: "exchange_rate",
});

//relation between category and book
db.book_categories.hasMany(db.books, {
  foreignKey: "cat_id",
  as: "books",
});
db.books.belongsTo(db.book_categories, {
  foreignKey: "cat_id",
  as: "book_categories",
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync done!!");
});

module.exports = db;
