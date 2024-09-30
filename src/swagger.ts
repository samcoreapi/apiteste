const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Sam Core API",
    description: "Documentação automática com Swagger Autogen",
  },
  host: "localhost:3001",
  schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/user.routes.ts",
  "./routes/appointment.routes.ts",
  "./routes/findDaySlots.routes.ts",
  "./routes/findATSlots.routes.ts",
  "./routes/log.routes.ts",
  "./routes/plans.routes.ts",
  "./routes/plans.routes.ts",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
