const { saveLogToMongoDB } = require('../utils/logger');

const storageData = {};

const loggerMiddleware = (req, res, next) => {
    const ipAddress = req.headers['cf-connecting-ip'];
    const method = req.method;
    const action = req.path;
    const body = req.body;
    const params = req.params;
    const query = req.query;
    const headers = req.headers;
    const file = req.file;
    const date = new Date();
    const fullPath = req.originalUrl;

    const startTime = new Date(); // Start time for measuring response time

    let logger;
    const originalSend = res.send;
    res.send = function (data) {
        storageData.response = data;
        storageData.user = req.user;
        originalSend.call(this, data);
    };
    res.once('finish', () => {

        const statusCode = res.statusCode;
        const contentType = res.get('Content-Type');

        // Calculate response time
        const endTime = new Date();
        const responseTime = endTime - startTime;

        if (method === "GET" || method === "HEAD") {
            return next();
        }

        if (statusCode === 201 || statusCode === 200) {
            logger = "info";
        } else if (statusCode > 300 || statusCode < 410) {
            logger = "warn";
        }
        const level = logger;
        const message = level;
        const meta = {
            ipAddress,
            fullPath,
            method,
            action,
            body,
            params,
            query,
            headers,
            file,
            statusCode,
            contentType,
            response: storageData.response ? JSON.parse(storageData.response) : null,
            user: storageData.user ? storageData.user._doc : null,
            userId: storageData?.user?._id ?? null,
            date,
            responseTime,
        }
        saveLogToMongoDB(level, message, meta)
        next()
    })
    next();
};

module.exports = loggerMiddleware;
