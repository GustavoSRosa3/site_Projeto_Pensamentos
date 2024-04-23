const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectamos com o Sequelize!')
} catch (error) {
    console.log('Não foi possível conectar:', error)
}

module.exports = sequelize