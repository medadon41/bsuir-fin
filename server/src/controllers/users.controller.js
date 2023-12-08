import { PrismaClient } from '@prisma/client'
import {comparePasswords, hashPassword} from "../services/users.service.js";

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

async function getById(req, res, next) {
    try {
        const { id } = req.params

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: id
            }
        })

        res.json(user)
    } catch (e) {
        res.status(404)
    }
}

async function signUp(req, res, next) {
    try {
        const {email, name, middleName, surname, password, is2faEnabled} = req.body

        const passwordHash = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                middleName: middleName,
                surname: surname,
                password: passwordHash,
                birthDate: new Date(Date.now()),
                is2faEnabled: is2faEnabled
            }
        })
        res.json(user)
    } catch (e) {
        next(e)
    }
}

async function login(req, res, next) {
    try {
        const { login, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: login
            }
        })

        if (!await comparePasswords(password, user.password)) {
            return res.status(400).json({message: 'Wrong password'})
        }

        res.json()
    } catch (e) {
        next(e)
    }
}

export {
    get,
    signUp,
    login
}