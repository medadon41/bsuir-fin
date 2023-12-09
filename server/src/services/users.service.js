import { randomBytes } from "crypto"
import bcrypt from 'bcrypt'

async function hashPassword(password) {
    return await bcrypt.hash(password, 12)
}

async function comparePasswords(password, hash) {
    return await bcrypt.compare(password, hash)
}

async function generatePublicId() {
    return randomBytes(8).toString("hex");
}

export {
    hashPassword,
    comparePasswords,
    generatePublicId
}