"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const initApp = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const PORT = (_a = process.env['PORT']) !== null && _a !== void 0 ? _a : 3030;
    const commonURL = `/api/v1`;
    try {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        const employeeController = require('./controller/employee-controller');
        app.use(`${commonURL}/employee`, employeeController);
        app.use((req, res, next) => {
            res.status(404);
            return res.json({
                success: false,
                payload: null,
                message: `API SAYS: Endpoint not found for path: ${req.path}`,
            });
        });
        app.listen(PORT, () => console.log(`REST API server ready at: http://localhost:${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
});
initApp();
