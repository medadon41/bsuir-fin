import {Router} from "express";
import {verifyToken} from "../middleware/auth.middleware.js";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post('/signup', authController.signUp
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Some description...'
     */
);

authRouter.post('/login', authController.login
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Some description...'
     */
);

authRouter.post('/refresh', authController.refreshToken
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Some description...'
     */
)

export default authRouter;