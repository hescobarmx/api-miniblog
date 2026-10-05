const request = require('supertest');
import { describe } from 'vitest';
import {it } from 'vitest';
import { expect } from 'vitest';

const app = require('../server');

describe('GET /posts', () => {

    it('should return a list of posts', async () => {

        const response = await request(app)
            .get('/posts');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a post', async () => {

    const response = await request(app)
        .post('/posts')
        .send({
            author_id: 1,
            title: `Post de prueba ${Date.now()}`,
            content: 'Contenido de prueba',
            published: true
        });

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
});


});

