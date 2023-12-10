import express from 'express'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import fs from 'fs'


import swaggerUi from 'swagger-ui-express'
import usersRouter from "./src/routes/users.route.js";
import tokensRouter from "./src/routes/tokens.route.js";
import transactionsRouter from "./src/routes/transactions.route.js";
import authRouter from "./src/routes/auth.route.js";
import creditsRouter from "./src/routes/credits.route.js";
import internalRouter from "./src/routes/internal.route.js";

const app = express()
const port = 5000

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const swaggerFile = JSON.parse(fs.readFileSync('src/utils/swagger_output.json'))

app.use('/api/users', usersRouter)
app.use('/api/tokens', tokensRouter)
app.use('/api/credits', creditsRouter)
app.use('/api/transactions', transactionsRouter)
app.use('/api/auth', authRouter)
app.use('/api/internal', internalRouter)

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('*', (req, res) => {
    res.send(`Wrong endpoint: ${req.url}`)
})


app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    const message = err.message || 'Something went wrong. Try again later'
    res.status(status).json({ message })
})

app.listen(port, () => {
    console.log('🚀 Server ready')
})