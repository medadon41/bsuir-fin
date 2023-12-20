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
    describe('POST /tokens', () => {
        it('should create a token', async () => {
            const tokenData = {
                localName: "testToken",
                usagesAmount: 50,
                activeUntil: new Date(),
                maxAmount: 500
            };

            const response = await chai
                .request(app)
                .post('/api/tokens')
                .set("authorization", token)
                .send(tokenData);

            expect(response).to.have.status(200);
            expect(response.body).to.have.property('originalToken');
        });
    });


    after(async () => {
        // Очистка данных после тестов
        await prisma.$disconnect();
    });
});
