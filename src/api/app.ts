// Express Module
import express, { NextFunction, Request, Response } from 'express'

// Cors Module
import cors from 'cors'

// Morgan Module
import morgan from 'morgan'

// Compression Module
import compression from 'compression'

// Define the express application
const app = express()

// Cors middleware for origin and Headers
app.use(cors())

// Adding The 'body-parser' middleware only handles JSON and urlencoded data
app.use(express.json())

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'))

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