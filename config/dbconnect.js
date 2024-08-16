const {Sequelize} = require("sequelize")
require('dotenv').config()
const sequelize = new Sequelize(process.env.MYSQL_LF_DB_NAME,process.env.MYSQL_LF_USERNAME,process.env.MYSQL_LF_PASSWORD,{
    host:process.env.MYSQL_DB_SERVER,
    dialect:'mysql',
    logging:false
} )

sequelize.sync()

module.exports = sequelize