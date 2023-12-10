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

export {
    generatePair,
    compareTokens
}