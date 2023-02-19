import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../errors/customError';

/*
    Utilizei o link abaixo como referência para construir um middleware de erro.
    https://medium.com/pagarme/minha-experi%C3%AAncia-com-error-handling-no-express-188534ae6ff2
*/

const errorHandler = (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction): Response => { 
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ code: err.statusCode, response: {}, error: err.message });
    }

    return res.status(500).json({ code: 500, response: {}, error: 'Internal server error' });
};

export { errorHandler };