import { Request, Response } from 'express';

export function validateRequstToDoText(body: { text: string }): boolean {
    let requestToDoText: string | undefined = body.text;

    if ((typeof requestToDoText === 'string' && requestToDoText.trim().length === 0) ||
        (typeof requestToDoText === 'undefined')) {
        return false;
    }
    return true;
}

export function validateUserLoginRequestBody(req: Request): boolean {
    if ('pass' in req.body && 'login' in req.body) {
        if (req.body.login.length > 0 && req.body.pass > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export function validateUserLoginData(req: Request, res: Response): boolean {
    if (req.session.user) {
        if (req.body.login === req.session.user.username && req.body.pass === req.session.user.password) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}