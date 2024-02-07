import { PORT } from './settings.js';
import { connectToDb } from './db.js';
import { BaseServer } from './baseServer.js';

declare module 'express-session' {
    interface SessionData {
        user?: { username: string } | null;
    }
}

async function runServer() {
    const db = await connectToDb();
    const app = new BaseServer(db).createServer();

    app.listen(PORT, () => {
        console.log(`Listen the ${PORT}`);
    });
}

try {
    runServer();
} catch (e) {
    console.error(e);
}


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
