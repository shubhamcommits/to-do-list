// Import Subscriber Model
import { Subscriber } from '../models'

// Import Axios Module
import axios from 'axios'

// Subscriber Service
export class SubscriberService {

    /**
     * This function creates a new subscriber to the system
     * @param url 
     * @returns 
     */
    async createSubscriber(url: string) {
        return new Promise(async (resolve, reject) => {
            try {

                // Subscriber Object
                let subscriberObject = {
                    url: url
                }

                // Create the Subscriber
                Subscriber.create(subscriberObject)
                    .then((res: any) => {

                        // Resolve the Promise
                        resolve({ subscriber: res })
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
     * This function is responsble for notifying the subscriber
     * @param url 
     * @param event 
     * @param data 
     * @returns 
     */
    async notifySubscriber(url: string, event: string, data: any) {
        return new Promise(async (resolve, reject) => {
            try {

                // Send the Post Request to the Subscriber
                axios.post(url, { event: event, data: data })
                    .then((res: any) => {

                        // Console the confirmation
                        console.log(`\n ${url} - Subscriber has been notified successfully! \n`)

                        // Resolve the Promise
                        resolve({
                            message: 'Subscriber has been notified successfully!',
                            subscriber: res
                        })
                    })
                    .catch((error: any) => {

                        // Console the confirmation
                        console.log(`${url} - Subscriber has been notified successfully!`)

                        // Resolve the Promise
                        resolve({
                            message: 'Subscriber has been notified successfully!',
                            subscriber: error
                        })
                    })

            } catch (error) {
                reject({ error: error })
            }
        })
    }

    /**
     * This function fetches all the subscribers in the system
     * @returns 
     */
    async fetchAllSubscribers() {
        return new Promise(async (resolve, reject) => {
            try {

                // Fetch the list of subscribers
                Subscriber.findAll({ raw: true })
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
}