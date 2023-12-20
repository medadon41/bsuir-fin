import { Router } from 'express'
import {verifyToken} from "../middleware/auth.middleware.js";
import * as creditsController from "../controllers/credits.controller.js";

const creditsRouter = Router()

creditsRouter.post('/create', creditsController.create
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.post('/borrow', verifyToken, creditsController.borrow
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.get('/tickets', verifyToken, creditsController.getAllTickets
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.post('/accept-ticket/:id', verifyToken, creditsController.acceptTicket
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.post('/decline-ticket/:id', verifyToken, creditsController.declineTicket
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.post('/archive/:id', verifyToken, creditsController.archive
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.get('/', creditsController.get
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.get('/:id/', verifyToken, creditsController.getById
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.delete('/tickets', verifyToken, creditsController.deleteAllTickets
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

creditsRouter.delete('/:id', creditsController.deleteCredit
    /*
    #swagger.tags = ['Credits']
    #swagger.description = 'Creates a new transaction'
     */
)

export default creditsRouter