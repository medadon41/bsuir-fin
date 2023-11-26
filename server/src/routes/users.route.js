import { Router } from 'express'
import * as usersController from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.get('/', usersController.get
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Some description...'
     */
);

export default userRouter