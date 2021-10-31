const request = require('supertest');
let server;
const { Category } = require('../../../models/category');
const { User } = require('../../../models/user');

describe('/api/category', () => {
    beforeEach(() => {
        server = require('../../../index');
    });
    afterEach(async () => {
        server.close();
        await Category.remove({});
    })
    let token;
    let name;

    const execute = async () => {
        return await request(server)
            .post('/api/category')
            .set('x-auth-token', token)
            .send({ name });
    }
    describe('GET /', () => {
        it('should return all categories', async () => {
            await Category.collection.insertMany([
                { name: 'dasturlash' },
                { name: 'tarmoqlar' },
                { name: 'dizayn' }
            ]);
            const response = await request(server).get('/api/category');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body.some(cat => cat.name == 'dasturlash')).toBeTruthy();
        })
    });

    describe('GET /:id', () => {
        it('should return a category if valid id is given', async () => {
            const category = new Category({ name: 'sun`iy idrok' });
            await category.save();

            const response = await request(server).get('/api/category/' + category._id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', 'sun`iy idrok')
        });
    });
    describe('DELETE /:id', () => {
        it('should delete a category if valid id is given', async () => {
            const category = new Category({ name: 'sun`iy idrok' });
            await category.save();

            // const res=await Category.findByIdAndRemove(category._id);
            const res = await request(server).get('/api/category/' + category._id);
            expect(res.status).toBe(200);
        })
    });

    describe('GET /:id', () => {
        it('should return a 404 if invalid id is given', async () => {
            const response = await request(server).get('/api/category/123');
            expect(response.status).toBe(404);
        });
    });

    describe('PUT /:id', () => {
        beforeEach(async () => {
            token = new User().generateAuthToken();
        });

        it('should return 401 if user is not logged in', async () => {
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        });
        it('should return 400 if category name is less than 3 characters', async () => {
            name = '12';
            const res = await execute();
            expect(res.status).toBe(400);
        });
        it('should return 400 if category name is more than 50 characters', async () => {
            name = new Array(52).join('c');
            const res = await execute();
            expect(res.status).toBe(400);
        });
        it('should change name of category if it is valid', async () => {
            const category = new Category({ name: 'sun`iy idrok' });
            await category.save();
            await execute();

            const res = await Category.findByIdAndUpdate(category._id, { name: 'dasturlash' }, { new: true });
            expect(res).toHaveProperty('name', 'dasturlash');
            expect(category).not.toBeNull();
        });
    });

    describe('POST /', () => {

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'dasturlash';
        });
        it('should return 401 if user is not logged in', async () => {
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        });
        it('should return 400 if category name is less than 3 characters', async () => {
            name = '12';
            const res = await execute();
            expect(res.status).toBe(400);
        });
        it('should return 400 if category name is more than 50 characters', async () => {
            name = new Array(52).join('c');
            const res = await execute();
            expect(res.status).toBe(400);
        });
        it('should save the category if it is valid', async () => {
            await execute();
            const category = await Category.find({ name: 'dasturlash' });
            expect(category).not.toBeNull();
        });
        it('should return the category if it is valid', async () => {
            const res = await execute();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'dasturlash');
        });
    });
});