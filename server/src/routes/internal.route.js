import {Router} from "express";
import {verifyToken} from "../middleware/auth.middleware.js";
import * as internalController from "../controllers/internal.controller.js";

const internalRouter = Router()

internalRouter.post('/promote', verifyToken, internalController.promote
    /*
    #swagger.tags = ['Internal']
    #swagger.description = 'Returns transaction by id'
     */
);

internalRouter.get('/', verifyToken, internalController.getAllStaff
    /*
    #swagger.tags = ['Internal']
    #swagger.description = 'Returns transaction by id'
     */
);

export default internalRouter;