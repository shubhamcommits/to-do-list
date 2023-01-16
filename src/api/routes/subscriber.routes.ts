// Router Module
import { Router } from 'express'

// Import Controllers
import { SubscriberControllers } from '../controllers'

// Instantiate Controller
const subControllers = new SubscriberControllers()

// Export Router
export const subRoutes = Router()

// Route Definition
subRoutes.route('/')

    // Fetch all subsribers
    .get(subControllers.fetchAllSubscribers)

    // Create Subscriber Item
    .post(subControllers.createSubscriber)

// Route Definition
subRoutes.post('/notify', subControllers.notifySubscriber)