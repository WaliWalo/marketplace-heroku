const cors = require("cors");
const express = require("express");
const listEndpoints = require("express-list-endpoints");
const products = require("./services/products");
const { join } = require("path");
const {
  badRequestHandler,
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} = require("./errorHandling");

const hostname = "localhost";
const port = process.env.PORT || 3001;
const publicImageFile = join(__dirname, "../public/img/products");
const server = express();
server.use(cors());
// server.use(cors({ origin: process.env.NODE_ENV === "production" ? process.env.FE_URL_PROD : process.env.FE_URL_DEV })); this only accepts this url to access the server/backend
server.use(express.json());
server.use(express.static(publicImageFile));
server.use("/products", products);

//ERROR MIDDLEWARE GOES HERE
// ERROR MIDDLEWARE MUST HAPPEN LAST
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);

console.log(listEndpoints(server));

server.listen(port, hostname, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`Server is running in cloud on port ${port}`);
  } else {
    console.log(`Server running at http://${hostname}:${port}/`);
  }
});
