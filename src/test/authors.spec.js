
const request = require('supertest');

import { describe, it, expect } from 'vitest';

const app = require('../server');

describe('Authors', () => {

    it('should return a list of authors', async () => {
        const response = await request(app)
            .get('/authors');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create an author', async () => {
        const response = await request(app)
            .post('/authors')
            .send({
                name: 'hector escobar',
                email: 'clemente@example.com',
                bio: 'Software developer'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('hector escobar');
        expect(response.body.email).toBe('clemente@example.com');
    });

    it('should return an author by id', async () => {
        const response = await request(app)
            .get('/authors/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });

    it('should return 404 when deleting a non-existent author', async () => {
        const response = await request(app)
            .delete('/authors/999999');

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

});