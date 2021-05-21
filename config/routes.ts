import { Express } from 'express';
import userRouter from '../src/routes/user.route';
export const routesConfig = (app: Express) => {
    app.use('/api', [
        userRouter,
    ])
}