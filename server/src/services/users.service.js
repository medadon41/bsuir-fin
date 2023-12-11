import { randomBytes } from "crypto"
import bcrypt from 'bcrypt'
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import QRCode from "qrcode";

async function hashPassword(password) {
    return await bcrypt.hash(password, 12)
}

async function comparePasswords(password, hash) {
    return await bcrypt.compare(password, hash)
}

async function generatePublicId() {
    return randomBytes(8).toString("hex");
}


async function generateQRPair() {
    const secretKey = speakeasy.generateSecret({ length: 20 });
    let url = await QRCode.toDataURL(secretKey.otpauth_url);
    const keyBase = secretKey.base32
    return {keyBase ,url }
}

function verifyOTP(otpKey, token) {
    console.log(otpKey, token)
    return speakeasy.totp.verify({
        secret: otpKey,
        encoding: 'base32',
        token: token,
        window: 1,
    })
}

export {
    hashPassword,
    comparePasswords,
    generatePublicId,
    generateQRPair,
    verifyOTP
}