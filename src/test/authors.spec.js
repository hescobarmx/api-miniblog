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
        const email = `test-${Date.now()}@example.com`;

        const response = await request(app)
            .post('/authors')
            .send({
                name: 'Test Author',
                email,
                bio: 'Software developer'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test Author');
        expect(response.body.email).toBe(email);
    });

    it('should return an author by id', async () => {
        const response = await request(app)
            .get('/authors/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });

    it('should update an author', async () => {
        const email = `update-${Date.now()}@example.com`;

        const created = await request(app)
            .post('/authors')
            .send({
                name: 'Author To Update',
                email,
                bio: 'Original bio'
            });

        expect(created.statusCode).toBe(201);

        const authorId = created.body.id;

        const response = await request(app)
            .put(`/authors/${authorId}`)
            .send({
                name: 'Updated Author',
                email: `updated-${Date.now()}@example.com`,
                bio: 'Updated bio'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', authorId);
        expect(response.body.name).toBe('Updated Author');
        expect(response.body.bio).toBe('Updated bio');
    });

    it('should delete an author', async () => {
        const email = `delete-${Date.now()}@example.com`;

        const created = await request(app)
            .post('/authors')
            .send({
                name: 'Author To Delete',
                email,
                bio: 'Author for delete test'
            });

        expect(created.statusCode).toBe(201);

        const authorId = created.body.id;

        const response = await request(app)
            .delete(`/authors/${authorId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', authorId);
    });

    it('should return 404 when deleting a non-existent author', async () => {
        const response = await request(app)
            .delete('/authors/999999');

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

});