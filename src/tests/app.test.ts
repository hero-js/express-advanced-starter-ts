import adapter from 'App';
import request from 'supertest';
import express from 'express';

describe('App', () => {
  let App: express.Express;

  beforeAll(async () => {
    App = await adapter.adapt();
  });

  describe('GET /', () => {
    it('responds with a not found message', (done) => {
      request(App)
        .get('/what-is-this-even')
        .set('Accept', 'Application/json')
        // .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond with Hello World!', async () => {
      const res = await request(App).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Hello World!');
    });
  });

  describe('GET /hello', () => {
    it('should respond with Hello Hero.JS!', async () => {
      const res = await request(App).get('/hello');
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Hello Hero.JS!');
    });
  });
});
