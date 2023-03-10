// Import Express Types
import { NextFunction, Request, Response } from 'express'

// Import Utilities
import { SendError } from '../../utils'

// Import Services
import { SubscriberService } from '../services'

export class SubscriberControllers {

    /**
     * Create Subscriber Controller
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    async createSubscriber(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the data from the request body
            let { url } = req.body

            // Validate the Data
            if (!url) {
                return res.status(400).json({ 
                    message: 'Validation Error!',
                    error: 'URL is required in the request body!' 
                })
            }

            // Call the Service Function
            new SubscriberService()
                .createSubscriber(url)
                .then((data: any) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'New Subscriber Item has been created!',
                        success: true,
                        subscriber: data.subscriber
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        message: 'Unable to create the new Subscriber!',
                        success: false,
                        error: error
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    }

    /**
     * Notify Subscriber Controller
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    async notifySubscriber(req: Request, res: Response, next: NextFunction) {
        try {

            // Fetch the data from the request body
            let { url, event, data } = req.body

            // Validate the Data
            if (!url || !event || !data) {

                // Send Status 400 response
                return res.status(400).json({ 
                    message: 'Validation Error!',
                    error: 'URL, Event, and Data are required in the request body!' 
                })
            }

            // Call the Service Function
            new SubscriberService()
                .notifySubscriber(url, event, data)
                .then((data: any) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Subsriber has been notified successfully!',
                        success: true,
                        subscriber: data.subscriber
                    })
                })
                .catch((error) => {

                    // Send Status 400 response
                    return res.status(400).json({
                        message: 'Unable to notify the Subscriber!',
                        success: false,
                        error: error
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    }

    /**
     * Fetch All Subscriber Controller
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    async fetchAllSubscribers(req: Request, res: Response, next: NextFunction) {
        try {

            // Call the Service Function
            new SubscriberService()
                .fetchAllSubscribers()
                .then((data: any) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'All the subscribers are fetched!',
                        subscribers: data
                    })
                })
                .catch((error) => {

                    // Send Status 400 response
                    return res.status(400).json({
                        message: 'Unable to fetch the subscribers!',
                        success: false,
                        error: error
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    }
}