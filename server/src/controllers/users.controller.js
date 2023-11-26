import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function get(req, res, next) {
    try {
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    } catch (e) {
        console.error(`Error while getting users`, e.message);
        next(e)
    }
}

export {
    get
}