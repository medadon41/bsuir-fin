import bcrypt from 'bcrypt'
async function hashPassword(password) {
    return await bcrypt.hash(password, 12)
}

async function comparePasswords(password, hash) {
    return await bcrypt.compare(password, hash)
}

export {
    hashPassword,
    comparePasswords
}