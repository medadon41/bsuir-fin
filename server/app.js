import express from 'express'
import cookieParser from "cookie-parser"
import fs from 'fs'


import swaggerUi from 'swagger-ui-express'
import usersRouter from "./src/routes/users.route.js";
import tokensRouter from "./src/routes/tokens.route.js";
import transactionsRouter from "./src/routes/transactions.route.js";
import borrowsRouter from "./src/routes/borrows.route.js";
import authRouter from "./src/routes/auth.route.js";

const app = express()
const port = 3000

app.use(cookieParser());
app.use(express.json())

const swaggerFile = JSON.parse(fs.readFileSync('src/utils/swagger_output.json'))

app.use('/users', usersRouter)
app.use('/tokens', tokensRouter)
app.use('/transactions', transactionsRouter)
app.use('/borrows', borrowsRouter)
app.use('/auth', authRouter)

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('*', (req, res) => {
    res.send('Wrong endpoint.')
})


app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    const message = err.message || 'Something went wrong. Try again later'
    res.status(status).json({ message })
})

app.listen(3001, () => {
    console.log('🚀 Server ready')
})