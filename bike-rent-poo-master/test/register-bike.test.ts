import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('registers a bike with valid data', async () => {
        await request(server)
            .post('/api/bike')
            .send({
                name: 'Mountain bike',
                type: 'big',
                bodySize: '20',
                maxLoad: '20',
                rate: '10',
                description: 'Great',
                ratings: '100',
                imageUrls: 'imgr.net',
                available: true,
                location: (0.0, 0.0),
                id: '129129'
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })

    it.only('returns 400 when trying to register duplicate bike', async () => {
        await request(server)
            .post('/api/bike')
            .send({
                name: 'Mountain bike',
                type: 'big',
                bodySize: '20',
                maxLoad: '20',
                rate: '10',
                description: 'Great',
                ratings: '100',
                imageUrls: 'imgr.net',
                available: true,
                location: (0.0, 0.0),
                id: '129129'
            })
            .expect(201)

        await request(server)
            .post('/api/bike')
            .send({
                name: 'Mountain bike',
                type: 'big',
                bodySize: '20',
                maxLoad: '20',
                rate: '10',
                description: 'Great',
                ratings: '100',
                imageUrls: 'imgr.net',
                available: true,
                location: (0.0, 0.0),
                id: '129129'
            })
            .expect(400)
    }, 20000)
})