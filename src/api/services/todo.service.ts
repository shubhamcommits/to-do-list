// Import Todo Model
import { ToDo } from '../models'

// Import Subscriber Service
import { SubscriberService } from './index'

// Todo Service
export class TodoService {

    /**
     * This service function creates a to do item
     * @param task 
     * @returns 
     */
    async createToDoItem(task: string) {

        return new Promise(async (resolve, reject) => {
            try {

                // ToDo Object
                let toDoObject = {
                    task: task
                }

                // Fetch all the Subscribers who are supposed to be notified
                let subscribers: any = await new SubscriberService().fetchAllSubscribers() || []

                // List of Notified Subscribers
                let notified_subscribers: any = []

                // Create the To Do Item
                ToDo.create(toDoObject)
                    .then(async (res: any) => {

                        // Loop out through every subsriber present in the database
                        for (let index = 0; index < subscribers.length; index++) {

                            // Notify the subscriber about the updation of the To Do Item
                            let data: any = await new SubscriberService()
                                .notifySubscriber(subscribers[index].url, `todo_${res.status}`, res)

                            // Append the Subscribers
                            notified_subscribers.push({
                                url: subscribers[index].url,
                                notification_data: data.message
                                // notification_data: data
                            })
                        }

                        // Resolve the Promise
                        resolve({ item: res, notifications: notified_subscribers })
                    })
                    .catch((error: any) => {

                        // Reject the Promise
                        reject({ error: error })
                    })

            } catch (error) {
                reject({ error: error })
            }
        })
    }

    /**
     * This function is responsible for updating a to-do item
     * @param id 
     * @param completed 
     * @returns 
     */
    async updateToDoItem(id: Number, completed: Boolean) {

        return new Promise(async (resolve, reject) => {
            try {

                // To Do Object
                let toDoObject = {
                    completed: completed,
                    status: 'in-progress'
                }

                // Update the Status 
                if (completed == true) toDoObject.status = 'completed'

                // Fetch all the Subscribers who are supposed to be notified
                let subscribers: any = await new SubscriberService().fetchAllSubscribers() || []

                // List of Notified Subscribers
                let notified_subscribers: any = []

                // Update the Item
                ToDo.update(toDoObject, { where: { id: id } })
                    .then(async (res: any) => {

                        // Loop out through every subsriber present in the database
                        for (let index = 0; index < subscribers.length; index++) {

                            // Notify the subscriber about the updation of the To Do Item
                            let data: any = await new SubscriberService()
                                .notifySubscriber(subscribers[index].url, `todo_${toDoObject.status}`, {
                                    id: id,
                                    status: toDoObject.status,
                                    completed: toDoObject.completed,
                                })

                            // Append the Subscribers
                            notified_subscribers.push({
                                url: subscribers[index].url,
                                notification_data: data.message
                                // notification_data: data
                            })
                        }

                        // Resolve the Promise
                        resolve({
                            item: {
                                id: id,
                                status: toDoObject.status,
                                completed: toDoObject.completed,
                                notifications: notified_subscribers
                            }
                        })
                    })
                    .catch((error: any) => {

                        // Reject the Promise
                        reject({ error: error })
                    })

            } catch (error) {
                reject({ error: error })
            }
        })
    }

    /**
     * This function fetches all the todos in the system
     * @returns 
     */
    async fetchAllTodos() {
        return new Promise(async (resolve, reject) => {
            try {

                // Fetch the list of ToDos
                ToDo.findAll({ raw: true })
                    .then((res: any) => {

                        // Resolve the Promise
                        resolve(res)
                    })
                    .catch((error: any) => {

                        // Reject the Promise with Data
                        reject([])
                    })

            } catch (error) {
                reject({ error: error })
            }
        })
    }

    /**
     * This function fetches a todo by ID
     * @returns 
     */
    async fetchTodo(id: Number) {
        return new Promise(async (resolve, reject) => {
            try {

                // Fetch the ToDo
                ToDo.findOne({
                    where: {
                        id: id
                    }
                })
                    .then((res: any) => {

                        // Resolve the Promise
                        resolve(res)
                    })
                    .catch((error: any) => {

                        // Reject the Promise
                        reject({ error: error })
                    })

            } catch (error) {
                reject({ error: error })
            }
        })
    }

}