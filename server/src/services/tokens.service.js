import {randomBytes} from "crypto";
import bcrypt from "bcrypt";

async function generatePair() {
    const rand = randomBytes(10).toString("base64");
    const hash = await bcrypt.hash(rand, 13)
    return {rand, hash}
}

async function compareTokens(base, hash) {
    return await bcrypt.compare(base, hash)
}

function validateToken(token, tx) {
    if (token.tokenStatus === 1) {
        return {
            accepted: false,
            message: "Token has expired"
        }
    }
    if (token.usagesLeft >= token.usagesAmount) {
        return {
            accepted: false,
            message: "Token is out of usages amount"
        }
    }
    if (token.maxAmount < tx.amount) {
        return {
            accepted: false,
            message: "Tx amount is more than allowed by the token"
        }
    }
    if (token.ownerId !== tx.senderId) {
        return {
            accepted: false,
            message: "Token does not belong to sender"
        }
    }
    return {
        accepted: true,
        message: "Successfully verified"
    }
}

export {
    generatePair,
    compareTokens,
    validateToken
}