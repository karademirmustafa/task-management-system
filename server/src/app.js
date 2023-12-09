const express = require("express");
const app = express();

const config = require("./config");
const loaders = require("./loaders");

const cors = require("cors");
const helmet = require("helmet");

const http = require("http");
const server = http.createServer(app);

// Load config
config();

//Load loaders
loaders();

app.use(cors());
app.use(helmet());
app.use(express.json());


// Global Error Handler
const errorHandler = require("./middlewares/error");
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
server.listen(PORT,() => {
    console.log("Server is running!");
})