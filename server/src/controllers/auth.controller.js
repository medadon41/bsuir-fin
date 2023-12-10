import {comparePasswords, generatePublicId, hashPassword} from "../services/users.service.js";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
const config = process.env

async function signUp(req, res, next) {
    try {
        const {email, name, middleName, surname, password} = req.body

        const passwordHash = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                middleName: middleName,
                surname: surname,
                password: passwordHash,
                birthDate: new Date(Date.now()),
                publicId: await generatePublicId()
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

        const accessToken = jwt.sign({ id: user.id }, config.TOKEN_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ id: user.id }, config.TOKEN_KEY, { expiresIn: '1d' });

        res
            .cookie('token', refreshToken, {httpOnly: true, sameSite: 'strict'})
            .header('Authorization', accessToken)
            .json(user)
    } catch (e) {
        next(e)
    }
}

async function refreshToken(req, res, next) {
    if (!req.cookies)
        return res.status(400).json({ message: "Bad request" })

    const refreshToken = req.cookies['token'];

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, config.TOKEN_KEY);
        const accessToken = jwt.sign({ id: decoded.id }, config.TOKEN_KEY, { expiresIn: '30m' });

        res
            .header('Authorization', accessToken)
            .json(decoded.id);
    } catch (error) {
        return res.status(400).send('Invalid refresh token.');
    }
}

export {
    signUp,
    login,
    refreshToken
}