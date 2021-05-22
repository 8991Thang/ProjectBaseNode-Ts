import userRouter from '@src/routes/user.route';
import { Express } from 'express';
export const routesConfig = (app: Express) => {
    app.use('/api', [
        userRouter,
    ])
}