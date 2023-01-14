// Import File Stream Module
import { Readable } from 'stream'

// Import Cluster Module
import cluster from 'cluster'

// DotEnv Module
import dotenv from 'dotenv'

// Fetch Number of CPU Cores 
import { cpus } from 'os'

// Express App
import app from './api/app'

// Apply Environments
if (process.env.NODE_ENV != 'production') {

    // Load the config from the .env file
    dotenv.config()

}

// Cluster variable
const isClusterRequired = process.env.CLUSTER

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
async function setupWorkerProcesses() {

    // Console the confirmation
    process.stdout.write(`\n Master cluster is setting up ` + cpus().length + ' workers \n')
    process.stdout.write(`\n Master PID: ${process.pid} is running \n`)

    // Fork workers
    Readable.from(cpus())
        .on('data', (cpu) => {
            process.stdout.write(`\n Message: ${cpu.model} is starting ... \n`)
            cluster.fork()
        })

    // Handle Message from Cluster
    cluster.on('message', function (message) {
        process.stdout.write(`\n Message: ${JSON.stringify(message)} \n`)
    })

    // Handle online
    cluster.on('online', (worker) => {
        process.stdout.write(`\n Worker ID: ${worker.id} and the PID: ${worker.process.pid} \n`)
    })

    // Handle on exit
    cluster.on('exit', (worker, code, signal) => {
        process.stdout.write(`\n Worker ID: ${worker.id} with PID: ${worker.process.pid} died with CODE: ${code} and SIGNAL: ${signal} \n`)
        process.stdout.write(`\n Forking another Worker \n`)
        cluster.fork()
    })

    // Handle on error
    cluster.on('error', (error) => {
        process.stdout.write(`\n Error: ${error} \n`)
    })

}

/**
 * Setup an express server and define port to listen all incoming requests for this application
 */
async function setUpExpressApplication() {

    // HTTP Module
    const http = require('http')

    // Define Application port
    const port = process.env.PORT

    // Defining the Host Name
    const host = process.env.HOST

    // Environment State Variable
    const env = process.env.NODE_ENV

    // Creating Microservice Server
    const server = http.createServer(app)

    // Exposing the server to the desired port
    server.listen(port, host, async () => {
        process.stdout.write(`\n To Do List Server : http://${host}:${port}\n`)
        process.stdout.write(`\n Environment : ${env}\n`)
        process.stdout.write(`\n Process : ${process.pid} is listening to all incoming requests \n`)
    })

}


/**
 * Setup server either with clustering or without it
 * @param isClusterRequired
 * @constructor
 */

// If it is a master process then call setting up worker process
if (isClusterRequired == 'true' && cluster.isMaster) {

    setupWorkerProcesses()

} else {

    // To setup server configurations and share port address for incoming requests
    setUpExpressApplication()
}