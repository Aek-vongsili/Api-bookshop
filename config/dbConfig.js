module.exports = {
    HOST: 'sql12.freesqldatabase.com',
    USER: 'sql12777195',
    PASSWORD: 'zCMqJ2ZLvK',
    DB: 'sql12777195',
    dialect: 'mysql',
    pool: {
        max: 3,  // Further reduced connection pool
        min: 0,
        acquire: 90000,  // Significantly increased
        idle: 10000
    },
}
// module.exports = {
//     HOST: 'localhost',
//     USER: 'root',
//     PASSWORD: '',
//     DB: 'bookshop',
//     dialect: 'mysql',
//     pool: {
//         max: 10,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }