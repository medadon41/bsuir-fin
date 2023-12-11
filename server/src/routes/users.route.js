import { Router } from 'express'
import {verifyToken} from "../middleware/auth.middleware.js";
import * as usersController from "../controllers/users.controller.js";

const userRouter = Router()


userRouter.get('/info', verifyToken, usersController.getCurrentUser
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Some description...'
     */
);

userRouter.get('/', usersController.get
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Some description...'
     */
);
export default userRouter