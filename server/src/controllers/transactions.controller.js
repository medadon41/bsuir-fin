import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

async function getById(req, res, next) {
    try {
        const { id } = req.params
        const data = await prisma.transaction.findFirst({
            where: {
                id: +id
            }
        })

        if (!data)
            res.status(404)

        res.json(data)
    } catch (e) {
        next(e)
    }
}

async function get(req, res, next) {
    try {
        const data = await prisma.transaction.findMany()

        res.json(data)
    } catch (e) {
        next(e)
    }
}

async function post(req, res, next) {
    try {
        const { receiverAccount, senderAccount, senderId, amount } = req.body
        const tx = await prisma.transaction.create({
            data: {
                senderId: senderId,
                receiverAccount: receiverAccount,
                senderAccount: senderAccount,
                amount: +amount
            }
        })

        const sender = await prisma.user.update({
            where: {
                id: senderId
            },
            data: {
                mainBalance: {
                    decrement: +amount
                }
            }
        })

        const receiver = await prisma.user.update({
            where: {
                id: +receiverAccount
            },
            data: {
                mainBalance: {
                    increment: +amount
                }
            }
        })


        res.json(tx)
    } catch (e) {
        next(e)
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params
        const data = await prisma.transaction.delete({
            where: {
                id: +id
            }
        })

        if (!data)
            res.status(404)

        res.json(data)
    } catch (e) {
        next(e)
    }
}

async function removeAll(req, res, next) {
    try {
        const op = await prisma.transaction.deleteMany({});

        res.json(op)
    } catch (e) {
        next(e)
    }
}

export {
    getById,
    get,
    post,
    remove,
    removeAll
}