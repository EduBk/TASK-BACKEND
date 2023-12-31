import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
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

const swaggerOption: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOption);
