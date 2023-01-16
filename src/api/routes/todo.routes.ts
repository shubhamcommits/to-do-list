// Router Module
import { Router } from 'express'

// Import Controllers
import { TodoControllers } from '../controllers'

// Instantiate Controller
const todoControllers = new TodoControllers()

// Export Router
export const todoRoutes = Router()

// Route Definition
todoRoutes.route('/')

    // Create To Do Item
    .post(todoControllers.createToDoItem)

    // Fetch All To Do Items
    .get(todoControllers.fetchAllTodos)

// Route Definition
todoRoutes.route('/:id')

    // Create To Do Item
    .patch(todoControllers.updateToDoItem)