import { Router } from 'express'
import * as usersController from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.get('/', usersController.get
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Some description...'
     */
);

userRouter.post('/signup', usersController.signUp
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Some description...'
     */
);

userRouter.post('/login', usersController.login
    /*
    #swagger.tags = ['Users']
    #swagger.description = 'Some description...'
     */
);

export default userRouter