import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { generatePair } from '../src/services/tokens.service.js';
import {app} from '../app.js'; // Замените на путь к вашему Express-приложению

const { expect } = chai;
chai.use(chaiHttp);

chai.use(chaiHttp)

const prisma = new PrismaClient();
const config = process.env;

describe('Credits controller test', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAzMDc3ODU0LCJleHAiOjE3MDMwNzk2NTR9.5nd-BWFafx_avvCXGsuEaPPtJD2y1cPka0BO_AqTEkU"
    describe('POST /transactions', () => {
        it('should revert a transaction with not token', async () => {
            const tokenData = {
                receiverAccount: "12",
                amount: 50,
                type: 0,
                confirmation: ""
            };

            const response = await chai
                .request(app)
                .post('/api/transactions')
                .set("authorization", token)
                .send(tokenData);

            expect(response).to.have.status(403);
            expect(response.body).to.have.property('message', 'User hasn\'t provided any type of tx confirmation');
        });
    });

    describe('POST /transactions', () => {
        it('should revert a transaction with wrong token', async () => {
            const tokenData = {
                receiverAccount: "12",
                amount: 50,
                type: 0,
                confirmation: 1,
                token: "aa"
            };

            const response = await chai
                .request(app)
                .post('/api/transactions')
                .set("authorization", token)
                .send(tokenData);

            expect(response).to.have.status(403);
            expect(response.body).to.have.property('message', 'Wrong 2FA code');
        });
    });


    after(async () => {
        await prisma.$disconnect();
    });
});
