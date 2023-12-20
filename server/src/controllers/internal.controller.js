import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function promote(req, res, next) {
    try {
        const { id, newRole } = req.body

        if (id < 0) {
            return res.status(400).json({message: "Wrong role id"})
        }

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (!user)
            return res.status(404).json({message: "User not found"})

        const result = await prisma.staffMember.upsert({
            where: {
                userId: id
            },
            update: {
                role: newRole
            },
            create: {
                userId: id,
                role: newRole
            }
        })

        res.status(200).json(result)
    } catch (e) {
        next(e)
    }
}

async function getAllStaff(req, res, next) {
    try {
        const result = await prisma.staffMember.findMany()

        res.json(result)
    } catch (e) {
        next(e)
    }
}

async function demote(req, res, next) {

}

async function getStats(req, res, next) {
    try {
        const usersCount = await prisma.user.count()
        const txCount = await prisma.transaction.count()

        res.status(200).json({usersCount: usersCount, txCount: txCount})
    } catch (e) {
        next(e)
    }
}

export {
    promote,
    getAllStaff,
    getStats
}