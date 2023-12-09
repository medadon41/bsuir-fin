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
        const { receiverAccount, senderAccount, amount, type } = req.body

        if (+type === 0) {
            const sender = await prisma.user.update({
                where: {
                    id: req.id.id
                },
                data: {
                    mainBalance: {
                        decrement: +amount
                    }
                }
            })

            try {
                const receiver = await prisma.user.update({
                    where: {
                        publicId: receiverAccount
                    },
                    data: {
                        mainBalance: {
                            increment: +amount
                        }
                    }
                })
            } catch (e) {
                return res.status(404).json({message: "User not found"})
            }
        } else if (+type === 1) {
            const currDate = new Date()

            const loan = await prisma.loan.findUnique({
                where: {
                    id: +receiverAccount
                }
            })

            console.log(loan)
            if (!loan)
                return res.status(404).json({ message: "Loan not found"})
            else if (loan.dateExpire < currDate)
                return res.status(400).json({ message: "Loan already expired"})
            else if (loan.isRepaid)
                return res.status(400).json({ message: "Loan already repaid"})

            const sender = await prisma.user.update({
                where: {
                    id: req.id.id
                },
                data: {
                    mainBalance: {
                        decrement: +amount
                    }
                }
            })

            const isRepaid = loan.amountRepaid + amount > loan.amount
            const loanUpd = await prisma.loan.update({
                where: {
                    id: loan.id
                },
                data: {
                    dateLastCharged: currDate,
                    amountRepaid: loan.amountRepaid + amount,
                    isRepaid: isRepaid
                }
            })
        }

        const tx = await prisma.transaction.create({
            data: {
                sender: {
                    connect: {id: req.id.id}
                },
                receiverAccount: receiverAccount,
                senderAccount: senderAccount,
                amount: +amount,
                type: +type
            }
        })

        res.status(200).json(tx)
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