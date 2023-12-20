import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function get(req, res, next) {
    try {
        const credits = await prisma.credit.findMany()

        res.json(credits)
    } catch (e) {
        next(e)
    }
}

async function create(req, res, next) {
    try {
        const {title, description, minAmount, maxAmount, percent, maxYears, minYears} = req.body

        const credit = await prisma.credit.create({
            data: {
                title: title,
                receiverAccount: description,
                minAmount: minAmount,
                maxAmount: maxAmount,
                percent: percent,
                maxYears: maxYears,
                minYears: minYears
            }
        })

        res.json(credit)
    } catch (e) {
        next(e)
    }
}

async function getById(req, res, next) {
    try {
        const { id } = req.params

        const credit = await prisma.credit.findFirstOrThrow({
            where: {
                id: +id
            }
        })

        res.json(credit)
    } catch (e) {
        next(e)
    }
}

async function borrow(req, res, next) {
    try {
        const { creditId, amount, years } = req.body

        const ticket = await prisma.creditTicket.create({
            data: {
                credit: {
                    connect: {id: creditId}
                },
                sender: {
                    connect: {id: req.id.id}
                },
                manager: undefined,
                amount: +amount,
                years: +years,
                status: 0
            }
        })

        res.json(ticket)
    } catch (e) {
        next(e)
    }
}

async function archive(req, res, next) {
    try {

        const { id } = req.params
        console.log(id)
        const ticket = await prisma.credit.update({
            where: {
                id: +id
            },
            data: {
                active: false
            }
        })

        res.status(200).json(ticket)
    } catch (e) {
        next(e)
    }
}

async function getAllTickets(req, res, next) {
    try {
        const tickets = await prisma.creditTicket.findMany()

        res.json(tickets)
    } catch (e) {
        console.log(e)
        next()
    }
}

async function acceptTicket(req, res, next) {
    try {
        const { id } = req.params

        const ticket = await prisma.creditTicket.update({
            where: {
                id: +id
            },
            data: {
                status: 1,
            },
        })

        const credit = await prisma.credit.findFirst({
            where: {
                id: ticket.creditId
            }
        })

        const dateNow = new Date()
        dateNow.setFullYear(dateNow.getFullYear() + +ticket.years)

        const loan = await prisma.loan.create({
            data: {
                credit: {
                    connect: {id: ticket.creditId}
                },
                borrower: {
                    connect: {id: ticket.senderId}
                },
                dateExpire: dateNow,
                dateLastCharged: undefined,
                amount: ticket.amount + (ticket.amount * 100 / credit.percent * ticket.years),
                amountRepaid: 0
            }
        })

        const user = await prisma.user.update({
            where: {
                id: ticket.senderId
            },
            data: {
                mainBalance: {
                    increment: ticket.amount
                }
            }
        })

        res.status(200).json(loan)
    } catch (e) {
        next(e)
    }
}

async function declineTicket(req, res, next) {
    try {
        const { id } = req.params
        const { reason } = req.body

        const ticket = await prisma.creditTicket.update({
            where: {
                id: id
            },
            data: {
                status: 2,
                comment: reason,
                manager: {
                    connect: {userId: req.id.id}
                }
            }
        })

        res.status(200)
    } catch (e) {
        next(e)
    }
}

async function deleteCredit(req, res, next) {
    try {
        const id = req.params.id

        const result = await prisma.credit.delete({
            where: {
                id: +id
            }
        })

        res.status(200).json(result)
    } catch (e) {
        next(e)
    }
}

async function deleteAllTickets(req, res, next) {
    try {
        const result = await prisma.creditTicket.deleteMany()

        res.status(200).json(result)
    } catch (e) {
        next(e)
    }
}

export {
    get,
    create,
    getById,
    borrow,
    acceptTicket,
    declineTicket,
    archive,
    getAllTickets,
    deleteAllTickets,
    deleteCredit
}