import express, { Express, Request, Response, Router } from 'express';
import path from 'path';
import session, { SessionOptions } from 'express-session';
import cors from 'cors';
import f, { FileStore } from 'session-file-store';
import fs from 'fs';
import { validateUserLoginData, validateUserLoginRequestBody } from './validators.js';
import { BaseRouter } from './baseRouter.js';
import { UserController } from './userController.js';
import { RouterController } from './routerController.js';

declare module 'express-session' {
    interface SessionData {
        user?: { username: string, password: string } | null;
    }
}

let itemsId: number = 0;

type ToDoType = {
    id: number,
    text: string,
    checked: boolean
}

type DBType = { items: ToDoType[] }

const DB: DBType = { items: [] }
const PORT = 3200;
const app: Express = express();
const rootPath = 'D:\\Node-js-course\\level2\\base_2.1\\src\\base_2.4';
const staticMiddleware = express.static('public');
const jsonBodyMiddleware = express.json();
const fileStore: FileStore = f(session);

const sessionObj: SessionOptions = {
    store: new fileStore({
        ttl: 86400
    }),
    secret: '23E23ZS3!@e!e' + Math.random() * 1000,
    resave: false,
    saveUninitialized: false,
}

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

const userController: UserController = new UserController();
const routerController: RouterController = new RouterController(DB);
const baseRouter: Router = new BaseRouter(userController, routerController).createRouter();

app.use(jsonBodyMiddleware);
app.use(staticMiddleware);
app.use(cors(corsOptions));
app.use(session(sessionObj));
app.use('/api/v2/', baseRouter);

app.enable('trust proxy');

// app.get('/', (req: Request, res: Response) => {
//     console.log("User", req.session.user);
//     const htmlPath = path.join(rootPath, 'public\\index.html');

//     fs.access(htmlPath, fs.constants.F_OK, (err) => {
//         if (err) {
//             res.status(500).json({ "error": "File not found" });
//         } else {
//             res.sendFile(htmlPath, err => {
//                 console.error(err);
//             });
//         }
//     })
// });

// // Login
// app.post('/api/v1/login', (req: Request, res: Response) => {
//     userAuthentication(req, res);
// });

// // logout
// app.post('/api/v1/logout', (req: Request, res: Response) => {
//     res.json({ "ok": true });
// });

// // Register
// app.post('/api/v1/register', (req: Request, res: Response) => {
//     if (validateUserLoginRequestBody(req)) {
//         const { login: user, pass: password }: { login: string, pass: string } = req.body;

//         console.log("Body", req.body);

//         req.session.user = {
//             username: user,
//             password: password
//         };

//         res.json({ "ok": true });
//     } else {
//         res.status(400).json({ "error": "Bad request" })
//     }

// });

// app.get('/api/v1/items', (req: Request, res: Response) => {
//     if (DB) {
//         res.json(DB);
//     } else {
//         res.status(500).json({ "error": "File not found" });
//     }
// })

// app.post('/api/v1/items', (req: Request, res: Response) => {
//     if (validateRequstToDoText(req.body)) {
//         const newToDoId = addNewToDo(req.body.text);
//         res.status(201);
//         res.json({ id: newToDoId });
//     } else {
//         res.sendStatus(400).json({ "error": "Bad request" });
//     }
// });

// app.put('/api/v1/items', (req: Request, res: Response) => {
//     const toDo = DB.items.find(p => p.id === +req.body.id);
//     if (toDo) {
//         toDo.text = req.body.text;
//         toDo.checked = req.body.checked;
//         res.json({ "ok": true });
//     } else {
//         res.status(400).json({ "error": "To do not found" });
//     }
// });

// app.delete('/api/v1/items', (req: Request, res: Response) => {
//     DB.items = DB.items.filter(p => p.id !== +req.body.id);
//     res.json({ "ok": true });
// });

app.listen(PORT, () => {
    console.log('Listen the ' + PORT);
});

function userAuthentication(req: Request, res: Response) {
    if (validateUserLoginRequestBody(req)) {
        if (validateUserLoginData(req, res)) {
            res.json({ "ok": true });
        } else {
            res.status(400).json({ "error": "not found" });
        }
    } else {
        res.status(400).json({ "error": "Bad request" });
    }
}

function addNewToDo(text: string): number {
    const todo = { id: ++itemsId, text: text, checked: false };
    DB.items.push(todo);
    console.log("Item ID", itemsId);
    return todo.id;
}

export { DBType, addNewToDo, userAuthentication };