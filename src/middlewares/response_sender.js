import { Request, Response, RequestHandler } from 'express';

export const sendResponse = (req, res) => {res.json(res.locals.data_content);};