import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { generatePair } from '../src/services/tokens.service.js';
import {app} from '../app.js'; // Замените на путь к вашему Express-приложению

const { expect } = chai;
chai.use(chaiHttp);

const prisma = new PrismaClient();
const config = process.env;

describe('Auth controller test', () => {
    // describe('POST /signup', () => {
    //     it('should create a new user', async () => {
    //         const userData = {
    //             email: 'test@example.com',
    //             name: 'John',
    //             middleName: 'Doe',
    //             surname: 'Smith',
    //             password: 'password123',
    //         };
    //
    //         const response = await chai
    //             .request(app)
    //             .post('/api/auth/signup')
    //             .send(userData);
    //
    //         expect(response).to.have.status(400);
    //         expect(response.body).to.have.property('id');
    //     });
    // });

    describe('POST /login', () => {
        it('should log in user', async () => {
            const userData = {
                login: 'test@example.com',
                password: 'password123',
            };

            const response = await chai
                .request(app)
                .post('/api/auth/login')
                .send(userData);

            expect(response).to.have.status(200);
        });
    });

    describe('POST /login', () => {
        it('should not log in user', async () => {
            const userData = {
                login: 'test@example.com',
                password: 'passwoasdrd123',
            };

            const response = await chai
                .request(app)
                .post('/api/auth/login')
                .send(userData);

            expect(response).to.have.status(400);
        });
    });


    after(async () => {
        // Очистка данных после тестов
        await prisma.$disconnect();
    });
});
