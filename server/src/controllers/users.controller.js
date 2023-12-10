import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function get(req, res, next) {
    try {
        const users = await prisma.user.findMany({
            include: {
                loans: true
            }
        })

        res.status(200).json(users)
    } catch (e) {
        console.error(`Error while getting users`, e.message);
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
                loans: true,
                creditTickets: true,
                transactions: true
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
    getCurrentUser
}