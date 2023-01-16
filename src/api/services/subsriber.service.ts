// Import Subscriber Model
import { Subscriber } from '../models'

// Import Axios Module
import axios from 'axios'

// Subscriber Service
export class SubscriberService {

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
                        resolve({ subscriber: res })
                    })
                    .catch((error: any) => {
                        reject({ error: error })
                    })

            } catch (error) {
                reject({ error: error })
            }
        })
    }

    async notifySubscriber(url: string, event: string, data: any) {
        return new Promise(async (resolve, reject) => {
            try {

                // Send the Post Request to the Subscriber
                axios.post(url, { event: event, data: data })
                    .then((res: any) => {
                        console.log(`${url} - Subscriber has been notified successfully!`)
                        resolve({
                            message: 'Subscriber has been notified successfully!',
                            subscriber: res
                        })
                    })
                    .catch((error: any) => {
                        console.log(`${url} - Subscriber has been notified successfully!`)
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

    async fetchAllSubscribers() {
        return new Promise(async (resolve, reject) => {
            try {

                // Create the Subscriber
                Subscriber.findAll({ raw: true })
                    .then((res: any) => {
                        resolve(res)
                    })
                    .catch((error: any) => {
                        reject([])
                    })

            } catch (error) {
                reject({ error: error })
            }
        })
    }
}