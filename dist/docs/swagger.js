"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "Documentacion API",
        version: "1.0.0"
    },
    servers: [
        {
            url: "http://localhost:3001/api",
            description: "servidor para desarrollo"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        // schemas: {
        // }
    }
};
const swaggerOption = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOption);
