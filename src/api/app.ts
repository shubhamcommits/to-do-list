// Express Module
import express, { NextFunction, Request, Response } from 'express'

// Import Sequelize
import { db } from '../sequelize'

// Cors Module
import cors from 'cors'

// Morgan Module
import morgan from 'morgan'

// Compression Module
import compression from 'compression'

// Routes
import { todoRoutes, subRoutes } from './routes'

// Define the express application
const app = express()

// Cors middleware for origin and Headers
app.use(cors())

// Authenticate the Sequilize and Initilize the ORM inside the application
db.authenticate()
    .then((res: any) => {
        db.sync({ alter: true })
            .then((res) => {
                process.stdout.write(`\n Database: All the Models are Synced with the Database Tables! \n`)
            })
            .catch((error: any) => {
                process.stdout.write(`\n Database: Unable to sync the Database Tables! \n ${error} \n`)
            })
        process.stdout.write(`\n Database: Sequelize has been authenticated! \n`)
    })
    .catch((error: any) => {
        process.stdout.write(`\n Database: Unable to authenticate the Database with Sequelize! \n ${error} \n`)
    })

// Allow any method from any host and log requests
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, PATCH')
    if ('OPTIONS' === req.method) {
        res.sendStatus(200)
    } else {
        console.log(`\n${req.ip} ${req.method} ${req.url}\n`)
        next()
    }
})

// Adding The 'body-parser' middleware only handles JSON and urlencoded data
app.use(express.json())

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'))

// Correct REST naming
app.use('/api/v1/todos', todoRoutes)
app.use('/api/v1/subscribers', subRoutes)

// Default Route
app.use('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'To Do List Server is working!' })
})

// Invalid routes handling middleware
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error('Not found, check your URL please!')
    error.status = 404
    next(error)
})

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: JSON.stringify(error)
        }
    })
})

// Compressing the application
app.use(compression())

// Export the application
export default app 