import session, { SessionOptions } from 'express-session';
import express from 'express';
import f, { FileStore } from 'session-file-store';

enum HTTP_CODES {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500
}

enum HTTP_MESSAGES {
    BAD_REQUEST = "Bad request",
    SERVER_ERROR = "File not found"
}

// Server settings
const PORT = 3200;
const API_URI = '/api/v2/';
const URL: string = 'mongodb://localhost:27017';
const DB_NAME: string = 'users';

// Creates some middlewares
// const rootPath = 'D:\\Node-js-course\\level2\\base_2.1\\src\\base_2.4';
const staticMiddleware = express.static('public');
const jsonBodyMiddleware = express.json();
const fileStore: FileStore = f(session);

// Setting session object
const sessionObj: SessionOptions = {
    store: new fileStore({
        ttl: 86400
    }),
    secret: '23E23ZS3!@e!e' + Math.random() * 1000,
    resave: false,
    saveUninitialized: false,
}

// Setting CORS options object
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

export {
    HTTP_CODES,
    HTTP_MESSAGES,
    PORT,
    API_URI,
    URL,
    DB_NAME,
    sessionObj,
    corsOptions,
    staticMiddleware,
    jsonBodyMiddleware,
}