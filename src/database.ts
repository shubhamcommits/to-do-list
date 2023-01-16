import mysql from 'mysql2/promise'

export function initiliazeDatabase() {

    return new Promise(async (resolve, reject) => {

        try {

            // Fetch Environment Variables
            const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env

            // Test the connection
            await mysql.createConnection({
                host: DB_HOST,
                port: Number(DB_PORT),
                user: DB_USER,
                password: DB_PASS
            })
                .then(async (connection) => {
                    connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`)
                        .then((conn) => {
                            process.stdout.write(`\n Database: Connection Initialization and Query execution is Completed! \n`)
                            resolve({ connection: conn })
                        })
                        .catch((error) => {
                            process.stdout.write(`\n Database: Unable to create the Database! \n ${error} \n`)
                            reject({ error: `Unable to create the Database! \n ${error}` })
                        })
                })
                .catch((error) => {
                    process.stdout.write(`\n Database: Unable to connect to the Database! \n ${error} \n`)
                    reject({ error: `Unable to connect to the Database! \n ${error}` })
                })

        } catch (error) {
            reject({ error: error })
        }
    })
}