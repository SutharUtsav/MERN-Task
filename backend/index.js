const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const { disconnect } = require('./config/prismaClient');

const initApp = async () => {
    const PORT = process.env['PORT'] ?? 3030
    const commonURL = `/api/v1`;

    try {

        app.use(cors())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }));

        const employeeController = require('./controller/employee-controller')

        app.use(`${commonURL}/employee`, employeeController);
        app.use((req, res, next) => {
            res.status(404);
            return res.json({
                success: false,
                payload: null,
                message: `API SAYS: Endpoint not found for path: ${req.path}`,
            });
        });

        app.listen(PORT, () =>
            console.log(`REST API server ready at: http://localhost:${PORT}`),
        )
    }
    catch (error) {
        console.log(error)
    }
}

initApp().finally(disconnect)