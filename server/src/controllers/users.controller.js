import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function get(req, res, next) {
    try {
        const users = await prisma.user.findMany({
            include: {
                loans: true,
                tokens: true,
                creditTickets: true,
                transactions: true
            }
        })

        res.status(200).json(users)
    } catch (e) {
        console.error(`Error while getting users`, e.message);
        next(e)
    }
}

async function putBalance(req, res, next) {
    try {
        const { id, mainBalance } = req.body

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                mainBalance: mainBalance
            }
        })

        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}

async function getCurrentUser(req, res, next) {
    try {
        const id = req.id.id

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: id
            },
            include: {
                loans: {
                    include: {
                        credit: true
                    }
                },
                creditTickets: {
                    include: {
                        credit: true
                    }
                },
                transactions: true,
                tokens: true
            }
        })

        res.json(user)
    } catch (e) {
        res.status(404)
        next(e)
    }
}

export {
    get,
    getCurrentUser,
    putBalance
}