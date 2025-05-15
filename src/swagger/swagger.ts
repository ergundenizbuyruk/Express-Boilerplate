import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Expressjs Boilerplate",
    version: "1.0.0",
    description: "This is a boilerplate for Expressjs"
  },
  host: "localhost:3000"
};

const outputFile = "./swagger-output.json";
const routes = ["../app.ts"];

swaggerAutogen(outputFile, routes, doc);
