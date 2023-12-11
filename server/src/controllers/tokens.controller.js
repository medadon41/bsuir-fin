import {PrismaClient} from '@prisma/client'
import {generatePair} from "../services/tokens.service.js";

const prisma = new PrismaClient()

async function create(req, res, next) {
    try {
        const { localName, usagesAmount, activeUntil, maxAmount } = req.body

        const { rand, hash } = await generatePair()

        const token = await prisma.token.create({
            data: {
                hash: hash,
                localName: localName,
                usagesAmount: +usagesAmount,
                usagesLeft: +usagesAmount,
                activeUntil: new Date(activeUntil),
                maxAmount: +maxAmount,
                tokenStatus: 1,
                owner: {
                    connect: {
                        id: req.id.id
                    }
                }
            }
        })
        res.status(200).json({originalToken: rand, token: token})
    } catch (e) {
        next(e)
    }
}

async function deactivate(req, res, next) {
    try {
        const { id } = req.params

        const token = await prisma.token.update({
            where: {
                id: +id
            },
            data: {
                tokenStatus: 0
            }
        })
        res.json(token)
    } catch (e) {
        next(e)
    }
}

export {
    create,
    deactivate
}