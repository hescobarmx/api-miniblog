const request = require('supertest');

import { describe, it, expect } from 'vitest';

const app = require('../server');

describe('Posts', () => {

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
        expect(response.body).toHaveProperty('id');
        expect(response.body.author_id).toBe(1);
        expect(response.body.title).toContain('Post de prueba');
    });

    it('should return a post by id', async () => {
        const response = await request(app)
            .get('/posts/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('content');
    });

    it('should return posts by author', async () => {
        const response = await request(app)
            .get('/posts/author/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should update a post', async () => {
        const created = await request(app)
            .post('/posts')
            .send({
                author_id: 1,
                title: `Post to update ${Date.now()}`,
                content: 'Original content',
                published: false
            });

        expect(created.statusCode).toBe(201);

        const postId = created.body.id;

        const response = await request(app)
            .put(`/posts/${postId}`)
            .send({
                author_id: 1,
                title: 'Updated post',
                content: 'Updated content',
                published: true
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', postId);
        expect(response.body.title).toBe('Updated post');
        expect(response.body.content).toBe('Updated content');
        expect(response.body.published).toBe(true);
    });

    it('should delete a post', async () => {
        const created = await request(app)
            .post('/posts')
            .send({
                author_id: 1,
                title: `Post to delete ${Date.now()}`,
                content: 'Post for delete test',
                published: false
            });

        expect(created.statusCode).toBe(201);

        const postId = created.body.id;

        const response = await request(app)
            .delete(`/posts/${postId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', postId);
    });

    it('should return 404 when requesting a non-existent post', async () => {
        const response = await request(app)
            .get('/posts/999999');

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

});