import { HTTP_CODES, HTTP_MESSAGES } from "./settings.js";
import { Request, Response } from 'express';
import { validateUserLoginData, validateUserLoginRequestBody } from "./validators.js";


export function userAuthentication(req: Request, res: Response) {
    if (validateUserLoginRequestBody(req)) {
        if (validateUserLoginData(req, res)) {
            res.json({ "ok": true });
        } else {
            res.status(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
        }
    } else {
        res.status(HTTP_CODES.BAD_REQUEST).json({ "error": HTTP_MESSAGES.BAD_REQUEST });
    }
}
