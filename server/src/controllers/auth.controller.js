import {
    comparePasswords,
    generatePublicId,
    generateQRPair,
    hashPassword,
    verifyOTP
} from "../services/users.service.js";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";
import {generatePair} from "../services/tokens.service.js";

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
        console.log(login, password)
        const user = await prisma.user.findUnique({
            where: {
                email: login
            }
        })

        if (!await comparePasswords(password, user.password)) {
            return res.status(400).json({message: 'Wrong password'})
        }

        if (user.is2faEnabled && !req.body.token) {
            return res.status(400).json({tokenRequired: true})
        } else if (user.is2faEnabled && req.body.token) {
            if (!verifyOTP(user.otpKey, req.body.token)) {
                return res.status(403).json({message: "Wrong 2FA code"})
            }
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

async function generateQR(req, res, next) {
    try {
        const { keyBase, url } = await generateQRPair()

        res.status(200).json({qrLink: url, key: keyBase})
    } catch (e) {
        next(e)
    }
}

async function activate2FA(req, res, next) {
    try {
        const { key, code } = req.body

        if (!verifyOTP(key, code)) {
            return res.status(400).json({message: "Incorrect code"})
        }

        const user = await prisma.user.update({
            where: {
                id: req.id.id
            },
            data: {
                otpKey: key,
                is2faEnabled: true
            }
        })

        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}

export {
    signUp,
    login,
    refreshToken,
    generateQR,
    activate2FA
}