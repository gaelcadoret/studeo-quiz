import express from "express";
import { expressjwt } from 'express-jwt';
import cors from "cors";
import router from "../src/routes.js";
import { JWT_SECRET } from "../config/env.js";

export default () => {
    const app = express();

    app.use(cors(), express.json(), expressjwt({
        algorithms: ['HS256'],
        credentialsRequired: false,
        secret: JWT_SECRET,
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    /**
     * Add other middleware here
     */

    router(app);
    return app;
};

