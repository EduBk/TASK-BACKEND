"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
//! IMPORTACION DE VARIABLES DE ENTORNO
require("dotenv/config");
const base_url = process.env.BASE_URL;
const whiteList = [base_url, "http://localhost:3005"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: ['Content-Type', 'Authorization']
};
exports.corsOptions = corsOptions;
