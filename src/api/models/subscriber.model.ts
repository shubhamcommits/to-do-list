// Sequelize Module
import sequelize from 'sequelize'

// Import Database Class
import { db } from '../../sequelize'

// Sequelize Model
export const Subscriber: any = db.define('Subscriber', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: sequelize.STRING,
        allowNull: false
    }
})