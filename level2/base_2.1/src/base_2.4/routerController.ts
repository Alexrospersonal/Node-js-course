import { DBType, addNewToDo } from "./server.js";
import { validateRequstToDoText } from "./validators.js";
import { Request, Response } from 'express';

export class RouterController {

    private DB: DBType;

    public constructor(db: DBType) {
        this.DB = db;
    }

    public getItems(req: Request, res: Response) {
        if (this.DB) {
            res.json(this.DB);
        } else {
            res.status(500).json({ "error": "File not found" });
        }
    }

    public addItem(req: Request, res: Response) {
        if (validateRequstToDoText(req.body)) {
            const newToDoId = addNewToDo(req.body.text);
            res.status(201);
            res.json({ id: newToDoId });
        } else {
            res.sendStatus(400).json({ "error": "Bad request" });
        }
    }

    public editItem(req: Request, res: Response) {
        const toDo = this.DB.items.find(p => p.id === +req.body.id);
        if (toDo) {
            toDo.text = req.body.text;
            toDo.checked = req.body.checked;
            res.json({ "ok": true });
        } else {
            res.status(400).json({ "error": "To do not found" });
        }
    }

    public deleteItem(req: Request, res: Response) {
        this.DB.items = this.DB.items.filter(p => p.id !== +req.body.id);
        res.json({ "ok": true });
    }
}