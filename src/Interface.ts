import {Request, Response} from "express";

export interface Interface {
    req: Request;
    res: Response;
    payload?: IPayload;
}

export interface IPayload {
    userId: number;
}
