import {Router} from 'express'
import {verifyToken} from "../middleware/auth.middleware.js";
import * as tokensController from "../controllers/tokens.controller.js";

const tokensRouter = Router()

tokensRouter.post('/', verifyToken, tokensController.create
    /*
    #swagger.tags = ['Tokens']
    #swagger.description = 'Creates a new transaction'
     */
);

tokensRouter.get('/:id/deactivate', verifyToken, tokensController.deactivate
    /*
    #swagger.tags = ['Tokens']
    #swagger.description = 'Creates a new transaction'
     */
);

export default tokensRouter