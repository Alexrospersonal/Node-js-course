import { PORT } from './settings.js';
import { connectToDb } from './db.js';
import { BaseServer } from './baseServer.js';

declare module 'express-session' {
    interface SessionData {
        user?: { username: string } | null;
    }
}

async function runServer(): Promise<void> {
    // create a new db connection
    const db = await connectToDb();
    // create base server
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
