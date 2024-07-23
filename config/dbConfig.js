module.exports = {
    HOST: 'SG-spot-gecko-8514-9668-mysql-master.servers.mongodirector.com',
    USER: 'sgroot',
    PASSWORD: 'u8P.ovUT0HRoSQbR',
    DB: 'bookshop',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
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