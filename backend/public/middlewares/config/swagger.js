import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SBGM Digital API",
      version: "1.0.0",
      description: "Full Stack API for SBGM Digital Services",
      contact: {
        name: "SBGM Digital",
      },
    },
    servers: [
      {
        url: "http://localhost:5577",
        description: "Local Development Server",
      },
      {
        url: "https://api.sbgmdigital.com",
        description: "Production Server",
      },
    ],
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
  },
  apis: ["./routes/*.js"],
});
