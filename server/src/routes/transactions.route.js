import { Router } from 'express'
import * as transactionsController from '../controllers/transactions.controller.js'
import {verifyToken} from "../middleware/auth.middleware.js";

const transactionsRouter = Router()

transactionsRouter.get('/:id', transactionsController.getById
    /*
    #swagger.tags = ['Transactions']
    #swagger.description = 'Returns transaction by id'
     */
);

transactionsRouter.get('/', transactionsController.get
    /*
    #swagger.tags = ['Transactions']
    #swagger.description = 'Returns all the transactions'
     */
);

transactionsRouter.post('/', verifyToken, transactionsController.post
    /*
    #swagger.tags = ['Transactions']
    #swagger.description = 'Creates a new transaction'
     */
);

transactionsRouter.delete('/', transactionsController.removeAll
    /*
    #swagger.tags = ['Transactions']
    #swagger.description = 'Deletes all transactions'
     */
);

transactionsRouter.delete('/:id', transactionsController.remove
    /*
    #swagger.tags = ['Transactions']
    #swagger.description = 'Deletes a transaction'
     */
)



export default transactionsRouter