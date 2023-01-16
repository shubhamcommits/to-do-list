// Import Express Types
import { NextFunction, Request, Response } from 'express'

// Import Utilities
import { SendError } from '../../utils'

// Import Services
import { TodoService } from '../services'

// Todo Controllers
export class TodoControllers {

    /**
     * Create To Do Controller
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    async createToDoItem(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the data from the request body
            let { task } = req.body

            // Validate the Data
            if (!task) {

                // Send Status 400 response
                return res.status(400).json({ 
                    message: 'Validation Error!',
                    error: 'Task is required in the request body!' 
                })
            }

            // Call the Service Function
            new TodoService()
                .createToDoItem(task)
                .then((data: any) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'New To-Do Item has been created!',
                        success: true,
                        item: data.item,
                        notifications: data.notifications
                    })
                })
                .catch((error) => {

                    // Send Status 400 response
                    return res.status(400).json({
                        message: 'Unable to create the new To Do Item!',
                        success: false,
                        error: error
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    }

    /**
     * Update To Do Item Controller
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    async updateToDoItem(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the ID from Request Params
            let id = Number(req.params.id)

            // Validate the ID
            if (!id ) {

                // Send Status 400 response
                return res.status(400).json({ 
                    message: 'Validation Error!',
                    error: 'To Do Item ID is not present with the request!' 
                })
            }

            // Fetch the data from the request Body
            let { completed } = req.body

            // Validate the Request Body
            if (!req.body ) {

                // Send Status 400 response
                return res.status(400).json({ 
                    message: 'Validation Error!',
                    error: 'The completed status seems missing in the request body!' 
                })
            }

            // Call the Service Function
            new TodoService()
                .updateToDoItem(id, completed)
                .then((data: any) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'To-Do Item has been updated!',
                        success: true,
                        data: data.item
                    })
                })
                .catch((error) => {

                    // Send Status 400 response
                    return res.status(400).json({
                        message: 'Unable to Update the To Do Item!',
                        success: false,
                        error: error
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    }

    /**
     * Fetch All ToDos Controller
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    async fetchAllTodos(req: Request, res: Response, next: NextFunction) {
        try {

            // Call the Service Function
            new TodoService()
                .fetchAllTodos()
                .then((data: any) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'All the todos are fetched!',
                        success: true,
                        todos: data
                    })
                })
                .catch((error) => {

                    // Send Status 400 response
                    return res.status(400).json({
                        message: 'Unable to Update the To Do Item!',
                        success: false,
                        error: error
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    }

}