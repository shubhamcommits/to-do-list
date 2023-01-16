// Sequelize Module
import sequelize from 'sequelize'

// Import Database Class
import { db } from '../../sequelize'

// Sequelize Model
export const ToDo: any = db.define('Todo', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    task: {
        type: sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    status: {
        type: sequelize.ENUM,
        defaultValue: 'added',
        values: ['added', 'in-progress', 'completed']
    }
})