import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const jsonBodyMiddleware = express.json();
const PORT = 8320;

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

app.use(jsonBodyMiddleware);
app.use(cors(corsOptions));

enum BUTTONS {
    PLUS,
    MINUS
}

let plusCounter = 0;
let minusCounter = 0;

app.post('/', (req: Request, res: Response) => {
    console.log(req.body.button === BUTTONS.PLUS);
    if (req.body.button === BUTTONS.PLUS) {
        plusCounter++
        res.json(JSON.stringify({ val: plusCounter }));
    } else {
        minusCounter++
        res.json(JSON.stringify({ val: minusCounter }));
    }
});

app.listen(PORT, () => {
    console.log(`Listen the ${PORT}`);
});