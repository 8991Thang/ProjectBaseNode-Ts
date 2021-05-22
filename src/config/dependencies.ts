import { Express } from 'express';
import morgan from 'morgan';
import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
export default (app: Express) => {
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
}