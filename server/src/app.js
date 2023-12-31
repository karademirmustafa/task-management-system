const express = require("express");
const app = express();

const config = require("./config");
const loaders = require("./loaders");

const cors = require("cors");
const helmet = require("helmet");

const http = require("http");
const server = http.createServer(app);
const routes = require("./routes");
// Load config
config();

//Load loaders
if (process.env.NODE_ENV !== 'test') {
    loaders();
  }
  

app.use(cors());
app.use(helmet());
app.use(express.json());

// Logger
const loggerMiddleware = require("./middlewares/logger");
app.use(loggerMiddleware);

// Routes
app.use("/api/auth", routes.auth);
app.use("/api/tasks", routes.tasks);
app.use("/api/users", routes.users);

// Global Error Handler
const errorHandler = require("./middlewares/error");
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
server.listen(PORT,() => {
    console.log("Server is running!");
})

module.exports=server;