import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Document the rest API for my Books App", // Title of the documentation
    version: "1.0.0", // Version of the app
    description: "This is the REST API my Books App", // short description of the app
  },
  host: "localhost:5000", // the host or url of the app
  basePath: "/api", // the basepath of your endpoint
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ["./api_docs/*.yaml"],
};
// initialize swagger-jsdoc

const swaggerSpec = swaggerJSDoc(options);
export const swaggerConfig = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
