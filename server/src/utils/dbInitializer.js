import {PrismaClient} from "@prisma/client";
import {generatePublicId, hashPassword} from "../services/users.service.js";

const prisma = new PrismaClient()
export default async function initAdmin() {
    const user = await prisma.user.findFirst({
        where: {
            publicId: "0000000"
        }
    })

    if (user)
        return

    const passwordHash = await hashPassword("qwerty12345")

    const createdUser = await prisma.user.create({
        data: {
            email: "admin@admin.com",
            name: "Admin",
            middleName: "Admin",
            surname: "Admin",
            password: passwordHash,
            birthDate: new Date(Date.now()),
            publicId: "0000000"
        }
    })
}