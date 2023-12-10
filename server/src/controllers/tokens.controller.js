import {PrismaClient} from '@prisma/client'
import {generatePair} from "../services/tokens.service.js";

const prisma = new PrismaClient()

async function create(req, res, next) {
    try {
        const { localName, usagesAmount, activeUntil, maxAmount } = req.body

        const { base, hash } = await generatePair()

        const token = await prisma.token.create({
            data: {
                hash: hash,
                localName: localName,
                usagesAmount: +usagesAmount,
                usagesLeft: +usagesAmount,
                activeUntill: activeUntil,
                maxAmount: +maxAmount,
                tokenStatus: 1,
                owner: {
                    connect: {
                        id: req.id.id
                    }
                }
            }
        })

        res.status(200).json({originalToken: base, token: token})
    } catch (e) {
        next(e)
    }
}

async function check(req, res, next) {

}

async function use(req, res, next) {

}